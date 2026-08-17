import Alert from '../../components/Alert';
import CodeBlock from '../../components/CodeBlock';
import Table from '../../components/Table';

const LinuxAuditdSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400">👁️ Linux Audit: قواعد، أحداث، وحدود</h1>
    <Alert type="warning" title="auditd لا يسجل «كل شيء» تلقائيًا">
      kernel audit يسجل ما تطلبه القواعد وقد تسجل مكونات أخرى أحداثًا. Coverage يعتمد rules، architecture، backlog، rate limits، daemon state والـretention. Global execve logging قد يسبب حجمًا عاليًا ويلتقط arguments حساسة.
    </Alert>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">1. Health قبل البحث</h2>
      <CodeBlock language="bash" code={`sudo auditctl -s
sudo auditctl -l
sudo systemctl status auditd --no-pager
sudo ausearch -m DAEMON_START,DAEMON_END,CONFIG_CHANGE --start today -i
sudo aureport --summary`} />
      <Table headers={['Field', 'المعنى', 'تنبيه']} rows={[
        ['enabled', 'حالة audit في kernel', '2 قد يعني immutable حتى reboot'],
        ['lost', 'Records فقدها kernel', 'lost > 0 visibility gap'],
        ['backlog', 'Queue الحالية', 'فسرها مع backlog_limit/rate'],
        ['auid / loginuid', 'هوية login الأصلية غالبًا', 'قد تكون unset لخدمة أو container'],
        ['uid/euid', 'هوية process الفعلية', 'لا تستبدل auid'],
        ['success/exit', 'نتيجة syscall', 'نجاح syscall لا يثبت نجاح هدف أعلى مستوى'],
      ]} />
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">2. قاعدة مختبر مؤقتة محدودة</h2>
      <Alert type="danger">لا تغيّر audit rules في production كمحلل L1 دون change approval. افحص وجود rule/key متعارض، وقد تمنع immutable mode التعديل.</Alert>
      <CodeBlock language="bash" code={`# داخل VM فقط: أنشئ fixture غير حساس.
sudo install -m 0644 /dev/null /tmp/soc-audit-fixture

# File watch بسيط للاختبار المؤقت.
sudo auditctl -w /tmp/soc-audit-fixture -p wa -k soc_lab_file
printf 'authorized-lab-marker\\n' | sudo tee -a /tmp/soc-audit-fixture >/dev/null
sudo ausearch -k soc_lab_file --start recent -i

# Cleanup محدد؛ لا تستخدم auditctl -D.
sudo auditctl -W /tmp/soc-audit-fixture -k soc_lab_file
sudo rm -f /tmp/soc-audit-fixture`} />
      <p className="text-sm leading-7 text-gray-300">للإنتاج تُدار القواعد persistent في <span dir="ltr">/etc/audit/rules.d/*.rules</span> عبر configuration management، وتُختبر للـperformance والـordering قبل <span dir="ltr">augenrules --load</span>.</p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">3. لا تقرأ record منفردًا</h2>
      <p className="leading-8 text-gray-300">عملية واحدة قد تولد records من أنواع SYSCALL وPATH وCWD وPROCTITLE وEXECVE تشترك في audit event serial مثل <span dir="ltr">msg=audit(epoch:serial)</span>. اجمع الحدث كاملًا قبل الاستنتاج.</p>
      <CodeBlock language="bash" code={`# ابحث بالـkey ثم خزّن raw قبل interpretation.
sudo ausearch -k soc_lab_file --start today --raw > CASE-001-audit.raw
sha256sum CASE-001-audit.raw

# Interpretation يترجم UIDs/syscalls؛ احتفظ بالخام أيضًا.
sudo ausearch -k soc_lab_file --start today -i

# البحث بالـevent serial المكتشف
sudo ausearch -a 12345 --raw`} />
      <Table headers={['Record', 'يوفر عادة', 'حدود']} rows={[
        ['SYSCALL', 'syscall، arch، success، uid/auid، pid/ppid', 'قد لا يعطي كل arguments'],
        ['EXECVE', 'arguments المسجلة', 'قد تحتوي secrets/تُجزّأ/تتأثر config'],
        ['PATH', 'paths/inodes/items', 'افهم item وnametype'],
        ['CWD', 'working directory', 'ليس path النهائي وحده'],
        ['PROCTITLE', 'process title encoded غالبًا', 'قد يحتاج decode ولا يثبت intent'],
      ]} />
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">4. هندسة rule بدل «سجل execve كله»</h2>
      <CodeBlock language="text" code={`Objective → asset/path/syscall → users/architectures → expected volume
→ test events (positive + negative) → latency/loss → retention/privacy
→ documented owner → rollback → alert logic`} />
      <p className="leading-8 text-gray-300">على x86_64 قد تحتاج b64 وb32 لبعض syscall rules. Filters غير الصحيحة أو ترتيب never rules قد يحجب evidence. استخدم وثائق التوزيعة واختبر <span dir="ltr">auditctl -l</span> والحدث الناتج، لا مجرد نجاح load.</p>
    </section>

    <Alert type="golden" title="معيار الإتقان">
      قدّم event واحدًا كامل records: فرّق auid عن euid، فسّر success/exit، اربطه بـjournal/process context، واذكر health وlost count والقاعدة التي جعلت الحدث مرئيًا.
    </Alert>
  </div>
);

export default LinuxAuditdSection;
