import Alert from '../../components/Alert';
import CodeBlock from '../../components/CodeBlock';
import Table from '../../components/Table';

const LinuxLogsSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400">📋 Linux Logs: المصدر والوقت والاكتمال</h1>
    <Alert type="warning" title="لا يوجد مسار واحد لكل Linux">
      Ubuntu/Debian قد يكتبان <span dir="ltr">auth.log/syslog</span>، وRHEL-family قد يستخدم <span dir="ltr">secure/messages</span>، وقد يكون journald المصدر الوحيد أو غير persistent. افحص config والrotations والforwarder قبل قول «لا توجد أحداث».
    </Alert>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">1. Inventory وhealth</h2>
      <CodeBlock language="bash" code={`cat /etc/os-release
systemctl is-active systemd-journald
journalctl --disk-usage
journalctl --list-boots
ls -lh /var/log/auth.log* /var/log/secure* 2>/dev/null
systemctl is-active rsyslog 2>/dev/null || true
systemctl status systemd-journal-upload 2>/dev/null || true`} />
      <Table headers={['مصدر', 'استخدام', 'فجوة محتملة']} rows={[
        ['journal', 'Structured metadata، units، boots', 'Volatile storage/rate limits/vacuum/permissions'],
        ['auth.log / secure', 'SSH/PAM/sudo حسب rsyslog', 'Rotation/compression/config/message format'],
        ['audit.log', 'Kernel audit حسب rules', 'Backlog/rules/immutable config'],
        ['Central SIEM', 'Correlation ونسخة خارج host', 'Agent/queue/parser/time normalization'],
      ]} />
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">2. نافذة زمنية قابلة للإعادة</h2>
      <CodeBlock language="bash" code={`# استخدم UTC وسجل حدود النافذة.
sudo journalctl --utc \\
  --since '2026-01-15 08:00:00 UTC' \\
  --until '2026-01-15 09:00:00 UTC' \\
  -u ssh --no-pager -o short-iso-precise

# قد يكون اسم الوحدة sshd.
sudo journalctl --utc -u sshd --since '2026-01-15 08:00:00 UTC' --no-pager

# JSON للتحليل؛ احتفظ بالخام ونسخة hash.
sudo journalctl --utc --since '2026-01-15 08:00:00 UTC' -o json > CASE-001-journal.jsonl
sha256sum CASE-001-journal.jsonl`} />
      <Alert type="info">أولوية syslog مثل emerg/alert/crit يحددها التطبيق/المصدر، وليست severity حادث SOC تلقائية. استخدمها كحقل فرز مع asset/impact/context.</Alert>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">3. SSH: facts أولًا</h2>
      <CodeBlock title="رسائل نموذجية — الصيغة تتغير" language="text" code={`2026-01-15T08:23:45+00:00 host sshd[1234]: Failed password for analyst from 192.0.2.50 port 54321 ssh2
2026-01-15T08:25:00+00:00 host sshd[1235]: Accepted publickey for analyst from 192.0.2.50 port 54322 ssh2`} />
      <Table headers={['Observation', 'ما يثبته', 'ما يلزم']} rows={[
        ['Failed password', 'محاولة مصادقة فاشلة كما سجلها sshd', 'user/source/rate/reason/window؛ لا يثبت guessing وحده'],
        ['Invalid user', 'اسم account غير موجود وفق الرسالة', 'scanner/user typo/source context'],
        ['Accepted publickey/password', 'نجاح مصادقة SSH في السياق', 'session/process/activity/owner؛ لا يثبت compromise'],
        ['sudo COMMAND', 'طلب/تنفيذ sudo وفق fields والنتيجة', 'auid/TTY/session/approval/outcome'],
      ]} />
      <CodeBlock title="Counts للفرز فقط؛ لا تستخدم أرقام أعمدة ثابتة" language="bash" code={`log=/var/log/auth.log
sudo grep -hE 'sshd.*(Failed password|Invalid user|Accepted (password|publickey))' \\
  "$log" "$log".1 2>/dev/null | head -n 200

# للملفات المضغوطة استخدم zgrep بصورة منفصلة وسجل الملفات الداخلة.
sudo zgrep -hE 'sshd.*Failed password' /var/log/auth.log.*.gz 2>/dev/null | wc -l`} />
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">4. Parser صغير يتحقق من IP</h2>
      <CodeBlock language="python" code={`import ipaddress, re, sys
from collections import Counter

pattern = re.compile(
    r"sshd\\[\\d+\\]: Failed password for (?:invalid user )?(?P<user>\\S+) "
    r"from (?P<ip>\\S+) port (?P<port>\\d+)"
)
counts = Counter()
for line in sys.stdin:
    match = pattern.search(line)
    if not match:
        continue
    try:
        source = str(ipaddress.ip_address(match['ip']))
    except ValueError:
        continue
    counts[(source, match['user'])] += 1
for (source, user), count in counts.most_common():
    print(count, source, user)`} />
      <CodeBlock language="bash" code={`python3 ssh_failures.py < sanitized-auth-fixture.log
# expected fixture output مثل: 3 192.0.2.50 analyst`} />
      <p className="text-sm leading-7 text-gray-300">اختبر parser بـvalid/invalid user، IPv4/IPv6، malformed line ونسخة distro مختلفة. Regex لا يساوي parser عام؛ وثق الصيغة المدعومة.</p>
    </section>

    <Alert type="golden" title="معيار الإتقان">
      أنشئ timeline UTC من fixture، اذكر الملفات/boots والنافذة والعدد وunparsed lines، ثم أجب: guessing أم user error أم insufficient evidence؟ لا تنشر raw auth logs.
    </Alert>
  </div>
);

export default LinuxLogsSection;
