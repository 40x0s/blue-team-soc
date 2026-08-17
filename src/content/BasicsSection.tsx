
import Alert from '../components/Alert';
import Table from '../components/Table';
import CodeBlock from '../components/CodeBlock';

const BasicsSection: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
        <span>📚</span>
        الجزء 1: الأساسيات الناقصة
      </h1>
      <p className="text-gray-400">لازم تفهمها أول شيء</p>

      <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

      {/* OSI Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="text-cyan-500">1.1</span>
          نموذج OSI – لكن بطريقة SOC
        </h2>

        <Alert type="info">
          ما تحتاج تحفظ الـ 7 طبقات. تحتاج تفهم <strong>4 طبقات فقط</strong> بعمق:
        </Alert>

        <Table
          headers={['الطبقة', 'البروتوكولات', 'ليش مهمة لك في SOC']}
          rows={[
            ['L2 (Data Link)', 'Ethernet, ARP', 'ARP spoofing, MAC flooding'],
            ['L3 (Network)', 'IP, ICMP', 'تحديد المصدر/الوجهة، Ping sweeps'],
            ['L4 (Transport)', 'TCP, UDP', 'Port scans, Connection analysis'],
            ['L7 (Application)', 'DNS, HTTP, TLS, SMB', 'معظم الهجمات تظهر هنا'],
          ]}
          highlight={[3]}
        />

        <Alert type="golden" title="القاعدة الذهبية">
          80% من تحليلك سيكون على L7، لكن لازم تفهم L3 و L4 لأنها الأساس.
        </Alert>
      </section>

      {/* IP Addressing Section */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="text-cyan-500">1.2</span>
          IP Addressing سريع
        </h2>

        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-bold text-cyan-400 mb-4">IPv4</h3>
          <ul className="space-y-2 text-gray-300">
            <li>• 32 bit، مثل <code className="bg-gray-700 px-2 py-1 rounded text-cyan-300">192.168.1.10</code></li>
            <li className="mt-4">• <strong>Private ranges (مهمة جداً في التحقيق):</strong></li>
          </ul>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="bg-gray-700/50 p-3 rounded text-center">
              <code className="text-green-400">10.0.0.0/8</code>
            </div>
            <div className="bg-gray-700/50 p-3 rounded text-center">
              <code className="text-green-400">172.16.0.0/12</code>
            </div>
            <div className="bg-gray-700/50 p-3 rounded text-center">
              <code className="text-green-400">192.168.0.0/16</code>
            </div>
          </div>
          <p className="mt-4 text-gray-400">• <strong>Public</strong> = أي IP خارج هذه النطاقات</p>
        </div>

        <Alert type="warning" title="ليش مهم في SOC؟">
          <ul className="space-y-2">
            <li>• إذا شفت اتصال من <strong>Private IP</strong> إلى <strong>Public IP غريب</strong> → احتمال C2</li>
            <li>• إذا شفت <strong>Private IP</strong> يتصل بـ Private IP في شبكة ثانية → احتمال Lateral Movement</li>
          </ul>
        </Alert>

        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-bold text-cyan-400 mb-4">Subnetting سريع (ما تحتاج تتعمق)</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-700/50 rounded">
              <code className="text-2xl text-cyan-400">/24</code>
              <p className="text-gray-400 text-sm mt-2">256 IP</p>
            </div>
            <div className="text-center p-4 bg-gray-700/50 rounded">
              <code className="text-2xl text-cyan-400">/16</code>
              <p className="text-gray-400 text-sm mt-2">65,536 IP</p>
            </div>
            <div className="text-center p-4 bg-gray-700/50 rounded">
              <code className="text-2xl text-cyan-400">/8</code>
              <p className="text-gray-400 text-sm mt-2">16 مليون IP</p>
            </div>
          </div>
          <Alert type="success">
            <strong>يكفيك تفهم:</strong> "هل هذا الـ IP داخل شبكتنا أم خارجها؟"
          </Alert>
        </div>
      </section>

      {/* ARP Section */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="text-cyan-500">1.3</span>
          ARP – Address Resolution Protocol
        </h2>

        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-bold text-cyan-400 mb-4">ما هو؟</h3>
          <p className="text-gray-300">يحول <strong>IP → MAC address</strong> داخل نفس الشبكة المحلية.</p>
        </div>

        <Alert type="danger" title="ليش مهم لك؟">
          <p><strong>ARP Spoofing</strong> = هجوم Man-in-the-Middle شائع</p>
          <p className="mt-2">علاماته:</p>
          <ul className="list-disc list-inside mt-2">
            <li>نفس الـ IP يظهر بأكثر من MAC</li>
            <li>ARP replies كثيرة بدون requests</li>
          </ul>
        </Alert>

        <CodeBlock
          title="Wireshark filters للـ ARP"
          code={`arp
arp.duplicate-address-detected`}
        />
      </section>

      {/* ICMP Section */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="text-cyan-500">1.4</span>
          ICMP – Ping وأكثر
        </h2>

        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-bold text-cyan-400 mb-4">ما هو؟</h3>
          <p className="text-gray-300">بروتوكول الفحص والأخطاء.</p>
        </div>

        <Table
          headers={['Type', 'الاسم', 'استخدامه في الهجوم']}
          rows={[
            ['8 / 0', 'Echo Request/Reply (Ping)', 'Ping sweeps, Host discovery'],
            ['3', 'Destination Unreachable', 'يكشف port scans'],
            ['11', 'Time Exceeded', 'Traceroute'],
          ]}
        />

        <Alert type="danger" title="علامات مشبوهة">
          <ul className="space-y-2">
            <li>• <strong>Ping sweep:</strong> جهاز واحد يعمل ping على شبكة كاملة</li>
            <li>• <strong>ICMP Tunneling:</strong> نقل بيانات داخل ICMP packets (نادر لكن خطير)</li>
            <li>• <strong>حجم ICMP غريب:</strong> ICMP عادة صغير، إذا شفت ICMP بحجم كبير → مشبوه</li>
          </ul>
        </Alert>

        <CodeBlock
          title="Wireshark filters للـ ICMP"
          code={`icmp
icmp.type == 8`}
        />
      </section>

      {/* DHCP Section */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="text-cyan-500">1.5</span>
          DHCP – توزيع IPs
        </h2>

        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-bold text-cyan-400 mb-4">ما هو؟</h3>
          <p className="text-gray-300">يعطي الأجهزة IP تلقائياً.</p>
        </div>

        <div className="bg-gradient-to-l from-purple-900/30 to-transparent rounded-xl p-6 border border-purple-500/30">
          <h3 className="text-lg font-bold text-purple-400 mb-4">المراحل DORA (احفظها)</h3>
          <div className="grid grid-cols-4 gap-4">
            {[
              { letter: 'D', name: 'Discover', desc: 'العميل: "في DHCP server؟"' },
              { letter: 'O', name: 'Offer', desc: 'السيرفر: "أعطيك هذا الـ IP"' },
              { letter: 'R', name: 'Request', desc: 'العميل: "موافق، أبغى هذا الـ IP"' },
              { letter: 'A', name: 'Ack', desc: 'السيرفر: "تم"' },
            ].map((item, index) => (
              <div key={index} className="bg-gray-800/50 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">{item.letter}</div>
                <div className="text-cyan-400 font-bold text-sm">{item.name}</div>
                <div className="text-gray-400 text-xs mt-2">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <Alert type="warning" title="ليش مهم في SOC؟">
          <ul className="space-y-2">
            <li>• <strong>Rogue DHCP:</strong> مهاجم يركب DHCP server وهمي</li>
            <li>• <strong>DHCP Starvation:</strong> استنزاف الـ IPs</li>
            <li>• في التحقيقات: تربط <strong>MAC → IP → User → Time</strong></li>
          </ul>
        </Alert>

        <CodeBlock
          title="Wireshark filters للـ DHCP"
          code={`bootp
dhcp`}
        />
      </section>
    </div>
  );
};

export default BasicsSection;
