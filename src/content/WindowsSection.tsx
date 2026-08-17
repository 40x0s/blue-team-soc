import Alert from '../components/Alert';
import Table from '../components/Table';
import CodeBlock from '../components/CodeBlock';

const WindowsSection: React.FC = () => (
  <div className="space-y-10">
    <header>
      <h1 className="flex items-center gap-3 text-3xl font-bold text-cyan-400"><span>🪟</span>SMB وRDP وKerberos كتحقيق مترابط</h1>
      <p className="mt-3 max-w-4xl text-lg leading-8 text-gray-300">هذه بروتوكولات تشغيل يومية في Windows/AD ويمكن إساءة استخدامها. لا تحول protocol أو admin share أو ticket request إلى verdict؛ اربط الشبكة بالهوية والـendpoint والـoutcome.</p>
    </header>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">1. SMB — TCP/445 شائعًا</h2>
      <Table headers={['ما تراه', 'سؤال التحقيق', 'دليل مكمل']} rows={[
        ['Session/authentication', 'من الحساب ومن المصدر وإلى أي server؟', '4624 type 3، 4625، NTLM/Kerberos، LogonId.'],
        ['Tree connect إلى share', 'share عادي أم C$/ADMIN$/IPC$؟ هل الدور يسمح؟', '5140/5145 إن كان auditing متاحًا وshare ACL.'],
        ['File operations', 'أي path/access/result/bytes؟', 'object access/EDR/file hash وowner.'],
        ['Service/task بعد SMB', 'هل remote administration معتمد؟', '7045/4697/4688/Sysmon/task events/change ticket.'],
      ]} />
      <Alert type="warning">Administrative shares شرعية لأدوات الإدارة والنشر. Workstation-to-workstation قد يكون ممنوعًا في بيئة ومعتادًا في أخرى. SMBv1 يرفع مخاطر legacy ويحتاج inventory/change plan، لا وصف كل SMB exploit.</Alert>
      <CodeBlock code={`smb || smb2
tcp.port == 445
# Wireshark protocol fields تعتمد على التشفير/التوقيع والإصدار؛ endpoint/server logs قد تكون أوضح.`} />
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">2. RDP — لا تخلط connection وlogon وsession</h2>
      <ol className="space-y-2 text-sm leading-7 text-gray-300">
        <li>1. Network connection إلى TCP/UDP 3389 أو منفذ مخصص لا يثبت authentication.</li>
        <li>2. Security 4624 LogonType 10 يتوافق مع RemoteInteractive في ذلك الحدث؛ اربطه بـsource/user/LogonId.</li>
        <li>3. TerminalServices LocalSessionManager/RemoteConnectionManager تضيف session context بحسب القنوات والإعداد.</li>
        <li>4. VPN/NAT/gateway قد يغيّر source؛ GeoIP لا ينسب شخصًا، ووقت خارج الدوام يعتمد shift/travel/change.</li>
        <li>5. ابحث عما بعد الدخول: process/file/service/task/network/privilege، لا تقف عند نجاح logon.</li>
      </ol>
      <CodeBlock code={`tcp.port == 3389 || udp.port == 3389
# candidate network view؛ استخدم Windows/VPN/RD Gateway/EDR logs لإثبات النتيجة.`} />
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">3. Kerberos — افهم exchange قبل أسماء الهجمات</h2>
      <Table headers={['المرحلة', 'Windows events شائعة', 'المعنى']} rows={[
        ['AS exchange', '4768/4771 على DC', 'طلب/فشل TGT حسب الحدث والحقول.'],
        ['TGS exchange', '4769 على DC', 'طلب service ticket؛ شائع جدًا ولا يثبت Kerberoasting.'],
        ['Service logon', '4624 على target غالبًا', 'استخدام ناتج للمصادقة في سياق target.'],
        ['Credential validation/NTLM', '4776 وغيرها', 'مسار مختلف؛ افحص package/source/result.'],
      ]} />
      <Table headers={['Hypothesis', 'Features ترفعها', 'ما يلزم']} rows={[
        ['Kerberoasting-like', 'حساب يطلب SPNs كثيرة/غير معتادة وأنواع تشفير legacy', 'baseline، requester host/process، service ownership، outcome offline غير مرئي غالبًا.'],
        ['AS-REP roasting-like', 'طلب لحساب بلا pre-auth وفق config/event', 'تأكيد account setting والrequester؛ الطلب لا يثبت crack.'],
        ['Forged ticket suspicion', 'ticket/account/domain anomalies أو access بلا chain متوقع', 'DC/service logs وkeys/config/time؛ قد تكون telemetry ناقصة.'],
        ['Password spray', 'failures موزعة على حسابات من source/infra', 'window، distinct users، reasons، success، VPN/IdP context.'],
      ]} />
      <Alert type="info">RC4 قد يظهر لأسباب compatibility ولا يثبت هجومًا، لكنه يستحق inventory وخطة تقليل وفق دعم الأنظمة. Lifetime غير المعتاد يحتاج policy الفعلية وقراءة fields صحيحة.</Alert>
      <CodeBlock code={`kerberos
tcp.port == 88 || udp.port == 88
# packet capture قد لا يعطي endpoint process أو كامل سياق AD؛ اربطه بأحداث DC والهدف.`} />
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">4. Timeline موحد</h2>
      <CodeBlock language="text" code={`UTC | source host/IP/process/user | destination/DC/server
DNS/connection ID | Kerberos request/result | SMB/RDP session/result
Share/file/service/task/process effects | asset/change context
Scope/prevalence | competing hypotheses | confidence/gaps | authorized next step`} />
    </section>
  </div>
);

export default WindowsSection;
