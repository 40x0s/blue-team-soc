import Alert from '../components/Alert';
import Table from '../components/Table';

const PhilosophySection: React.FC = () => (
  <div className="space-y-8">
    <header>
      <h1 className="flex items-center gap-3 text-3xl font-bold text-cyan-400"><span>🎯</span>الشبكات بعقلية محلل SOC</h1>
      <p className="mt-3 max-w-4xl text-lg leading-8 text-gray-300">هدفك أن تحول packet أو flow أو proxy log إلى حقائق وحدود وأسئلة تحقيق، لا أن تحفظ منافذ ثم تصدر حكمًا.</p>
    </header>

    <Alert type="golden" title="السؤال الصحيح">
      ليس «هل هذا الترافيك خبيث؟» من سطر واحد، بل: ما الذي رُصد؟ من أي نقطة؟ ما الذي لا تراه؟ هل يوافق دور الأصل والـbaseline؟ وما الدليل التالي الأقل كلفة؟
    </Alert>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">1. طبقات الدليل الشبكي</h2>
      <Table headers={['الطبقة', 'قد تجيب', 'لا تفترض']} rows={[
        ['Packet capture', 'العناوين، التوقيت، flags، وأحيانًا payload', 'أنه كامل؛ قد توجد drops أو offload أو نقطة التقاط أحادية'],
        ['Flow / firewall', '5-tuple، bytes، duration، action حسب المنتج', 'محتوى التطبيق أو هوية المستخدم دائمًا'],
        ['DNS telemetry', 'السائل والاسم والنوع والجواب بحسب نقطة الجمع', 'أن كل resolution مرّ بالمحلل المرئي؛ cache/DoH قد تغيّر الرؤية'],
        ['Proxy / web', 'URL/method/status/user أحيانًا', 'أن X-Forwarded-For موثوق أو أن status يثبت outcome أمنيًا'],
        ['Endpoint/identity', 'process/user/session الذي صنع الاتصال', 'أنه متاح أو متزامن أو يحتفظ بالفترة المطلوبة'],
      ]} />
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">2. workflow لكل تحقيق شبكة</h2>
      <div className="grid gap-3 md:grid-cols-3">
        {[
          ['1 — ثبّت النطاق', 'case ID، UTC، sensor/interface، host، capture/filter وauthorization.'],
          ['2 — أثبت الجودة', 'زمن الجهاز، packet loss، snaplen، direction، NAT/proxy، retention.'],
          ['3 — كوّن timeline', 'DNS → connection → TLS/application → bytes/result، مع packet/event IDs.'],
          ['4 — اربط الكيان', 'process/user/asset owner والوجهة والغرض والتغيير والـbaseline.'],
          ['5 — اختبر بدائل', 'عمل شرعي، misconfiguration، scanner، update، أو نشاط غير مصرح.'],
          ['6 — قرر ووثّق', 'facts، assessment/confidence، gaps، scope، وخطوة مصرح بها.'],
        ].map(([title, text]) => <article key={title} className="rounded-xl border border-gray-700 bg-gray-800/50 p-5"><h3 className="font-bold text-cyan-300">{title}</h3><p className="mt-2 text-sm leading-7 text-gray-300">{text}</p></article>)}
      </div>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">3. ما يجب أن تستطيع فعله</h2>
      <ul className="space-y-2 text-sm leading-7 text-gray-300">
        <li>• تشرح ARP/DHCP/DNS/TCP/TLS/HTTP كقصة واحدة وتحدد موضع كل دليل.</li>
        <li>• تفرق بين capture filter وdisplay filter، وبين packet snapshot وhistorical telemetry.</li>
        <li>• تحسب distinct destinations/ports، rates، durations، bytes وperiodicity بدل وصف «كثير».</li>
        <li>• تفسر NAT/VPN/proxy/encryption وIPv6 وHTTP/3 دون نسبة IP مباشرة إلى شخص.</li>
        <li>• تنتج PCAP من مختبر تملكه، hash، timeline، فرضيتين، queries وتقريرًا منقحًا.</li>
      </ul>
      <Alert type="warning">لا تلتقط شبكة لا تملكها أو حسابات الآخرين، ولا تنشر PCAP خامًا؛ قد يحمل cookies وtokens وDNS وأسماء أجهزة ومحتوى شخصيًا.</Alert>
    </section>
  </div>
);

export default PhilosophySection;
