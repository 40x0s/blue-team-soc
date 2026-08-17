import ChecklistItem from '../components/ChecklistItem';
import Alert from '../components/Alert';
import Table from '../components/Table';

const skills = [
  'أشرح encapsulation وموضع ARP/ND وIP وTCP/UDP وDNS/TLS/HTTP.',
  'أحسب subnet بسيطًا وأربط IP تاريخيًا بـDHCP/NAT/VPN بدل نسبته لشخص.',
  'أفسر handshake وRST/retransmission مع ذكر capture loss ونقطة الالتقاط.',
  'أميز DNS NXDOMAIN/NODATA/SERVFAIL وأقيس DGA/tunnel hypothesis بالـbaseline.',
  'أشرح ما يظهر ويختفي في TLS 1.2/1.3 وQUIC/ECH دون اعتبار fingerprint هوية.',
  'أقرأ HTTP transaction وأتعامل مع headers وstatus كبيانات قابلة للتزييف/السياق.',
  'أربط SMB/RDP/Kerberos بأحداث الهوية والـendpoint والنتيجة.',
  'أستخدم Wireshark workflow وأسجل filter وpacket/stream IDs وcapture quality.',
  'أفصل port/protocol/IOC عن verdict وأكتب فرضيتين ودليل نفي لكل منهما.',
  'أكتب تقريرًا منقحًا قابلًا للإعادة وأشرح التحقيق شفهيًا في خمس دقائق.',
];

const deliverables = [
  'network-foundations-notes.md — رسم وتفسير من التطبيق إلى السلك',
  'https-e2e-lab.md — DNS/TCP/TLS/HTTP timeline وقياسات',
  'tcp-scan-fixture-analysis.md — aggregation وبديل scanner مصرح',
  'dns-fixture-analysis.md — labeled NXDOMAIN/tunnel features وlimitations',
  'smb-authorized-lab.md — network + Windows evidence correlation',
  'network-case-report.md — facts/hypotheses/scope/decision/gaps',
];

const ChecklistSection: React.FC = () => (
  <div className="space-y-8">
    <h1 className="flex items-center gap-3 text-3xl font-bold text-cyan-400"><span>✅</span>بوابة إتقان Networking</h1>
    <Alert type="warning">علامة checkbox تذكير فقط. لا تجتز البوابة حتى تعيد المهمة دون نسخ، تحفظ الأدلة، وتشرح حدود الاستنتاج.</Alert>

    <section className="space-y-3">
      <h2 className="text-2xl font-bold text-white">المهارات</h2>
      {skills.map((item, index) => <ChecklistItem key={item} text={item} id={`network-skill-${index}`} />)}
    </section>

    <section className="space-y-3">
      <h2 className="text-2xl font-bold text-white">المخرجات</h2>
      {deliverables.map((item, index) => <ChecklistItem key={item} text={item} id={`network-deliverable-${index}`} />)}
      <Alert type="danger">احتفظ بالـPCAP الخام private. انشر فقط fixture مولدة أو subset منقحًا بعد فحص cookies/tokens/hostnames/IPs/metadata والترخيص، مع hash للأصل الخاص وإفادة sanitization.</Alert>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">اختبار المرور</h2>
      <Table headers={['المحور', 'الدليل', 'المرور']} rows={[
        ['Acquisition', 'scope/hash/timezone/interface/drops/filter', 'يعيد شخص آخر وصف الالتقاط وحدوده.'],
        ['Analysis', 'queries/filters/packet IDs/measurements', 'لا يعتمد على adjective أو screenshot وحده.'],
        ['Reasoning', 'facts + بديلان + corroboration', 'لا port/IOC/status منفرد يصنع verdict.'],
        ['Communication', 'timeline/report/5-minute briefing', 'قرار وثقة وفجوات وخطوة مصرح بها واضحة.'],
        ['Safety', 'synthetic/authorized + sanitization', 'لا secret/PII/raw enterprise data أو live target.'],
      ]} />
      <Alert type="golden">اجتز أربعة مختبرات على الأقل، لكن الجودة أهم من العدد: تقرير قابل للإعادة + اختبار إتقان دون تعليمات + مراجعة زميل. بعدها واصل Linux مع إبقاء مراجعة الشبكات أسبوعية.</Alert>
    </section>
  </div>
);

export default ChecklistSection;
