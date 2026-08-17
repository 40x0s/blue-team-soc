import Alert from '../../components/Alert';
import CodeBlock from '../../components/CodeBlock';

const WindowsGetWinEventSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>🔍</span>Get-WinEvent للمحلل</h1>
    <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

    <Alert type="info" title="ابدأ بالمصدر والنافذة لا بالبحث في Message">
      <strong>FilterHashtable</strong> يرشح داخل Windows Eventing قبل إرجاع النتائج، فيكون أسرع من جلب السجل كله ثم Where-Object. ثبّت LogName وID وStartTime/EndTime، ثم احتفظ بـRecordId ووقت المنطقة الزمنية كمصدر للدليل.
    </Alert>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">1. نمط الاستعلام الآمن</h2>
      <CodeBlock title="اكتشاف السجل ثم نافذة محدودة" language="powershell" code={`Get-WinEvent -ListLog * | Where-Object IsEnabled |
  Select-Object LogName,RecordCount,FileSize,LastWriteTime

$start=(Get-Date).AddHours(-1)
$end=Get-Date
Get-WinEvent -FilterHashtable @{
  LogName='Security'
  Id=4624,4625
  StartTime=$start
  EndTime=$end
} -ErrorAction Stop | Select-Object -First 200 TimeCreated,Id,RecordId,MachineName`} />
      <Alert type="warning">
        <strong>-MaxEvents</strong> يحمي الجهاز لكنه يعيد الأحدث عادةً وقد يقطع أول الحادث. استخدم نافذة زمنية واضحة، وسجّل إن كانت retention أو permissions أو disabled channel قد أخفت أحداثًا.
      </Alert>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">2. لماذا لا نعتمد Properties[19]؟</h2>
      <p className="text-gray-300 leading-8">ترتيب Properties يتغير بين Event IDs ونسخ الحدث، فينتج استعلام صحيح نحويًا لكنه يعطي field آخر. XML يحمل أسماء مثل <span dir="ltr" className="text-cyan-300">TargetUserName</span> و<span dir="ltr" className="text-cyan-300">IpAddress</span>. افحص XML الفعلي في بيئتك.</p>
      <CodeBlock title="Helper يعيد EventData بأسماء الحقول" language="powershell" code={`function Convert-WinEventData {
  [CmdletBinding()]
  param([Parameter(ValueFromPipeline)]$Event)
  process {
    [xml]$xml=$Event.ToXml()
    $data=@{}
    foreach($item in $xml.Event.EventData.Data){
      $data[[string]$item.Name]=[string]$item.'#text'
    }
    [pscustomobject]@{
      TimeCreated=$Event.TimeCreated
      Id=$Event.Id
      RecordId=$Event.RecordId
      MachineName=$Event.MachineName
      Provider=$Event.ProviderName
      Data=$data
      RawEvent=$Event
    }
  }
}

# اكتشف أسماء fields لأول حدث في بيئتك
$sample=Get-WinEvent -FilterHashtable @{LogName='Security';Id=4625} -MaxEvents 1
[xml]$sampleXml=$sample.ToXml()
$sampleXml.Event.EventData.Data | Select-Object Name,'#text'`} />
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">3. استعلامات تحقيق قابلة للتعديل</h2>
      <CodeBlock title="4625: source/user/logon type/status" language="powershell" code={`$start=(Get-Date).AddHours(-1)
$failed=Get-WinEvent -FilterHashtable @{LogName='Security';Id=4625;StartTime=$start} |
  Convert-WinEventData

$failed | ForEach-Object {
  [pscustomobject]@{
    Time=$_.TimeCreated; RecordId=$_.RecordId
    User=$_.Data['TargetUserName']; SourceIP=$_.Data['IpAddress']
    Workstation=$_.Data['WorkstationName']; LogonType=$_.Data['LogonType']
    Status=$_.Data['Status']; SubStatus=$_.Data['SubStatus']
    Process=$_.Data['ProcessName']
  }
} | Format-Table -Auto`} />
      <CodeBlock title="Group مع استبعاد القيم الفارغة فقط، لا استبعاد الأدلة" language="powershell" code={`$failed | ForEach-Object { $_.Data['IpAddress'] } |
  Where-Object { $_ -and $_ -ne '-' } |
  Group-Object | Sort-Object Count -Descending |
  Select-Object Count,Name

$failed | ForEach-Object { $_.Data['TargetUserName'] } |
  Where-Object { $_ } | Group-Object |
  Sort-Object Count -Descending | Select-Object Count,Name`} />
      <CodeBlock title="4624: نجاح يحتاج ربطًا لا قربًا زمنيًا فقط" language="powershell" code={`Get-WinEvent -FilterHashtable @{LogName='Security';Id=4624;StartTime=$start} |
  Convert-WinEventData | ForEach-Object {
    [pscustomobject]@{
      Time=$_.TimeCreated; RecordId=$_.RecordId
      User=$_.Data['TargetUserName']; SourceIP=$_.Data['IpAddress']
      LogonType=$_.Data['LogonType']; LogonId=$_.Data['TargetLogonId']
      AuthPackage=$_.Data['AuthenticationPackageName']
    }
  } | Format-Table -Auto`} />
      <CodeBlock title="4688: process وparent وcommand line" language="powershell" code={`Get-WinEvent -FilterHashtable @{LogName='Security';Id=4688;StartTime=$start} |
  Convert-WinEventData | ForEach-Object {
    [pscustomobject]@{
      Time=$_.TimeCreated; RecordId=$_.RecordId
      Image=$_.Data['NewProcessName']; CommandLine=$_.Data['CommandLine']
      Parent=$_.Data['ParentProcessName']; User=$_.Data['SubjectUserName']
      NewPID=$_.Data['NewProcessId']; ParentPID=$_.Data['ProcessId']
    }
  } | Format-List`} />
      <CodeBlock title="4720 و7045: حقول XML الفعلية" language="powershell" code={`Get-WinEvent -FilterHashtable @{LogName='Security';Id=4720;StartTime=$start} |
  Convert-WinEventData | ForEach-Object {
    [pscustomobject]@{Time=$_.TimeCreated;NewAccount=$_.Data['TargetUserName'];CreatedBy=$_.Data['SubjectUserName'];RecordId=$_.RecordId}
  }

Get-WinEvent -FilterHashtable @{LogName='System';Id=7045;StartTime=$start} |
  Convert-WinEventData | ForEach-Object {
    [pscustomobject]@{Time=$_.TimeCreated;Service=$_.Data['ServiceName'];ImagePath=$_.Data['ImagePath'];StartType=$_.Data['StartType'];Account=$_.Data['AccountName'];RecordId=$_.RecordId}
  }`} />
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">4. التصدير وسلسلة الدليل</h2>
      <CodeBlock language="powershell" code={`New-Item -ItemType Directory C:/SOC-Lab/Case-001 -Force | Out-Null
$rows=$failed | ForEach-Object {
  [pscustomobject]@{Time=$_.TimeCreated.ToUniversalTime().ToString('o');RecordId=$_.RecordId;User=$_.Data['TargetUserName'];SourceIP=$_.Data['IpAddress'];LogonType=$_.Data['LogonType'];Status=$_.Data['Status'];SubStatus=$_.Data['SubStatus']}
}
$rows | Export-Csv C:/SOC-Lab/Case-001/failed-logons.csv -NoTypeInformation -Encoding UTF8
Get-FileHash C:/SOC-Lab/Case-001/failed-logons.csv -Algorithm SHA256`} />
      <Alert type="golden" title="اختبار الإتقان">
        اشرح لماذا يمكن أن يكون SourceIP “-”، ولماذا 4625 لا يثبت password attack، وكيف تربط 4624 باستخدام user/source/logon type/LogonId والسياق. إذا لم تستطع، أعد Windows Lab 1 بلا النظر إلى الحل.
      </Alert>
    </section>
  </div>
);

export default WindowsGetWinEventSection;
