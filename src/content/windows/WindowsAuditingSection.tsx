import Alert from '../../components/Alert';
import Table from '../../components/Table';
import CodeBlock from '../../components/CodeBlock';

const WindowsAuditingSection = () => (
  <div className="space-y-10">
    <h1 className="flex items-center gap-3 text-3xl font-bold text-cyan-400"><span>⚙️</span>Windows Auditing: visibility بعقد قياس وخصوصية</h1>
    <Alert type="golden">Audit policy ليست «شغّل كل شيء». صممها من use cases وthreat model، قارنها ببنية مؤسستك وMicrosoft/security baseline المعتمد، اختبر canary، وقِس event generation/forwarding/retention/لفة الكلفة.</Alert>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">من السؤال إلى telemetry</h2>
      <Table headers={['Use case', 'Candidate telemetry', 'اختبار acceptance']} rows={[
        ['من أنشأ process؟', 'Audit Process Creation/4688 + command-line policy أو Sysmon/EDR', 'process حميد معروف يولد actor/image/parent/command حسب policy ويصل SIEM.'],
        ['من حاول الدخول؟', 'Logon/Account Logon على endpoints/DCs + VPN/IdP', 'success/failure مصرح مع source/status والموضع الصحيح.'],
        ['من غيّر account/group؟', 'Account Management على authoritative systems', 'fixture change يظهر subject/target/change ويمر parser.'],
        ['هل أضيفت service/task؟', 'System Security Extension/System + Object Access task subcategory/channels', 'create/run/delete lifecycle وربطه process/file.'],
        ['PowerShell ماذا نفذ؟', '4103/4104 + 4688/AMSI/EDR بحسب السياسة', 'script حميد متعدد الأجزاء reconstructed دون كشف أسرار.'],
        ['Object access حساس؟', 'subcategory + SACL محددة', 'فقط object المطلوب ينتج event؛ الحجم ضمن budget.'],
      ]} />
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Baseline الحالية قبل التغيير</h2>
      <CodeBlock language="powershell" code={`# Read-only inventory على مختبر/نطاق مصرح
$stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
auditpol /get /category:* /r | Out-File "audit-$stamp.csv" -Encoding utf8
gpresult /h "gpresult-$stamp.html"
wevtutil gl Security
Get-WinEvent -ListLog Security,'Microsoft-Windows-PowerShell/Operational' -ErrorAction SilentlyContinue |
  Select-Object LogName,IsEnabled,RecordCount,FileSize,MaximumSizeInBytes,LogMode,LastWriteTime`} />
      <p className="text-sm text-gray-400">وثّق domain GPO/local policy precedence، Advanced Audit Policy setting، OS/build، owner، وتاريخ القياس. output نفسه قد يكون حساسًا.</p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">تغيير canary فقط — مثال لا prescription</h2>
      <CodeBlock language="powershell" code={`# لا تنفذ إلا في VM snapshot مصرح وبعد تسجيل baseline/rollback
$before = 'C:\\SOC-Lab\\audit-before.csv'
auditpol /get /category:* /r > $before

auditpol /set /subcategory:"Process Creation" /success:enable /failure:enable

# راجع effective policy واختبر process حميدًا ثم event 4688 وingestion
AuditPol /get /subcategory:"Process Creation"
Start-Process "$env:SystemRoot\\System32\\whoami.exe" -Wait
Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4688; StartTime=(Get-Date).AddMinutes(-5)} -MaxEvents 10

# rollback يجب أن يعيد الحالة المسجلة/GPO، لا يفترض أنها Disabled.`} />
      <Alert type="warning">إظهار command line في 4688 policy منفصلة وقد يسجل passwords/tokens/paths/PII. ضع data handling/RBAC/retention/redaction قبل التفعيل، ولا تضع secret في command line أصلًا.</Alert>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Acceptance وrollback</h2>
      <ol className="space-y-2 text-sm leading-7 text-gray-300">
        <li>1. Query use case يعيد الحقول المطلوبة من canary بزمن معلوم.</li>
        <li>2. قِس EPS/GB-day/latency/drop/parser-null قبل وبعد ووقت retention الفعلي.</li>
        <li>3. اختبر benign negatives لتقدير noise، وراجع privacy/access.</li>
        <li>4. راقب 4719/GPO drift/agent heartbeat/channel fullness.</li>
        <li>5. rollback إلى baseline الموثقة، ثم تحقق أن effective policy والtelemetry عادا كما كانا.</li>
      </ol>
    </section>
  </div>
);

export default WindowsAuditingSection;
