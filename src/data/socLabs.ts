import { Lab } from '../types';

export const socLabs: Lab[] = [
  {
    id: 'soc-lab1',
    title: 'Lab 1: Triage بالقرائن لا بالانطباع',
    objective: 'ترتيب خمسة تنبيهات مع التصريح بالافتراضات والبيانات الناقصة، بدل حفظ ترتيب ثابت.',
    tools: ['Case worksheet', 'Asset inventory مصغر', 'Critical thinking'],
    estimatedMinutes: 75,
    safety: 'تمرين ورقي/نصي. لا تنفذ حظرًا أو عزلًا؛ اكتب الإجراء المقترح وصاحب الصلاحية فقط.',
    prerequisites: ['فهم alert ≠ incident', 'التمييز بين severity وpriority', 'قراءة قسم Case Management'],
    steps: [
      {
        step: 1,
        description: 'أنشئ بطاقة لكل تنبيه: 50 فشل دخول لحساب واحد؛ Event 1102 على DC؛ EncodedCommand على workstation؛ دخول 03:00؛ و200 NXDOMAIN خلال 5 دقائق.',
        expected: 'خمس بطاقات بلا تصنيف مسبق.',
        why: 'وصف alert نقطة بداية، وليس قصة حادث مكتملة.'
      },
      {
        step: 2,
        description: 'لكل بطاقة اكتب خمسة أسئلة حاسمة على الأقل: asset criticality، user، source، baseline/change، نجاح لاحق، process، data quality، والنطاق.',
        expected: '25 سؤالًا أو أكثر، وكل سؤال مرتبط بقرار سيتغير عند الإجابة عنه.'
      },
      {
        step: 3,
        description: 'اكتب افتراضين متعاكسين لكل alert: تفسير benign محتمل وتفسير malicious محتمل، ثم الدليل الذي يفرّق بينهما.',
        expected: '10 فرضيات قابلة للاختبار؛ لا تستخدم «أكيد» بلا دليل.'
      },
      {
        step: 4,
        description: 'اختر افتراضات تشغيلية معلنة لبناء ترتيب أول: مثال «DC أصل حرج، لا نافذة صيانة، والوقت UTC».',
        expected: 'قائمة assumptions يمكن للمراجع تغييرها.'
      },
      {
        step: 5,
        description: 'رتب العمل حسب impact × likelihood × time sensitivity مع مراعاة ثقة البيانات ووقت الـSLA. اشرح لماذا تؤجل عنصرًا، لا لماذا ترفع الأول فقط.',
        expected: 'ترتيب 1–5 مع سبب، أول query لكل alert، وشرط escalation.'
      },
      {
        step: 6,
        description: 'غيّر معلومتين: اجعل Event 1102 ضمن change معتمد، واجعل دخول 03:00 يتبعه OAuth consent غير معتاد. أعد الترتيب.',
        expected: 'يتغير الترتيب والمنطق؛ إثبات أنك لا تحفظ قائمة جامدة.'
      },
    ],
    evidence: ['نسختا الترتيب قبل/بعد تغيير السياق', 'جدول missing data', 'أول query أو data source مطلوب لكل alert', 'تعليل escalation في 3 أسطر لكل حالة'],
    cleanup: 'لا توجد تغييرات نظام. احتفظ بالworksheet المنقحة كدليل تعلم، واحذف أي أسماء أو سياق حقيقي أدخلته بالخطأ.',
    filters: [],
    deliverable: `# Context-Aware Triage — [date]

## Assumptions
- Time zone: ___
- Critical assets: ___
- Approved changes known: ___
- Telemetry gaps: ___

| Priority | Alert | Known facts | Missing facts | Benign hypothesis | Malicious hypothesis | First query | SLA/owner |
|---|---|---|---|---|---|---|---|
| 1 | | | | | | | |

## Re-ranking test
Changed context:
1. ___
2. ___

Old order: ___
New order: ___
Why it changed: ___

## Escalation note for top alert
Facts: ___
Assessment + confidence: ___
Unknowns: ___
Requested/authorized next action: ___`,
  },
  {
    id: 'soc-lab2',
    title: 'Lab 2: تحقيق PowerShell حميد end-to-end',
    objective: 'توليد EncodedCommand آمن، جمع 4104/4688 إن توفرا، فك النص دون تنفيذه، وبناء timeline موثق.',
    tools: ['Windows lab VM', 'PowerShell', 'Event Viewer', 'Sysmon اختياري'],
    estimatedMinutes: 120,
    safety: 'نفّذ على Windows VM مملوكة لك بعد Snapshot. النص يطبع marker فقط ولا يتصل بالشبكة. لا تستبدله بكود تنزيل أو عينة مجهولة.',
    prerequisites: ['Windows VM مع حساب Administrator للمختبر', 'Snapshot نظيف', 'معرفة أن 4104 و4688 يحتاجان logging/auditing مفعّلًا'],
    steps: [
      {
        step: 1,
        description: 'أنشئ مجلد القضية وسجّل الساعة وحالة القنوات قبل التغيير.',
        command: `$Case = 'C:\\SOC-Lab\\PS-CASE-001'
New-Item -ItemType Directory -Path $Case -Force | Out-Null
Get-Date -Format o | Set-Content "$Case\\start-time.txt"
Get-WinEvent -ListLog 'Microsoft-Windows-PowerShell/Operational' |
  Select-Object LogName, IsEnabled, RecordCount | Format-List`,
        expected: 'مجلد قضية ووقت ISO 8601 وحالة PowerShell Operational.',
        why: 'إذا لم تكن القناة مفعلة فلا تفسر غياب 4104 على أنه نشاط لم يحدث.'
      },
      {
        step: 2,
        description: 'على VM المختبر فقط، فعّل Script Block Logging وProcess Creation auditing ثم أعد فتح PowerShell كمسؤول. ارجع للSnapshot بعد المختبر.',
        command: `New-Item 'HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\PowerShell\\ScriptBlockLogging' -Force | Out-Null
New-ItemProperty 'HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\PowerShell\\ScriptBlockLogging' \\
  -Name EnableScriptBlockLogging -PropertyType DWord -Value 1 -Force | Out-Null

auditpol /set /subcategory:"{0CCE922B-69AE-11D9-BED3-505054503030}" /success:enable`,
        expected: 'الأمر ينهي بلا خطأ؛ هذا تغيير إعداد موثق لا دليل حدث.',
        caution: 'لا تغيّر Group Policy على جهاز عمل. استخدم Snapshot لأن الإعداد السابق قد يختلف.'
      },
      {
        step: 3,
        description: 'ولّد حدثًا حميدًا واحفظ Base64 كي تستطيع إعادة التحليل دون الذاكرة الحالية.',
        command: `$Case = 'C:\\SOC-Lab\\PS-CASE-001'
$Plain = "Write-Output 'SOC_LAB_PS_CASE_001'"
$Encoded = [Convert]::ToBase64String([Text.Encoding]::Unicode.GetBytes($Plain))
$Encoded | Set-Content "$Case\\encoded.txt"
& powershell.exe -NoLogo -NoProfile -EncodedCommand $Encoded`,
        expected: 'تظهر SOC_LAB_PS_CASE_001 فقط؛ لا ملف أو اتصال شبكة.',
        why: 'PowerShell -EncodedCommand يتوقع عادة نص UTF-16LE ثم Base64؛ encoding إخفاء لا تشفير.'
      },
      {
        step: 4,
        description: 'اجمع Script Block events التي تحمل marker وصدّر النص والـXML.',
        command: `$Case = 'C:\\SOC-Lab\\PS-CASE-001'
$Start = [datetime](Get-Content "$Case\\start-time.txt")
$PS = Get-WinEvent -FilterHashtable @{
  LogName='Microsoft-Windows-PowerShell/Operational'; Id=4104; StartTime=$Start
} -ErrorAction SilentlyContinue | Where-Object Message -Like '*SOC_LAB_PS_CASE_001*'
$PS | Select-Object TimeCreated, Id, RecordId, Message | Format-List
$PS | Export-Clixml "$Case\\4104-events.xml"`,
        expected: '4104 يحمل marker إذا اكتمل تفعيل logging؛ وإلا وثّق الفجوة بدل اختلاق نتيجة.'
      },
      {
        step: 5,
        description: 'اجمع 4688 بطريقة لا تعتمد على رقم Properties ثابت، واستخرج EventData بالأسماء.',
        command: `$Case = 'C:\\SOC-Lab\\PS-CASE-001'
$Start = [datetime](Get-Content "$Case\\start-time.txt")
Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4688; StartTime=$Start} -ErrorAction SilentlyContinue |
  ForEach-Object {
    $Event = $_; [xml]$Xml = $Event.ToXml(); $Fields = @{}
    foreach ($Node in $Xml.Event.EventData.Data) { $Fields[[string]$Node.Name] = [string]$Node.'#text' }
    [pscustomobject]@{ Time=$Event.TimeCreated; RecordId=$Event.RecordId;
      NewProcess=$Fields.NewProcessName; Parent=$Fields.ParentProcessName; CommandLine=$Fields.CommandLine }
  } | Where-Object { $_.CommandLine -like '*EncodedCommand*' } |
  Tee-Object -FilePath "$Case\\4688-summary.txt" | Format-List`,
        expected: 'process path وparent وcommand line إن كان تضمين command line مفعّلًا؛ الحقل الفارغ فجوة إعداد.',
        why: 'ترتيب Properties يختلف حسب event/schema؛ أسماء EventData أوثق.'
      },
      {
        step: 6,
        description: 'فك Base64 offline كبيانات وقارن الناتج بما تعرف أنك ولّدته. لا تنفذ الناتج.',
        command: `$Encoded = Get-Content 'C:\\SOC-Lab\\PS-CASE-001\\encoded.txt' -Raw
$Decoded = [Text.Encoding]::Unicode.GetString([Convert]::FromBase64String($Encoded.Trim()))
$Decoded
$Decoded | Set-Content 'C:\\SOC-Lab\\PS-CASE-001\\decoded.txt'`,
        expected: `Write-Output 'SOC_LAB_PS_CASE_001'`,
        caution: 'التحليل ينتهي بعرض النص؛ لا تستخدم Invoke-Expression ولا تلصقه في shell.'
      },
      {
        step: 7,
        description: 'ابن timeline من start time و4104 و4688، وافصل fact عن assessment. اذكر لماذا الوقت/encoding وحدهما لا يثبتان الضرر.',
        expected: 'Timeline بمراجع RecordId وقسم telemetry gaps وقرار Benign Test Activity.'
      },
    ],
    evidence: ['start-time.txt', '4104 RecordId أو gap موثقة', '4688 summary أو gap موثقة', 'encoded.txt وdecoded.txt', 'Timeline وقرار مع confidence'],
    cleanup: 'صدّر التقرير المنزوع الحساسية، ثم ارجع إلى Snapshot السابق لإعادة إعدادات audit/policy يقينًا. إن لم تستخدم Snapshot، لا تحذف logs؛ احذف C:\\SOC-Lab فقط بعد حفظ الأدلة واستعد الإعدادات من القيم التي وثقتها قبل المختبر.',
    filters: ['Event ID 4104 + marker', 'Event ID 4688 + EncodedCommand', 'Sysmon Event 1 + marker إن كان Sysmon مثبتًا'],
    deliverable: `# PS-CASE-001 Investigation

## Facts
- Host/time zone: ___
- Alert/source RecordId: ___
- Process/parent: ___
- Decoded text: ___

## Timeline
| UTC | Local | Source + RecordId | Fact |
|---|---|---|---|

## Telemetry gaps
- 4104 available? ___
- 4688 command line available? ___
- Sysmon installed/configured? ___

## Assessment
Classification: Benign Positive — controlled lab marker
Confidence: ___ because ___
Why encoding was not a verdict: ___

## If this were unknown production activity
First scope query: ___
Escalation trigger: ___
Authorized containment owner: ___`,
  },
  {
    id: 'soc-lab3',
    title: 'Lab 3: MITRE ATT&CK Mapping قائم على السلوك',
    objective: 'ربط سلوك موصوف بتقنية ATT&CK مع citation ودرجة ثقة، وعدم مساواة اسم أداة بتقنية واحدة.',
    tools: ['MITRE ATT&CK Enterprise website', 'Mapping worksheet'],
    estimatedMinutes: 90,
    safety: 'تحليل مكتبي فقط. لا تشغل Mimikatz أو PsExec أو reverse shell؛ الأسماء جزء من سيناريو نصي.',
    prerequisites: ['فهم tactic مقابل technique مقابل sub-technique', 'القدرة على فصل observed behavior عن analyst inference'],
    steps: [
      { step: 1, description: 'سيناريو: process قرأ ذاكرة LSASS لاستخراج credentials. حدّد السلوك والدليل ثم المرشح T1003.001؛ لا تعتمد على اسم Mimikatz فقط.', expected: 'T1003.001 مع evidence requirement وconfidence.' },
      { step: 2, description: 'سيناريو: PowerShell نفذ أمرًا ثم نزّل ملفًا من خادم خارجي. افصل التنفيذ عن نقل الأداة.', expected: 'T1059.001 للتنفيذ، وT1105 لنقل ملف/أداة عند ثبوت النقل.' },
      { step: 3, description: 'سيناريو: PsExec استخدم SMB ثم أنشأ خدمة على جهاز بعيد. مثّل كل سلوك مثبت.', expected: 'T1021.002 للـSMB/Admin Shares وT1569.002 للتنفيذ عبر Service عند ثبوته.' },
      { step: 4, description: 'سيناريو: Scheduled Task يشغّل أمرًا كل خمس دقائق. حدّد لماذا الغرض (persistence/execution) يعتمد على القصة.', expected: 'T1053.005، مع tactic أو أكثر مدعوم بسياق الاستخدام.' },
      { step: 5, description: 'سيناريو: Windows Security log مُسح. اربط الفعل لا نية غير مثبتة.', expected: 'T1070.001؛ Event 1102 دليل مسح ويحتاج سياقًا لإثبات malicious intent.' },
      { step: 6, description: 'لكل mapping افتح صفحة التقنية، سجل ATT&CK version/date وData Sources أو Detection Strategy المناسبة، ثم اكتب ما قد يفنّد mapping.', expected: 'خمسة mappings لها source/date وalternative explanation.' },
    ],
    evidence: ['جدول behavior→evidence→technique', 'رابط صفحة ATT&CK وتاريخ الوصول', 'confidence وalternative لكل صف', 'تصحيح mapping متعدد السلوك للسيناريوهين 2 و3'],
    cleanup: 'لا توجد تغييرات نظام أو أدوات هجومية. احتفظ بالجدول مع تاريخ ونسخة ATT&CK، وحدّث الروابط والمصطلحات عند المراجعة اللاحقة.',
    filters: [],
    deliverable: `# ATT&CK Evidence Mapping

ATT&CK version/date observed: ___

| Scenario | Observed behavior only | Evidence/source | Technique candidate | Tactic in this context | Confidence | What would falsify it? |
|---|---|---|---|---|---|---|
| LSASS access | | | T1003.001 | | | |
| PowerShell + transfer | | | T1059.001 + T1105? | | | |
| Remote service | | | T1021.002 + T1569.002? | | | |
| Scheduled task | | | T1053.005 | | | |
| Log clear | | | T1070.001 | | | |

Rule: a product/tool name or Event ID alone is not sufficient mapping evidence.`,
  },
  {
    id: 'soc-lab4',
    title: 'Lab 4: تحليل بريد تصيد synthetic بلا تعريض البيانات',
    objective: 'تحليل رسالة .eml نصية آمنة، فهم headers وdefanged indicators، وكتابة قرار مع حدود واضحة.',
    tools: ['Text editor', 'sha256sum أو Get-FileHash', 'Python email parser اختياري'],
    estimatedMinutes: 90,
    safety: 'كل العناوين تستخدم .invalid و192.0.2.0/24 المحجوزين للتوثيق. لا تستبدلها برابط حي، ولا ترفع الرسالة إلى VirusTotal/URLscan/sandbox عامة.',
    prerequisites: ['فهم SMTP headers الأساسي', 'معرفة SPF/DKIM/DMARC alignment نظريًا', 'مجلد مختبر منفصل'],
    steps: [
      {
        step: 1,
        description: 'أنشئ عينة نصية آمنة كما هي؛ لا تضع بيانات شخص حقيقي.',
        command: `mkdir -p soc-phish-case && cd soc-phish-case
cat > synthetic-phish.eml <<'MAIL'
From: "Payroll Team" <payroll@payr0ll-example.invalid>
Reply-To: collect@forms-example.invalid
Return-Path: <bounce@mailer-example.invalid>
To: analyst@example.invalid
Date: Tue, 12 Aug 2025 09:15:00 +0300
Message-ID: <CASE-EMAIL-001@payr0ll-example.invalid>
Subject: Urgent: verify payroll account
Authentication-Results: mx.example.invalid; spf=fail smtp.mailfrom=mailer-example.invalid; dkim=none; dmarc=fail header.from=payr0ll-example.invalid
Received: from unknown (unknown [192.0.2.44]) by mx.example.invalid with ESMTP id CASE001; Tue, 12 Aug 2025 09:15:10 +0300
MIME-Version: 1.0
Content-Type: text/plain; charset=UTF-8

Your payroll access will be closed today. Verify at:
hxxps://payr0ll-example[.]invalid/login
MAIL
sha256sum synthetic-phish.eml | tee evidence-hash.txt`,
        expected: 'ملف .eml وSHA-256. لا يوجد رابط قابل للزيارة.',
        why: '.invalid لا يُفترض أن يُحل في DNS، و192.0.2.0/24 مخصص للتوثيق.'
      },
      {
        step: 2,
        description: 'افصل displayed From وReply-To وReturn-Path وMessage-ID وReceived وAuthentication-Results، واكتب وظيفة كل حقل.',
        expected: 'جدول headers؛ لا تقل إن اختلاف From/Reply-To خبيث دائمًا.'
      },
      {
        step: 3,
        description: 'فسّر SPF وDKIM وDMARC في العينة. لاحظ أن النص synthetic: أنت تحلل نتيجة header المعلنة ولا تستطيع التحقق cryptographically دون DNS والرسالة الموقعة.',
        expected: 'DMARC fail يدعم الشك هنا، مع قيد واضح حول synthetic evidence.'
      },
      {
        step: 4,
        description: 'استخرج المؤشرات defanged وصنفها: domain وURL وIP وMessage-ID. لا تفك defang ولا تزُر القيمة.',
        expected: 'قائمة مؤشرات مع source field وfirst seen.'
      },
      {
        step: 5,
        description: 'حلل الطلب: credential capture محتمل، urgency، وانتحال payroll. اذكر benign alternative وما الذي تحتاجه من mail gateway وidentity logs لحسم impact.',
        expected: 'الفرق واضح بين «الرسالة suspicious» و«الحساب compromised».'
      },
      {
        step: 6,
        description: 'اكتب scope queries وصفية بـMessage-ID/domain/URL ثم response مقترحة ومخوّلة: search/purge، block بعد impact check، ومراجعة sign-ins لمن تفاعل.',
        expected: 'تقرير لا يدعي clicks أو compromise غير موجودين في البيانات.'
      },
    ],
    evidence: ['SHA-256 للعينة', 'Header table', 'Defanged IOC list', 'Facts vs hypotheses', 'Scope plan and authorized response'],
    cleanup: 'احتفظ بالعينة synthetic مع التقرير لأنها غير حية. لا تضف أي بريد حقيقي للمستودع. احذف أي export عرضي يحتوي PII وفق سياسة المؤسسة.',
    filters: ['Message-ID = CASE-EMAIL-001', 'sender/reply-to domains', 'defanged URL'],
    deliverable: `# Synthetic Phishing Case — CASE-EMAIL-001

## Integrity
- File SHA-256: ___
- Analysis copy: ___

## Header evidence
| Field | Value | Meaning | Assessment |
|---|---|---|---|

## Authentication
SPF: ___
DKIM: ___
DMARC/alignment: ___
Limitation of synthetic header: ___

## Defanged indicators
| Type | Defanged value | Source field | Confidence |
|---|---|---|---|

## Decision
Facts: ___
Hypothesis: credential phishing
Classification/confidence: ___
Evidence still needed for impact: ___

## Scope and response
Queries: ___
Actions requiring authorization: ___`,
  },
  {
    id: 'soc-lab5',
    title: 'Lab 5: IOC Hunt بقائمة موسومة ونتائج قابلة للقياس',
    objective: 'تطبيع IOCs وربطها ببيانات lab وقياس matches، مع إثبات أن التطابق لا يساوي incident.',
    tools: ['Python 3', 'CSV/JSONL', 'SIEM اختياري'],
    estimatedMinutes: 105,
    safety: 'المؤشرات محجوزة للتوثيق أو synthetic. لا تضفها إلى firewall/blocklist؛ الهدف join وتحليل السياق فقط.',
    prerequisites: ['Python basics', 'فهم exact match والتطبيع', 'قراءة درس IOC ≠ verdict'],
    steps: [
      {
        step: 1,
        description: 'أنشئ feed مصغرًا له source/confidence/valid_until بدل قائمة قيم عمياء.',
        command: `mkdir -p ioc-hunt && cd ioc-hunt
cat > iocs.csv <<'CSV'
type,value,source,confidence,valid_until,tlp
ip,192.0.2.66,LAB-FEED,high,2099-12-31,TLP:CLEAR
domain,update-check.invalid,LAB-FEED,medium,2099-12-31,TLP:CLEAR
sha256,aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa,LAB-FEED,low,2020-01-01,TLP:CLEAR
CSV`,
        expected: '3 مؤشرات: اثنان صالحان وواحد stale عمدًا.'
      },
      {
        step: 2,
        description: 'أنشئ telemetry فيها matchان وسياق benign صريح.',
        command: `cat > events.jsonl <<'JSONL'
{"time":"2025-08-12T10:00:00Z","host":"LAB-PC01","type":"dns","domain":"UPDATE-CHECK.INVALID.","process":"lab-updater","case":"IOC-LAB-001"}
{"time":"2025-08-12T10:01:00Z","host":"LAB-PC01","type":"network","destination_ip":"192.0.2.66","process":"lab-updater","case":"IOC-LAB-001"}
{"time":"2025-08-12T10:02:00Z","host":"LAB-PC02","type":"dns","domain":"benign.example.invalid","process":"browser","case":"IOC-LAB-001"}
JSONL`,
        expected: '3 أحداث JSON صالحة؛ domain يحتاج lowercase وإزالة النقطة النهائية.'
      },
      {
        step: 3,
        description: 'نفّذ join بسيطًا مع normalization واضح، واحتفظ بالـcontext بدل إخراج القيمة فقط.',
        command: `cat > hunt.py <<'PY'
import csv, json
from datetime import date

def norm(kind, value):
    value = value.strip().lower()
    return value.rstrip('.') if kind == 'domain' else value

with open('iocs.csv', newline='') as f:
    rows = list(csv.DictReader(f))
active = {(r['type'], norm(r['type'], r['value'])): r for r in rows
          if date.fromisoformat(r['valid_until']) >= date.today()}

matches = []
with open('events.jsonl') as f:
    for line in f:
        event = json.loads(line)
        candidates = []
        if 'domain' in event: candidates.append(('domain', norm('domain', event['domain'])))
        if 'destination_ip' in event: candidates.append(('ip', norm('ip', event['destination_ip'])))
        if 'sha256' in event: candidates.append(('sha256', norm('sha256', event['sha256'])))
        for key in candidates:
            if key in active:
                matches.append({'indicator': key[1], 'ioc': active[key], 'event': event})

print(json.dumps(matches, indent=2, ensure_ascii=False))
print(f'active_iocs={len(active)} events=3 matches={len(matches)}')
PY
python3 hunt.py | tee hunt-results.json`,
        expected: 'active_iocs=2 وmatches=2؛ الـhash منتهي الصلاحية مستبعد.',
        why: 'التطبيع والـTTL وprovenance أجزاء من التحليل، لا تحسينات اختيارية.'
      },
      {
        step: 4,
        description: 'لكل match اكتب: asset/process/time/prevalence، ولماذا LAB-FEED + reserved address لا يثبت تهديدًا. صنفهما Benign Test Match.',
        expected: 'قراران موثقان بلا block.'
      },
      {
        step: 5,
        description: 'انقل منطق المطابقة إلى SIEM كتابةً: query exact match، time range، fields، ثم summarize by host/process. لا تحتاج أداة محددة لإنجاز المنطق.',
        expected: 'KQL/SPL/OpenSearch pseudocode أو query صحيحة لأداتك.'
      },
      {
        step: 6,
        description: 'اختبر حالات الفشل: احذف normalization لترى فقد domain match، ثم أعده. أضف IOC غير موجود وأثبت أن zero results لا تعني أن البيئة سليمة.',
        expected: 'توثيق false negative بسبب normalization وحدود exact IOC hunt.'
      },
    ],
    evidence: ['iocs.csv مع metadata', 'events.jsonl', 'hunt.py', 'نتيجة 2 matches', 'تجربة normalization', 'قرار لكل match'],
    cleanup: 'القيم synthetic ويمكن الاحتفاظ بها. لا تنقل block actions أو feeds مجهولة إلى بيئة حقيقية.',
    filters: ['exact normalized domain', 'destination_ip match', 'group by host/process'],
    deliverable: `# IOC-LAB-001 Hunt Report

## Feed contract
Required fields: type, value, source, confidence, valid_until, TLP
Normalization: ___

## Measurement
- Total IOCs: 3
- Active IOCs: ___
- Events searched: 3
- Matches: ___
- Stale indicators excluded: ___

| Indicator | Event time | Host/process | Context | Decision | Confidence |
|---|---|---|---|---|---|

## Failure test
Without domain normalization: ___
Why zero matches is not proof of safety: ___

## Production guardrails
Authorization before block: ___
Shared infrastructure/false-positive check: ___
Retention and TLP handling: ___`,
  },
  {
    id: 'soc-lab6',
    title: 'Lab 6: Wazuh 4.14 — ingestion وقاعدة JSON حميدة',
    objective: 'نشر manager وagent، اختبار logtest، وإثبات event→agent→manager→rule→index→search ثلاث مرات.',
    tools: ['Ubuntu Wazuh VM', 'Linux endpoint VM', 'Wazuh 4.14'],
    estimatedMinutes: 180,
    safety: 'استخدم Host-only مع NAT مؤقت للتنزيل فقط. احفظ credentials خارج Git. الحدث synthetic ولا يحتاج محاولات دخول أو هجوم.',
    prerequisites: ['مختبر معزول وSnapshot', 'نحو 4 vCPU و8 GB RAM لعقدة all-in-one', 'IP وزمن متزامنان', 'قراءة قسم إعداد المختبر'],
    steps: [
      {
        step: 1,
        description: 'ثبّت Wazuh all-in-one من المسار الرسمي للإصدار الموثق في هذا المنهج، واحفظ الإصدار الفعلي.',
        command: `curl -sO https://packages.wazuh.com/4.14/wazuh-install.sh
sudo bash ./wazuh-install.sh -a
sudo /var/ossec/bin/wazuh-control info
sudo /var/ossec/bin/wazuh-control status`,
        expected: 'Manager/indexer/dashboard تعمل؛ سجل version/build الفعلي واحتفظ بكلمة admin سرًا.',
        caution: 'إذا تغير الإصدار الحالي في الدليل الرسمي، لا تعدّل رقم URL بالتخمين؛ حدّث أوامر المختبر وسجل ما استخدمت.'
      },
      {
        step: 2,
        description: 'من Dashboard استخدم Deploy new agent واختر Linux/architecture وعنوان manager في Host-only؛ نفّذ الأمر الذي يولده نفس الإصدار على endpoint.',
        command: `# على manager بعد تثبيت agent وتشغيله:
sudo /var/ossec/bin/agent_control -lc`,
        expected: 'Agent = Active وLast keep alive حديث؛ نجاح package install وحده غير كافٍ.'
      },
      {
        step: 3,
        description: 'على Linux agent أنشئ ملف JSON وأضف localfile داخل ossec_config ثم أعد تشغيل agent.',
        command: `# أضف إلى /var/ossec/etc/ossec.conf قبل </ossec_config>:
<localfile>
  <location>/var/log/soc-lab.json</location>
  <log_format>json</log_format>
</localfile>

sudo install -m 640 /dev/null /var/log/soc-lab.json
sudo systemctl restart wazuh-agent
sudo systemctl status wazuh-agent --no-pager`,
        expected: 'Agent active والملف موجود. احتفظ بنسخة config قبل التعديل.'
      },
      {
        step: 4,
        description: 'على manager أضف قاعدة local ID ضمن النطاق المخصص، ثم اختبر sample بـwazuh-logtest قبل restart.',
        command: `<!-- /var/ossec/etc/rules/local_rules.xml -->
<group name="soc_lab,">
  <rule id="100100" level="5">
    <decoded_as>json</decoded_as>
    <field name="lab_event">PIPELINE_TEST</field>
    <description>SOC lab synthetic pipeline marker</description>
  </rule>
</group>

# ثم على manager:
sudo /var/ossec/bin/wazuh-logtest
# الصق ثم Ctrl+D:
{"lab_event":"PIPELINE_TEST","test_id":"WAZUH-E2E-001","user":"lab-user"}`,
        expected: 'Phase 2 = JSON decoder وPhase 3 = rule 100100. أصلح XML/field قبل restart.'
      },
      {
        step: 5,
        description: 'أعد تشغيل manager، ثم ولّد ثلاثة أحداث لها event_time وrun مختلفان على agent.',
        command: `sudo systemctl restart wazuh-manager
sudo systemctl status wazuh-manager --no-pager

# نفّذ على agent ثلاث مرات مع تغيير RUN إلى 1 ثم 2 ثم 3:
RUN=1
EVENT_TIME=$(date -u +%FT%TZ)
printf '{"event_time":"%s","lab_event":"PIPELINE_TEST","test_id":"WAZUH-E2E-001","run":"%s","user":"lab-user"}\\n' "$EVENT_TIME" "$RUN" \\
  | sudo tee -a /var/log/soc-lab.json`,
        expected: 'ثلاثة أسطر JSON مختلفة محفوظة محليًا.'
      },
      {
        step: 6,
        description: 'في Dashboard ابحث عن test_id=WAZUH-E2E-001، اعرض rule.id وagent.name وdata.* وtimestamp، واحسب delay لكل run.',
        expected: '3/3 alerts بـrule 100100 وحقول صحيحة؛ لا تضع زمنًا افتراضيًا.'
      },
      {
        step: 7,
        description: 'نفّذ اختبار failure: اكتب حدثًا بقيمة PIPELINE_TEST_TYPO. يجب أن يُجمع وفق إعدادك لكن لا يطابق rule 100100؛ اشرح الفرق بين ingestion وalerting.',
        expected: 'إثبات أن «لا alert» قد يعني rule mismatch لا agent failure.'
      },
    ],
    evidence: ['Wazuh version/build', 'Agent active + keepalive', 'logtest phases 1–3', 'الحدث المحلي', '3 alerts وحقولها', '3 ingestion delays', 'negative rule test'],
    cleanup: 'بعد تصدير الأدلة: أزل كتلة localfile والقاعدة 100100 فقط إن كنت لن تكمل المشروع، تحقق من XML، أعد تشغيل agent/manager، ثم احذف /var/log/soc-lab.json. البديل الأفضل: ارجع لـSnapshot 01-clean-telemetry. لا تنشر credentials أو hostnames/IPs حقيقية.',
    filters: ['test_id=WAZUH-E2E-001', 'rule.id=100100', 'agent.name + data.run'],
    deliverable: `# Wazuh E2E Verification

## Build and topology
- Wazuh version/build: ___
- Manager/agent OS: ___
- Network isolation: ___
- Secrets removed: yes/no

## Data contract
| Field | Expected | Observed |
|---|---|---|
| rule.id | 100100 | |
| data.test_id | WAZUH-E2E-001 | |
| data.lab_event | PIPELINE_TEST | |
| data.run | 1/2/3 | |

## Measured tests
| Run | event_time UTC | alert timestamp UTC | Delay | Result |
|---|---|---|---|---|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |

## Negative test
Input: PIPELINE_TEST_TYPO
Collected? ___ Alert 100100? ___
Explanation: ___

## Troubleshooting path
source → localfile → agent → manager/decoder → rule → index → query
Evidence at each hop: ___

## Limitation
This proves the synthetic pipeline and rule test, not detection coverage for real attacks.`,
  },
];
