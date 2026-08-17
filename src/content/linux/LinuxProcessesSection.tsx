import Alert from '../../components/Alert';
import CodeBlock from '../../components/CodeBlock';
import Table from '../../components/Table';

const LinuxProcessesSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400">⚙️ Process Triage على Linux</h1>
    <Alert type="warning" title="Process data متطايرة">
      PID قد ينتهي ويُعاد استخدامه. سجل hostname والوقت/UTC وPID وstart time، ثم اجمع parent/executable/command/files/network قبل أي إيقاف مصرح.
    </Alert>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">1. Snapshot وفهم الحقول</h2>
      <CodeBlock language="bash" code={`date --iso-8601=seconds
ps -eo user,pid,ppid,lstart,etime,%cpu,%mem,stat,comm,args --forest
pstree -ap

pid=1234
ps -p "$pid" -o user,pid,ppid,lstart,etime,stat,comm,args`} />
      <Table headers={['الحقل', 'يفيد في', 'لا تستنتج منه وحده']} rows={[
        ['PID/PPID', 'ربط parent-child في اللحظة', 'Attribution؛ PID يعاد استخدامه'],
        ['lstart/etime', 'وقت/عمر process', 'وقت تنزيل executable'],
        ['USER', 'security context الظاهر', 'أن الإنسان نفسه نفّذها'],
        ['CPU/MEM', 'انحراف resource', 'Malware؛ backup/compile قد يرتفع'],
        ['args', 'Intent محتمل', 'Outcome؛ وقد يحوي secrets أو يكون modified/truncated'],
      ]} />
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">2. Deep dive لـPID واحد</h2>
      <CodeBlock language="bash" code={`pid=1234
sudo stat -L -- "/proc/$pid/exe"
sudo readlink -- "/proc/$pid/exe"
sudo sha256sum -- "/proc/$pid/exe"
sudo tr '\\0' ' ' < "/proc/$pid/cmdline"; echo
sudo cat "/proc/$pid/status"
sudo readlink -- "/proc/$pid/cwd"
sudo lsof -nP -p "$pid" | head -n 100
sudo lsof -nP -a -p "$pid" -i`} />
      <Alert type="danger">لا تجمع <span dir="ltr">/proc/PID/environ</span> افتراضيًا؛ قد يحتوي credentials/tokens. إن احتجته فبتفويض وتخزين case مقيد وتنقيح التقرير.</Alert>
      <div className="grid md:grid-cols-2 gap-4">
        <article className="rounded-xl border border-gray-700 bg-gray-800/50 p-5"><h3 className="font-bold text-yellow-300">Executable في /tmp أو memfd</h3><p className="mt-2 text-sm leading-7 text-gray-300">يرفع الفرضية، لكن installer/test قد يكون شرعيًا. افحص owner/hash/package/parent/change/network.</p></article>
        <article className="rounded-xl border border-gray-700 bg-gray-800/50 p-5"><h3 className="font-bold text-yellow-300">(deleted)</h3><p className="mt-2 text-sm leading-7 text-gray-300">يعني inode مفتوحًا بعد unlink؛ قد ينتج من update طبيعي. احسب hash عبر /proc إن بقي متاحًا واربط package/update timeline.</p></article>
      </div>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">3. من anomaly إلى decision</h2>
      <ol className="space-y-2 leading-8 text-gray-300">
        <li><strong className="text-cyan-300">Fact:</strong> path/hash/user/start/parent/socket دون وصف النية.</li>
        <li><strong className="text-cyan-300">Provenance:</strong> package manager، signer إن وجد، owner، deployment/change، prevalence.</li>
        <li><strong className="text-cyan-300">Behavior:</strong> files، sockets، children، persistence وauth session.</li>
        <li><strong className="text-cyan-300">Alternatives:</strong> update، admin task، scanner، backup، container workload.</li>
        <li><strong className="text-cyan-300">Decision:</strong> benign/suspicious/insufficient مع confidence ونطاق.</li>
      </ol>
      <Alert type="danger" title="لا تستخدم kill -9 كخطوة تحقيق">
        SIGKILL لا يعطي process فرصة cleanup وقد يسبب تلفًا أو outage ويفقد volatile behavior. الاحتواء يحدده playbook/IR lead بعد تقييم الخدمة والدليل والبدائل؛ سجل الإشارة والفاعل والوقت وتحقق من النتيجة.
      </Alert>
    </section>

    <Alert type="golden" title="اختبار الإتقان">
      اختر process شرعية في VM، اجمع الأدلة أعلاه، ثم اكتب لماذا path أو port أو CPU لا يكفي وحده. لا توقفها. يجب أن يستطيع زميل إعادة جمع نفس الحقول.
    </Alert>
  </div>
);

export default LinuxProcessesSection;
