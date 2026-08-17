import Alert from '../components/Alert';
import Table from '../components/Table';
import CodeBlock from '../components/CodeBlock';

const DNSSection: React.FC = () => (
  <div className="space-y-10">
    <header>
      <h1 className="flex items-center gap-3 text-3xl font-bold text-cyan-400"><span>🌐</span>DNS: من resolution إلى فرضية قابلة للقياس</h1>
      <p className="mt-3 max-w-4xl text-lg leading-8 text-gray-300">DNS مصدر غني لأنه يسبق اتصالات كثيرة، لكنه ليس موجودًا في كل حادثة وقد تُغيّر cache وhosts file وDoH/DoT ونقطة الجمع ما تستطيع رؤيته.</p>
    </header>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">1. القصة الكاملة</h2>
      <ol className="space-y-2 text-sm leading-7 text-gray-300">
        <li><strong className="text-cyan-300">Stub:</strong> التطبيق/OS يسأل resolver المكوّن، وقد يجيب cache محلي.</li>
        <li><strong className="text-cyan-300">Recursive resolver:</strong> يبحث في cache أو يسأل root ثم TLD ثم authoritative.</li>
        <li><strong className="text-cyan-300">Authoritative:</strong> يجيب من zone التي يديرها؛ الـTTL يرشد مدة caching ولا يضمن بقاء الجواب.</li>
        <li><strong className="text-cyan-300">Connection:</strong> resolution ليس connection. أثبت TCP/QUIC/TLS/application بصورة مستقلة.</li>
      </ol>
      <Alert type="info">UDP/53 شائع، وTCP/53 طبيعي عند truncation/رد كبير وعمليات أخرى. DoT غالبًا TCP/853 وDoH داخل HTTPS؛ عندها قد ترى endpoint المشفر لا أسماء الاستعلامات من الشبكة.</Alert>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">2. Records ومعناها</h2>
      <Table headers={['النوع', 'المعنى', 'قيد مهم']} rows={[
        ['A / AAAA', 'اسم إلى IPv4 / IPv6', 'قد يعيد CDN عناوين تختلف حسب resolver/وقت/موقع.'],
        ['CNAME', 'اسم alias إلى اسم canonical', 'لا يظهر عادةً عند zone apex؛ اتبع chain وحدود TTL.'],
        ['MX', 'خوادم استقبال البريد مع preference', 'لا يعني أن نفس host يرسل البريد.'],
        ['NS / SOA', 'delegation وبيانات zone authority', 'misconfiguration لا يساوي takeover تلقائيًا.'],
        ['TXT', 'نصوص مثل SPF/DKIM/verification', 'شائع شرعيًا؛ TXT وحده ليس tunneling.'],
        ['PTR', 'reverse mapping يديره مالك نطاق IP', 'غيابه أو اسمه لا يثبت هوية endpoint.'],
        ['CAA', 'أي CAs مسموح لها إصدار شهادة', 'ليس بديلًا عن فحص الشهادة أو CT.'],
      ]} />
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">3. RCODE: ماذا ثبت؟</h2>
      <Table headers={['RCODE', 'قراءة دقيقة', 'فرضيات']} rows={[
        ['NOERROR', 'الطلب عولج؛ قد توجد إجابة أو NODATA للنوع المطلوب', 'اسم موجود/جواب cached/لا record من النوع.'],
        ['SERVFAIL', 'resolver لم يكمل الإجابة', 'DNSSEC/upstream/timeout/config؛ افحص resolver logs.'],
        ['NXDOMAIN', 'الاسم عُد غير موجود من ذلك resolver وفي ذلك الوقت', 'typo/DGA/stale config/privacy query؛ لا يثبت malware.'],
        ['REFUSED', 'server رفض العملية وفق سياسته', 'ACL/policy/نوع query؛ ليس outage بالضرورة.'],
      ]} />
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">4. أنماط تحتاج قياسًا لا انطباعًا</h2>
      <Table headers={['Hypothesis', 'Features قابلة للقياس', 'بدائل/Corroboration']} rows={[
        ['DGA-like', 'NXDOMAIN rate، distinct names، length/entropy، suffix، successful answers، hosts', 'browser/security agent/typo؛ اربط process والوجهات اللاحقة.'],
        ['DNS tunneling', 'label length/entropy، query types، unique ratio، bytes/direction، periodicity', 'CDN/telemetry/AV؛ افحص authoritative ownership وendpoint process.'],
        ['Fast flux', 'IPs/ASN/TTL/churn عبر time-series ومن عدة نقاط', 'CDN/load balancing مشروع؛ لا تعتمد على تعدد IP فقط.'],
        ['Typosquatting/IDN', 'edit distance، punycode، brand context، age/cert/mail/web behavior', 'fan site أو نطاق مستقل؛ لا تزره من جهازك للتحقق.'],
        ['Newly registered', 'registration age مع source/time', 'قرينة سريعة التلف؛ نطاق جديد قد يكون مشروعًا.'],
      ]} />
      <Alert type="warning">لا توجد عتبة «50 حرفًا» أو «100 NXDOMAIN» صالحة لكل بيئة. قس distribution حسب host role وwindow، اختر threshold أولي، ثم اختبر labeled benign/simulated cases وراقب drift.</Alert>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">5. أوامر وفلاتر آمنة</h2>
      <CodeBlock title="استعلم عن نطاق التوثيق وسجّل resolver/time" code={`date -u +%FT%TZ
dig example.com A
dig example.com AAAA
dig example.com MX
dig example.com TXT
dig +tcp example.com A
dig -x 192.0.2.10
# +trace يرسل أسئلة مباشرة لعدة خوادم؛ استخدمه في مختبر/وفق السياسة فقط.`} />
      <CodeBlock title="Wireshark display filters — candidates" code={`dns
dns.flags.response == 0
dns.flags.rcode == 3
dns.qry.type == 16
# اربط query/response بالـtransaction ID وclient/time؛ filter وحده لا يكشف DGA أو tunnel.`} />
      <CodeBlock title="ورقة دليل" language="text" code={`UTC | sensor/resolver | client | qname (case/trailing dot normalized?) | qtype
rcode | answers/CNAME | TTL | response time | process/user if available
count/distinct/first/last | baseline | related connection | source event/packet IDs`} />
    </section>
  </div>
);

export default DNSSection;
