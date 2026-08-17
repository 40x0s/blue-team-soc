import Alert from '../components/Alert';
import Table from '../components/Table';
import CodeBlock from '../components/CodeBlock';

const BasicsSection: React.FC = () => (
  <div className="space-y-10">
    <header>
      <h1 className="flex items-center gap-3 text-3xl font-bold text-cyan-400"><span>📚</span>أساسيات الشبكة التي يحتاجها L1</h1>
      <p className="mt-3 max-w-4xl text-lg leading-8 text-gray-300">تعلّم encapsulation والعنونة والتوجيه والبروتوكولات المحلية بالقدر الذي يفسر الدليل ويمنع attribution خاطئًا.</p>
    </header>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">1. من التطبيق إلى السلك</h2>
      <Table headers={['طبقة عملية', 'أمثلة', 'هوية الدليل']} rows={[
        ['Application', 'DNS, HTTP, TLS, SMB, Kerberos', 'اسم/طلب/هوية/رسالة application حسب الرؤية.'],
        ['Transport', 'TCP, UDP, QUIC فوق UDP', 'source/destination ports، حالة/stream أو datagrams.'],
        ['Network', 'IPv4, IPv6, ICMP', 'source/destination IP وrouting/error context.'],
        ['Local link', 'Ethernet, Wi-Fi, ARP, IPv6 ND', 'MAC/VLAN والجيران داخل link المرئي.'],
      ]} />
      <Alert type="info">عند الإرسال تُغلف البيانات؛ عند الاستقبال تُفك. Sensor في link مختلف قد يرى MAC أو NAT أو VLAN مختلفًا، لذلك وثّق نقطة الجمع.</Alert>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">2. IPv4/IPv6 وCIDR</h2>
      <Table headers={['Range/example', 'المعنى', 'قيد تحقيق']} rows={[
        ['10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16', 'RFC1918 IPv4 private', 'قد تتكرر خلف VPN/NAT؛ لا تنسبها عالميًا.'],
        ['127.0.0.0/8', 'IPv4 loopback', 'رؤية source 127/8 خارج host تحتاج فحص capture/spoof/config.'],
        ['169.254.0.0/16', 'IPv4 link-local', 'قد يشير لفشل DHCP أو تصميم محلي.'],
        ['100.64.0.0/10', 'shared address space/CGNAT', 'ليس RFC1918 ولا public identity.'],
        ['192.0.2.0/24, 198.51.100.0/24, 203.0.113.0/24', 'IPv4 documentation', 'استخدمها في fixtures؛ لا تستهدفها كمختبر حي.'],
        ['::1 / fe80::/10 / fc00::/7', 'IPv6 loopback/link-local/unique-local', 'link-local يحتاج interface scope؛ IPv6 لا يستخدم ARP.'],
        ['2001:db8::/32', 'IPv6 documentation', 'مناسب للتقارير والfixtures.'],
      ]} />
      <CodeBlock title="حساب سريع" language="text" code={`IPv4 addresses in prefix /p = 2^(32-p)
/24 = 256 total addresses
تقليديًا network+broadcast غير قابلين للإسناد، لكن /31 point-to-point و/32 host routes حالات خاصة.
IPv6 prefix /64 لا يُتعامل معه كقائمة hosts تمسحها كاملة؛ اعتمد inventory/ND/DHCPv6/logs.`} />
      <p className="text-sm leading-7 text-gray-300">حدّد هل المصدر والوجهة في subnet نفسها؛ إن لم يكونا، يرسل host إلى default gateway. Routing table وVRF/VLAN/firewall/NAT هي التي تشرح المسار، لا شكل IP وحده.</p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">3. ARP وIPv6 Neighbor Discovery</h2>
      <p className="text-gray-300">ARP يربط IPv4 بعنوان link-layer في broadcast domain. IPv6 يستخدم Neighbor Discovery عبر ICMPv6، ويشمل address resolution وrouter discovery؛ حظر ICMPv6 عشوائيًا قد يكسر الشبكة.</p>
      <Table headers={['Observation', 'فرضيات', 'تحقق']} rows={[
        ['IP انتقل بين MACs', 'DHCP/HA/failover/VM move أو spoofing', 'DHCP/switch port/ARP history، gateway MAC، timing وowner.'],
        ['Gratuitous ARP', 'announce/update/duplicate detection أو poisoning', 'rate، sender consistency، change/failover context.'],
        ['ARP replies كثيرة', 'normal cache refresh، scanner، spoofing', 'requests/replies/targets/baseline ومكان sensor.'],
        ['IPv6 RA غير متوقع', 'rogue router أو lab/misconfiguration', 'switch RA guard، source port/MAC، approved routers.'],
      ]} />
      <CodeBlock code={`arp || icmpv6
arp.duplicate-address-detected
icmpv6.type == 134   # Router Advertisement
# filter يعطي candidates؛ لا يثبت MitM.`} />
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">4. ICMP ليس مجرد ping</h2>
      <Table headers={['وظيفة', 'أمثلة', 'قيمة التحقيق']} rows={[
        ['Reachability', 'Echo request/reply', 'host discovery محتمل، أو monitoring/troubleshooting شرعي.'],
        ['Errors', 'Destination Unreachable', 'routing/port/filter/MTU clues؛ اربط quoted packet.'],
        ['Path', 'Time Exceeded', 'traceroute/TTL loop context.'],
        ['IPv6 control', 'ND/RA وPacket Too Big', 'أساسي لIPv6 وPath MTU؛ لا تصفه noise.'],
      ]} />
      <Alert type="warning">الحجم أو التكرار أو payload قد يرفع tunneling/flood hypothesis، لكن قس distribution واربط process/endpoint. لا توجد قاعدة أن ICMP «يجب أن يكون صغيرًا» دائمًا.</Alert>
      <CodeBlock code={`icmp || icmpv6
icmp.type == 8
icmp.type == 3
icmpv6.type == 2`} />
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">5. DHCP والربط الزمني</h2>
      <p className="text-gray-300">في DHCPv4 الأولي غالبًا: Discover → Offer → Request → ACK. توجد renew/rebind/NAK/relay ومسارات لا تعرض DORA كاملة لنقطة التقاطك.</p>
      <Table headers={['دليل', 'لماذا مهم']} rows={[
        ['Transaction ID + client identifier/MAC', 'ربط الرسائل مع الحذر من spoofing/virtualization.'],
        ['Offered IP + lease time + options', 'gateway/DNS/domain/routes قد تكشف rogue أو config خاطئ.'],
        ['Server identifier + relay giaddr', 'حدد server الحقيقي والمسار عبر relay.'],
        ['Lease database + UTC window', 'اربط IP بجهاز في وقت الحدث؛ current lease وحده لا يكفي.'],
      ]} />
      <Alert type="golden">ربط هوية صحيح: event time → NAT/VPN/DHCP lease التاريخي → hostname/MAC/device ID → identity/session. IP منفرد ليس شخصًا.</Alert>
      <CodeBlock code={`bootp
bootp.option.dhcp
udp.port == 67 || udp.port == 68`} />
    </section>
  </div>
);

export default BasicsSection;
