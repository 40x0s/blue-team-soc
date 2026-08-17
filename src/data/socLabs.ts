import { Lab } from '../types';

export const socLabs: Lab[] = [
  {
    id: 'soc-lab1',
    title: 'Lab 1: Triage Exercise',
    objective: 'ترتيب أولويات 5 تنبيهات وتحليل كل واحد',
    tools: ['SIEM', 'Critical Thinking'],
    steps: [
      { step: 1, description: 'اقرأ الـ 5 Alerts بعناية', expected: 'فهم كل تنبيه' },
      { step: 2, description: 'Alert 1: 50 failed logons لحساب user01 من IP خارجي', expected: 'تحديد النوع والخطورة' },
      { step: 3, description: 'Alert 2: Event 1102 على DC01 (Security log cleared)', expected: 'تحديد النوع والخطورة' },
      { step: 4, description: 'Alert 3: PowerShell -EncodedCommand على workstation عادي', expected: 'تحديد النوع والخطورة' },
      { step: 5, description: 'Alert 4: User logged on at 3 AM', expected: 'تحديد النوع والخطورة' },
      { step: 6, description: 'Alert 5: 200 DNS NXDOMAIN في 5 دقائق من جهاز واحد', expected: 'تحديد النوع والخطورة' },
      { step: 7, description: 'رتب الأولوية من 1 (الأعلى) إلى 5 واشرح لماذا', expected: 'ترتيب مبرر' },
    ],
    filters: [],
    deliverable: `# Triage Exercise

## Alert Priority Ranking
| Priority | Alert | Severity | Reasoning |
|----------|-------|----------|-----------|
| 1 | Alert 2: Log Cleared | Critical | إخفاء آثار = حرج |
| 2 | Alert 3: PS Encoded | High | احتمالية malware |
| 3 | Alert 5: DNS NXDOMAIN | High | DGA = malware C2 |
| 4 | Alert 1: Brute Force | Medium | لم ينجح بعد |
| 5 | Alert 4: 3AM Login | Low | يحتاج context |

## Detailed Analysis per Alert
[حلل كل alert بالتفصيل]`
  },
  {
    id: 'soc-lab2',
    title: 'Lab 2: Full Incident Investigation',
    objective: 'تحقيق كامل في تنبيه PowerShell مشبوه',
    tools: ['PowerShell', 'Event Viewer', 'Sysmon', 'VirusTotal'],
    steps: [
      { step: 1, description: 'اجمع معلومات من PowerShell Operational log', command: `Get-WinEvent -FilterHashtable @{\n  LogName='Microsoft-Windows-PowerShell/Operational'\n  Id=4104\n  StartTime=(Get-Date).AddHours(-2)\n}`, expected: 'Script Blocks' },
      { step: 2, description: 'تحقق من Process Creation (4688)', command: `Get-WinEvent -FilterHashtable @{LogName='Security';Id=4688} -MaxEvents 100 |\n  Where-Object {$_.Properties[5].Value -match 'powershell'}`, expected: 'العمليات المرتبطة' },
      { step: 3, description: 'تحقق من اتصالات الشبكة (Sysmon 3)', command: `Get-WinEvent -FilterHashtable @{\n  LogName='Microsoft-Windows-Sysmon/Operational';Id=3\n} -MaxEvents 50`, expected: 'اتصالات شبكية' },
      { step: 4, description: 'ابحث عن IOCs في VirusTotal', expected: 'نتائج الفحص' },
      { step: 5, description: 'ابني Timeline للأحداث', expected: 'جدول زمني كامل' },
      { step: 6, description: 'اكتب التقرير النهائي', expected: 'Incident Report' },
    ],
    filters: [],
    deliverable: `# Incident Investigation Report

## Case: Suspicious PowerShell on FINANCE-PC01
**Case ID:** INC-2025-001
**Severity:** High

## Timeline
| Time | Event | Source | Evidence |
|------|-------|--------|----------|

## IOCs
| Type | Value | VT Score |
|------|-------|----------|

## MITRE ATT&CK
- Tactic: Execution
- Technique: T1059.001

## Assessment: TP / FP
## Actions Taken:
## Recommendations:`
  },
  {
    id: 'soc-lab3',
    title: 'Lab 3: MITRE ATT&CK Mapping',
    objective: 'ربط سيناريوهات هجوم بـ MITRE ATT&CK',
    tools: ['attack.mitre.org'],
    steps: [
      { step: 1, description: 'سيناريو 1: Mimikatz استخدم لاستخراج credentials من LSASS', expected: 'T1003.001' },
      { step: 2, description: 'سيناريو 2: PowerShell encoded نزّل malware', expected: 'T1059.001' },
      { step: 3, description: 'سيناريو 3: PsExec للوصول لجهاز ثاني', expected: 'T1021.002' },
      { step: 4, description: 'سيناريو 4: Scheduled task لـ reverse shell كل 5 دقائق', expected: 'T1053.005' },
      { step: 5, description: 'سيناريو 5: Event log تم مسحه', expected: 'T1070.001' },
    ],
    filters: [],
    deliverable: `# MITRE ATT&CK Mapping Exercise

## Scenario 1: Mimikatz → LSASS
- Tactic: Credential Access (TA0006)
- Technique: T1003.001 - LSASS Memory
- Detection: Sysmon Event 10

## Scenario 2: PS Encoded → Download
- Tactic: Execution (TA0002)
- Technique: T1059.001 - PowerShell
- Detection: Event 4104, 4688

## Scenario 3: PsExec Lateral
- Tactic: Lateral Movement (TA0008)
- Technique: T1021.002 - SMB Admin Shares
- Detection: Event 7045, 4624 Type 3

## Scenario 4: Scheduled Task Persistence
- Tactic: Persistence (TA0003)
- Technique: T1053.005
- Detection: Event 4698, TaskSch 106

## Scenario 5: Log Clearing
- Tactic: Defense Evasion (TA0005)
- Technique: T1070.001
- Detection: Event 1102`
  },
  {
    id: 'soc-lab4',
    title: 'Lab 4: Phishing Email Analysis',
    objective: 'تحليل بريد تصيد كامل',
    tools: ['Email Client', 'VirusTotal', 'URLscan.io', 'any.run'],
    steps: [
      { step: 1, description: 'ابحث عن sample phishing email (PhishTank أو مثال)', expected: 'إيميل للتحليل' },
      { step: 2, description: 'حلل Headers (Return-Path, SPF, DKIM, DMARC)', expected: 'نتائج Headers' },
      { step: 3, description: 'حلل Sender domain (WHOIS, عمر الدومين)', expected: 'معلومات المرسل' },
      { step: 4, description: 'حلل URLs (لا تنقر! استخدم VT/URLscan)', expected: 'سمعة الروابط' },
      { step: 5, description: 'حلل المرفقات (hash → VirusTotal)', expected: 'نتائج الفحص' },
      { step: 6, description: 'اكتب تقرير Phishing كامل', expected: 'التقرير' },
    ],
    filters: [],
    deliverable: `# Phishing Investigation Report

## Email Details
- From: ___
- Reply-To: ___
- Subject: ___
- Date: ___

## Headers
- SPF: pass/fail
- DKIM: pass/fail
- DMARC: pass/fail

## URLs Found
| URL | VT Score | Status |
|-----|----------|--------|

## Attachments
| File | SHA256 | VT Score |
|------|--------|----------|

## IOCs Extracted
- Domains:
- IPs:
- Hashes:

## Classification: TP
## MITRE: T1566.001 / T1566.002`
  },
  {
    id: 'soc-lab5',
    title: 'Lab 5: Threat Intel IOC Hunt',
    objective: 'البحث عن IOCs من Threat Intel في بيئتك',
    tools: ['AlienVault OTX', 'VirusTotal', 'SIEM/Wazuh'],
    steps: [
      { step: 1, description: 'ادخل AlienVault OTX واختر pulse حديث', expected: 'pulse محدد' },
      { step: 2, description: 'استخرج 5 IOCs (IPs, domains, hashes)', expected: 'قائمة IOCs' },
      { step: 3, description: 'تحقق من كل IOC في VirusTotal', expected: 'نتائج VT' },
      { step: 4, description: 'ابحث عن IOCs في بيئة اللاب (SIEM/Wazuh)', expected: 'نتائج البحث' },
      { step: 5, description: 'اكتب IOC Investigation Notes', expected: 'التقارير' },
    ],
    filters: [],
    deliverable: `# IOC Hunt Report

## Source
- Platform: AlienVault OTX
- Pulse: ___
- Date: ___

## IOCs Investigated
| # | Type | Value | VT Score | Found in Env? |
|---|------|-------|----------|---------------|
| 1 | IP | | | |
| 2 | Domain | | | |
| 3 | Hash | | | |
| 4 | URL | | | |
| 5 | IP | | | |

## Actions
- [ ] Added to blocklist
- [ ] Monitoring enabled
- [ ] No action needed`
  },
  {
    id: 'soc-lab6',
    title: 'Lab 6: Wazuh Deployment',
    objective: 'تثبيت Wazuh Server و Agent وتوليد تنبيهات',
    tools: ['Ubuntu VM', 'Windows VM', 'Wazuh'],
    steps: [
      { step: 1, description: 'ثبّت Wazuh Server على Ubuntu', command: `curl -sO https://packages.wazuh.com/4.7/wazuh-install.sh\nsudo bash ./wazuh-install.sh -a`, expected: 'Wazuh installed' },
      { step: 2, description: 'سجل الدخول للـ Dashboard', expected: 'Dashboard يعمل' },
      { step: 3, description: 'ثبّت Agent على Windows', command: `# نزّل MSI من Dashboard\n# ثم:\nNET START WazuhSvc`, expected: 'Agent connected' },
      { step: 4, description: 'ولّد 20 failed logon على Windows', expected: 'محاولات فاشلة' },
      { step: 5, description: 'اعرض التنبيهات في Wazuh Dashboard', expected: 'Alerts ظاهرة' },
      { step: 6, description: 'صدّر تقرير من Wazuh', expected: 'Screenshot + تقرير' },
    ],
    filters: [],
    deliverable: `# Wazuh Deployment Lab

## Server Setup
- OS: Ubuntu 22.04
- RAM: ___GB
- Disk: ___GB
- Wazuh Version: ___

## Agent Setup
- OS: Windows ___
- Agent Name: ___
- Status: Connected

## Alerts Generated
- Failed Logons: ___
- Rule IDs triggered: ___

## Screenshots
[أضف screenshots]`
  }
];
