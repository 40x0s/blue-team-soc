import Alert from '../components/Alert';
import Table from '../components/Table';
import CodeBlock from '../components/CodeBlock';

const PortsSection: React.FC = () => (
  <div className="space-y-8">
    <header>
      <h1 className="flex items-center gap-3 text-3xl font-bold text-cyan-400"><span>🔌</span>Ports وProtocols دون حفظ أعمى</h1>
      <p className="mt-3 text-gray-300">المنفذ convention ونقطة فرز؛ التطبيق قد يعمل على منفذ آخر، وقد يستخدم المنفذ المتوقع لترافيك مختلف.</p>
    </header>

    <Alert type="warning" title="Port ≠ protocol ≠ intent">
      اتصال TCP/443 يتوافق مع HTTPS الشائع لكنه لا يثبت TLS أو السلامة، وTCP/4444 لا يثبت Metasploit. تحقق من protocol decoding وprocess وdestination وpolicy وoutcome.
    </Alert>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">1. مرجع التشغيل والتحقيق</h2>
      <Table headers={['Port/transport الشائع', 'الخدمة', 'سؤال SOC']} rows={[
        ['20/21 TCP', 'FTP data/control (active mode)', 'هل credentials/data cleartext؟ passive mode يستخدم منافذ أخرى.'],
        ['22 TCP', 'SSH/SFTP', 'أي source/user/key/result؟ هل الأصل خادم إدارة معتمد؟'],
        ['23 TCP', 'Telnet', 'هل هو جهاز legacy مصرح؟ ما بديل التشفير وخطة الإزالة؟'],
        ['25/587/465 TCP', 'SMTP relay/submission/TLS', 'sender/auth/relay/message ID؛ التشفير يختلف حسب الإعداد.'],
        ['53 UDP/TCP', 'DNS', 'query/answer/rcode/client؛ TCP طبيعي للردود الكبيرة وzone transfer المصرح.'],
        ['67/68 UDP', 'DHCPv4 server/client', 'أي server عرض lease؟ هل هو معتمد وفي broadcast domain الصحيح؟'],
        ['80/443 TCP', 'HTTP/HTTPS شائعان', 'Host/SNI/certificate/URL إن توفر وprocess/result/bytes.'],
        ['443 UDP', 'QUIC / HTTP/3 شائع', 'هل sensor يفسره؟ هل policy تسمح به أم يحدث visibility gap؟'],
        ['88 TCP/UDP', 'Kerberos', 'نوع الطلب/النتيجة والحساب والخدمة وDC؛ المنفذ لا يثبت ticket abuse.'],
        ['123 UDP', 'NTP', 'server معتمد؟ offset/stratum/volume؛ الزمن يؤثر في correlation.'],
        ['135 TCP + dynamic RPC', 'RPC endpoint mapper', 'أي interface ثم أي dynamic port/process؟'],
        ['389/636 TCP', 'LDAP / LDAP over TLS', 'bind/query/identity/DC؛ 636 لا يضمن تحقق client الصحيح من الشهادة.'],
        ['445 TCP', 'SMB', 'source/destination/share/user/session/file/service context.'],
        ['1433/3306 TCP', 'SQL Server/MySQL defaults', 'هل DB مكشوفة؟ أي app identity/query outcome؟'],
        ['3389 TCP/UDP', 'RDP', 'VPN/NLA/source/user/result/session/device؛ لا تستنتج success من connection.'],
        ['5985/5986 TCP', 'WinRM HTTP/HTTPS', 'الهوية وsource host والعملية والتفويض والتغيير.'],
      ]} />
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">2. كيف تقرأ socket أو flow؟</h2>
      <CodeBlock language="text" code={`Time UTC | sensor/direction | src IP:port -> dst IP:port | transport
NAT/original IP if available | action | packets/bytes/duration
Protocol evidence (DNS/TLS/HTTP/SMB...) | process/user/host
Baseline/change/owner | first/last/prevalence | related event IDs`} />
      <p className="text-sm leading-7 text-gray-300">Client source ports غالبًا ephemeral؛ لا تحفظ range عالميًا لأنه يختلف حسب OS/config. NAT قد يعيد كتابة العناوين والمنافذ، وload balancer أو proxy قد يجعل source المرئي وسيطًا لا الأصل.</p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">3. متى ترفع الأولوية؟</h2>
      <div className="grid gap-3 md:grid-cols-2">
        {[
          ['Exposure', 'خدمة إدارية أو database متاحة من نطاق غير متوقع.'],
          ['Policy mismatch', 'جهاز مستخدم يتصل بخدمة لا يحتاجها بحسب دوره.'],
          ['Correlated outcome', 'remote logon ثم service/task/file أو privilege change.'],
          ['Behavior', 'وجهات كثيرة، periodicity، bytes أو failures منحرفة عن baseline.'],
        ].map(([title, text]) => <article key={title} className="rounded-xl border border-gray-700 bg-gray-800/50 p-5"><h3 className="font-bold text-cyan-300">{title}</h3><p className="mt-2 text-sm text-gray-300">{text}</p></article>)}
      </div>
      <Alert type="golden">الأولوية تأتي من الأصل × التعرض × السلوك × النتيجة × الثقة، لا من لون ثابت لكل port.</Alert>
    </section>
  </div>
);

export default PortsSection;
