import Alert from '../../components/Alert';
import CodeBlock from '../../components/CodeBlock';

const investigations = [
  {
    title: 'RDP password guessing أو user error',
    color: 'red',
    facts: ['4625 مع LogonType 10 يصف RemoteInteractive failure عندما يملأ المصدر الحقل', '4624 Type 10 نجاح محتمل، ويحتاج user/source/LogonId والسياق', 'TerminalServices logs وVPN/firewall تضيف session/source context'],
    alternatives: 'مستخدم أخطأ، service/credential manager، scanner، jump host/NAT مشترك، أو guessing غير مصرح.',
    next: 'احسب distinct users والمحاولات والنافذة والمصدر، ثم ابحث عن نجاح مرتبط وMFA/NLA/exposure وasset owner. لا تحظر IP مشتركًا تلقائيًا.',
    query: `$start=(Get-Date).AddMinutes(-30)
$failed=Get-WinEvent -FilterHashtable @{LogName='Security';Id=4625;StartTime=$start} |
  Convert-WinEventData | Where-Object { $_.Data['LogonType'] -eq '10' }
$failed | Group-Object { $_.Data['IpAddress'] } |
  Sort-Object Count -Descending | Select-Object Count,Name`,
  },
  {
    title: 'Remote service / PsExec-like activity',
    color: 'yellow',
    facts: ['7045 أو 4697 يثبت service registration عند توفر المصدر', '4624 Type 3 قد يصف network logon لكنه شائع في SMB', '5140/5145 و4688/Sysmon وEDR تربط share، identity، service binary والتنفيذ'],
    alternatives: 'Software deployment، EDR، help desk، patching، backup أو إدارة مصرح بها.',
    next: 'طابق source/target/account، service name/ImagePath/hash/signature، admin share، ticket، execution outcome وانتشار السلوك. العزل وفق playbook والأثر فقط.',
    query: `$start=(Get-Date).AddHours(-1)
Get-WinEvent -FilterHashtable @{LogName='System';Id=7045;StartTime=$start} |
  Convert-WinEventData | ForEach-Object {
    [pscustomobject]@{Time=$_.TimeCreated;RecordId=$_.RecordId;Service=$_.Data['ServiceName'];ImagePath=$_.Data['ImagePath'];Account=$_.Data['AccountName'];StartType=$_.Data['StartType']}
  }`,
  },
  {
    title: 'PowerShell encoded/download hypothesis',
    color: 'purple',
    facts: ['4104 يعرض script content حسب policy وقد يكون متعدد الأجزاء', '4688/Sysmon يثبت process/arguments/parent حسب telemetry', 'Network/file/task/service/child evidence يثبت الأثر بدل string وحده'],
    alternatives: 'Admin automation، deployment، EDR response، packaging، أو lab marker.',
    next: 'فك Base64 offline كنص، لا تنفذه. اربط ScriptBlockId وRecordId بـprocess/user/network/files، ثم اختبر signer/baseline/change.',
    query: `$pattern='FromBase64String|EncodedCommand|Invoke-Expression|DownloadString'
Get-WinEvent -FilterHashtable @{
  LogName='Microsoft-Windows-PowerShell/Operational';Id=4104;StartTime=(Get-Date).AddHours(-1)
} | Where-Object Message -match $pattern |
  Select-Object TimeCreated,RecordId,Message`,
  },
  {
    title: 'LSASS process access / credential-access hypothesis',
    color: 'red',
    facts: ['Sysmon 10 يسجل ProcessAccess فقط إذا config سمحت', 'SourceImage/TargetImage/GrantedAccess/CallTrace/ProcessGuid مهمة', 'EDR، AV، diagnostics وWindows components قد تصل إلى LSASS شرعيًا'],
    alternatives: 'Security product، crash/diagnostic tooling، authentication component، أو نشاط credential access.',
    next: 'تحقق من signer/hash/path/source process والـaccess rights حسب OS/config، parent/user، prevalence، EDR verdict وسلوك لاحق. لا تغيّر كل passwords قبل scope/authority؛ عند ثبوت credential theft وسّع identity/session scope.',
    query: `Get-WinEvent -FilterHashtable @{
  LogName='Microsoft-Windows-Sysmon/Operational';Id=10;StartTime=(Get-Date).AddHours(-1)
} | Where-Object Message -match 'TargetImage:.*\\lsass\\.exe' |
  Select-Object TimeCreated,RecordId,Message`,
  },
  {
    title: 'Scheduled task registration',
    color: 'orange',
    facts: ['Security 4698 وTaskScheduler 106 قد يثبتان registration حسب audit/channel', 'Task XML يكشف action/trigger/principal/run level', 'Execution يحتاج 4688/Sysmon/TaskScheduler operational evidence'],
    alternatives: 'Update، software deployment، maintenance، monitoring، أو task مختبرية.',
    next: 'صدّر XML واحسب hash، تحقق من owner/path/signature/change/time، وابحث عن execution. لا تحذف قبل حفظ الدليل والتفويض؛ احذف بالاسم/المعرف المحدد فقط.',
    query: `$start=(Get-Date).AddHours(-1)
Get-WinEvent -FilterHashtable @{LogName='Security';Id=4698;StartTime=$start} |
  Convert-WinEventData | ForEach-Object {
    [pscustomobject]@{Time=$_.TimeCreated;RecordId=$_.RecordId;TaskName=$_.Data['TaskName'];User=$_.Data['SubjectUserName'];TaskContent=$_.Data['TaskContent']}
  }`,
  },
  {
    title: 'Security log cleared (1102)',
    color: 'red',
    facts: ['1102 يثبت clear audit log event ضمن حدود الرؤية', 'SubjectUserName/LogonId والوقت والجهاز تسمح بالربط', 'Forwarder/SIEM/EDR قد يحتفظ بنسخة قبل المسح'],
    alternatives: 'إجراء صيانة أو rebuild مصرح، lab reset، أو defense evasion.',
    next: 'احفظ event، طابق account/LogonId/change، افحص service stop/config/other channels وcentral logs. أعطِه أولوية عالية عادةً، لكن لا تقل دائمًا malicious.',
    query: `Get-WinEvent -FilterHashtable @{LogName='Security';Id=1102;StartTime=(Get-Date).AddDays(-1)} |
  Convert-WinEventData | ForEach-Object {
    [pscustomobject]@{Time=$_.TimeCreated;RecordId=$_.RecordId;User=$_.Data['SubjectUserName'];Domain=$_.Data['SubjectDomainName'];LogonId=$_.Data['SubjectLogonId']}
  }`,
  },
];

const WindowsInvestigationsSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>🕵️</span>تحقيقات Windows: فرضيات لا أسماء هجمات</h1>
    <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

    <Alert type="info" title="Workflow ثابت">
      <strong>Facts → Context → Scope → Competing hypotheses → Decision → Authorized action.</strong> Event ID يصف واقعة telemetry، ولا يحدد وحده نية أو عائلة أداة أو compromise.
    </Alert>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Helper واحد للاستعلامات</h2>
      <CodeBlock language="powershell" code={`function Convert-WinEventData {
  param([Parameter(ValueFromPipeline)]$Event)
  process {
    [xml]$xml=$Event.ToXml(); $data=@{}
    foreach($item in $xml.Event.EventData.Data){$data[[string]$item.Name]=[string]$item.'#text'}
    [pscustomobject]@{TimeCreated=$Event.TimeCreated;Id=$Event.Id;RecordId=$Event.RecordId;Machine=$Event.MachineName;Data=$data;RawEvent=$Event}
  }
}`} />
      <p className="text-sm leading-7 text-gray-400">شغّله في الجلسة ثم نفّذ query كل حالة. افحص أسماء fields من XML الفعلي؛ بعض القنوات تستخدم UserData أو Message بدل EventData.</p>
    </section>

    <section className="space-y-5">
      {investigations.map((item, index) => (
        <article key={item.title} className="rounded-xl border border-cyan-500/20 bg-gray-800/40 p-6 space-y-4">
          <h2 className="text-xl font-bold text-cyan-300">{index + 1}. {item.title}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-gray-900/40 p-4"><h3 className="font-bold text-cyan-300 mb-2">ما يمكن أن تثبته telemetry</h3><ul className="space-y-2 text-sm leading-7 text-gray-300">{item.facts.map(fact => <li key={fact}>• {fact}</li>)}</ul></div>
            <div className="rounded-lg bg-gray-900/40 p-4 space-y-3"><div><h3 className="font-bold text-yellow-300">بدائل يجب اختبارها</h3><p className="text-sm leading-7 text-gray-300">{item.alternatives}</p></div><div><h3 className="font-bold text-green-300">الخطوة المهنية التالية</h3><p className="text-sm leading-7 text-gray-300">{item.next}</p></div></div>
          </div>
          <CodeBlock title="Query بداية — عدّل النافذة والبيئة" language="powershell" code={item.query} />
        </article>
      ))}
    </section>

    <Alert type="danger" title="Containment ليس زرًا افتراضيًا">
      عزل host أو تعطيل user أو قتل process أو حذف task/service قد يوقف خدمة، يمحو volatile evidence، أو ينبه خصمًا. اتبع playbook والسلطة، قيّم business impact، سجل من وافق ومتى، وضع rollback/verification.
    </Alert>

    <Alert type="golden" title="قالب جواب المقابلة">
      «أبدأ بتثبيت host/user/time/data source وRecord IDs، ثم أربط الحدث بمصدر مستقل وأحدد النطاق والـbusiness context. أختبر تفسيرًا benign وتفسيرًا ضارًا، وأذكر فجوات الرؤية. إذا تجاوزت الحالة threshold أصعّد بحزمة أدلة واقتراح إجراء مشروط بالتفويض.»
    </Alert>
  </div>
);

export default WindowsInvestigationsSection;
