import Alert from '../../components/Alert';
import CodeBlock from '../../components/CodeBlock';
import Table from '../../components/Table';

const LinuxNetworkSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400">🌐 Linux Network Triage</h1>
    <Alert type="info" title="ابدأ بسؤال">
      هل تحقق في listening exposure، اتصال قائم، أم سلوك تاريخي؟ <span dir="ltr">ss/lsof</span> يعرضان snapshot؛ لإثبات ما حدث أمس تحتاج firewall/proxy/flow/PCAP/audit أو EDR حسب التوفر.
    </Alert>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">1. Inventory read-only</h2>
      <CodeBlock language="bash" code={`date --iso-8601=seconds
ip -brief address
ip route show
ip neigh show

# TCP listening مع process إن سمحت الصلاحيات
sudo ss -lntp
# TCP sessions، ثم UDP sockets
sudo ss -antp
sudo ss -aunp
# Summary
ss -s`} />
      <Table headers={['علامة ss', 'المعنى', 'ملاحظة']} rows={[
        ['-l', 'Listening only', 'لا يعرض client sessions فقط'],
        ['-a', 'Listening + non-listening', 'ليس history'],
        ['-n', 'Numeric addresses/ports', 'يمنع DNS lookup وتأثيره الجانبي'],
        ['-t / -u', 'TCP / UDP', 'UDP بلا connection state مماثل لـTCP'],
        ['-p', 'Process context', 'قد يحتاج privilege ولا يظهر دائمًا'],
      ]} />
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">2. اربط socket بـprocess</h2>
      <CodeBlock language="bash" code={`pid=1234
sudo ss -antp | grep -F "pid=$pid," || true
sudo lsof -nP -a -p "$pid" -i
ps -p "$pid" -o user,pid,ppid,lstart,etime,comm,args
sudo readlink -- "/proc/$pid/exe"
sudo sha256sum -- "/proc/$pid/exe"`} />
      <p className="leading-8 text-gray-300">استخدم grep للفرز فقط؛ تحقق يدويًا من PID. اربط executable/hash/user/parent/start time بالـlocal/remote address وstate، ثم بالـDNS/proxy/flow.</p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">3. ما الذي يرفع الفرضية ولا يصنع verdict؟</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {[
          ['Public destination جديد', 'قد يكون CDN/update/SaaS. تحقق من owner/domain/process/prevalence.'],
          ['منفذ 4444 أو رقم غير معتاد', 'Port ليس هوية Metasploit؛ حدد protocol/process/destination.'],
          ['Listening على 0.0.0.0', 'يعني كل interfaces محليًا؛ exposure الفعلي يتأثر firewall/NAT/security groups.'],
          ['اتصالات متكررة', 'ss منفرد لا يثبت periodicity. استخدم time-series وقياس interval/jitter/bytes.'],
          ['Root process يتصل خارجيًا', 'services والتحديثات تفعل ذلك. provenance وbaseline مطلوبان.'],
          ['IP reputation match', 'IP قديم/shared/CDN. تحقق من first/last seen والسياق والـTLS/DNS.'],
        ].map(([title, body]) => <article key={title} className="rounded-xl border border-gray-700 bg-gray-800/50 p-5"><h3 className="font-bold text-yellow-300">{title}</h3><p className="mt-2 text-sm leading-7 text-gray-300">{body}</p></article>)}
      </div>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">4. Evidence record</h2>
      <CodeBlock language="text" code={`Observed UTC: ...
Host / interface / namespace or container: ...
Local address:port → Remote address:port / state: ...
PID / start time / user / parent: ...
Executable / SHA-256 / package provenance: ...
DNS-TLS-proxy-flow correlation: ...
Expected owner/change/baseline: ...
Alternative explanations and missing data: ...
Decision / confidence / authorized next action: ...`} />
      <Alert type="danger" title="لا توقف process من socket وحده">
        حفظ evidence، عزل host، إضافة firewall rule أو إرسال signal إجراءات عالية الأثر. اتبع playbook والتفويض، قيّم availability وcluster/failover، وحدد rollback وverification.
      </Alert>
    </section>

    <Alert type="golden" title="تدريب آمن">
      افتح في VM اتصالًا موثقًا إلى <span dir="ltr">example.com:443</span>، وحدد process/socket وDNS/TLS metadata. اكتب بدقة ما لا تستطيع <span dir="ltr">ss</span> إثباته عن محتوى HTTPS.
    </Alert>
  </div>
);

export default LinuxNetworkSection;
