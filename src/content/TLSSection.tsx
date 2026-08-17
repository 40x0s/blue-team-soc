import Alert from '../components/Alert';
import Table from '../components/Table';
import CodeBlock from '../components/CodeBlock';

const TLSSection: React.FC = () => (
  <div className="space-y-10">
    <header>
      <h1 className="flex items-center gap-3 text-3xl font-bold text-cyan-400"><span>🔒</span>TLS/HTTPS: الثقة والرؤية والتحقيق</h1>
      <p className="mt-3 max-w-4xl text-lg leading-8 text-gray-300">TLS يحمي السرية والسلامة بين طرفين وفق handshake والثقة، لكنه لا يجعل الموقع أو العملية حميدة. ابدأ بنقطة الرؤية: endpoint أم proxy مفك للتشفير أم sensor يرى ciphertext فقط؟</p>
    </header>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">1. ما قد يظهر على الشبكة</h2>
      <Table headers={['Artifact', 'قد تراه', 'الحد']} rows={[
        ['IP/port/flow', 'العنوانان، الحجم، المدة، التوقيت', 'NAT/CDN/shared hosting يخفي attribution والمحتوى.'],
        ['ClientHello', 'versions/ciphers/extensions/key share وSNI تقليديًا', 'ECH قد يخفي ClientHello الداخلي؛ capture قد يبدأ متأخرًا.'],
        ['Certificate', 'مرئي في TLS 1.2 full handshake غالبًا', 'رسائل ما بعد ServerHello مشفرة في TLS 1.3، وresumption قد يغير المسار.'],
        ['JA3/JA4-like feature', 'تجميع خصائص handshake', 'قابل للتغيير/التقليد/التصادم ويتأثر proxy/version.'],
        ['HTTP data', 'عند endpoint أو proxy مصرح بفك التشفير', 'ciphertext sensor وحده لا يرى path/body/status. QUIC يستخدم UDP.'],
      ]} />
      <Alert type="warning">وثّق sensor/version/capture window/decryption policy. عبارة «لم يظهر SNI أو certificate» قد تعني ECH أو TLS 1.3 أو resumption أو capture gap، لا غياب الاتصال.</Alert>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">2. TLS 1.3 full certificate handshake مبسط</h2>
      <ol className="space-y-3 text-sm leading-7 text-gray-300">
        <li><strong>1. ClientHello:</strong> يعرض capabilities وkey share وقد يحمل SNI الخارجي.</li>
        <li><strong>2. ServerHello:</strong> يختار parameters وkey share؛ تُشتق handshake keys.</li>
        <li><strong>3. EncryptedExtensions + Certificate + CertificateVerify + Finished:</strong> في certificate-authenticated full handshake يثبت الخادم امتلاك مفتاح الشهادة، ويتحقق العميل من chain والاسم والوقت والسياسة. PSK resumption ومسارات أخرى تختلف.</li>
        <li><strong>4. Client Finished:</strong> يثبت امتلاك handshake secrets وسلامة transcript؛ لا يثبت هوية بشرية. mTLS يضيف client certificate/authentication.</li>
        <li><strong>5. Application Data:</strong> مشفرة ومحمية من التعديل. نجاح TLS لا يثبت نجاح HTTP أو سلامة التطبيق.</li>
      </ol>
      <Alert type="info">في TLS 1.2 يختلف ترتيب الرسائل وما يكون ظاهرًا. 0-RTT في TLS 1.3 له replay considerations ويجب أن يقيّد التطبيق العمليات غير الآمنة؛ لا تستنتج استخدامه بلا evidence.</Alert>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">3. فشل handshake: شخّص ولا «تصلح» بالتخمين</h2>
      <Table headers={['Hypothesis', 'Evidence مطلوب', 'تصرف آمن']} rows={[
        ['Expired/not-yet-valid أو clock skew', 'certificate dates + clocks + timezone', 'صحح time source أو جدّد عبر owner؛ لا تتجاوز validation.'],
        ['Name mismatch', 'requested hostname/SAN/SNI/proxy path', 'صحح DNS/load balancer/certificate mapping بعد change.'],
        ['Untrusted chain', 'full chain/trust store/AIA/internal CA policy', 'لا تستورد CA مجهولة؛ تحقق من المالك ووزع trust رسميًا.'],
        ['Version/cipher/signature mismatch', 'ClientHello/ServerHello/alert + endpoint logs', 'قارن policy والدعم؛ لا تعِد weak suites عشوائيًا.'],
        ['mTLS failure', 'client certificate/issuer/EKU/expiry/access policy', 'تحقق من identity mapping والتجديد، ولا تنسخ private key.'],
        ['Interception/proxy issue', 'issuer change، proxy logs، bypass policy', 'تحقق من trust boundary والخصوصية والاستثناء المصرح.'],
      ]} />
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">4. C2 over HTTPS: periodicity مرشح لا verdict</h2>
      <Table headers={['Feature', 'قِس', 'بدائل حميدة']} rows={[
        ['Intervals', 'count/mean/std/jitter/gaps لكل process-destination', 'updater/health check/NTP-like scheduler.'],
        ['Bytes/direction', 'distributions والratio والsession duration', 'telemetry/keepalive/API polling.'],
        ['Destination', 'age/owner/ASN/prevalence/first-seen/policy', 'CDN/new SaaS/shared cloud.'],
        ['TLS feature', 'version/SNI/ALPN/fingerprint عبر fleet', 'library update/proxy/config collision.'],
        ['Endpoint context', 'process entity/parent/signer/hash/user/persistence', 'approved agent أو admin tool.'],
      ]} />
      <Alert type="danger">لا تسمِّ النمط C2 حتى تختبر scheduler/software inventory وfleet prevalence وتربط process وdestination وoutcome. اكتب unresolved إذا بقيت فجوة telemetry.</Alert>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">5. Filters وتجربة مختبر</h2>
      <CodeBlock title="Wireshark display filters" code={`tls
tls.handshake.type == 1
tls.handshake.type == 2
tls.handshake.extensions_server_name
quic || udp.port == 443
# هذه filters للعرض؛ availability تختلف بالإصدار والتشفير والdissector.`} />
      <CodeBlock title="فحص endpoint مصرح دون تعطيل certificate verification" code={`curl --show-error --verbose --connect-timeout 5 --max-time 15 https://example.com/ -o /dev/null
openssl s_client -connect example.com:443 -servername example.com -showcerts </dev/null
# سجّل الوقت والإصدار والنتيجة. لا تستخدم -k كـ«حل» ولا تختبر هدفًا غير مصرح.`} />
      <p className="text-sm leading-7 text-gray-400">المخرج: timeline من DNS→transport→TLS، الإصدار/ALPN إن ظهر، chain validation، وما لم تستطع رؤيته. افصل handshake success عن application result.</p>
    </section>
  </div>
);

export default TLSSection;
