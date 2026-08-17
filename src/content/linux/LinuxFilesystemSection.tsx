import Alert from '../../components/Alert';
import CodeBlock from '../../components/CodeBlock';
import Table from '../../components/Table';

const LinuxFilesystemSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400">📁 Linux Filesystems للمحقق</h1>
    <Alert type="info" title="المسار سياق، لا حكم">
      FHS يعطي conventions لا ضمانًا. توزيعة أو container أو application قد يخزن في مكان مختلف، وmount namespace قد يجعل process ترى filesystem غير الذي تراه أنت.
    </Alert>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">1. خريطة الأدلة</h2>
      <Table headers={['Path', 'غرض شائع', 'سؤال التحقيق']} rows={[
        ['/etc', 'System/service configuration', 'ما effective config؟ includes وoverrides؟'],
        ['/var/log', 'بعض file-based logs', 'هل journald/remote logging هو المصدر؟ rotation؟'],
        ['/var/lib', 'Persistent application state', 'DB/agent/container state؟ صلاحية الجمع؟'],
        ['/run', 'Runtime state منذ boot غالبًا', 'sockets/PIDs؛ volatile وقد يكون tmpfs'],
        ['/tmp, /var/tmp, /dev/shm', 'Temporary/shared memory', 'artifact أم app/installer؟ mount options؟'],
        ['/home, /root', 'User data/configuration', 'authority/privacy؛ keys/history ليست كاملة'],
        ['/proc, /sys', 'Kernel/process views', 'snapshot/namespace/permissions؛ ليست disk files عادية'],
        ['/usr, /opt', 'Packaged أو third-party software', 'package/signature/change provenance؟'],
      ]} />
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">2. أين أنا فعلًا؟</h2>
      <CodeBlock language="bash" code={`date --iso-8601=seconds
findmnt --target /tmp
findmnt --target /var/log
mount | head -n 50
df -hT
lsns -t mnt

pid=1234
sudo readlink -- "/proc/$pid/root"
sudo readlink -- "/proc/$pid/cwd"
sudo findmnt -N "$pid"`} />
      <p className="leading-8 text-gray-300">في container، path مثل <span dir="ltr">/tmp/x</span> داخل process قد لا يساوي host path. سجل PID/start time وnamespace/container ID واربط orchestrator telemetry.</p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">3. Metadata قبل content</h2>
      <CodeBlock language="bash" code={`artifact=/path/to/artifact
sudo stat -- "$artifact"
sudo file -- "$artifact"
sudo namei -l -- "$artifact"
sudo sha256sum -- "$artifact"
sudo getfacl -p -- "$artifact" 2>/dev/null
sudo getfattr -d -m- -- "$artifact" 2>/dev/null`} />
      <Table headers={['Timestamp', 'معنى تقريبي', 'حد مهم']} rows={[
        ['mtime', 'آخر تعديل لمحتوى file', 'يمكن تغييره ولا يثبت execution/creation'],
        ['ctime', 'آخر تغيير inode metadata/content', 'ليس creation time'],
        ['atime', 'آخر access وفق mount policy', 'noatime/relatime والتطبيق تؤثر'],
        ['btime/Birth', 'creation إن دعمه filesystem/tool', 'قد يغيب ويتغير عند copy/restore'],
      ]} />
      <Alert type="warning">فتح/نسخ file قد يغير atime أو يطلق AV/EDR. اجمع وفق إجراءات الأدلة والـauthority، وفضّل acquisition معتمدًا عندما تتطلب القضية forensic fidelity.</Alert>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">4. بحث محدود لا root sweep أعمى</h2>
      <CodeBlock language="bash" code={`# نطاق + filesystem + نافذة واضحة؛ preview فقط.
sudo find /var/tmp -xdev -type f \\
  -newermt '2026-01-15 08:00 UTC' ! -newermt '2026-01-15 09:00 UTC' \\
  -printf '%p\\0' > CASE-001-paths.nul

# Inventory محدود لـSUID؛ لا يعني أن كل نتيجة خطرة.
sudo find /usr /opt -xdev -type f -perm -4000 \\
  -printf '%p %u %g %m %TY-%Tm-%TdT%TH:%TM:%TS\\n' 2>/dev/null`} />
      <p className="text-sm leading-7 text-gray-300">تجنب <span dir="ltr">find /</span> دون قيود: بطيء، يعبر remote/container/pseudo filesystems ويخلق ضوضاء. ابدأ من hypothesis وasset role.</p>
    </section>

    <Alert type="golden" title="تمرين">
      على fixture benign، سجّل mount/filesystem/namespace ثم path/owner/mode/ACL/xattrs/hash/timestamps/package owner. اكتب فرضيتين ولا تسمّ الملف malware من مكانه.
    </Alert>
  </div>
);

export default LinuxFilesystemSection;
