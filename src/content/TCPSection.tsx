import Alert from '../components/Alert';
import Table from '../components/Table';
import CodeBlock from '../components/CodeBlock';

const TCPSection: React.FC = () => (
  <div className="space-y-10">
    <header>
      <h1 className="flex items-center gap-3 text-3xl font-bold text-cyan-400"><span>🔗</span>TCP: الحالة، التسلسل، وحدود الالتقاط</h1>
      <p className="mt-3 max-w-4xl text-lg leading-8 text-gray-300">TCP byte stream موثوق ومرتب بين طرفين، لكن packet capture من نقطة واحدة قد يفقد packets أو يرى offload/reordering؛ فرّق بين سلوك الشبكة وأثر طريقة القياس.</p>
    </header>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">1. إنشاء الاتصال والبيانات</h2>
      <Table headers={['المشهد', 'ما يعنيه', 'ما لا يعنيه']} rows={[
        ['SYN → SYN/ACK → ACK', '3-way handshake ظهر من نقطة الالتقاط', 'أن التطبيق authenticated أو أن الطلب نجح.'],
        ['Sequence number', 'موضع bytes في اتجاه واحد', 'رقم packet عالمي؛ لكل اتجاه sequence space.'],
        ['ACK number', 'الـbyte التالي المتوقع عادةً (cumulative)', 'أن application عالج البيانات.'],
        ['Window', 'receiver-advertised capacity مع scaling', 'سرعة الرابط وحدها.'],
        ['FIN/ACK', 'إغلاق مرتب لاتجاه stream', 'أن الطرفين أغلقا في اللحظة نفسها.'],
        ['RST', 'إنهاء/رفض غير مرتب في السياق', 'هجوم؛ قد يكون closed port أو app timeout أو middlebox.'],
      ]} />
      <CodeBlock title="Display filters" code={`tcp.flags.syn == 1 && tcp.flags.ack == 0
tcp.flags.syn == 1 && tcp.flags.ack == 1
tcp.flags.reset == 1
tcp.stream eq 7`} />
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">2. لماذا لا تفسر packet منفردة؟</h2>
      <div className="grid gap-3 md:grid-cols-2">
        {[
          ['SYN بلا جواب مرئي', 'drop/filter/routing/host down أو capture بدأ متأخرًا؛ لا تعرف السبب من SYN وحده.'],
          ['RST بعد SYN', 'يتوافق مع رفض active/closed port، لكن ثبت اتجاهه وsequence وصحة checksum/perspective.'],
          ['SYN/ACK بلا ACK مرئي', 'client لم يكمل أو ACK فُقد من capture؛ المعدل والـsources والحالة تحدد SYN-flood hypothesis.'],
          ['Zero window', 'receiver أعلن عدم وجود buffer؛ افحص app/host وتطور window، لا تصفه malware.'],
        ].map(([title, text]) => <article key={title} className="rounded-xl border border-gray-700 bg-gray-800/50 p-5"><h3 className="font-bold text-cyan-300">{title}</h3><p className="mt-2 text-sm leading-7 text-gray-300">{text}</p></article>)}
      </div>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">3. Retransmission وloss</h2>
      <CodeBlock code={`tcp.analysis.retransmission
tcp.analysis.fast_retransmission
tcp.analysis.duplicate_ack
tcp.analysis.lost_segment
tcp.analysis.out_of_order
tcp.analysis.zero_window`} />
      <Alert type="warning">هذه expert-analysis flags استنتاج من packets التي رآها Wireshark وليست حقيقة مطلقة. Capture loss أو asymmetric routing أو SPAN oversubscription أو NIC offload قد يولّد تشخيصًا مضللًا. افحص capture drops، نقطة الالتقاط، RTT وstream graph.</Alert>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">4. Scan hypothesis</h2>
      <Table headers={['Pattern', 'قياس مطلوب', 'بدائل']} rows={[
        ['Source واحد → منافذ كثيرة على host', 'distinct dst ports/window، SYN، replies، completion ratio', 'vulnerability scanner/inventory/monitoring مصرح.'],
        ['Source واحد → hosts كثيرة على port', 'distinct dst IPs، rate، subnet، replies', 'service discovery أو management tooling.'],
        ['FIN/NULL/Xmas-like', 'flag combinations وردود RST حسب OS/firewall', 'noise/malformed traffic؛ غياب الرد لا يحدد open يقينًا.'],
        ['UDP probes', 'destinations/ports وICMP unreachable/app replies', 'UDP طبيعي؛ no response لا يساوي open.'],
      ]} />
      <CodeBlock title="فلتر مرشح فقط" code={`tcp.flags.syn == 1 && tcp.flags.ack == 0
# صدّر src/dst/port/time ثم احسب distinct/rate؛ عرض SYN وحده ليس detection.`} />
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">5. تقرير stream</h2>
      <CodeBlock language="text" code={`Capture hash + interface + UTC window + packet loss/snaplen
Client/server 4-tuple and NAT context
Handshake packet numbers + RTT estimate
Bytes/segments/duration per direction
Retransmission/reset evidence and capture caveats
Application/TLS evidence + endpoint process/user
Baseline/change + hypothesis + confidence + next evidence`} />
    </section>
  </div>
);

export default TCPSection;
