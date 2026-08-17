import Alert from '../../components/Alert';
import Table from '../../components/Table';

const ProjectsIntroSection = () => (
  <div className="space-y-10">
    <header>
      <h1 className="flex items-center gap-3 text-3xl font-bold text-cyan-400"><span>🎯</span>Portfolio: دليل عمل لا معرض أدوات</h1>
      <p className="mt-3 max-w-4xl text-lg leading-8 text-gray-300">البورتفوليو الجيد يجعل طريقة تفكيرك قابلة للفحص: سؤال محدد، مختبر آمن، evidence قابل للتكرار، تحليل لا يقفز للحكم، وقرار مكتوب. لا يضمن مقابلة ولا يعوض متطلبات الأهلية، لكنه يقلل غموض مهارتك.</p>
    </header>

    <Alert type="golden" title="المبدأ">مشروعان عميقان تستطيع الدفاع عنهما أفضل من عشرة screenshots. العدد ليس الهدف؛ اختر artifacts تخدم وظائفك المستهدفة ثم حسّنها من feedback حقيقي.</Alert>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">ما الذي يجب أن يثبته المشروع؟</h2>
      <Table headers={['قدرة', 'Evidence قابلة للمراجعة', 'علامة ضعف']} rows={[
        ['Acquisition', 'source/provenance/time/hash/config وtelemetry health', 'CSV أو screenshot بلا مصدر أو window.'],
        ['Analysis', 'queries موضحة + raw/synthetic fixture + expected/observed', 'نسخ output بلا تفسير أو parser assumptions.'],
        ['Reasoning', 'facts، alternatives، scope، confidence، limitations', 'Event ID/IOC/tool verdict منفرد.'],
        ['Operations', 'ticket/escalation/owner/rollback/verification', '«اعزل الجهاز» بلا صلاحية أو أثر.'],
        ['Communication', 'README سريع + تقرير تقني + شرح شفهي', 'مصطلحات كثيرة وقرار غير واضح.'],
        ['Safety', 'isolation/redaction/licensing/secrets scan', 'بيانات حقيقية أو credentials أو raw PCAP عام.'],
      ]} />
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">بنية كل مستودع</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {[
          ['README.md', 'المشكلة، النطاق، architecture، النتيجة، القيود وطريقة إعادة التشغيل.'],
          ['docs/', 'تقرير القضية، timeline، data dictionary، decisions وlessons learned.'],
          ['fixtures/', 'بيانات synthetic أو منقحة مع provenance وترخيص؛ لا بيانات مؤسسة.'],
          ['queries/ أو src/', 'queries/scripts صغيرة مع assumptions ونسخ الأدوات.'],
          ['tests/', 'positive/negative/edge cases ونتائج فعلية لا متوقعة فقط.'],
          ['evidence/public/', 'مقتطفات منقحة؛ افصل evidence الخاصة ولا تدفعها إلى Git.'],
        ].map(([name, text]) => <div key={name} className="rounded-xl border border-gray-700 bg-gray-800/50 p-5"><h3 className="font-mono font-bold text-cyan-300" dir="ltr">{name}</h3><p className="mt-2 text-sm leading-7 text-gray-300">{text}</p></div>)}
      </div>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Definition of Done</h2>
      <ol className="space-y-2 text-sm leading-7 text-gray-300">
        <li>1. شخص آخر يستطيع اتباع الخطوات بالمتطلبات والنسخ المكتوبة.</li>
        <li>2. positive وnegative test يمران، والنتائج observed محفوظة.</li>
        <li>3. لا أسرار أو PII أو EVTX/PCAP/email حقيقية في Git أو تاريخه.</li>
        <li>4. التقرير يفصل observation عن inference وdecision ويذكر ما لا تثبته التجربة.</li>
        <li>5. تستطيع شرحه في 3 دقائق ثم التعمق 10 دقائق والإجابة عن failure modes.</li>
      </ol>
      <Alert type="warning">قبل النشر: افحص Git history لا الملفات الحالية فقط، راجع الصور وmetadata، واستخدم .invalid وRFC documentation IPs وfixtures مصرحًا بها. الحذف من آخر commit لا يزيل secret من التاريخ.</Alert>
    </section>

    <section className="space-y-3">
      <h2 className="text-2xl font-bold text-white">الاختيار تحت ضغط الوقت</h2>
      <p className="text-sm leading-7 text-gray-300">ابدأ بمشروع case investigation ومشروع detection/pipeline، ثم خصص الثالث لفجوة تتكرر في إعلاناتك المستهدفة. انشر نسخة صغيرة بعد peer review وابدأ تقديمًا استكشافيًا؛ عدّل المشروع وCV من الردود بدل انتظار «الكمال».</p>
    </section>
  </div>
);

export default ProjectsIntroSection;
