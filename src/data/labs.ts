import { Lab } from '../types';

export const labs: Lab[] = [
  {
    id: 'lab1',
    title: 'Lab 1: تحليل زيارة موقع HTTPS',
    objective: 'تحليل زيارة كاملة لـ https://example.com وفهم كل خطوة من DNS إلى TLS',
    tools: ['Wireshark', 'curl', 'Terminal'],
    steps: [
      {
        step: 1,
        description: 'افتح Wireshark على Kali',
        expected: 'نافذة Wireshark مفتوحة'
      },
      {
        step: 2,
        description: 'اختر interface (عادة eth0)',
        expected: 'الـ interface محدد'
      },
      {
        step: 3,
        description: 'ابدأ Capture',
        expected: 'Wireshark يسجل الترافيك'
      },
      {
        step: 4,
        command: 'curl -I https://example.com',
        description: 'في terminal ثاني، نفذ أمر curl',
        expected: 'تظهر HTTP headers'
      },
      {
        step: 5,
        description: 'أوقف Capture بعد 30 ثانية',
        expected: 'الـ capture متوقف'
      },
      {
        step: 6,
        command: 'dns and dns.qry.name contains "example.com"',
        description: 'فلتر DNS Resolution',
        expected: 'تشوف DNS query و response'
      },
      {
        step: 7,
        command: 'tcp.flags.syn == 1',
        description: 'فلتر TCP Handshake',
        expected: 'تشوف SYN, SYN-ACK, ACK'
      },
      {
        step: 8,
        command: 'tls.handshake.type == 1',
        description: 'فلتر TLS Handshake',
        expected: 'تشوف ClientHello مع SNI'
      }
    ],
    filters: [
      'dns and dns.qry.name contains "example.com"',
      'tcp.flags.syn == 1',
      'tls.handshake.type == 1',
      'tls.handshake.extensions_server_name contains "example"'
    ],
    deliverable: `# Lab 1: HTTPS Traffic Analysis

## Objective
تحليل زيارة كاملة لـ https://example.com

## Timeline
| Time | Event | Source |
|------|-------|--------|
| HH:MM | DNS query for example.com | Client |
| HH:MM | DNS response: [IP] | DNS Server |
| HH:MM | TCP SYN to [IP]:443 | Client |
| HH:MM | TCP handshake completed | Both |
| HH:MM | TLS ClientHello (SNI: example.com) | Client |
| HH:MM | TLS ServerHello | Server |
| HH:MM | Certificate exchange | Server |
| HH:MM | Encrypted data starts | Both |

## Observations
- Total handshake time: ~___ms
- TLS version: ___
- Cipher suite: ___
- No anomalies detected / الملاحظات: ___

## Screenshots
[أضف screenshots هنا]`
  },
  {
    id: 'lab2',
    title: 'Lab 2: كشف Port Scan',
    objective: 'التعرف على أنماط Port Scanning في Wireshark وكتابة تقرير',
    tools: ['Wireshark', 'nmap', 'Kali Linux', 'Windows VM'],
    steps: [
      {
        step: 1,
        description: 'شغل Wireshark على الشبكة المحلية',
        expected: 'Wireshark جاهز للـ capture'
      },
      {
        step: 2,
        description: 'ابدأ Capture',
        expected: 'الترافيك يتسجل'
      },
      {
        step: 3,
        command: 'nmap -sS 192.168.56.10',
        description: 'نفذ SYN scan على Windows machine',
        expected: 'nmap يشتغل ويعرض النتائج'
      },
      {
        step: 4,
        description: 'أوقف Capture',
        expected: 'الـ PCAP جاهز للتحليل'
      },
      {
        step: 5,
        command: 'tcp.flags.syn == 1 and tcp.flags.ack == 0',
        description: 'فلتر SYN packets فقط',
        expected: 'تشوف مئات SYN packets'
      },
      {
        step: 6,
        description: 'حلل: كم SYN packet؟ كم port مستهدف؟ كم RST رجع؟',
        expected: 'إحصائيات واضحة'
      },
      {
        step: 7,
        description: 'استخدم Statistics → Conversations',
        expected: 'تشوف كل الاتصالات مرتبة'
      }
    ],
    filters: [
      'tcp.flags.syn == 1 and tcp.flags.ack == 0',
      'tcp.flags.reset == 1',
      'ip.src == [KALI_IP]',
      'tcp.flags.syn == 1 and tcp.flags.ack == 1'
    ],
    deliverable: `# Lab 2: Port Scan Detection

## Summary
تم رصد نشاط Port Scanning من [KALI_IP] إلى [TARGET_IP]

## Statistics
- عدد SYN packets: ___
- المدة الزمنية: ___ ثانية
- عدد Ports المستهدفة: ___
- Ports المفتوحة (رد SYN-ACK): ___
- Ports المغلقة (رد RST): ___

## Detection Method
- فلتر مستخدم: tcp.flags.syn == 1 and tcp.flags.ack == 0
- العلامة: مئات SYN في ثواني من IP واحد

## MITRE ATT&CK
- Tactic: Discovery
- Technique: T1046 - Network Service Discovery

## Recommendation
- Block source IP
- Investigate the source machine
- Check for compromise indicators`
  },
  {
    id: 'lab3',
    title: 'Lab 3: كشف DNS مشبوه (DGA)',
    objective: 'محاكاة Domain Generation Algorithm وكشفه في Wireshark',
    tools: ['Wireshark', 'dig', 'bash', 'Kali Linux'],
    steps: [
      {
        step: 1,
        description: 'شغل Wireshark على interface الشبكة',
        expected: 'Wireshark جاهز'
      },
      {
        step: 2,
        description: 'ابدأ Capture',
        expected: 'الترافيك يتسجل'
      },
      {
        step: 3,
        command: 'for i in {1..50}; do dig $(cat /dev/urandom | tr -dc \'a-z\' | head -c 15).com; done',
        description: 'نفذ سكريبت محاكاة DGA',
        expected: '50 DNS query لـ domains عشوائية'
      },
      {
        step: 4,
        description: 'أوقف Capture',
        expected: 'الـ PCAP جاهز'
      },
      {
        step: 5,
        command: 'dns.flags.rcode == 3',
        description: 'فلتر NXDOMAIN responses',
        expected: 'معظم الـ queries ترجع NXDOMAIN'
      },
      {
        step: 6,
        description: 'لاحظ pattern الأسماء العشوائية',
        expected: 'أسماء بدون معنى، طول غير طبيعي'
      },
      {
        step: 7,
        description: 'احسب نسبة NXDOMAIN إلى total DNS',
        expected: 'نسبة عالية جداً = مشبوه'
      }
    ],
    filters: [
      'dns',
      'dns.flags.rcode == 3',
      'dns.qry.name',
      'dns.flags.response == 1'
    ],
    deliverable: `# Lab 3: DGA Detection

## Summary
تم رصد نشاط DGA مشبوه من [SOURCE_IP]

## Evidence
- عدد DNS queries: 50
- عدد NXDOMAIN: ___
- نسبة الفشل: ___%
- أمثلة على domains مشبوهة:
  - xkjfhqwlmnbvcxz.com
  - zxcvbnmqwerty.com
  - [أضف أمثلة من الـ capture]

## DGA Indicators
- [x] أسماء عشوائية بدون معنى
- [x] طول غير طبيعي
- [x] نسبة NXDOMAIN عالية
- [x] تواتر سريع (عدة queries في ثواني)

## MITRE ATT&CK
- Tactic: Command and Control
- Technique: T1568.002 - Domain Generation Algorithms

## Recommendation
- Isolate the infected machine
- Memory forensics للبحث عن malware
- Check مع Threat Intel feeds`
  },
  {
    id: 'lab4',
    title: 'Lab 4: تحليل HTTP Brute Force',
    objective: 'محاكاة وكشف هجوم Brute Force على صفحة Login',
    tools: ['Wireshark', 'curl', 'bash', 'Web Server (Apache/Nginx)'],
    steps: [
      {
        step: 1,
        description: 'تأكد من وجود web server مع صفحة login',
        expected: 'http://TARGET/login يعمل'
      },
      {
        step: 2,
        description: 'شغل Wireshark',
        expected: 'جاهز للـ capture'
      },
      {
        step: 3,
        description: 'ابدأ Capture',
        expected: 'الترافيك يتسجل'
      },
      {
        step: 4,
        command: 'for i in {1..10}; do curl -X POST -d "user=admin&pass=wrong$i" http://192.168.56.10/login; done',
        description: 'نفذ محاولات login فاشلة',
        expected: '10 محاولات POST'
      },
      {
        step: 5,
        description: 'أوقف Capture',
        expected: 'الـ PCAP جاهز'
      },
      {
        step: 6,
        command: 'http.request.method == "POST"',
        description: 'فلتر POST requests',
        expected: 'تشوف 10 POST requests'
      },
      {
        step: 7,
        command: 'http.response.code == 401 or http.response.code == 403',
        description: 'فلتر الردود الفاشلة',
        expected: 'تشوف 401/403 responses'
      },
      {
        step: 8,
        description: 'تتبع HTTP stream لواحدة منهم',
        expected: 'تشوف credentials في الـ body'
      }
    ],
    filters: [
      'http.request.method == "POST"',
      'http.response.code == 401',
      'http.response.code == 403',
      'http and ip.src == [ATTACKER_IP]'
    ],
    deliverable: `# Lab 4: HTTP Brute Force Detection

## Summary
تم رصد محاولات Brute Force على [TARGET]/login

## Statistics
- Source IP: ___
- Target: ___/login
- عدد المحاولات: ___
- المدة الزمنية: ___ ثواني
- Response codes: 401/403

## Evidence
- POST requests متعددة من نفس الـ IP
- نفس الـ endpoint (/login)
- credentials مختلفة في كل request
- كل الردود failed (401/403)

## Sample Credentials Tried
| Username | Password |
|----------|----------|
| admin | wrong1 |
| admin | wrong2 |
| ... | ... |

## MITRE ATT&CK
- Tactic: Credential Access
- Technique: T1110 - Brute Force

## Recommendation
- Block source IP temporarily
- Implement rate limiting
- Add CAPTCHA after 3 failed attempts
- Check if any attempt succeeded`
  },
  {
    id: 'lab5',
    title: 'Lab 5: تحليل SMB Lateral Movement',
    objective: 'فهم كيف يظهر Lateral Movement عبر SMB في الترافيك',
    tools: ['Wireshark', 'Windows VMs', 'smbclient'],
    steps: [
      {
        step: 1,
        description: 'شغل Wireshark على الشبكة',
        expected: 'جاهز للـ capture'
      },
      {
        step: 2,
        description: 'ابدأ Capture',
        expected: 'الترافيك يتسجل'
      },
      {
        step: 3,
        command: 'smbclient //192.168.56.10/C$ -U administrator',
        description: 'اتصل بـ administrative share على Windows',
        expected: 'اتصال SMB'
      },
      {
        step: 4,
        description: 'استعرض بعض الملفات أو انسخ ملف',
        expected: 'ترافيك SMB إضافي'
      },
      {
        step: 5,
        description: 'أوقف Capture',
        expected: 'الـ PCAP جاهز'
      },
      {
        step: 6,
        command: 'smb2',
        description: 'فلتر SMB traffic',
        expected: 'تشوف SMB negotiation وcommands'
      },
      {
        step: 7,
        description: 'ابحث عن Tree Connect لـ C$ أو ADMIN$',
        expected: 'Administrative share access واضح'
      }
    ],
    filters: [
      'smb2',
      'smb2.cmd == 3',
      'smb2.tree contains "C$"',
      'smb2.tree contains "ADMIN$"'
    ],
    deliverable: `# Lab 5: SMB Lateral Movement Analysis

## Summary
تم رصد اتصال SMB لـ Administrative Share

## Connection Details
- Source: ___
- Destination: ___:445
- Share accessed: C$ / ADMIN$ / IPC$
- Username: ___

## Timeline
| Time | Action |
|------|--------|
| HH:MM | SMB Negotiate |
| HH:MM | Session Setup |
| HH:MM | Tree Connect to C$ |
| HH:MM | File operations |

## Red Flags
- [x] Access to admin shares (C$, ADMIN$)
- [ ] Workstation to Workstation SMB
- [ ] Unusual time (after hours)
- [ ] PSExec-like behavior

## MITRE ATT&CK
- Tactic: Lateral Movement
- Technique: T1021.002 - SMB/Windows Admin Shares

## Recommendation
- Verify if this is authorized admin activity
- Check source machine for compromise
- Review similar SMB connections`
  }
];
