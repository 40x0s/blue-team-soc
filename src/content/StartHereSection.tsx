import Alert from '../components/Alert';
import ChecklistItem from '../components/ChecklistItem';
import Table from '../components/Table';

const months = [
  ['1', 'الأساس وبناء البيئة', 'الشبكات + Linux CLI + مختبر آمن', 'PCAP مشروح + Linux investigation note'],
  ['2', 'Windows والرؤية', 'Event Logs + PowerShell + Sysmon + AD', 'تحقيق Windows موثق + رسم Process Tree'],
  ['3', 'عمليات SOC', 'Triage + tickets + SLA + التصعيد + NIST', '5 تذاكر + handover + تقرير حادثة'],
  ['4', 'SIEM والاستعلام', 'Schemas + KQL أولًا ثم SPL/OpenSearch', '20 استعلامًا مفسرًا + لوحة Wazuh'],
  ['5', 'التحقيقات الأساسية', 'Phishing + endpoint + network + malware triage آمن', '3 تقارير تحقيق كاملة'],
  ['6', 'الهوية والسحابة', 'AD + Microsoft 365/Entra + baseline + correlation', 'Identity case + detection rationale'],
  ['7', 'Portfolio والمقابلة', '3 مشاريع قوية + عرض شفهي + English notes', 'Portfolio منزوع الحساسية + 10 مقابلات تجريبية'],
  ['8', 'السوق والتحسين', 'تقديم موجّه + سد الفجوات + إعادة اختبارات عمياء', 'لوحة تقديم أسبوعية + capstone نهائي'],
];

const gates = [
  ['G0 — الانضباط', '10 ساعات/أسبوع لمدة أسبوعين', 'سجل وقت صادق؛ لا تعوّض الساعات بوضع علامة مكتمل'],
  ['G1 — الأساس', '≥ 80% Networking/Linux/Windows', 'اختبار مغلق + تفسير DNS/TCP/logon بصوتك'],
  ['G2 — المختبر', '3 مختبرات عمياء ناجحة', 'أمر + نتيجة + تفسير + troubleshooting + تنظيف'],
  ['G3 — Triage', '5 حالات ضمن 20 دقيقة للحالة', 'تصنيف مبرر، timeline، scope، قرار وتصعيد'],
  ['G4 — Querying', '15 من 20 سؤال بيانات صحيحة', 'KQL قابل للتشغيل وشرح أثر كل operator'],
  ['G5 — Portfolio', '3 مشاريع بدرجة ≥ 80/100', 'أدلة حقيقية، قيود، redaction، لا أرقام مختلقة'],
  ['G6 — المقابلة', '8 من 10 سيناريوهات', 'جواب منظم: فرضية → دليل → قرار → تواصل'],
];

const weeklyRoutine = [
  ['اليوم 1', '90 دقيقة فهم + 30 دقيقة استرجاع دون ملاحظات'],
  ['اليوم 2', 'ساعتان مختبر موجه؛ اكتب لماذا قبل نسخ الأمر'],
  ['اليوم 3', '90 دقيقة مختبر دون تعليمات + 30 دقيقة troubleshooting'],
  ['اليوم 4', '60 دقيقة query + 60 دقيقة case note بالإنجليزية البسيطة'],
  ['اليوم 5', '90 دقيقة سيناريو زمني + 30 دقيقة عرض شفهي مسجل'],
  ['اليوم 6', 'ساعتان مشروع Portfolio أو تحسين تقرير'],
  ['اليوم 7', '45 دقيقة مراجعة أسبوعية + 45 دقيقة تقديم/تواصل مهني'],
];

const StartHereSection = () => (
  <div className="space-y-10">
    <header className="rounded-2xl border border-cyan-500/30 bg-gradient-to-l from-cyan-950/70 via-gray-900 to-gray-950 p-7">
      <p className="mb-2 text-sm font-bold tracking-wide text-cyan-300">SOC L1 PROFESSIONAL TRACK</p>
      <h1 className="text-3xl font-bold text-white md:text-4xl">ابدأ هنا: من التعلّم إلى دليل مهارة قابل للتوظيف</h1>
      <p className="mt-4 max-w-4xl text-lg leading-8 text-gray-300">
        هذا المسار لا يطلب منك حفظ صفحات. سيعلّمك كيف تفهم الحدث، تجمع السياق، تختبر فرضية، تتخذ قرارًا آمنًا، ثم تكتب ما يستطيع زميل الوردية التالية تنفيذه.
      </p>
    </header>

    <Alert type="warning" title="وعد واقعي لا وعد تسويقي">
      إكمال الكورس لا يضمن وظيفة أو قبولًا فوريًا؛ التوظيف يتأثر بالسوق والموقع والأهلية واللغة والمقابلة. ما نستطيع فعله هو رفع جاهزيتك بقوة عبر مهارات قابلة للقياس وأدلة عمل حقيقية، ثم التقديم المستمر والتحسين من ردود السوق.
    </Alert>

    <section className="grid gap-4 md:grid-cols-3">
      {[
        ['افهم', 'اشرح الفكرة بكلماتك، ارسم تدفق البيانات، وميّز الحقيقة عن الفرضية.'],
        ['اثبت', 'نفّذ من Snapshot نظيف، التقط الدليل، وفسّر النتيجة لا لقطة الشاشة فقط.'],
        ['تواصل', 'اكتب timeline وscope وقرارًا وخطوة تالية يستطيع محلل آخر مراجعتها.'],
      ].map(([title, description], index) => (
        <article key={title} className="rounded-xl border border-gray-700 bg-gray-800/50 p-5">
          <span className="text-2xl font-black text-cyan-400">0{index + 1}</span>
          <h2 className="mt-3 text-xl font-bold text-white">{title}</h2>
          <p className="mt-2 text-sm leading-7 text-gray-300">{description}</p>
        </article>
      ))}
    </section>

    <section>
      <h2 className="text-2xl font-bold text-white">🧭 خطة 8 أشهر — اضغطها إلى 6 عند الحاجة</h2>
      <p className="mt-2 text-gray-300">الخطة الافتراضية 10–12 ساعة أسبوعيًا. إن كان لديك 6 أشهر، ادمج الشهرين 1+2 و7+8، ولا تحذف بوابات الإتقان.</p>
      <Table headers={['الشهر', 'المرحلة', 'محور العمل', 'دليل الخروج']} rows={months} />
      <Alert type="info" title="متى تبدأ التقديم؟">
        ابدأ تقديمًا استكشافيًا من نهاية الشهر الثالث، ثم 5–8 طلبات موجهة أسبوعيًا من الشهر الخامس. لا تنتظر الكمال؛ لكن لا تدّع مهارة لم تثبتها.
      </Alert>
    </section>

    <section>
      <h2 className="text-2xl font-bold text-white">🚦 بوابات الإتقان</h2>
      <p className="mt-2 text-gray-300">لا تنتقل لأنك قرأت الصفحة. انتقل عندما يوجد دليل يمكن لشخص آخر تقييمه.</p>
      <Table headers={['البوابة', 'معيار المرور', 'الدليل']} rows={gates} />
      <Alert type="danger" title="نتيجة Quiz ليست جاهزية وظيفية">
        90% في اختبار معرفي تعني أنك أتقنت ذلك الاختبار فقط. الجاهزية تحتاج أيضًا مختبرًا أعمى، case notes، استعلامات، تقريرًا، شرحًا شفهيًا ومقابلة تجريبية.
      </Alert>
    </section>

    <section className="rounded-xl border border-gray-700 bg-gray-800/40 p-6">
      <h2 className="text-2xl font-bold text-white">📅 بروتوكول أسبوع لا يضيع وقتك</h2>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {weeklyRoutine.map(([day, task]) => (
          <div key={day} className="flex gap-3 rounded-lg border border-gray-700 bg-gray-900/60 p-4">
            <strong className="min-w-16 text-cyan-300">{day}</strong>
            <span className="text-sm leading-6 text-gray-300">{task}</span>
          </div>
        ))}
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold text-white">🧪 اختبار تحديد المستوى — 90 دقيقة</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {[
          ['الشبكة (20 دقيقة)', 'اشرح ماذا يحدث من كتابة example.com حتى استلام HTTPS، وحدد DNS/TCP/TLS وما الذي تستطيع رؤيته في PCAP.'],
          ['الأنظمة (20 دقيقة)', 'استخرج آخر محاولات دخول فاشلة من Windows أو Linux، وميّز timestamp وuser وsource وresult.'],
          ['التحليل (25 دقيقة)', 'من 10 أسطر logs، كوّن timeline، اكتب فرضيتين، وحدد دليلًا يؤكد أو ينفي كل فرضية.'],
          ['التواصل (25 دقيقة)', 'اكتب ملاحظة تذكرة من 120 كلمة، ثم اشرحها بالعربية ودقيقتين بالإنجليزية البسيطة.'],
        ].map(([title, task]) => (
          <article key={title} className="rounded-xl border border-gray-700 bg-gray-800/50 p-5">
            <h3 className="font-bold text-cyan-300">{title}</h3>
            <p className="mt-2 text-sm leading-7 text-gray-300">{task}</p>
          </article>
        ))}
      </div>
      <p className="mt-4 text-sm text-gray-400">التقييم: 0 لا يعرف، 1 يحتاج توجيهًا كاملًا، 2 ينجز مع أخطاء، 3 ينجز ويشرح، 4 ينجز ويشرح ويستكشف الخطأ. ابدأ من أول محور نتيجته أقل من 3.</p>
    </section>

    <section>
      <h2 className="text-2xl font-bold text-white">📁 مجلد الطالب من اليوم الأول</h2>
      <div className="mt-4 rounded-xl border border-gray-700 bg-gray-900 p-5 font-mono text-sm text-green-300" dir="ltr">
        <pre className="overflow-x-auto whitespace-pre">{`soc-portfolio/
├── README.md
├── learning-log/
│   └── YYYY-MM-week-N.md
├── investigations/
│   ├── case-notes/
│   └── reports/
├── queries/
│   ├── kql.md
│   ├── spl.md
│   └── opensearch.md
├── detections/
├── lab-evidence-private/   # لا يُنشر
└── projects-public/        # نسخة منزوعة الحساسية`}</pre>
      </div>
      <Alert type="warning" title="الحقيقة قبل الشكل">
        GitHub الجيد ليس عدد repositories. ثلاثة تحقيقات عميقة قابلة للدفاع عنها أفضل من عشر نسخ سطحية. لا تضع أرقام تحسين أو نسبة دقة أو عدد incidents إلا إذا قستها فعلًا وشرحت طريقة القياس.
      </Alert>
    </section>

    <section className="space-y-3">
      <h2 className="text-2xl font-bold text-white">✅ عقدك مع نفسك</h2>
      <ChecklistItem id="start-contract-1" text="حجزت 10 ساعات أسبوعية ثابتة في التقويم." />
      <ChecklistItem id="start-contract-2" text="أنشأت learning log وسأسجل الخطأ وما تعلمته، لا الإنجاز فقط." />
      <ChecklistItem id="start-contract-3" text="لن أنفذ نشاطًا هجوميًا إلا في مختبر أملكه ومعزول." />
      <ChecklistItem id="start-contract-4" text="لن أنشر بيانات حساسة أو نتائج مختلقة في Portfolio أو CV." />
      <ChecklistItem id="start-contract-5" text="سأعيد كل مختبر مهم مرة دون تعليمات قبل اعتباره متقنًا." />
      <ChecklistItem id="start-contract-6" text="سأبدأ التقديم والتحسين قبل أن أشعر بالكمال." />
    </section>
  </div>
);

export default StartHereSection;
