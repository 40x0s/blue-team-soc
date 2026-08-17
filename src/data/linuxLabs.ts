import { Lab } from '../types';

export const linuxLabs: Lab[] = [
  {
    id: 'linux-lab1',
    title: 'Lab 1: محاكاة وتحليل SSH Brute Force',
    objective: 'محاكاة هجوم Brute Force على SSH وتحليله من السجلات',
    tools: ['Linux VM (Ubuntu/Kali)', 'SSH', 'sshpass', 'grep', 'awk'],
    steps: [
      {
        step: 1,
        description: 'تأكد أن SSH يعمل على Linux target',
        command: 'sudo systemctl status ssh',
        expected: 'SSH service is active (running)'
      },
      {
        step: 2,
        description: 'من جهاز آخر (Kali)، نفذ محاولات SSH فاشلة',
        command: `for i in $(seq 1 20); do
  sshpass -p "wrongpass$i" ssh -o StrictHostKeyChecking=no admin@TARGET_IP exit
done`,
        expected: '20 محاولة دخول فاشلة'
      },
      {
        step: 3,
        description: 'عد المحاولات الفاشلة في auth.log',
        command: 'grep -c "Failed password" /var/log/auth.log',
        expected: 'رقم يمثل عدد المحاولات'
      },
      {
        step: 4,
        description: 'استخراج عناوين IP المهاجمة',
        command: `grep "Failed password" /var/log/auth.log | awk '{print $11}' | sort | uniq -c | sort -rn`,
        expected: 'قائمة بالـ IPs مع عدد المحاولات'
      },
      {
        step: 5,
        description: 'استخراج المستخدمين المستهدفين',
        command: `grep "Failed password" /var/log/auth.log | awk '{print $9}' | sort | uniq -c | sort -rn`,
        expected: 'قائمة بالمستخدمين المستهدفين'
      },
      {
        step: 6,
        description: 'تحديد المدة الزمنية للهجوم',
        command: `grep "Failed password" /var/log/auth.log | head -1
grep "Failed password" /var/log/auth.log | tail -1`,
        expected: 'بداية ونهاية الهجوم'
      },
      {
        step: 7,
        description: 'البحث عن محاولات ناجحة بعد الهجوم',
        command: 'grep "Accepted" /var/log/auth.log',
        expected: 'هل نجح أي تسجيل دخول؟'
      }
    ],
    filters: [
      'grep "Failed password" /var/log/auth.log',
      'grep "Accepted password" /var/log/auth.log',
      'grep "Invalid user" /var/log/auth.log'
    ],
    deliverable: `# Lab 1: SSH Brute Force Analysis

## Summary
تم اكتشاف هجوم SSH Brute Force على السيرفر

## Timeline
| Time | Event |
|------|-------|
| HH:MM:SS | بداية الهجوم |
| HH:MM:SS | نهاية الهجوم |
| Total | XX ثانية/دقيقة |

## Statistics
- عدد المحاولات الفاشلة: ___
- عنوان IP المهاجم: ___
- المستخدمون المستهدفون: ___
- هل نجح أي تسجيل دخول؟ نعم/لا

## Evidence
\`\`\`
[الصق أسطر من auth.log هنا]
\`\`\`

## Commands Used
\`\`\`bash
grep -c "Failed password" /var/log/auth.log
grep "Failed password" /var/log/auth.log | awk '{print $11}' | sort | uniq -c | sort -rn
\`\`\`

## MITRE ATT&CK
- Tactic: Credential Access
- Technique: T1110 - Brute Force

## Assessment
- [x] True Positive - هجوم brute force حقيقي

## Recommended Actions
1. حظر عنوان IP المهاجم في UFW
2. تفعيل fail2ban
3. تغيير منفذ SSH
4. استخدام key authentication`
  },
  {
    id: 'linux-lab2',
    title: 'Lab 2: سكريبت Bash لتلخيص auth.log',
    objective: 'كتابة سكريبت Bash احترافي لتحليل سجلات المصادقة',
    tools: ['Linux', 'Bash', 'grep', 'awk', 'sort', 'uniq'],
    steps: [
      {
        step: 1,
        description: 'أنشئ ملف السكريبت',
        command: 'nano auth-summary.sh',
        expected: 'فتح محرر النصوص'
      },
      {
        step: 2,
        description: 'اكتب كود السكريبت (انسخ من الأسفل)',
        expected: 'السكريبت جاهز'
      },
      {
        step: 3,
        description: 'أعط الصلاحية التنفيذية',
        command: 'chmod +x auth-summary.sh',
        expected: 'الملف قابل للتنفيذ'
      },
      {
        step: 4,
        description: 'نفذ السكريبت',
        command: 'sudo ./auth-summary.sh',
        expected: 'تقرير مفصل'
      },
      {
        step: 5,
        description: 'احفظ النتيجة في ملف',
        command: 'sudo ./auth-summary.sh > auth-report.txt',
        expected: 'التقرير محفوظ'
      }
    ],
    filters: [],
    deliverable: `#!/bin/bash
# Auth Log Summary Script
# Usage: sudo ./auth-summary.sh

LOG_FILE="/var/log/auth.log"

echo "==================================="
echo "    Auth Log Summary Report"
echo "    Generated: $(date)"
echo "==================================="
echo ""

echo "[1] Total Failed Login Attempts:"
grep -c "Failed password" $LOG_FILE 2>/dev/null || echo "0"
echo ""

echo "[2] Top 10 Attacker IPs:"
grep "Failed password" $LOG_FILE 2>/dev/null | awk '{print $11}' | sort | uniq -c | sort -rn | head -10
echo ""

echo "[3] Top 10 Targeted Users:"
grep "Failed password" $LOG_FILE 2>/dev/null | awk '{print $9}' | sort | uniq -c | sort -rn | head -10
echo ""

echo "[4] Successful Logins:"
grep "Accepted" $LOG_FILE 2>/dev/null | awk '{print $9, "from", $11}' | sort | uniq -c
echo ""

echo "[5] Invalid Users Attempted:"
grep "Invalid user" $LOG_FILE 2>/dev/null | awk '{print $8}' | sort | uniq -c | sort -rn | head -10
echo ""

echo "[6] Sudo Commands Used:"
grep "sudo:" $LOG_FILE 2>/dev/null | grep -oP "COMMAND=\\K.*" | sort | uniq -c | sort -rn | head -10
echo ""

echo "[7] User Account Changes:"
grep -E "useradd|userdel|usermod|passwd" $LOG_FILE 2>/dev/null | tail -10
echo ""

echo "==================================="
echo "         End of Report"
echo "==================================="`
  },
  {
    id: 'linux-lab3',
    title: 'Lab 3: سكريبت Python لاستخراج IOCs',
    objective: 'كتابة سكريبت Python لاستخراج المؤشرات من السجلات',
    tools: ['Python3', 'Linux'],
    steps: [
      {
        step: 1,
        description: 'أنشئ ملف Python',
        command: 'nano extract-iocs.py',
        expected: 'فتح المحرر'
      },
      {
        step: 2,
        description: 'اكتب كود السكريبت (انسخ من الأسفل)',
        expected: 'الكود جاهز'
      },
      {
        step: 3,
        description: 'نفذ السكريبت',
        command: 'python3 extract-iocs.py /var/log/auth.log',
        expected: 'تقرير IOCs'
      },
      {
        step: 4,
        description: 'احفظ النتيجة للمشاركة',
        command: 'python3 extract-iocs.py /var/log/auth.log > iocs-report.txt',
        expected: 'التقرير محفوظ'
      }
    ],
    filters: [],
    deliverable: `#!/usr/bin/env python3
"""
IOC Extraction Script for Linux Auth Logs
Usage: python3 extract-iocs.py /var/log/auth.log
"""

import re
import sys
from collections import Counter
from datetime import datetime

def extract_iocs(log_file):
    ip_pattern = r'\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b'
    
    failed_ips = []
    failed_users = []
    accepted_logins = []
    invalid_users = []
    sudo_commands = []
    
    try:
        with open(log_file, 'r') as f:
            for line in f:
                ips = re.findall(ip_pattern, line)
                
                if 'Failed password' in line:
                    if ips:
                        failed_ips.extend(ips)
                    match = re.search(r'for (\\S+) from', line)
                    if match:
                        failed_users.append(match.group(1))
                        
                elif 'Accepted' in line:
                    if ips:
                        match = re.search(r'for (\\S+) from', line)
                        if match:
                            accepted_logins.append({
                                'user': match.group(1),
                                'ip': ips[0]
                            })
                            
                elif 'Invalid user' in line:
                    match = re.search(r'Invalid user (\\S+)', line)
                    if match:
                        invalid_users.append(match.group(1))
                        
                elif 'sudo:' in line and 'COMMAND=' in line:
                    match = re.search(r'COMMAND=(.*)', line)
                    if match:
                        sudo_commands.append(match.group(1))
    
    except FileNotFoundError:
        print(f"Error: File {log_file} not found")
        sys.exit(1)
    
    print("=" * 60)
    print("           IOC EXTRACTION REPORT")
    print(f"    Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 60)
    
    print("\\n[+] TOP 10 FAILED LOGIN IPs (Potential Attackers):")
    print("-" * 40)
    for ip, count in Counter(failed_ips).most_common(10):
        print(f"    {count:5d} attempts from {ip}")
    
    print("\\n[+] TOP 10 TARGETED USERNAMES:")
    print("-" * 40)
    for user, count in Counter(failed_users).most_common(10):
        print(f"    {count:5d} attempts on '{user}'")
    
    print("\\n[+] SUCCESSFUL LOGINS:")
    print("-" * 40)
    for login in set(tuple(d.items()) for d in accepted_logins):
        login_dict = dict(login)
        print(f"    User: {login_dict['user']:15} from {login_dict['ip']}")
    
    print("\\n[+] INVALID USERS ATTEMPTED (Enumeration):")
    print("-" * 40)
    for user, count in Counter(invalid_users).most_common(10):
        print(f"    {count:5d} attempts with '{user}'")
    
    print("\\n[+] SUDO COMMANDS EXECUTED:")
    print("-" * 40)
    for cmd, count in Counter(sudo_commands).most_common(10):
        print(f"    {count:5d}x {cmd[:50]}")
    
    print("\\n[+] IOCs FOR BLOCKING (Unique IPs):")
    print("-" * 40)
    unique_ips = sorted(set(failed_ips))
    for ip in unique_ips[:20]:
        print(f"    {ip}")
    
    print("\\n" + "=" * 60)
    print("                 END OF REPORT")
    print("=" * 60)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(f"Usage: {sys.argv[0]} <auth.log>")
        sys.exit(1)
    extract_iocs(sys.argv[1])`
  },
  {
    id: 'linux-lab4',
    title: 'Lab 4: تحقيق شامل في اختراق محتمل',
    objective: 'تنفيذ تحقيق كامل على نظام Linux مشتبه باختراقه',
    tools: ['Linux', 'ps', 'ss', 'find', 'grep', 'journalctl'],
    steps: [
      {
        step: 1,
        description: 'فحص العمليات الجارية',
        command: `ps auxf
# ابحث عن عمليات مشبوهة`,
        expected: 'قائمة بالعمليات'
      },
      {
        step: 2,
        description: 'فحص الاتصالات الشبكية',
        command: `ss -antup
netstat -antup`,
        expected: 'الاتصالات النشطة'
      },
      {
        step: 3,
        description: 'فحص السجلات الأخيرة',
        command: `sudo journalctl --since "1 hour ago" | head -100
sudo tail -100 /var/log/auth.log`,
        expected: 'أحداث آخر ساعة'
      },
      {
        step: 4,
        description: 'فحص المستخدمين النشطين',
        command: `who
last | head -20
lastb | head -10`,
        expected: 'من مسجل الدخول'
      },
      {
        step: 5,
        description: 'فحص cron jobs لكل المستخدمين',
        command: `for user in $(cut -f1 -d: /etc/passwd); do
  echo "=== $user ==="
  crontab -u $user -l 2>/dev/null
done`,
        expected: 'المهام المجدولة'
      },
      {
        step: 6,
        description: 'فحص ملفات بدء التشغيل',
        command: `ls -la /etc/init.d/
ls -la /etc/systemd/system/
ls -la /etc/rc.local 2>/dev/null`,
        expected: 'خدمات البدء'
      },
      {
        step: 7,
        description: 'فحص bash history',
        command: `cat /root/.bash_history 2>/dev/null | tail -50
for user in $(ls /home/); do
  echo "=== $user ==="
  cat /home/$user/.bash_history 2>/dev/null | tail -20
done`,
        expected: 'أوامر المستخدمين'
      },
      {
        step: 8,
        description: 'البحث عن ملفات حديثة (آخر 24 ساعة)',
        command: `find / -mtime -1 -type f 2>/dev/null | grep -v "/proc\\|/sys\\|/run" | head -50`,
        expected: 'ملفات معدلة حديثاً'
      },
      {
        step: 9,
        description: 'البحث عن ملفات SUID',
        command: `find / -perm -4000 -type f 2>/dev/null`,
        expected: 'ملفات SUID'
      },
      {
        step: 10,
        description: 'فحص مفاتيح SSH',
        command: `find / -name "authorized_keys" 2>/dev/null -exec cat {} \\;`,
        expected: 'مفاتيح SSH المسموحة'
      },
      {
        step: 11,
        description: 'فحص /etc/passwd للمستخدمين الجدد',
        command: `cat /etc/passwd | grep -v nologin | grep -v false`,
        expected: 'المستخدمون الذين يمكنهم تسجيل الدخول'
      },
      {
        step: 12,
        description: 'فحص الملفات المخفية في /tmp',
        command: `ls -la /tmp/
ls -la /dev/shm/
ls -la /var/tmp/`,
        expected: 'ملفات مؤقتة'
      }
    ],
    filters: [
      'ps aux | grep -E "/tmp|/dev/shm"',
      'ss -antup | grep ESTAB',
      'find / -name ".*" -type f 2>/dev/null'
    ],
    deliverable: `# Linux Investigation Report

## Case Information
- **Case ID:** LIN-2025-001
- **Analyst:** [اسمك]
- **Date:** [التاريخ]
- **System:** [اسم السيرفر]
- **Severity:** [Low/Medium/High/Critical]

## Executive Summary
[ملخص من سطرين عما وجدته]

## Timeline
| Time | Event | Source |
|------|-------|--------|
| | | |

## Findings

### 1. Suspicious Processes
| PID | User | Command | Notes |
|-----|------|---------|-------|
| | | | |

### 2. Network Connections
| Local | Remote | State | Process |
|-------|--------|-------|---------|
| | | | |

### 3. Suspicious Files
| Path | Modified | Permissions | Notes |
|------|----------|-------------|-------|
| | | | |

### 4. User Activity
- Logged in users:
- Recent logins:
- Failed logins:

### 5. Persistence Mechanisms
- [ ] Cron jobs checked
- [ ] Systemd services checked
- [ ] RC scripts checked
- [ ] Bashrc/profile checked
- [ ] SSH keys checked

### 6. Bash History Analysis
[أوامر مشبوهة وجدتها]

## Evidence
\`\`\`
[الصق الأدلة المهمة هنا]
\`\`\`

## MITRE ATT&CK Mapping
- **Tactic:** 
- **Technique:** T____

## Assessment
- [ ] True Positive
- [ ] False Positive
- [ ] Needs More Investigation

## Recommendations
1. 
2. 
3. 

## Containment Actions Taken
- [ ] System isolated
- [ ] Malicious process killed
- [ ] IP blocked
- [ ] User disabled`
  },
  {
    id: 'linux-lab5',
    title: 'Lab 5: إعداد Persistence ومحاولة اكتشافه',
    objective: 'فهم كيف يثبت المهاجم وجوده وكيف تكتشفه',
    tools: ['Linux', 'cron', 'systemd', 'bash'],
    steps: [
      {
        step: 1,
        description: 'إنشاء cron job مشبوه (للتعلم فقط)',
        command: `# أضف cron job يكتب للـ log كل دقيقة
echo "* * * * * echo 'beacon' >> /tmp/.hidden_log" | crontab -`,
        expected: 'cron job تمت إضافته'
      },
      {
        step: 2,
        description: 'إنشاء ملف في /tmp',
        command: `echo '#!/bin/bash
# Fake malware for testing
while true; do sleep 60; done' > /tmp/.malware.sh
chmod +x /tmp/.malware.sh`,
        expected: 'ملف مخفي تم إنشاؤه'
      },
      {
        step: 3,
        description: 'إضافة سطر لـ bashrc',
        command: `echo '# Hidden command' >> ~/.bashrc
echo 'echo "Welcome back" >> /tmp/.activity.log' >> ~/.bashrc`,
        expected: 'تعديل bashrc'
      },
      {
        step: 4,
        description: 'الآن ابحث عن كل ما أضفته',
        command: `# فحص cron
crontab -l

# فحص الملفات المخفية
ls -la /tmp/

# فحص bashrc
tail -5 ~/.bashrc`,
        expected: 'وجدت كل الـ persistence'
      },
      {
        step: 5,
        description: 'تنظيف: إزالة كل ما أضفته',
        command: `crontab -r
rm /tmp/.malware.sh /tmp/.hidden_log 2>/dev/null
# أزل الأسطر من bashrc يدوياً`,
        expected: 'تم التنظيف'
      }
    ],
    filters: [
      'crontab -l',
      'ls -la /tmp/',
      'cat ~/.bashrc'
    ],
    deliverable: `# Persistence Detection Checklist

## Cron Jobs
- [ ] crontab -l لكل مستخدم
- [ ] ls -la /etc/cron*
- [ ] cat /var/spool/cron/crontabs/*

## Startup Scripts
- [ ] /etc/init.d/
- [ ] /etc/systemd/system/
- [ ] /etc/rc.local

## Shell Configs
- [ ] ~/.bashrc
- [ ] ~/.bash_profile
- [ ] /etc/profile
- [ ] /etc/bash.bashrc

## SSH Keys
- [ ] ~/.ssh/authorized_keys
- [ ] /root/.ssh/authorized_keys

## Hidden Files
- [ ] /tmp/
- [ ] /dev/shm/
- [ ] /var/tmp/

## What I Found:
[اكتب ما وجدته]`
  }
];
