import { Lab } from '../types';

export const windowsLabs: Lab[] = [
  {
    id: 'windows-lab1',
    title: 'Lab 1: Failed Logons من Event 4625',
    objective: 'توليد خمس محاولات محلية فاشلة على VM، واستخراج حقول 4625 بأسماء XML، ثم الفصل بين المحاولة الفاشلة ونجاح الدخول.',
    tools: ['Windows lab VM', 'PowerShell 5.1+', 'runas', 'Event Viewer'],
    estimatedMinutes: 75,
    safety: 'نفّذ على VM تملكها بحساب مختبر. استخدم اسمًا غير موجود وخمس محاولات فقط؛ لا تختبر حسابًا حقيقيًا ولا Domain أو خدمة لا تملكها.',
    prerequisites: ['Snapshot', 'Security log متاحة', 'Audit Logon مفعّل للنجاح/الفشل وفق سياسة المختبر'],
    steps: [
      {
        step: 1,
        description: 'تحقق من سياسة التدقيق وأنشئ مجلد القضية ووقت البداية.',
        command: `auditpol /get /subcategory:"Logon"
New-Item -ItemType Directory -Path C:\\SOC-Lab -Force | Out-Null
(Get-Date).ToString('o') | Set-Content C:\\SOC-Lab\\win-lab1-start.txt`,
        expected: 'Failure audit مفعّل وملف البداية موجود.',
        caution: 'إذا كانت السياسة مُدارة مؤسسيًا فلا تغيّرها؛ استخدم VM أو اطلب التفويض.'
      },
      {
        step: 2,
        description: 'من Command Prompt على الـVM شغّل runas خمس مرات، واكتب أي كلمة خاطئة عند الطلب.',
        command: `for /L %i in (1,1,5) do @runas /user:.\\SOC-Lab-Nonexistent cmd.exe`,
        expected: 'خمس رسائل رفض تقريبًا؛ لا shell جديدة.',
        why: 'الاسم غير موجود يمنع تعريض حساب حقيقي للقفل، لكن شكل الحدث قد يختلف حسب إصدار Windows والسياسة.'
      },
      {
        step: 3,
        description: 'استخرج الحقول بأسماء Event XML بدل Properties[n] الهشة.',
        command: `$start = [datetime](Get-Content C:\\SOC-Lab\\win-lab1-start.txt)
$events = Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4625; StartTime=$start} -ErrorAction Stop
$rows = foreach ($event in $events) {
  [xml]$xml = $event.ToXml()
  $data = @{}
  foreach ($item in $xml.Event.EventData.Data) { $data[[string]$item.Name] = [string]$item.'#text' }
  [pscustomobject]@{
    TimeCreated=$event.TimeCreated
    TargetUser=$data.TargetUserName
    SourceIP=$data.IpAddress
    Workstation=$data.WorkstationName
    LogonType=$data.LogonType
    Status=$data.Status
    SubStatus=$data.SubStatus
    Process=$data.ProcessName
    RecordId=$event.RecordId
  }
}
$rows | Where-Object TargetUser -eq 'SOC-Lab-Nonexistent' | Format-Table -Auto`,
        expected: 'صفوف للحساب الوهمي؛ SourceIP قد يكون - في محاولة محلية.',
        why: 'ترتيب Properties قد يختلف بين event versions؛ أسماء XML توضح معنى الحقل.'
      },
      {
        step: 4,
        description: 'احسب النطاق مع الاحتفاظ بالسياق بدل عدّ كل 4625 في الجهاز.',
        command: `$case = $rows | Where-Object TargetUser -eq 'SOC-Lab-Nonexistent'
$case | Group-Object SourceIP,Workstation,LogonType,Status,SubStatus |
  Sort-Object Count -Descending |
  Select-Object Count,Name
"Case events: $($case.Count)"`,
        expected: 'توزيع حسب المصدر وLogonType والرموز؛ قد يختلف العدد عن 5 بسبب طريقة runas أو telemetry.',
        caution: '4625 لا يثبت brute force وحده؛ تحتاج pattern زمنيًا ومصدرًا وهوية ونجاحًا لاحقًا وسياقًا.'
      },
      {
        step: 5,
        description: 'ابحث عن 4624 مرتبط بعد وقت البداية، ثم فسّر الارتباط بحذر.',
        command: `$success = Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4624; StartTime=$start} -ErrorAction Stop
$successRows = foreach ($event in $success) {
  [xml]$xml = $event.ToXml(); $data=@{}
  foreach ($item in $xml.Event.EventData.Data) { $data[[string]$item.Name]=[string]$item.'#text' }
  [pscustomobject]@{Time=$event.TimeCreated; User=$data.TargetUserName; IP=$data.IpAddress; LogonType=$data.LogonType; RecordId=$event.RecordId}
}
$successRows | Where-Object User -eq 'SOC-Lab-Nonexistent'`,
        expected: 'لا نجاح لهذا الاسم غير الموجود.',
        why: 'نجاح قريب زمنيًا لا يرتبط تلقائيًا؛ طابق user/source/logon type والجهاز وLogon ID عند توفره.'
      }
    ],
    filters: ['4625: failed logon', '4624: successful logon', '4771: Kerberos pre-auth failure في Domain context', '4776: NTLM credential validation'],
    evidence: ['وقت البداية', 'Record IDs وحقول XML', 'عدد محاولات الاسم المحدد', 'بحث النجاح المرتبط', 'تفسير Status/SubStatus من مرجع المؤسسة'],
    cleanup: 'احذف C:\\SOC-Lab\\win-lab1-start.txt بعد حفظ التقرير، ثم ارجع إلى Snapshot إن غيّرت audit policy.',
    deliverable: `# Windows Failed Logon Case

## Scope
- Host/user/time window: ___
- Data source and audit status: ___

## Evidence
| Time | Record ID | Target | Source/Workstation | Logon Type | Status/SubStatus |
|---|---:|---|---|---:|---|
| | | | | | |

## Reasoning
- Facts: ___
- Is this password guessing, user error, service misconfiguration, or insufficient evidence? ___
- Related success search and result: ___
- Telemetry gaps: ___

## Decision
- Lab classification: Benign Positive
- Production action would require: ___`
  },
  {
    id: 'windows-lab2',
    title: 'Lab 2: Process Creation وEncodedCommand الحميد',
    objective: 'توليد marker حميد عبر EncodedCommand، استخراج Event 4688 بأسماء XML، وفك payload offline دون تنفيذ مجهول.',
    tools: ['Windows lab VM', 'PowerShell', 'Security Event Log', 'certutil محليًا'],
    estimatedMinutes: 90,
    safety: 'الأوامر محلية ولا تنزّل شيئًا. لا تنفذ encoded command من alert؛ استخرج النص وفكّه كبيانات داخل VM.',
    prerequisites: ['Audit Process Creation مفعّل', 'Include command line in process creation events مفعّل في VM', 'صلاحية قراءة Security log'],
    steps: [
      {
        step: 1,
        description: 'تحقق من telemetry واحفظ بداية القضية.',
        command: `auditpol /get /subcategory:"Process Creation"
reg query "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System\\Audit" /v ProcessCreationIncludeCmdLine_Enabled
New-Item -ItemType Directory C:\\SOC-Lab -Force | Out-Null
(Get-Date).ToString('o') | Set-Content C:\\SOC-Lab\\win-lab2-start.txt`,
        expected: 'Process Creation success audit وregistry value=1؛ وإلا وثق gap ولا تغيّر GPO مُدارة.'
      },
      {
        step: 2,
        description: 'أنشئ وشغّل EncodedCommand معروف المحتوى يحمل marker فقط.',
        command: `$plain = "Write-Output 'SOC_LAB_WIN_PS_001'"
$bytes = [Text.Encoding]::Unicode.GetBytes($plain)
$encoded = [Convert]::ToBase64String($bytes)
$encoded | Set-Content C:\\SOC-Lab\\known-payload.txt
& powershell.exe -NoProfile -EncodedCommand $encoded`,
        expected: 'يطبع SOC_LAB_WIN_PS_001 ولا يغير النظام.',
        why: 'Windows PowerShell -EncodedCommand يتوقع غالبًا UTF-16LE (Encoding.Unicode).'
      },
      {
        step: 3,
        description: 'ولّد استخدام certutil محليًا بلا شبكة لتتعلم أن اسم LOLBin لا يصنع verdict.',
        command: `'SOC_LAB_CERTUTIL_001' | Set-Content C:\\SOC-Lab\\marker.txt
certutil.exe -hashfile C:\\SOC-Lab\\marker.txt SHA256`,
        expected: 'Hash محلي؛ لا download ولا transfer.',
        why: 'certutil أداة شرعية. التقنية تُربط بالسلوك والarguments والسياق لا باسم binary وحده.'
      },
      {
        step: 4,
        description: 'استخرج 4688 بأسماء الحقول وابحث عن markers/arguments.',
        command: `$start=[datetime](Get-Content C:\\SOC-Lab\\win-lab2-start.txt)
$rows = foreach ($event in Get-WinEvent -FilterHashtable @{LogName='Security';Id=4688;StartTime=$start}) {
  [xml]$xml=$event.ToXml(); $data=@{}
  foreach($item in $xml.Event.EventData.Data){$data[[string]$item.Name]=[string]$item.'#text'}
  [pscustomobject]@{
    Time=$event.TimeCreated; RecordId=$event.RecordId
    Image=$data.NewProcessName; CommandLine=$data.CommandLine
    Parent=$data.ParentProcessName; User=$data.SubjectUserName
    NewPID=$data.NewProcessId; ParentPID=$data.ProcessId
  }
}
$case=$rows | Where-Object { $_.CommandLine -match 'EncodedCommand|SOC_LAB|certutil' }
$case | Format-List`,
        expected: 'powershell.exe مع EncodedCommand وcertutil.exe مع -hashfile، إذا command-line auditing يعمل.'
      },
      {
        step: 5,
        description: 'استخرج Base64 من command line وفكه offline كنص ثم قارنه بالنسخة المعروفة.',
        command: `$psRow=$case | Where-Object CommandLine -match '(?i)-EncodedCommand' | Select-Object -First 1
if ($psRow.CommandLine -match '(?i)-EncodedCommand\\s+([A-Za-z0-9+/=]+)') {
  $decoded=[Text.Encoding]::Unicode.GetString([Convert]::FromBase64String($Matches[1]))
  "Decoded: $decoded"
  "Matches known payload: $($Matches[1] -eq (Get-Content C:\\SOC-Lab\\known-payload.txt -Raw).Trim())"
} else { 'Payload not captured: telemetry gap or parsing issue' }`,
        expected: `Decoded: Write-Output 'SOC_LAB_WIN_PS_001' وMatches known payload: True.`,
        caution: 'لا تستخدم Invoke-Expression ولا & على النص المفكوك من حدث حقيقي.'
      }
    ],
    filters: ['4688 + EncodedCommand', '4688 + certutil arguments', 'NewProcessName + ParentProcessName + CommandLine', 'RecordId لتثبيت evidence'],
    evidence: ['Audit settings', '4688 XML fields', 'Base64 الأصلي والمفكوك', 'Hash marker', 'Parent/child وRecord IDs'],
    cleanup: `Remove-Item C:\\SOC-Lab\\win-lab2-start.txt,C:\\SOC-Lab\\known-payload.txt,C:\\SOC-Lab\\marker.txt -Force -ErrorAction SilentlyContinue`,
    deliverable: `# Process Creation Investigation

## Telemetry
- 4688 enabled: ___
- Command line captured: ___
- Gaps: ___

## Process evidence
| Time | Record ID | Parent | Image | Relevant arguments | User |
|---|---:|---|---|---|---|
| | | | | | |

## Decode
- Encoding assumption and evidence: ___
- Decoded text: ___
- Executed during analysis? No

## Behavioral assessment
- PowerShell behavior: ___
- certutil behavior: local hashing, not transfer
- Confidence / alternative explanations: ___`
  },
  {
    id: 'windows-lab3',
    title: 'Lab 3: Sysmon Process Tree بلا شبكة',
    objective: 'التحقق من Sysmon، توليد parent/child حميد، واستخراج Event 1 بأسماء الحقول مع فهم أثر configuration.',
    tools: ['Windows lab VM', 'Sysmon من Microsoft Sysinternals', 'PowerShell', 'Event Viewer'],
    estimatedMinutes: 90,
    safety: 'استخدم نسخة Sysmon الموقعة من Microsoft داخل VM. لا تستبدل configuration مؤسسة ولا تثبّت community config بلا مراجعة.',
    prerequisites: ['Snapshot', 'Sysmon مثبت مسبقًا أو package رسمي متحقق من توقيعه', 'صلاحية Administrator للتثبيت فقط'],
    steps: [
      {
        step: 1,
        description: 'تحقق من الخدمة والتوقيع والإعداد الحالي قبل التعديل.',
        command: `Get-Service Sysmon* -ErrorAction SilentlyContinue
Get-AuthenticodeSignature .\\Sysmon64.exe -ErrorAction SilentlyContinue | Format-List Status,SignerCertificate
.\\Sysmon64.exe -c`,
        expected: 'Service تعمل وbinary موقّع، أو تعرف أن Sysmon غير مثبت.',
        caution: 'إذا لم يكن مثبتًا، حمّل Sysmon من Microsoft Sysinternals فقط. التثبيت الافتراضي: Sysmon64.exe -accepteula -i؛ لا تنفذه على جهاز عمل.'
      },
      {
        step: 2,
        description: 'تحقق أن Event 1 موجود؛ عدم وجوده يعني config/ingestion gap.',
        command: `Get-WinEvent -ListLog 'Microsoft-Windows-Sysmon/Operational'
Get-WinEvent -FilterHashtable @{LogName='Microsoft-Windows-Sysmon/Operational';Id=1} -MaxEvents 3 -ErrorAction SilentlyContinue`,
        expected: 'Channel موجود وEvent 1 مرئي؛ وإلا أصلح المختبر أو وثق gap.'
      },
      {
        step: 3,
        description: 'احفظ البداية وولّد سلسلة PowerShell → cmd → echo حميدة.',
        command: `New-Item -ItemType Directory C:\\SOC-Lab -Force | Out-Null
(Get-Date).ToString('o') | Set-Content C:\\SOC-Lab\\win-lab3-start.txt
& powershell.exe -NoProfile -Command "cmd.exe /c echo SYSMON_LAB_PROCESS_001>C:\\SOC-Lab\\sysmon-marker.txt"
Get-Content C:\\SOC-Lab\\sysmon-marker.txt`,
        expected: 'ملف marker محلي؛ لا network action.'
      },
      {
        step: 4,
        description: 'استخرج Event 1 بأسماء Image/ParentImage/CommandLine/ProcessGuid.',
        command: `$start=[datetime](Get-Content C:\\SOC-Lab\\win-lab3-start.txt)
$rows=foreach($event in Get-WinEvent -FilterHashtable @{LogName='Microsoft-Windows-Sysmon/Operational';Id=1;StartTime=$start}){
  [xml]$xml=$event.ToXml();$data=@{}
  foreach($item in $xml.Event.EventData.Data){$data[[string]$item.Name]=[string]$item.'#text'}
  [pscustomobject]@{Time=$event.TimeCreated;RecordId=$event.RecordId;ProcessGuid=$data.ProcessGuid;PID=$data.ProcessId;Image=$data.Image;CommandLine=$data.CommandLine;ParentGuid=$data.ParentProcessGuid;ParentPID=$data.ParentProcessId;ParentImage=$data.ParentImage;User=$data.User;Hashes=$data.Hashes}
}
$case=$rows | Where-Object CommandLine -match 'SYSMON_LAB_PROCESS_001|sysmon-marker'
$case | Format-List`,
        expected: 'حدث cmd/echo غالبًا ومعه parent PowerShell حسب filtering؛ القيم الفعلية هي الدليل.'
      },
      {
        step: 5,
        description: 'قيّم اكتمال process tree وفسّر الغياب كفجوة لا كبراءة.',
        command: `$case | Select-Object Time,ProcessGuid,Image,ParentGuid,ParentImage,CommandLine | Sort-Object Time | Format-Table -Wrap
"Rows found: $($case.Count)"
.\\Sysmon64.exe -c | Select-String -Pattern 'ProcessCreate|HashAlgorithms'`,
        expected: 'Timeline وGUIDs وربط parent/child أو gap موثق.',
        why: 'ProcessGuid أقوى من PID وحده لأن PID يعاد استخدامه؛ Sysmon output يعتمد على config ونسخته.'
      }
    ],
    filters: ['Sysmon 1: Process Create', 'ProcessGuid ↔ ParentProcessGuid', 'CommandLine marker', 'Sysmon 3/22 لا يظهران إلا إذا سمحت config'],
    evidence: ['Service/config output', 'توقيع binary إن كان محليًا', 'Event 1 Record IDs', 'ProcessGuid tree', 'marker file'],
    cleanup: 'احذف C:\\SOC-Lab\\win-lab3-start.txt وsysmon-marker.txt. لا تزل Sysmon إذا كان جزءًا من baseline؛ ارجع إلى Snapshot إن ثبته لهذا المختبر.',
    deliverable: `# Sysmon Process Tree Case

## Sensor state
- Sysmon version/config observed: ___
- Event 1 coverage: ___
- Hash algorithm/fields available: ___

## Timeline
| Time | Record ID | Process GUID | Image | Parent GUID/Image | Command |
|---|---:|---|---|---|---|
| | | | | | |

## Analysis
- Proven parent/child chain: ___
- Missing events/fields: ___
- Why process name alone is insufficient: ___
- Confidence and falsification test: ___`
  },
  {
    id: 'windows-lab4',
    title: 'Lab 4: Script Block Logging وBase64 كبيانات',
    objective: 'توليد Script Block حميد يستخدم Base64، العثور عليه في 4104، وفصل تسجيل النص عن إثبات نتيجة التنفيذ.',
    tools: ['Windows lab VM', 'PowerShell', 'Microsoft-Windows-PowerShell/Operational'],
    estimatedMinutes: 75,
    safety: 'المحتوى marker محلي فقط. لا تفك ثم تنفذ script مجهول، ولا تغيّر GPO مؤسسية.',
    prerequisites: ['Script Block Logging مفعّل في VM', 'صلاحية قراءة PowerShell Operational log', 'Snapshot'],
    steps: [
      {
        step: 1,
        description: 'تحقق من policy والقناة ثم احفظ وقت البداية.',
        command: `reg query "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\PowerShell\\ScriptBlockLogging"
Get-WinEvent -ListLog 'Microsoft-Windows-PowerShell/Operational'
New-Item -ItemType Directory C:\\SOC-Lab -Force | Out-Null
(Get-Date).ToString('o') | Set-Content C:\\SOC-Lab\\win-lab4-start.txt`,
        expected: 'EnableScriptBlockLogging=1 وقناة enabled؛ وإلا وثق visibility gap.'
      },
      {
        step: 2,
        description: 'نفذ block حميدًا يفك marker UTF-8 ويحفظ النتيجة محليًا.',
        command: `$known='SOC_LAB_SCRIPTBLOCK_001'
$encoded=[Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($known))
$decoded=[Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($encoded))
$decoded | Set-Content C:\\SOC-Lab\\scriptblock-marker.txt
"Encoded=$encoded; Decoded=$decoded"`,
        expected: 'Decoded يساوي SOC_LAB_SCRIPTBLOCK_001.',
        why: 'هذا يولد نص FromBase64String في 4104 دون download أو Invoke-Expression.'
      },
      {
        step: 3,
        description: 'استخرج ScriptBlockText من XML ضمن نافذة القضية.',
        command: `$start=[datetime](Get-Content C:\\SOC-Lab\\win-lab4-start.txt)
$rows=foreach($event in Get-WinEvent -FilterHashtable @{LogName='Microsoft-Windows-PowerShell/Operational';Id=4104;StartTime=$start}){
  [xml]$xml=$event.ToXml();$data=@{}
  foreach($item in $xml.Event.EventData.Data){$data[[string]$item.Name]=[string]$item.'#text'}
  [pscustomobject]@{Time=$event.TimeCreated;RecordId=$event.RecordId;ScriptBlockId=$data.ScriptBlockId;MessageNumber=$data.MessageNumber;MessageTotal=$data.MessageTotal;Path=$data.Path;Text=$data.ScriptBlockText}
}
$case=$rows | Where-Object Text -match 'SOC_LAB_SCRIPTBLOCK_001|FromBase64String|scriptblock-marker'
$case | Format-List`,
        expected: '4104 يحمل النص أو أجزاء منه؛ MessageNumber/Total قد لا تتوفر في كل event version.'
      },
      {
        step: 4,
        description: 'استخرج Base64 من النص وفكه offline فقط إن طابق شكلًا وحجمًا معقولين.',
        command: `$text=($case.Text -join [Environment]::NewLine)
$candidate=[regex]::Match($text,"[A-Za-z0-9+/]{16,}={0,2}").Value
if($candidate.Length -gt 0 -and $candidate.Length -lt 4096){
  try {[Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($candidate))} catch {'Decode failed; preserve original'}
} else {'No bounded candidate found'}`,
        expected: 'قد يظهر marker؛ إذا التقط regex نصًا آخر فوثق false positive وعدّل extraction.',
        caution: 'Base64 ترميز لا تشفير، ووجود FromBase64String لا يثبت maliciousness.'
      },
      {
        step: 5,
        description: 'فرّق بين content telemetry وexecution outcome.',
        command: `Get-Item C:\\SOC-Lab\\scriptblock-marker.txt | Select-Object FullName,Length,CreationTimeUtc,LastWriteTimeUtc
Get-FileHash C:\\SOC-Lab\\scriptblock-marker.txt -Algorithm SHA256`,
        expected: 'الملف/hash دليل outcome في المختبر؛ 4104 وحده يسجل script content ولا يثبت كل نتيجة.'
      }
    ],
    filters: ['4104 + ScriptBlockId', 'FromBase64String behavior', 'MessageNumber/MessageTotal للـmulti-part', '4103 module logging كمصدر إضافي إن كان مفعّلًا'],
    evidence: ['Policy/channel status', '4104 Record ID وScriptBlockId', 'النص الأصلي وdecoded output', 'marker hash', 'telemetry gaps'],
    cleanup: `Remove-Item C:\\SOC-Lab\\win-lab4-start.txt,C:\\SOC-Lab\\scriptblock-marker.txt -Force -ErrorAction SilentlyContinue`,
    deliverable: `# PowerShell Script Block Case

## Telemetry state
- 4104 enabled and present: ___
- Multi-part handling: ___

## Evidence
- Record ID / ScriptBlock ID: ___
- Relevant text: ___
- Candidate encoding and decoded value: ___
- Was decoded content executed by analyst? No
- Outcome evidence: ___

## Assessment
- Behavior observed: ___
- Benign/malicious/insufficient and why: ___
- Alternative explanation: ___
- Visibility gaps: ___`
  },
  {
    id: 'windows-lab5',
    title: 'Lab 5: Scheduled Task حميدة قابلة للاستعادة',
    objective: 'إنشاء task واضحة الاسم بموعد 2099، تحليل Task Scheduler و4698 إن توفر، ثم حذف العنصر المحدد والتحقق.',
    tools: ['Windows lab VM', 'PowerShell ScheduledTasks', 'Task Scheduler Operational log', 'Security log'],
    estimatedMinutes: 90,
    safety: 'VM فقط وبعد Snapshot. المهمة لا تعمل أثناء المختبر لأن trigger في 2099 واسمها SOC-LAB واضح؛ لا تستخدم اسم WindowsUpdate أو hidden window لتقليد مكون نظام.',
    prerequisites: ['صلاحية إنشاء task على VM', 'Task Scheduler Operational channel', 'Audit Other Object Access Events اختياري لـ4698'],
    steps: [
      {
        step: 1,
        description: 'احفظ البداية وتأكد أن اسم المختبر غير موجود.',
        command: `New-Item -ItemType Directory C:\\SOC-Lab -Force | Out-Null
(Get-Date).ToString('o') | Set-Content C:\\SOC-Lab\\win-lab5-start.txt
Get-ScheduledTask -TaskName 'SOC-LAB-PERSISTENCE-001' -ErrorAction SilentlyContinue`,
        expected: 'لا task بهذا الاسم؛ إذا وجدت فتوقف وحدد مالكها قبل التعديل.'
      },
      {
        step: 2,
        description: 'أنشئ task حميدة لا تعمل قبل 2099 وتكتب marker محليًا فقط.',
        command: `$action=New-ScheduledTaskAction -Execute 'cmd.exe' -Argument '/c echo SOC_LAB_TASK_001>C:\\SOC-Lab\\scheduled-task-marker.txt'
$trigger=New-ScheduledTaskTrigger -Once -At ([datetime]'2099-01-01T00:00:00')
Register-ScheduledTask -TaskName 'SOC-LAB-PERSISTENCE-001' -Action $action -Trigger $trigger -Description 'Benign SOC course lab; delete after evidence capture' | Out-Null
Get-ScheduledTask -TaskName 'SOC-LAB-PERSISTENCE-001' | Format-List TaskName,TaskPath,State,Author,Description`,
        expected: 'Task Ready ووصفها واضح، ولا marker file لأنها لم تعمل.',
        caution: 'لا تشغّل المهمة؛ الهدف تحليل registration telemetry لا التنفيذ.'
      },
      {
        step: 3,
        description: 'صدّر XML وحلل action/trigger/principal كبيانات.',
        command: `Export-ScheduledTask -TaskName 'SOC-LAB-PERSISTENCE-001' | Set-Content C:\\SOC-Lab\\task.xml
[xml]$task=Get-Content C:\\SOC-Lab\\task.xml
[pscustomobject]@{
  Command=$task.Task.Actions.Exec.Command
  Arguments=$task.Task.Actions.Exec.Arguments
  StartBoundary=$task.Task.Triggers.TimeTrigger.StartBoundary
  UserId=$task.Task.Principals.Principal.UserId
  RunLevel=$task.Task.Principals.Principal.RunLevel
} | Format-List`,
        expected: 'cmd.exe وmarker path و2099 وprincipal/run level.'
      },
      {
        step: 4,
        description: 'ابحث في TaskScheduler 106 وSecurity 4698، وتعامل مع غياب الثاني كفجوة إعداد.',
        command: `$start=[datetime](Get-Content C:\\SOC-Lab\\win-lab5-start.txt)
Get-WinEvent -FilterHashtable @{LogName='Microsoft-Windows-TaskScheduler/Operational';Id=106;StartTime=$start} -ErrorAction SilentlyContinue |
  Where-Object Message -match 'SOC-LAB-PERSISTENCE-001' | Select-Object TimeCreated,RecordId,Message

$security=Get-WinEvent -FilterHashtable @{LogName='Security';Id=4698;StartTime=$start} -ErrorAction SilentlyContinue
$securityRows=foreach($event in $security){
  [xml]$xml=$event.ToXml();$data=@{}
  foreach($item in $xml.Event.EventData.Data){$data[[string]$item.Name]=[string]$item.'#text'}
  if($data.TaskName -match 'SOC-LAB-PERSISTENCE-001'){
    [pscustomobject]@{Time=$event.TimeCreated;RecordId=$event.RecordId;TaskName=$data.TaskName;SubjectUser=$data.SubjectUserName;TaskContent=$data.TaskContent}
  }
}
$securityRows | Format-List`,
        expected: '106 غالبًا؛ 4698 فقط إذا audit policy التقطته.',
        why: 'الـtask ليست suspicious بسبب وجودها فقط؛ قيّم الاسم والمالك والaction والtrigger والتوقيع/المسار والتغيير المعتمد.'
      },
      {
        step: 5,
        description: 'احذف task المحددة فقط والملفات، ثم تحقق من غيابها.',
        command: `Unregister-ScheduledTask -TaskName 'SOC-LAB-PERSISTENCE-001' -Confirm:$false
Remove-Item C:\\SOC-Lab\\task.xml,C:\\SOC-Lab\\win-lab5-start.txt,C:\\SOC-Lab\\scheduled-task-marker.txt -Force -ErrorAction SilentlyContinue
if(Get-ScheduledTask -TaskName 'SOC-LAB-PERSISTENCE-001' -ErrorAction SilentlyContinue){throw 'Cleanup failed'}else{'Cleanup verified'}`,
        expected: 'Cleanup verified ولا marker file.',
        caution: 'لا تحذف task بالاسم التقريبي أو wildcard.'
      }
    ],
    filters: ['TaskScheduler 106: registration', 'Security 4698: task created إذا audit مفعّل', '4699: task deleted', 'XML action/trigger/principal'],
    evidence: ['Baseline absence', 'Exported task XML/hash قبل الحذف', '106/4698 Record IDs أو gap', 'Action/trigger/principal assessment', 'cleanup verification'],
    cleanup: `Unregister-ScheduledTask -TaskName 'SOC-LAB-PERSISTENCE-001' -Confirm:$false -ErrorAction SilentlyContinue; Remove-Item C:\\SOC-Lab\\task.xml,C:\\SOC-Lab\\win-lab5-start.txt,C:\\SOC-Lab\\scheduled-task-marker.txt -Force -ErrorAction SilentlyContinue`,
    deliverable: `# Scheduled Task Persistence Case

## Baseline and change
- Snapshot/time: ___
- Task absent before creation: ___
- Expected lab change: ___

## Evidence
| Source | Event/Record ID | Task | Principal | Action | Trigger |
|---|---|---|---|---|---|
| | | | | | |

## Assessment
- Why this is a Benign Positive: ___
- What would raise concern in production: ___
- Missing telemetry: ___
- ATT&CK mapping: T1053.005 only because scheduled-task behavior exists; not proof of an attack

## Cleanup
- Task absent: ___
- Exact files removed: ___
- Snapshot restored if needed: ___`
  }
];
