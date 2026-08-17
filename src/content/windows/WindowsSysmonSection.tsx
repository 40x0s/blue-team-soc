import Alert from '../../components/Alert';
import Table from '../../components/Table';
import CodeBlock from '../../components/CodeBlock';

const WindowsSysmonSection = () => (
  <div className="space-y-10">
    <h1 className="flex items-center gap-3 text-3xl font-bold text-cyan-400"><span>👁️</span>Sysmon: telemetry غنية مشروطة بالتهيئة</h1>
    <Alert type="warning">Sysmon خدمة/driver يسجل أحداثًا في Windows Event Log؛ ليس EDR كاملًا ولا يمنع الهجوم. coverage تحددها نسخة Sysmon وconfig والفلاتر وحالة الخدمة والاحتفاظ.</Alert>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">أحداث عالية القيمة — لا تحفظ الرقم بلا config</h2>
      <Table headers={['ID', 'Observation محتملة', 'ربط وحدود']} rows={[
        ['1 ProcessCreate', 'image/command/parent/user/hashes/ProcessGuid', 'command may expose secrets؛ creation لا يثبت success أو intent.'],
        ['3 NetworkConnect', 'TCP/UDP connection مرتبطة بـprocess عندما تكون مفعلة', 'disabled/noisy شائعًا؛ لا يرى content وsource may be proxy/NAT.'],
        ['5 ProcessTerminate', 'انتهاء process', 'قد يساعد duration؛ غيابه لا يثبت بقاء process.'],
        ['7 ImageLoad', 'DLL/image loaded', 'غالبًا عالي الحجم ويحتاج filters؛ load لا يثبت exploitation.'],
        ['8 CreateRemoteThread', 'thread created in another process', 'قد يكون security/accessibility software؛ يحتاج process/tree/signer/memory context.'],
        ['10 ProcessAccess', 'عملية فتحت أخرى بحقوق معينة', 'noisy وconfig-sensitive؛ LSASS access hypothesis لا verdict.'],
        ['11 FileCreate', 'ملف أُنشئ/استبدل وفق semantics', 'اربط hash/path/origin/execution؛ extension لا يثبت النوع.'],
        ['12–14 Registry', 'create/delete/value/rename حسب الحدث', 'baseline/owner/change + persistence outcome.'],
        ['17–18 Pipe', 'named pipe create/connect', 'names يمكن أن تتشاركها برامج حميدة؛ اربط الطرفين.'],
        ['22 DNSQuery', 'query مرتبطة بـprocess', 'cache/DoH/other resolver/filters قد تخلق gaps؛ query لا يثبت connection.'],
        ['23/26 FileDelete', 'حذف archived/non-archived حسب config/version', 'احمِ archive وراجع disk impact/privacy.'],
        ['25 ProcessTampering', 'أنواع tampering يكتشفها Sysmon', 'ليس كشفًا شاملًا لكل injection؛ تحقق بـEDR/forensics.'],
      ]} />
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">ProcessGuid هو pivot، لا عصا سحرية</h2>
      <p className="text-sm leading-7 text-gray-300">اربط Event 1→3/7/11/22 باستخدام ProcessGuid عندما يوجد. ParentProcessGuid يشرح ancestry المسجلة. بعد reboot/reinstall/ingestion normalization، أكد Computer/time/record؛ ولا تربط PID وحده عبر زمن طويل لأنه يُعاد استخدامه.</p>
      <CodeBlock language="powershell" code={`$log='Microsoft-Windows-Sysmon/Operational'
Get-WinEvent -ListLog $log -ErrorAction SilentlyContinue |
  Select-Object LogName,IsEnabled,RecordCount,FileSize,MaximumSizeInBytes,LastWriteTime
Get-Service Sysmon* -ErrorAction SilentlyContinue |
  Select-Object Name,Status,StartType
Get-WinEvent -FilterHashtable @{LogName=$log; Id=1; StartTime=(Get-Date).AddHours(-1)} -MaxEvents 20 |
  Select-Object TimeCreated,Id,RecordId,MachineName,Message`} />
      <p className="text-xs text-gray-500">Rendered Message مناسب للفحص السريع فقط؛ للتحليل القابل للنقل parse XML Data Name fields.</p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">هندسة config آمنة</h2>
      <ol className="space-y-2 text-sm leading-7 text-gray-300">
        <li>1. ابدأ use cases وrequired fields قبل include/exclude.</li>
        <li>2. اختبر config في canary؛ تحقق syntax/schema/version من المصدر الرسمي.</li>
        <li>3. قِس EPS/day وdrop/CPU/storage قبل وبعد، لا تقل «noise أقل» دون رقم.</li>
        <li>4. اختبر expected event بأداة حميدة، ثم negative/false-positive cases.</li>
        <li>5. peer review + version control + owner + rollback + signed change.</li>
        <li>6. راقب service/config change وchannel retention وforwarding health.</li>
      </ol>
      <Alert type="danger">استثناء مجلد واسع أو tools الموقعة قد يصنع blind spot. لا تعرض command lines الحقيقية في Portfolio؛ استخدم synthetic fixture/redaction.</Alert>
    </section>
  </div>
);

export default WindowsSysmonSection;
