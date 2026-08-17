import { Lab } from '../types';

export const labs: Lab[] = [
  {
    id: 'lab1',
    title: 'Lab 1: DNS → TCP → TLS لزيارة HTTPS',
    objective: 'التقاط زيارة موثقة إلى example.com وفصل ما تثبته DNS/TCP/TLS عما يبقى مشفرًا أو قد يختفي بسبب cache وECH وHTTP/3.',
    tools: ['Wireshark أو tshark', 'curl', 'dig', 'Linux lab VM'],
    estimatedMinutes: 75,
    safety: 'التقط حركة VM المختبر فقط، وأغلق التطبيقات الأخرى لتقليل البيانات الشخصية. example.com نطاق توثيق؛ لا ترفع PCAP إلى خدمة عامة.',
    prerequisites: ['NAT للـVM', 'Wireshark/tshark مثبت', 'صلاحية capture', 'وقت النظام صحيح'],
    steps: [
      {
        step: 1,
        description: 'حدد interface والـIP والـresolver وسجّل baseline قبل الالتقاط.',
        command: `ip -br address
ip route
cat /etc/resolv.conf
date -u +%FT%TZ`,
        expected: 'تعرف interface وclient IP وDNS resolver والوقت.',
        why: 'لا تفسّر packet بلا endpoints ووقت موثوق.'
      },
      {
        step: 2,
        description: 'ابدأ capture في Terminal A مع حجم محدود، واستبدل INTERFACE فقط.',
        command: `sudo tshark -i INTERFACE -a duration:45 -a filesize:10240 \\
  -w "$HOME/soc-lab-https.pcapng"`,
        expected: 'Capture لمدة أقصاها 45 ثانية أو 10 MiB.',
        caution: 'لا تستخدم interface جهاز العمل ولا capture مفتوحًا بلا حد.'
      },
      {
        step: 3,
        description: 'في Terminal B ولّد DNS صريحًا ثم HTTPS عبر TCP/HTTP 1.1 لتقليل اختلاف HTTP/3.',
        command: `dig example.com A +tries=1 +time=3
curl --http1.1 --connect-timeout 5 --max-time 15 -sS -o /dev/null \\
  -w 'remote_ip=%{remote_ip} code=%{http_code} tls=%{ssl_version} total=%{time_total}\\n' \\
  https://example.com/`,
        expected: 'DNS answer وHTTP status وremote IP وTLS info؛ إن فشل الاتصال احتفظ بالخطأ كدليل.',
        why: 'dig يولد DNS تقليديًا مستقلًا عن browser cache؛ فرض HTTP/1.1 يمنع انتقال curl إلى QUIC إن دعمه.'
      },
      {
        step: 4,
        description: 'أوقف/انتظر نهاية الالتقاط ثم احسب مراحل DNS وTCP وTLS.',
        command: `tshark -r "$HOME/soc-lab-https.pcapng" -Y 'dns.qry.name == "example.com"' \\
  -T fields -e frame.time_relative -e ip.src -e ip.dst -e dns.flags.response -e dns.a
tshark -r "$HOME/soc-lab-https.pcapng" -Y 'tcp.flags.syn == 1' \\
  -T fields -e frame.time_relative -e ip.src -e tcp.srcport -e ip.dst -e tcp.dstport -e tcp.flags.ack
tshark -r "$HOME/soc-lab-https.pcapng" -Y 'tls.handshake.type == 1 or tls.handshake.type == 2' \\
  -T fields -e frame.time_relative -e ip.src -e ip.dst -e tls.handshake.type -e tls.handshake.version`,
        expected: 'صفوف DNS وSYN/SYN-ACK وClientHello/ServerHello إن التقطت interface الصحيح.'
      },
      {
        step: 5,
        description: 'افحص حدود الرؤية بدل افتراض ظهور SNI أو الشهادة دائمًا.',
        command: `tshark -r "$HOME/soc-lab-https.pcapng" -Y 'tls.handshake.type == 1' \\
  -T fields -e frame.number -e tls.handshake.extensions_server_name -e tls.handshake.extensions.supported_version
tshark -r "$HOME/soc-lab-https.pcapng" -Y 'tls.app_data' | wc -l`,
        expected: 'قد يظهر SNI في ClientHello؛ مع ECH قد لا يظهر الاسم الحقيقي. Application Data مشفرة.',
        caution: 'TLS 1.3 قد يشفر رسائل handshake لاحقة؛ غياب certificate في PCAP لا يعني غياب TLS.'
      },
      {
        step: 6,
        description: 'احسب زمن TCP handshake يدويًا من timestamps وتحقق من الاتجاهات.',
        expected: 'فرق SYN→SYN-ACK وSYN→ACK موثق، مع client/server IPs الصحيحة.',
        why: 'زمن curl الكلي يشمل DNS/TCP/TLS/HTTP ولا يساوي handshake واحدًا.'
      }
    ],
    filters: ['dns.qry.name == "example.com"', 'tcp.flags.syn == 1', 'tls.handshake.type == 1', 'tls.handshake.type == 2', 'tls.app_data'],
    evidence: ['PCAP hash', 'client/resolver/server IP', 'DNS transaction', 'TCP stream', 'TLS version/SNI visibility', 'curl timing'],
    cleanup: `sha256sum "$HOME/soc-lab-https.pcapng"; احفظ نسخة evidence منضبطة ثم احذف PCAP الخام عندما تنتهي مدة الاحتفاظ.`,
    deliverable: `# HTTPS Connection Analysis

## Scope
- Interface/client/resolver/time: ___
- PCAP SHA-256: ___

## Timeline
| Relative time | Layer | Source → destination | Fact |
|---:|---|---|---|
| | DNS | | |
| | TCP | | |
| | TLS | | |

## Measurements
- DNS response time: ___
- TCP SYN→SYN-ACK / full handshake: ___
- curl total time: ___

## Visibility limits
- SNI visible? ___ Why might it be absent? ___
- HTTP path/body visible? ___
- Certificate visible? ___
- Claims this PCAP cannot support: ___`
  },
  {
    id: 'lab2',
    title: 'Lab 2: Network Scan منخفض الأثر داخل Host-only',
    objective: 'توليد scan محدود لسبعة منافذ على VM مملوكة، وقياس fan-out والردود دون مساواة scan تلقائيًا بالاختراق.',
    tools: ['جهازا lab VM', 'nmap', 'Wireshark/tshark'],
    estimatedMinutes: 75,
    safety: 'Host-only فقط. افصل Bridged/NAT أثناء الاختبار، تحقق من MAC/IP الهدف، وافحص سبعة منافذ بمعدل منخفض. يمنع فحص الجامعة/العمل/الإنترنت.',
    prerequisites: ['Snapshot', 'TARGET_IP لVM تملكها', 'SOURCE_IP موثق', 'اختبار ping/ARP يؤكد الهدف'],
    steps: [
      {
        step: 1,
        description: 'ثبت حدود الاختبار وتأكد أن الهدف Host-only قبل أي scan.',
        command: `ip -br address
ip route
ip neigh show TARGET_IP
ping -c 1 -W 1 TARGET_IP`,
        expected: 'TARGET_IP على subnet المعزول وMAC معروف.',
        caution: 'لا تتابع إذا كان TARGET_IP placeholder أو route يخرج عبر الإنترنت.'
      },
      {
        step: 2,
        description: 'ابدأ capture محدودًا على interface المعزول في Terminal A.',
        command: `sudo tshark -i HOST_ONLY_INTERFACE -a duration:60 -a filesize:10240 \\
  -f 'host TARGET_IP and tcp' -w "$HOME/soc-lab-scan.pcapng"`,
        expected: 'Capture محدود بالهدف وTCP.'
      },
      {
        step: 3,
        description: 'في Terminal B نفّذ TCP connect scan منخفض المعدل على قائمة ثابتة.',
        command: `nmap -sT -Pn -p 22,80,135,139,443,445,3389 --max-rate 2 \\
  --max-retries 1 --host-timeout 45s TARGET_IP`,
        expected: 'نتيجة open/closed/filtered لسبعة منافذ فقط.',
        why: '-sT يستخدم connect() بلا raw SYN privilege؛ النمط يبقى fan-out نحو عدة منافذ.'
      },
      {
        step: 4,
        description: 'استخرج SYN الأولي والردود واحسب المنافذ المميزة.',
        command: `tshark -r "$HOME/soc-lab-scan.pcapng" \\
  -Y 'ip.src==SOURCE_IP && ip.dst==TARGET_IP && tcp.flags.syn==1 && tcp.flags.ack==0' \\
  -T fields -e frame.time_relative -e tcp.dstport
tshark -r "$HOME/soc-lab-scan.pcapng" \\
  -Y 'ip.src==TARGET_IP && ip.dst==SOURCE_IP && (tcp.flags.syn==1 || tcp.flags.reset==1)' \\
  -T fields -e frame.time_relative -e tcp.srcport -e tcp.flags.syn -e tcp.flags.ack -e tcp.flags.reset`,
        expected: 'حتى سبعة SYN أولية وردود SYN-ACK/RST أو غياب بسبب filtering.'
      },
      {
        step: 5,
        description: 'احسب fan-out والنافذة الزمنية دون الاعتماد على وصف nmap فقط.',
        command: `tshark -r "$HOME/soc-lab-scan.pcapng" \\
  -Y 'ip.src==SOURCE_IP && ip.dst==TARGET_IP && tcp.flags.syn==1 && tcp.flags.ack==0' \\
  -T fields -e tcp.dstport | sort -nu | tee /tmp/soc-lab-ports.txt | wc -l`,
        expected: 'عدد المنافذ المميزة ≤7؛ راجع retransmissions عند اختلاف packet count.',
        why: 'قاعدة الكشف عادة تجمع distinct destination ports داخل window، لا عدد packets الخام فقط.'
      },
      {
        step: 6,
        description: 'صنّف النشاط بالسياق واكتب falsification test.',
        expected: 'Benign Positive لأنه اختبار مصرح؛ في الإنتاج تحقق من scanner inventory/change ticket/source owner قبل block.',
        caution: 'لا تحظر source آليًا؛ قد يكون vulnerability scanner أو monitoring أو NAT مشتركًا.'
      }
    ],
    filters: ['SYN بدون ACK من المصدر', 'distinct tcp.dstport', 'SYN-ACK=open candidate', 'RST=closed candidate', 'غياب الرد=filtered/loss/visibility gap'],
    evidence: ['حدود التفويض', 'IP/MAC/interface', 'nmap output', 'PCAP hash', 'distinct ports/time window', 'response classification'],
    cleanup: 'احذف /tmp/soc-lab-ports.txt، وأوقف capture، واحفظ PCAP وفق سياسة المختبر ثم أعد Snapshot إن غيّرت firewall.',
    deliverable: `# Authorized Scan Detection

## Authorization and scope
- Source/target/interface: ___
- Ports/rate/window: ___
- Proof target is lab-owned: ___

## Evidence
- Distinct ports: ___
- SYN count vs retransmissions: ___
- SYN-ACK/RST/no-response: ___
- PCAP SHA-256: ___

## Assessment
- Classification: Benign Positive
- Why this resembles T1046 behavior: ___
- Why it does not prove compromise: ___
- Production validation and escalation: ___`
  },
  {
    id: 'lab3',
    title: 'Lab 3: DNS DGA-like آمن باستخدام .invalid',
    objective: 'توليد أسماء حتمية تحت .invalid نحو resolver مختبر، وقياس NXDOMAIN والخصائص اللفظية مع اختبار false positive.',
    tools: ['Linux lab VM', 'resolver محلي في Host-only', 'dig', 'Wireshark/tshark'],
    estimatedMinutes: 90,
    safety: 'استخدم LAB_DNS_IP لمحلل DNS تملكه داخل Host-only. نطاق .invalid محجوز للأمثلة ولا تسأل public resolvers ولا تولّد نطاقات .com عشوائية.',
    prerequisites: ['LAB_DNS_IP موثق داخل الشبكة المعزولة', 'dig وtshark', 'Snapshot'],
    steps: [
      {
        step: 1,
        description: 'أنشئ dataset حتميًا يجمع أسماء DGA-like وأسماء طبيعية كلها تحت .invalid.',
        command: `cat > /tmp/soc-lab-domains.txt <<'EOF'
q7m2v9k4p8x1.invalid
z4t8n2c7w5r9.invalid
m9k3q8v2x6p4.invalid
b7w2z9n5t3c8.invalid
portal.invalid
updates.invalid
mail.invalid
vpn.invalid
EOF
nl -ba /tmp/soc-lab-domains.txt`,
        expected: '8 أسماء: أربعة عشوائية الشكل وأربعة قابلة للقراءة.',
        why: 'وجود controls طبيعية يسمح باختبار أن NXDOMAIN وحده لا يميز DGA.'
      },
      {
        step: 2,
        description: 'ابدأ capture محدودًا بـDNS والـresolver المختبري.',
        command: `sudo tshark -i HOST_ONLY_INTERFACE -a duration:45 -a filesize:5120 \\
  -f 'host LAB_DNS_IP and port 53' -w "$HOME/soc-lab-dns.pcapng"`,
        expected: 'Capture محدود.'
      },
      {
        step: 3,
        description: 'في Terminal B أرسل query واحدة لكل اسم إلى resolver المحلي فقط.',
        command: `while IFS= read -r domain; do
  dig @LAB_DNS_IP "$domain" A +tries=1 +time=1 +noall +comments
  sleep 0.25
done < /tmp/soc-lab-domains.txt`,
        expected: 'عادة NXDOMAIN لكل .invalid؛ timeouts تعني gap في resolver/route.',
        caution: 'تأكد أن LAB_DNS_IP ليس 8.8.8.8 أو resolver عامًا.'
      },
      {
        step: 4,
        description: 'استخرج query/response/rcode واربطها بالـtransaction ID والوقت.',
        command: `tshark -r "$HOME/soc-lab-dns.pcapng" -Y 'dns' \\
  -T fields -e frame.time_relative -e ip.src -e ip.dst -e dns.id \\
  -e dns.flags.response -e dns.flags.rcode -e dns.qry.name`,
        expected: 'queries وردود؛ rcode=3 يعني NXDOMAIN.'
      },
      {
        step: 5,
        description: 'احسب إجمالي responses وNXDOMAIN والنسبة، ثم قارن المجموعتين.',
        command: `total=$(tshark -r "$HOME/soc-lab-dns.pcapng" -Y 'dns.flags.response==1' | wc -l)
nxd=$(tshark -r "$HOME/soc-lab-dns.pcapng" -Y 'dns.flags.response==1 && dns.flags.rcode==3' | wc -l)
printf 'responses=%s nxdomain=%s ratio=' "$total" "$nxd"
awk -v n="$nxd" -v t="$total" 'BEGIN{if(t)printf "%.2f\\n",n/t;else print "undefined"}'`,
        expected: 'قد تكون النسبة 1.00 لكلتا المجموعتين؛ لذلك ليست verdict.',
        why: 'Typos، service discovery، misconfiguration وprivacy features قد ترفع NXDOMAIN أيضًا.'
      },
      {
        step: 6,
        description: 'اكتب detection متعددة الخصائص وfalsification test.',
        expected: 'اجمع rate + unique names + length/entropy-like shape + process/host + age/context؛ اطلب endpoint/DNS logs قبل ATT&CK verdict.',
        caution: 'لا تصف هذا المختبر بأنه malware أو C2؛ هو DGA-like simulation فقط.'
      }
    ],
    filters: ['dns.flags.rcode == 3', 'dns.flags.response == 0', 'dns.qry.name endswith .invalid', 'source host + time window + unique names'],
    evidence: ['domain dataset', 'resolver/interface', 'PCAP hash', 'rcode counts', 'comparison DGA-like vs readable', 'false-positive explanation'],
    cleanup: 'احذف /tmp/soc-lab-domains.txt وأوقف capture، ثم احتفظ بالـPCAP المصطنع فقط ضمن Portfolio بلا بيانات حقيقية.',
    deliverable: `# DGA-like DNS Investigation

## Dataset and scope
- Resolver/source/window: ___
- DGA-like controls: 4 / readable controls: 4

## Measurements
- Queries/responses/NXDOMAIN: ___ / ___ / ___
- Ratio: ___
- Unique labels and rate: ___

## Reasoning
- Why NXDOMAIN alone failed: ___
- Additional endpoint/process evidence needed: ___
- Benign alternative: ___
- When T1568.002 mapping would be justified: ___

## Classification
Benign Positive — synthetic DGA-like traffic, not proven C2.`
  },
  {
    id: 'lab4',
    title: 'Lab 4: HTTP Login Failures على خادم مختبري',
    objective: 'إنشاء endpoint محلي يعيد 401 دائمًا، توليد خمس محاولات dummy، وربط الطلبات بالردود مع فهم خطر HTTP plaintext.',
    tools: ['جهازا Host-only VM', 'Python 3', 'curl', 'Wireshark/tshark'],
    estimatedMinutes: 90,
    safety: 'الخادم والعميل داخل Host-only فقط وببيانات dummy. لا تستخدم كلمات مرور حقيقية؛ HTTP يكشف body لمن يملك الرؤية. أوقف الخادم بعد المختبر.',
    prerequisites: ['SERVER_IP على VM مملوكة', 'Port 8080 مسموح داخل Host-only', 'Python 3 وcurl'],
    steps: [
      {
        step: 1,
        description: 'على Server VM أنشئ خادمًا صغيرًا لا يخزن password ويعيد 401.',
        command: `cat > /tmp/soc_login_server.py <<'PY'
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs
import sys, time
class Handler(BaseHTTPRequestHandler):
    def do_POST(self):
        length = min(int(self.headers.get('Content-Length','0')), 2048)
        fields = parse_qs(self.rfile.read(length).decode('utf-8','replace'))
        user = fields.get('user',[''])[0]
        print(f"{time.time():.3f} path={self.path} user={user!r} result=denied", flush=True)
        self.send_response(401); self.end_headers(); self.wfile.write(b'Denied')
    def log_message(self, *_): pass
HTTPServer((sys.argv[1], 8080), Handler).serve_forever()
PY
python3 /tmp/soc_login_server.py SERVER_IP`,
        expected: 'الخادم يبقى في foreground؛ استخدم Terminal منفصل لإيقافه بـCtrl+C.',
        caution: 'استبدل SERVER_IP بعنوان Host-only محلي، لا 0.0.0.0 ولا public IP.'
      },
      {
        step: 2,
        description: 'على Client VM ابدأ capture محدودًا بالخادم والمنفذ.',
        command: `sudo tshark -i HOST_ONLY_INTERFACE -a duration:45 -a filesize:5120 \\
  -f 'host SERVER_IP and tcp port 8080' -w "$HOME/soc-lab-http-login.pcapng"`,
        expected: 'Capture محدود.'
      },
      {
        step: 3,
        description: 'أرسل خمس محاولات dummy ببطء وتحقق من status.',
        command: `for i in $(seq 1 5); do
  curl --connect-timeout 2 --max-time 5 -s -o /dev/null -w 'attempt='$i' status=%{http_code}\\n' \\
    -X POST --data-urlencode 'user=soclab' --data-urlencode "pass=SOC-LAB-DUMMY-$i" \\
    http://SERVER_IP:8080/login
  sleep 0.5
done`,
        expected: 'خمس حالات 401.',
        why: 'الـmarker dummy يمنع تسريب credential؛ العدد منخفض لتعليم النمط لا إجراء password attack.'
      },
      {
        step: 4,
        description: 'اربط requests وردودها عبر tcp.stream بدل العد المنفصل فقط.',
        command: `tshark -r "$HOME/soc-lab-http-login.pcapng" \\
  -Y 'http.request.method=="POST" or http.response.code==401' \\
  -T fields -e frame.time_relative -e tcp.stream -e ip.src -e ip.dst \\
  -e http.request.method -e http.request.uri -e http.response.code`,
        expected: 'POST و401 في streams يمكن تتبعها.'
      },
      {
        step: 5,
        description: 'أثبت خطر plaintext على dummy data فقط ثم لا تضع القيمة في Portfolio.',
        command: `tshark -r "$HOME/soc-lab-http-login.pcapng" -Y 'http.request.method=="POST"' \\
  -T fields -e tcp.stream -e http.file_data`,
        expected: 'قد ترى body URL-encoded؛ هذا سبب وجوب HTTPS.',
        caution: 'لا تنفذ هذا الفحص على PCAP حقيقي غير مصرح ولا تنسخ credentials إلى التقرير.'
      },
      {
        step: 6,
        description: 'قيّم هل البيانات تثبت نجاحًا أو brute force حقيقيًا.',
        expected: 'كل الردود 401 ولا نجاح؛ السياق يثبت Benign Positive. في الإنتاج اربط app auth logs وaccount/source/rate ونجاح لاحق.',
        why: 'Status 200 قد يكون صفحة login تعيد 200 حتى عند الفشل؛ semantics تأتي من التطبيق لا الرقم وحده.'
      }
    ],
    filters: ['tcp.port == 8080', 'http.request.method == "POST"', 'http.response.code == 401', 'tcp.stream للربط'],
    evidence: ['server log بلا passwords', 'client output', 'PCAP hash', 'streams وعدد 401', 'بيان عدم وجود success'],
    cleanup: 'Ctrl+C للخادم، ثم rm -f /tmp/soc_login_server.py. احذف/احمِ PCAP لأنها تحتوي dummy credentials واضحة، وأعد Snapshot.',
    deliverable: `# HTTP Authentication Failure Case

## Scope
- Client/server/interface/time: ___
- Dummy-data confirmation: ___

## Evidence
| Attempt/stream | Time | Endpoint | User | Response | Outcome meaning |
|---|---:|---|---|---:|---|
| | | | soclab | 401 | denied by lab server |

## Analysis
- Requests/failures/successes: ___ / ___ / 0
- Why HTTP is unsafe for credentials: ___
- Why 401/403/200 require app context: ___
- Classification: Benign Positive
- Production controls: HTTPS, server-side rate controls, MFA/risk signals, monitoring designed against lockout abuse.`
  },
  {
    id: 'lab5',
    title: 'Lab 5: SMB Share Access والسياق قبل Lateral Movement',
    objective: 'التقاط وصول مصرح إلى share غير إدارية وربطه بـSMB stages، ثم تحديد الأدلة الإضافية اللازمة قبل وصفه Lateral Movement.',
    tools: ['Windows/Samba lab server', 'Linux client', 'smbclient', 'Wireshark/tshark'],
    estimatedMinutes: 90,
    safety: 'Host-only فقط، حساب soclab وshare باسم SOC-LAB-SHARE وملف marker غير حساس. لا تستخدم C$/ADMIN$ أو credentials حقيقية ولا تضع password في command line.',
    prerequisites: ['Share مختبرية غير إدارية جاهزة', 'حساب soclab محدود الصلاحية', 'SERVER_IP وCLIENT_IP موثقان', 'SMB signing/encryption setting موثق'],
    steps: [
      {
        step: 1,
        description: 'على الخادم أنشئ SOC-LAB-SHARE حسب نظامك وضع marker.txt، ثم وثق الصلاحيات بدل توسيعها للجميع.',
        expected: 'soclab يملك read access فقط وmarker لا يحتوي بيانات حساسة.',
        caution: 'إعداد Samba/Windows share يختلف؛ معيار الأمان least privilege وليس نسخ ACL عمياء.'
      },
      {
        step: 2,
        description: 'ابدأ capture محدودًا بـTCP/445 بين جهازي المختبر.',
        command: `sudo tshark -i HOST_ONLY_INTERFACE -a duration:60 -a filesize:10240 \\
  -f 'host SERVER_IP and host CLIENT_IP and tcp port 445' \\
  -w "$HOME/soc-lab-smb.pcapng"`,
        expected: 'Capture محدود.'
      },
      {
        step: 3,
        description: 'من العميل افتح share بالحساب المحدود؛ أدخل كلمة المختبر عند prompt ثم اعرض واحصل على marker.',
        command: `smbclient //SERVER_IP/SOC-LAB-SHARE -U soclab \\
  -c 'ls; get marker.txt /tmp/soc-lab-smb-marker.txt; exit'
sha256sum /tmp/soc-lab-smb-marker.txt`,
        expected: 'List/get ناجحان دون admin share أو remote service.',
        caution: 'لا تستخدم -U user%password لأن password ستظهر في history/process arguments.'
      },
      {
        step: 4,
        description: 'استخرج Negotiate وSession Setup وTree Connect والعمليات المرئية.',
        command: `tshark -r "$HOME/soc-lab-smb.pcapng" -Y 'smb2' \\
  -T fields -e frame.time_relative -e tcp.stream -e ip.src -e ip.dst \\
  -e smb2.cmd -e smb2.sesid -e smb2.tid -e smb2.tree -e smb2.filename`,
        expected: 'SMB2 commands؛ filenames قد تغيب مع SMB encryption أو حسب decoder/packet.'
      },
      {
        step: 5,
        description: 'على Windows server إن توفر، اربط network logon/share events ضمن نفس النافذة.',
        command: `Get-WinEvent -FilterHashtable @{LogName='Security';Id=4624,5140,5145;StartTime=(Get-Date).AddMinutes(-15)} -ErrorAction SilentlyContinue |
  Select-Object TimeCreated,Id,RecordId,Message`,
        expected: '4624 LogonType 3 و5140/5145 فقط إذا audit policy مفعلة؛ وإلا gap.',
        why: 'PCAP قد يثبت اتصالًا بالـshare، لكن identity والنجاح والتفاصيل تحتاج host/server telemetry.'
      },
      {
        step: 6,
        description: 'اختبر فرضيتي authorized file access وlateral movement.',
        expected: 'المختبر يثبت الأولى فقط. الثانية تحتاج admin share أو remote service/tool execution وhost compromise context وعلاقة source غير معتادة.',
        caution: 'وجود TCP/445 أو Tree Connect ليس verdict ولا يبرر عزل جهاز دون playbook وتفويض.'
      }
    ],
    filters: ['tcp.port == 445', 'smb2.cmd == 0 negotiate', 'smb2.cmd == 1 session setup', 'smb2.cmd == 3 tree connect', 'Windows 4624/5140/5145'],
    evidence: ['share ACL/baseline', 'PCAP hash', 'SMB command timeline', 'marker hash', 'server event IDs أو gaps', 'authorization context'],
    cleanup: 'احذف /tmp/soc-lab-smb-marker.txt، أزل share/account المختبريين إن أنشأتهما خصيصًا، أوقف capture، ثم أعد Snapshot. لا تحذف shares أخرى.',
    deliverable: `# SMB Access Investigation

## Scope and baseline
- Client/server/share/user: ___
- Authorized change/task: ___
- Signing/encryption visibility: ___

## Correlated evidence
| Time | Network command | Server event/Record ID | Identity | Object | Result |
|---|---|---|---|---|---|
| | | | | | |

## Competing hypotheses
1. Authorized file access — supporting/refuting evidence: ___
2. Lateral movement — supporting/refuting evidence: ___

## Decision
- Classification: Benign Positive / insufficient / escalate
- What is still required before mapping T1021.002: ___
- Safe production action under playbook: ___`
  }
];
