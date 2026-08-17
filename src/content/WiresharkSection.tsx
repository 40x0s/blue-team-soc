import Alert from '../components/Alert';
import Table from '../components/Table';
import CodeBlock from '../components/CodeBlock';

const WiresharkSection: React.FC = () => (
  <div className="space-y-10">
    <header>
      <h1 className="flex items-center gap-3 text-3xl font-bold text-cyan-400"><span>🦈</span>Wireshark: تحليل PCAP قابل للإعادة</h1>
      <p className="mt-3 max-w-4xl text-lg leading-8 text-gray-300">Wireshark يعرض ما التقطته نقطة محددة، لا «الشبكة كلها». ابدأ بسلامة الالتقاط والنطاق، ثم overview، ثم conversations، ثم stream/packet evidence.</p>
    </header>

    <Alert type="danger" title="قانونية وخصوصية">
      التقط فقط VM/interface مصرحًا به. PCAP قد يحمل credentials وcookies وtokens وDNS وبيانات شخصية. احفظ الأصل read-only، احسب hash، واعمل على نسخة؛ لا تنشره افتراضيًا.
    </Alert>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">1. Capture contract</h2>
      <CodeBlock language="text" code={`Case ID | collector | authorization | interface/tap/SPAN
Start/end UTC | host clock | network segment/direction
Capture filter | snaplen | packet/drop count | tool/version
Original filename + SHA-256 | working-copy hash | storage/TLP`} />
      <Table headers={['نوع الفلتر', 'متى يطبق', 'مثال']} rows={[
        ['Capture filter (BPF)', 'قبل التخزين؛ ما يستبعده لا يمكن استرجاعه', 'host 192.0.2.10 and (tcp or udp)'],
        ['Display filter', 'بعد الالتقاط؛ يغيّر العرض لا الملف', 'ip.addr == 192.0.2.10 && tcp'],
      ]} />
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">2. Workflow لا يقفز إلى IOC</h2>
      <ol className="space-y-2 text-sm leading-7 text-gray-300">
        <li>1. <strong>File properties:</strong> duration، interfaces، packets، drops إن سُجلت، capture filter وencapsulation.</li>
        <li>2. <strong>Protocol Hierarchy:</strong> هل IPv4/IPv6 وTCP/UDP/DNS/TLS/QUIC متوقع؟</li>
        <li>3. <strong>Endpoints/Conversations:</strong> sort بالbytes/packets/duration، ثم افهم الاتجاه والدور.</li>
        <li>4. <strong>I/O Graph:</strong> قارن spikes/periodicity بفترة معقولة؛ الرسم ليس verdict.</li>
        <li>5. <strong>Stream:</strong> Follow TCP/UDP/HTTP stream فقط ضمن بيانات مختبر؛ قد يكشف أسرارًا.</li>
        <li>6. <strong>Evidence:</strong> سجل packet numbers/stream ID/filter وصدّر subset منقحًا عند الحاجة.</li>
      </ol>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">3. Display filters أساسية</h2>
      <CodeBlock code={`# Protocol/entity
arp || icmp || icmpv6 || dns || tls || quic
ip.addr == 192.0.2.10
ipv6.addr == 2001:db8::10
tcp.port == 443 || udp.port == 443

# TCP candidates
tcp.flags.syn == 1 && tcp.flags.ack == 0
tcp.flags.reset == 1
tcp.analysis.retransmission

# DNS/HTTP/TLS candidates
dns.flags.rcode == 3
http.request.method == "POST"
http.response.code == 401
tls.handshake.type == 1
tls.handshake.extensions_server_name

# تثبيت conversation
tcp.stream eq 7
frame.number in {42 43 51}`} />
      <Alert type="warning">Field names تتغير مع protocol dissection وإصدار Wireshark. استخدم autocomplete وافتح packet tree. SNI قد يغيب مع ECH أو session behavior، وHTTP fields لا تظهر داخل TLS دون keys/decryption معتمد.</Alert>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">4. الفلتر ليس detection</h2>
      <Table headers={['Filter', 'يعرض', 'لا يثبت']} rows={[
        ['SYN دون ACK flag', 'connection attempts المرئية', 'port scan؛ احسب sources/destinations/ports/rate/replies.'],
        ['NXDOMAIN', 'أجوبة name error', 'DGA؛ قس names/rate/entropy/baseline/process.'],
        ['401', 'HTTP auth-required/failed semantics حسب app', 'brute force؛ اربط user/source/endpoint/window/outcome.'],
        ['TLS alert', 'رسالة alert مرئية', 'هجوم؛ افهم level/description/side/handshake.'],
        ['Large bytes', 'حجمًا مرئيًا من نقطة الالتقاط', 'exfiltration؛ افهم direction/business use/compression/retransmission.'],
      ]} />
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">5. مخرج Portfolio</h2>
      <CodeBlock language="text" code={`Question and scope
Capture provenance/hash/quality/timezone
Top endpoints/conversations with measured bytes/duration
Timeline: DNS -> connection -> TLS/application -> close/result
Packet/stream references and exact filters
Endpoint/identity correlation
Competing hypotheses and evidence for/against
Assessment/confidence/gaps and safe next step
Sanitization statement; raw PCAP remains private`} />
    </section>
  </div>
);

export default WiresharkSection;
