import Alert from '../../components/Alert';
import CodeBlock from '../../components/CodeBlock';
import Table from '../../components/Table';

const LinuxUsersSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400">👤 Linux Identity & Privilege Triage</h1>
    <Alert type="warning" title="الحساب ليس إنسانًا بالضرورة">
      Local files ليست كل identity: NSS قد يجلب users/groups من LDAP/SSSD. UID وname قد يختلفان بين host/container. افصل account existence عن authentication وعن session وعن process activity.
    </Alert>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">1. Sources وaccount inventory</h2>
      <CodeBlock language="bash" code={`grep -E '^(passwd|group|shadow):' /etc/nsswitch.conf
getent passwd
getent group
getent passwd analyst
id analyst
getent group sudo 2>/dev/null || true
getent group wheel 2>/dev/null || true
awk -F: '$3 == 0 {print $1 ":" $3 ":" $6 ":" $7}' /etc/passwd`} />
      <Table headers={['passwd field', 'المعنى', 'حد']} rows={[
        ['name', 'Account name', 'ليس attribution لشخص وحده'],
        ['x', 'غالبًا shadow source', 'لا يعني أن password login enabled'],
        ['UID/GID', 'Numeric identity', 'UID 0 يعطي root semantics؛ يحتاج baseline/approval'],
        ['GECOS', 'Description', 'User-controlled/غير موثوق أحيانًا'],
        ['home', 'Configured home', 'قد لا يوجد أو يُستبدل'],
        ['shell', 'Login program', 'nologin يقلل login التقليدي ولا يمنع كل token/service use'],
      ]} />
      <Alert type="danger">لا تطبع <span dir="ltr">/etc/shadow</span> في terminal/report. يحتوي password hashes وaging data حساسة. استخدم أدوات account-state المعتمدة وبالحد الأدنى من الصلاحية.</Alert>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">2. Sessions وauth ليست الشيء نفسه</h2>
      <CodeBlock language="bash" code={`date --iso-8601=seconds
who -a
w
loginctl list-sessions 2>/dev/null || true
last -Faiwx | head -n 50
sudo lastb -Faiwx 2>/dev/null | head -n 50`} />
      <Table headers={['Evidence', 'يثبت', 'لا يثبت']} rows={[
        ['who/w', 'utmp session state المرئي', 'كل process أو كل remote access'],
        ['last', 'wtmp records المتاحة', 'سجلًا كاملًا؛ rotation/tampering/containers تؤثر'],
        ['lastb', 'btmp failures إن مُفعّل ومتاح', 'كل auth failure أو guessing'],
        ['sshd Accepted', 'نجاح آلية مصادقة مسجلة', 'أن الجلسة خبيثة أو أن الشخص المسمى استخدمها'],
        ['sudo record', 'Privilege request/context/outcome fields', 'كل root activity إن coverage ناقصة'],
      ]} />
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">3. Privilege paths</h2>
      <CodeBlock language="bash" code={`# Effective sudo policy؛ قد يطلب privilege/auth حسب السياسة.
sudo -l -U analyst
sudo visudo -c
sudo find /etc/sudoers.d -maxdepth 1 -type f -printf '%p %u %g %m\\n'

# Groups/capabilities/SUID inventory هي signals، لا verdict.
getcap -r /usr /opt 2>/dev/null
find /usr /opt -xdev -type f -perm -4000 -printf '%p %u %g %m\\n' 2>/dev/null`} />
      <p className="leading-8 text-gray-300">عضوية sudo/wheel لا تضمن وحدها <em>كل</em> أوامر root؛ policy وhost rules وauthentication تؤثر. افحص effective sudoers، file ownership/mode، change source وactual use.</p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">4. Investigation reasoning</h2>
      <CodeBlock language="text" code={`Fact: account, UID/GIDs, source (local/directory), state
Expected owner/purpose: HR/IAM/CMDB/change ticket
Authentication: method, source, time, success/failure, event ID
Session: TTY/service/container, duration, concurrent sessions
Privilege: sudo/su/capability/SUID path and outcome
Activity: processes/files/network/persistence
Scope/gaps: retention, NSS availability, hosts not searched
Decision/confidence/action under playbook`} />
      <Alert type="info">حساب UID 0 إضافي أو key غير معروف high-priority anomaly، لكنه ليس إثبات compromise بلا baseline/owner/change/activity. لا تقفل الحساب أو تحذف key قبل حفظ الحالة والتفويض وتقييم impact/recovery access.</Alert>
    </section>

    <Alert type="golden" title="تمرين آمن">
      قارن حساب lab معروفًا بحساب service معروف: اشرح لماذا shell وgroup وUID لا تكفي. اربط login fixture بـsession ثم process، واذكر evidence المفقود.
    </Alert>
  </div>
);

export default LinuxUsersSection;
