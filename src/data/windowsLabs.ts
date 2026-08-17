import { Lab } from '../types';

export const windowsLabs: Lab[] = [
  {
    id: 'windows-lab1',
    title: 'Lab 1: تحليل Failed Logons',
    objective: 'محاكاة وتحليل محاولات تسجيل دخول فاشلة على Windows Domain',
    tools: ['Windows Server (DC)', 'Windows Client', 'PowerShell', 'Event Viewer'],
    steps: [
      {
        step: 1,
        description: 'تأكد من تفعيل Audit Policy على DC',
        command: 'auditpol /get /category:*',
        expected: 'Logon/Logoff مفعّل'
      },
      {
        step: 2,
        description: 'من WIN-CLIENT، حاول تسجيل دخول بكلمة مرور خاطئة',
        command: 'runas /user:DOMAIN\\admin cmd',
        expected: 'أدخل كلمات مرور خاطئة 10 مرات'
      },
      {
        step: 3,
        description: 'على DC، استعلم عن Event 4625',
        command: `Get-WinEvent -FilterHashtable @{
  LogName='Security'
  Id=4625
  StartTime=(Get-Date).AddHours(-1)
} | Select-Object TimeCreated,
  @{Name='Account';Expression={$_.Properties[5].Value}},
  @{Name='Workstation';Expression={$_.Properties[13].Value}},
  @{Name='SourceIP';Expression={$_.Properties[19].Value}}`,
        expected: '10 أحداث فاشلة'
      },
      {
        step: 4,
        description: 'حدد عدد المحاولات لكل IP',
        command: `Get-WinEvent -FilterHashtable @{LogName='Security';Id=4625} |
  ForEach-Object { $_.Properties[19].Value } |
  Group-Object | Sort-Object Count -Descending`,
        expected: 'قائمة IPs مع عدد المحاولات'
      },
      {
        step: 5,
        description: 'تحقق من Event 4771 (Kerberos pre-auth failure)',
        command: `Get-WinEvent -FilterHashtable @{LogName='Security';Id=4771} -MaxEvents 20`,
        expected: 'أحداث Kerberos الفاشلة'
      }
    ],
    filters: [
      'Get-WinEvent -FilterHashtable @{LogName="Security";Id=4625}',
      'Get-WinEvent -FilterHashtable @{LogName="Security";Id=4771}',
      'Get-WinEvent -FilterHashtable @{LogName="Security";Id=4776}'
    ],
    deliverable: `# Lab 1: Windows Failed Logons Analysis

## Case Information
- **Case ID:** WIN-2025-001
- **Analyst:** [اسمك]
- **Date:** [التاريخ]
- **Systems:** DC01, WIN-CLIENT

## Summary
تم اكتشاف محاولات تسجيل دخول فاشلة متعددة

## Timeline
| Time | Event ID | Account | Source |
|------|----------|---------|--------|
| | 4625 | | |
| | 4771 | | |

## Statistics
- عدد المحاولات الفاشلة: ___
- الحساب المستهدف: ___
- Workstation المصدر: ___
- Source IP: ___
- Logon Type: ___

## Evidence
\`\`\`
[الصق أحداث مهمة هنا]
\`\`\`

## PowerShell Commands Used
\`\`\`powershell
Get-WinEvent -FilterHashtable @{LogName='Security';Id=4625}
\`\`\`

## MITRE ATT&CK
- Tactic: Credential Access
- Technique: T1110 - Brute Force

## Assessment
- [x] True Positive

## Recommendations
1. تفعيل Account Lockout Policy
2. مراقبة الحساب المستهدف
3. فحص WIN-CLIENT`
  },
  {
    id: 'windows-lab2',
    title: 'Lab 2: تحليل Process Creation',
    objective: 'تحليل Event 4688 وكشف أوامر مشبوهة',
    tools: ['Windows', 'PowerShell', 'Event Viewer'],
    steps: [
      {
        step: 1,
        description: 'تأكد من تفعيل Process Creation Auditing مع Command Line',
        command: `# تحقق من الإعداد
reg query "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System\\Audit" /v ProcessCreationIncludeCmdLine_Enabled`,
        expected: '0x1 = مفعّل'
      },
      {
        step: 2,
        description: 'نفذ أمر PowerShell مشفر (للاختبار)',
        command: `$cmd = [System.Text.Encoding]::Unicode.GetBytes("Get-Process")
$encoded = [Convert]::ToBase64String($cmd)
powershell -EncodedCommand $encoded`,
        expected: 'تنفيذ الأمر'
      },
      {
        step: 3,
        description: 'نفذ أمر تنزيل (محاكاة)',
        command: 'certutil -urlcache -split -f https://example.com/test.txt C:\\temp\\test.txt',
        expected: 'محاولة تنزيل'
      },
      {
        step: 4,
        description: 'استعلم عن Event 4688 لـ PowerShell',
        command: `Get-WinEvent -FilterHashtable @{LogName='Security';Id=4688} -MaxEvents 100 |
  Where-Object {$_.Properties[5].Value -match 'powershell'} |
  Select-Object TimeCreated,
    @{Name='Process';Expression={$_.Properties[5].Value}},
    @{Name='CommandLine';Expression={$_.Properties[8].Value}},
    @{Name='ParentProcess';Expression={$_.Properties[13].Value}}`,
        expected: 'أوامر PowerShell مع command line'
      },
      {
        step: 5,
        description: 'ابحث عن certutil',
        command: `Get-WinEvent -FilterHashtable @{LogName='Security';Id=4688} |
  Where-Object {$_.Properties[5].Value -match 'certutil'} |
  Select-Object TimeCreated, @{Name='CommandLine';Expression={$_.Properties[8].Value}}`,
        expected: 'أوامر certutil'
      }
    ],
    filters: [
      'Event ID 4688 + PowerShell',
      'Event ID 4688 + certutil',
      'Event ID 4688 + EncodedCommand'
    ],
    deliverable: `# Lab 2: Process Creation Analysis

## Objective
تحليل Event 4688 وكشف LOLBins

## Suspicious Processes Found
| Time | Process | Command Line | Parent |
|------|---------|--------------|--------|
| | powershell.exe | -EncodedCommand ... | |
| | certutil.exe | -urlcache ... | |

## Analysis
- EncodedCommand detected: Yes/No
- LOLBin usage: certutil for download

## Decoded Command
\`\`\`
[فك تشفير Base64 هنا]
\`\`\`

## MITRE ATT&CK
- T1059.001 - PowerShell
- T1105 - Ingress Tool Transfer (certutil)

## Recommendations
1. مراقبة EncodedCommand
2. مراقبة certutil -urlcache`
  },
  {
    id: 'windows-lab3',
    title: 'Lab 3: Sysmon Investigation',
    objective: 'استخدام Sysmon لتحليل عميق للعمليات والشبكة',
    tools: ['Sysmon', 'PowerShell', 'SwiftOnSecurity Config'],
    steps: [
      {
        step: 1,
        description: 'تحقق من تثبيت Sysmon',
        command: 'sysmon -c',
        expected: 'عرض الإعدادات الحالية'
      },
      {
        step: 2,
        description: 'إذا لم يكن مثبتاً، ثبته',
        command: `# تحميل Sysmon من Microsoft
# تحميل sysmonconfig من SwiftOnSecurity
sysmon -i sysmonconfig-export.xml -accepteula`,
        expected: 'Sysmon installed'
      },
      {
        step: 3,
        description: 'نفذ عملية تتصل بالشبكة',
        command: 'powershell -c "Invoke-WebRequest https://example.com -UseBasicParsing"',
        expected: 'اتصال شبكي'
      },
      {
        step: 4,
        description: 'استعلم عن Sysmon Event 1 (Process Create)',
        command: `Get-WinEvent -FilterHashtable @{
  LogName='Microsoft-Windows-Sysmon/Operational'
  Id=1
  StartTime=(Get-Date).AddMinutes(-30)
} -MaxEvents 50 | Select-Object TimeCreated, Message`,
        expected: 'قائمة العمليات'
      },
      {
        step: 5,
        description: 'استعلم عن Sysmon Event 3 (Network)',
        command: `Get-WinEvent -FilterHashtable @{
  LogName='Microsoft-Windows-Sysmon/Operational'
  Id=3
  StartTime=(Get-Date).AddMinutes(-30)
} | Select-Object TimeCreated, Message`,
        expected: 'اتصالات شبكية'
      },
      {
        step: 6,
        description: 'استعلم عن DNS queries (Event 22)',
        command: `Get-WinEvent -FilterHashtable @{
  LogName='Microsoft-Windows-Sysmon/Operational'
  Id=22
} -MaxEvents 50`,
        expected: 'استعلامات DNS'
      },
      {
        step: 7,
        description: 'ابحث عن عمليات من Office (Macro indicator)',
        command: `Get-WinEvent -FilterHashtable @{
  LogName='Microsoft-Windows-Sysmon/Operational'
  Id=1
} | Where-Object {$_.Message -match 'ParentImage:.*\\\\(WINWORD|EXCEL)\\.EXE'}`,
        expected: 'عمليات من Office (إن وجدت)'
      }
    ],
    filters: [
      'Sysmon Event 1 - Process Create',
      'Sysmon Event 3 - Network Connection',
      'Sysmon Event 22 - DNS Query',
      'Sysmon Event 10 - Process Access'
    ],
    deliverable: `# Lab 3: Sysmon Deep Investigation

## Sysmon Configuration
- Config: SwiftOnSecurity / Olaf Hartong
- Version: ___

## Process Tree
\`\`\`
explorer.exe
  └── powershell.exe
        └── [child processes]
\`\`\`

## Network Connections (Event 3)
| Time | Process | Dest IP | Dest Port |
|------|---------|---------|-----------|
| | | | |

## DNS Queries (Event 22)
| Time | Process | Query |
|------|---------|-------|
| | | |

## Suspicious Findings
- [ ] Process from /tmp equivalent
- [ ] Network connection to unusual IP
- [ ] DNS to suspicious domain

## MITRE ATT&CK
- Technique: ___`
  },
  {
    id: 'windows-lab4',
    title: 'Lab 4: PowerShell Attack Investigation',
    objective: 'تحليل هجمات PowerShell من Script Block Logging',
    tools: ['PowerShell', 'Event Viewer'],
    steps: [
      {
        step: 1,
        description: 'تأكد من تفعيل Script Block Logging',
        command: `# تحقق من Group Policy أو Registry
reg query "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\PowerShell\\ScriptBlockLogging"`,
        expected: 'EnableScriptBlockLogging = 1'
      },
      {
        step: 2,
        description: 'نفذ سكربت اختباري (IEX simulation)',
        command: `# هذا للاختبار فقط - لن يعمل فعلياً
$test = "This is a test of IEX detection"
# Invoke-Expression $test`,
        expected: 'تسجيل السكربت'
      },
      {
        step: 3,
        description: 'نفذ أمر Base64 encoded',
        command: `$cmd = [System.Text.Encoding]::Unicode.GetBytes("Write-Host 'Test'")
$encoded = [Convert]::ToBase64String($cmd)
Write-Host "Encoded: $encoded"`,
        expected: 'توليد Base64'
      },
      {
        step: 4,
        description: 'استعلم عن Event 4104',
        command: `Get-WinEvent -FilterHashtable @{
  LogName='Microsoft-Windows-PowerShell/Operational'
  Id=4104
  StartTime=(Get-Date).AddHours(-1)
} -MaxEvents 50 | Select-Object TimeCreated, Message`,
        expected: 'Script Blocks'
      },
      {
        step: 5,
        description: 'ابحث عن patterns مشبوهة',
        command: `Get-WinEvent -FilterHashtable @{
  LogName='Microsoft-Windows-PowerShell/Operational'
  Id=4104
} | Where-Object {
  $_.Message -match 'DownloadString|FromBase64String|IEX|Invoke-Expression|EncodedCommand'
} | Select-Object TimeCreated, Message`,
        expected: 'أوامر مشبوهة'
      }
    ],
    filters: [
      'Event 4104 - Script Block',
      'DownloadString pattern',
      'FromBase64String pattern',
      'IEX pattern'
    ],
    deliverable: `# Lab 4: PowerShell Attack Investigation

## Script Block Logging Status
- Enabled: Yes/No
- GPO Path: ___

## Suspicious Scripts Found
### Script 1
\`\`\`powershell
[محتوى السكربت]
\`\`\`
**Analysis:** [تحليلك]

### Script 2
\`\`\`powershell
[محتوى السكربت]
\`\`\`

## Indicators Found
- [ ] EncodedCommand
- [ ] DownloadString
- [ ] IEX / Invoke-Expression
- [ ] FromBase64String
- [ ] Hidden Window
- [ ] Bypass ExecutionPolicy

## Decoded Commands
\`\`\`
[الأوامر بعد فك التشفير]
\`\`\`

## MITRE ATT&CK
- T1059.001 - PowerShell
- T1140 - Deobfuscate/Decode`
  },
  {
    id: 'windows-lab5',
    title: 'Lab 5: Persistence Detection',
    objective: 'كشف Persistence عبر Scheduled Tasks و Services',
    tools: ['Windows', 'PowerShell', 'schtasks', 'sc'],
    steps: [
      {
        step: 1,
        description: 'أنشئ Scheduled Task مشبوه (للاختبار)',
        command: `schtasks /create /tn "WindowsUpdate" /tr "powershell.exe -nop -w hidden -c 'Get-Date'" /sc minute /mo 5`,
        expected: 'Task created'
      },
      {
        step: 2,
        description: 'استعلم عن Event 4698 (Task Created)',
        command: `Get-WinEvent -FilterHashtable @{LogName='Security';Id=4698} -MaxEvents 10 |
  Select-Object TimeCreated, Message`,
        expected: 'حدث إنشاء المهمة'
      },
      {
        step: 3,
        description: 'استعلم عن TaskScheduler Event 106',
        command: `Get-WinEvent -FilterHashtable @{
  LogName='Microsoft-Windows-TaskScheduler/Operational'
  Id=106
} -MaxEvents 10`,
        expected: 'تسجيل المهمة'
      },
      {
        step: 4,
        description: 'فحص المهام المجدولة الحالية',
        command: `Get-ScheduledTask | Where-Object {$_.State -eq 'Ready'} |
  Select-Object TaskName, TaskPath, @{Name='Action';Expression={$_.Actions.Execute}}`,
        expected: 'قائمة المهام'
      },
      {
        step: 5,
        description: 'استعلم عن Event 7045 (Service Installed)',
        command: `Get-WinEvent -FilterHashtable @{LogName='System';Id=7045} -MaxEvents 20 |
  Select-Object TimeCreated,
    @{Name='ServiceName';Expression={$_.Properties[0].Value}},
    @{Name='ImagePath';Expression={$_.Properties[1].Value}}`,
        expected: 'الخدمات المثبتة'
      },
      {
        step: 6,
        description: 'تنظيف: احذف المهمة الاختبارية',
        command: 'schtasks /delete /tn "WindowsUpdate" /f',
        expected: 'Task deleted'
      }
    ],
    filters: [
      'Event 4698 - Scheduled Task Created',
      'Event 7045 - Service Installed',
      'Event 4697 - Service Installed (Security)',
      'TaskScheduler Event 106'
    ],
    deliverable: `# Lab 5: Persistence Detection

## Scheduled Tasks Analysis
### Suspicious Tasks Found
| Task Name | Action | Schedule | Created |
|-----------|--------|----------|---------|
| WindowsUpdate | powershell.exe -nop -w hidden | Every 5 min | |

### Event 4698 Details
\`\`\`xml
[تفاصيل الحدث]
\`\`\`

## Services Analysis
### Recently Installed Services
| Service Name | Image Path | Start Type |
|--------------|------------|------------|
| | | |

## Persistence Indicators
- [ ] Task runs PowerShell with -hidden
- [ ] Task runs from temp/user folder
- [ ] Service with suspicious path
- [ ] Task/Service created recently

## MITRE ATT&CK
- T1053.005 - Scheduled Task
- T1543.003 - Windows Service

## Cleanup Actions
- [x] Deleted test task "WindowsUpdate"

## Recommendations
1. مراقبة Event 4698 و 7045
2. مراجعة المهام الدورية
3. تفعيل Sysmon لمراقبة أعمق`
  }
];
