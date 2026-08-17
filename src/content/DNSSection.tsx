
import Alert from '../components/Alert';
import Table from '../components/Table';
import CodeBlock from '../components/CodeBlock';

const DNSSection: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
        <span>🌐</span>
        الجزء 3: DNS بعمق
      </h1>
      <p className="text-gray-400">الدرس الأهم</p>

      <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

      <Alert type="danger" title="ليش DNS هو الأهم؟">
        <p className="text-xl font-bold">معظم التحقيقات تبدأ من Domain مشبوه.</p>
        <p className="mt-2">السبب: المهاجم لازم يستخدم DNS عشان:</p>
        <ul className="list-disc list-inside mt-2">
          <li>يوصل لـ C2 server</li>
          <li>يحدّث الـ malware</li>
          <li>ينقل البيانات (DNS exfiltration)</li>
        </ul>
      </Alert>

      {/* DNS Records */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="text-cyan-500">3.1</span>
          أنواع الـ Records (احفظها)
        </h2>

        <Table
          headers={['Record', 'الاستخدام', 'مثال']}
          rows={[
            ['A', 'اسم → IPv4', 'google.com → 142.250.x.x'],
            ['AAAA', 'اسم → IPv6', 'google.com → 2607:f8b0::'],
            ['CNAME', 'Alias (اسم → اسم)', 'www.site.com → site.com'],
            ['MX', 'Mail server', 'gmail.com → smtp.google.com'],
            ['NS', 'Name server', 'example.com → ns1.example.com'],
            ['TXT', 'معلومات نصية', 'SPF, DKIM, verification'],
            ['PTR', 'IP → اسم (Reverse)', '8.8.8.8 → dns.google'],
            ['SOA', 'معلومات الـ zone', '-'],
          ]}
        />
      </section>

      {/* DNS Query/Response */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="text-cyan-500">3.2</span>
          DNS Query/Response
        </h2>

        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-bold text-cyan-400 mb-4">Query طبيعي</h3>
          <div className="flex items-center justify-center gap-4 text-sm">
            <div className="bg-blue-900/30 p-3 rounded">Client</div>
            <div className="text-cyan-400">→ "وش IP google.com؟" →</div>
            <div className="bg-green-900/30 p-3 rounded">DNS Server</div>
          </div>
          <div className="flex items-center justify-center gap-4 text-sm mt-4">
            <div className="bg-blue-900/30 p-3 rounded">Client</div>
            <div className="text-green-400">← "142.250.190.46" ←</div>
            <div className="bg-green-900/30 p-3 rounded">DNS Server</div>
          </div>
        </div>

        <Table
          headers={['Code', 'المعنى', 'متى يستحق التحقيق']}
          rows={[
            ['0', 'NOERROR (نجح)', 'عادي'],
            ['2', 'SERVFAIL', 'مشكلة في السيرفر'],
            ['3', 'NXDOMAIN (الـ domain غير موجود)', 'مهم جداً ⚠️'],
            ['5', 'REFUSED', 'السيرفر رفض'],
          ]}
          highlight={[2]}
        />

        <Alert type="warning" title="ليش NXDOMAIN مهم؟">
          <p><strong>Malware مع DGA</strong> (Domain Generation Algorithm) ينتج آلاف الأسماء العشوائية ويجرب فيها</p>
          <p className="mt-2">إذا شفت جهاز واحد يولد <strong>مئات NXDOMAIN في دقائق</strong> → 🚨 احتمال malware</p>
        </Alert>
      </section>

      {/* Suspicious DNS Patterns */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="text-cyan-500">3.3</span>
          أنماط DNS مشبوهة (مهم جداً)
        </h2>

        {/* DGA */}
        <div className="bg-red-900/20 rounded-xl p-6 border border-red-500/30">
          <h3 className="text-lg font-bold text-red-400 mb-4">1. DGA (Domain Generation Algorithm)</h3>
          <p className="text-gray-300 mb-4">أسماء domains عشوائية مثل:</p>
          <CodeBlock
            code={`xkjfhqwlmnbvcxz.com
zxcvbnmqwerty.net
asdfghjklpoiuy.org`}
          />
          <div className="mt-4 text-sm text-gray-400">
            <strong className="text-red-400">العلامات:</strong>
            <ul className="list-disc list-inside mt-2">
              <li>طول غير طبيعي</li>
              <li>حروف عشوائية بدون معنى</li>
              <li>عدد كبير من الـ queries في وقت قصير</li>
              <li>معظمها تعطي NXDOMAIN</li>
            </ul>
          </div>
        </div>

        {/* DNS Tunneling */}
        <div className="bg-orange-900/20 rounded-xl p-6 border border-orange-500/30">
          <h3 className="text-lg font-bold text-orange-400 mb-4">2. DNS Tunneling</h3>
          <p className="text-gray-300 mb-4">نقل بيانات داخل DNS queries.</p>
          <div className="text-sm text-gray-400">
            <strong className="text-orange-400">العلامات:</strong>
            <ul className="list-disc list-inside mt-2">
              <li>Queries طويلة جداً (subdomain فيه 50+ حرف)</li>
              <li>استخدام TXT records بكثرة</li>
              <li>حجم استعلامات DNS أكبر من المعتاد</li>
            </ul>
          </div>
          <CodeBlock
            title="مثال على DNS Tunneling"
            code={`aGVsbG8gdGhpcyBpcyBkYXRh.attacker.com`}
          />
        </div>

        {/* Fast Flux */}
        <div className="bg-yellow-900/20 rounded-xl p-6 border border-yellow-500/30">
          <h3 className="text-lg font-bold text-yellow-400 mb-4">3. Fast Flux</h3>
          <p className="text-gray-300">نفس الـ Domain يرجع IPs مختلفة كل دقائق.</p>
        </div>

        {/* Typosquatting */}
        <div className="bg-purple-900/20 rounded-xl p-6 border border-purple-500/30">
          <h3 className="text-lg font-bold text-purple-400 mb-4">4. Typosquatting</h3>
          <p className="text-gray-300 mb-4">Domains تشبه الأصلية:</p>
          <ul className="space-y-2 text-sm">
            <li><code className="bg-gray-700 px-2 py-1 rounded text-red-400">gооgle.com</code> (الـ o سيريلية)</li>
            <li><code className="bg-gray-700 px-2 py-1 rounded text-red-400">paypa1.com</code> (1 بدل l)</li>
            <li><code className="bg-gray-700 px-2 py-1 rounded text-red-400">microsft.com</code></li>
          </ul>
        </div>

        {/* Newly Registered */}
        <div className="bg-cyan-900/20 rounded-xl p-6 border border-cyan-500/30">
          <h3 className="text-lg font-bold text-cyan-400 mb-4">5. Newly Registered Domains</h3>
          <p className="text-gray-300">Domain اتسجل من أيام قليلة = احتمالية عالية للهجوم.</p>
        </div>
      </section>

      {/* DNS Tools */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="text-cyan-500">3.4</span>
          أدوات DNS (عملي على Kali)
        </h2>

        <CodeBlock
          title="أوامر DNS الأساسية"
          code={`# أبسط lookup
nslookup google.com

# أدق وأشمل
dig google.com
dig google.com A
dig google.com MX
dig google.com TXT
dig google.com ANY

# Reverse lookup
dig -x 8.8.8.8

# استخدام DNS server محدد
dig @8.8.8.8 google.com

# Trace كامل
dig +trace google.com`}
        />

        <Alert type="success" title="مهمة عملية">
          <p>سوي هذي وشوف النتيجة:</p>
          <CodeBlock
            code={`dig microsoft.com MX
dig microsoft.com TXT
dig microsoft.com NS`}
          />
        </Alert>
      </section>

      {/* Wireshark Filters */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="text-cyan-500">3.5</span>
          Wireshark filters للـ DNS
        </h2>

        <CodeBlock
          title="DNS Wireshark Filters"
          code={`dns                                    # كل DNS
dns.qry.name contains "google"         # queries تحتوي google
dns.flags.response == 0                # queries فقط
dns.flags.response == 1                # responses فقط
dns.flags.rcode == 3                   # NXDOMAIN فقط
dns.qry.type == 1                      # A records فقط
dns.qry.type == 16                     # TXT records (مشبوه)`}
        />
      </section>
    </div>
  );
};

export default DNSSection;
