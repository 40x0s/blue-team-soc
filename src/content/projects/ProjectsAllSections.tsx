import Alert from '../../components/Alert';
import CodeBlock from '../../components/CodeBlock';
import ChecklistItem from '../../components/ChecklistItem';
import Table from '../../components/Table';

const publicSafety = (
  <Alert type="danger" title="Public لا يعني sanitized تلقائيًا">
    لا تنشر PCAP/EVTX/email/log/raw screenshot قبل فحص الأسرار والهوية والملكية والترخيص. لا ترفع ملفات أو روابط المؤسسة إلى VirusTotal أو sandbox عام. استخدم fixtures مولدة، نطاقات <span dir="ltr">.invalid</span>، عناوين التوثيق، وقيمًا منقحة؛ وراجع تاريخ Git لا الملفات الحالية فقط.
  </Alert>
);

export const ProjectsEmployerSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400">👔 ماذا يمكن أن يستدل صاحب العمل من Portfolio؟</h1>
    <Alert type="info" title="لا توجد قاعدة 60 ثانية ولا عدد سحري">
      مدير SOC وrecruiter والمقابل الفني يراجعون بطرائق مختلفة. هدفك تقليل كلفة التحقق: ادعاء محدد، دليل قابل للفتح، قرار يمكن شرحه، وحدود صريحة.
    </Alert>
    <Table headers={['ما يريد التحقق منه', 'دليل قوي', 'دليل ضعيف أو مضلل']} rows={[
      ['هل تستطيع التحقيق؟', 'Timeline + queries + evidence IDs + competing hypotheses + decision', 'صور dashboard بلا سؤال أو تفسير'],
      ['هل تفهم القيود؟', 'Coverage/retention/permissions/false positives ودرجة confidence', '«Confirmed attack» من IOC أو Event ID واحد'],
      ['هل تعمل بأمان؟', 'Isolated lab، synthetic fixtures، redaction، rollback، authorized actions', 'Malware حي، أسرار، أو بيانات طرف ثالث منشورة'],
      ['هل تكتب detection؟', 'Rule + schema + positive/negative tests + tuning + version', 'YAML منسوخ لم يُختبر'],
      ['هل توثق مهنيًا؟', 'Executive summary، facts، scope، owners، timestamps/timezone', 'نص طويل بلا نتيجة أو evidence traceability'],
      ['هل الادعاءات صادقة؟', 'Self-directed lab موصوف بوضوح ونتائج قابلة لإعادة الاختبار', 'شركة/خبرة/شهادة/رقم لا يمكن إثباته'],
    ]} />
    <section className="grid md:grid-cols-2 gap-4">
      <div className="rounded-xl border border-green-500/30 bg-green-900/10 p-5"><h2 className="font-bold text-green-300">ابدأ به</h2><ul className="mt-3 space-y-2 text-sm text-gray-300"><li>• مشروعان أو ثلاثة عميقة ومختلفة.</li><li>• رابط مباشر لأفضل report أو detection.</li><li>• README مختصر يجيب: لماذا؟ كيف اختبرت؟ ماذا وجدت؟</li><li>• commit history طبيعي أثناء البناء، لا نشاط مصطنع.</li></ul></div>
      <div className="rounded-xl border border-red-500/30 bg-red-900/10 p-5"><h2 className="font-bold text-red-300">احذفه أو أصلحه</h2><ul className="mt-3 space-y-2 text-sm text-gray-300"><li>• forks أو write-ups منسوخة بلا إضافة.</li><li>• badges لأدوات لم تستخدمها.</li><li>• IOCs حية أو private data.</li><li>• MITRE mapping لكل شيء بلا evidence.</li></ul></div>
    </section>
    {publicSafety}
  </div>
);

export const ProjectsGitHubSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400">🐙 GitHub كواجهة أدلة</h1>
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">1. Profile صادق وسهل الفحص</h2>
      <CodeBlock title="Profile README بسيط — استبدل الأقواس بالحقائق فقط" language="markdown" code={`# [Your name]
Fourth-year [degree] student building evidence for SOC L1 work.

## Current focus
Windows/Linux/network triage · SIEM querying · case documentation

## Featured evidence
1. [Case investigation] — timeline, named fields, uncertainty and escalation
2. [Detection rule] — positive/negative fixtures and tuning notes
3. [Lab operations] — architecture, data health and measured recovery drill

## Availability
Location/work authorization: [state accurately or omit]
Languages: [only actual level]
Contact: [professional LinkedIn or dedicated email]

> All artifacts are synthetic or redacted. Projects are self-directed labs, not employment.`} />
      <p className="text-sm leading-7 text-gray-300">لا تسمِّ نفسك certified قبل منح الشهادة. اكتب <span dir="ltr">Security+ — studying, target YYYY-MM</span> فقط إن كان ذلك صحيحًا، ولا تضع شعار أداة كإثبات proficiency.</p>
    </section>
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">2. ثبّت أفضل ثلاثة artifacts</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          ['Investigation', 'Facts→context→scope→decision، وRecord IDs/timezone.'],
          ['Detection', 'Rule/query + schema + positive/negative tests + known gaps.'],
          ['Operational lab', 'Diagram + health checks + safe runbook + restore measurement.'],
        ].map(([title, body]) => <article key={title} className="rounded-xl border border-gray-700 bg-gray-800/50 p-5"><h3 className="font-bold text-cyan-300">{title}</h3><p className="mt-2 text-sm leading-7 text-gray-300">{body}</p></article>)}
      </div>
    </section>
    <Alert type="warning" title="قبل جعل repository عامًا">
      شغّل secret scan، افحص الصور metadata، اختبر الروابط من private browser، وتأكد أن LICENSE لك أنت ولا يعيد ترخيص fixtures أو مواد منصة لا تملكها.
    </Alert>
    <CodeBlock title="فحص أولي — ليس ضمانًا" language="bash" code={`git grep -nEi '(password|passwd|secret|token|api[_-]?key|private.?key|authorization:)'
git log --all --oneline
# افحص التاريخ بأداة secret scanner معتمدة أيضًا؛ حذف الملف من HEAD لا يحذفه من history.`} />
  </div>
);

export const ProjectsStructureSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400">📁 هيكل Repository قابل للتدقيق</h1>
    <CodeBlock title="ابدأ صغيرًا؛ أضف مجلدًا عند وجود artifact حقيقي" language="text" code={`soc-l1-portfolio/
├── README.md
├── LICENSE                 # لترخيص ما تملكه فقط
├── SECURITY.md              # طريقة الإبلاغ عن تسريب عرضي
├── .gitignore
├── cases/
│   └── CASE-001/
│       ├── README.md        # question, scope, finding, limits
│       ├── timeline.csv     # synthetic/redacted + UTC
│       ├── queries/
│       └── evidence/        # manifests/hashes, not sensitive raw data
├── detections/
│   └── DET-001/
│       ├── rule.yml
│       ├── tests/           # benign synthetic fixtures
│       └── validation.md
├── lab-operations/
│   ├── architecture.md
│   ├── runbooks/
│   └── restore-test.md
└── templates/
    ├── case-template.md
    └── redaction-checklist.md`} />
    <Table headers={['نوع الملف', 'Public default', 'البديل']} rows={[
      ['Raw enterprise log/email/PCAP/EVTX', 'لا', 'Synthetic fixture أو مقتطف fields منقح ومصرح'],
      ['Malware/sample/document', 'لا', 'Hash مسموح أو وصف سلوك fixture حميد'],
      ['Screenshot', 'بعد مراجعة', 'قص الجزء المطلوب وأزل hostname/user/token/path/history'],
      ['Detection/query authored by you', 'نعم غالبًا', 'اذكر schema/version/license ونتائج الاختبار'],
      ['Third-party course/write-up data', 'حسب الترخيص والقواعد', 'رابط للمصدر + ملاحظاتك الأصلية دون answers/flags'],
    ]} />
    {publicSafety}
  </div>
);

export const ProjectsReadmeSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400">📝 README يربط الادعاء بالدليل</h1>
    <CodeBlock title="قالب مشروع تحقيق" language="markdown" code={`# CASE-001 — [Neutral evidence-based title]

## Executive summary
Question: ...
Finding: [benign / suspicious / insufficient evidence]
Confidence: [low/medium/high] because ...
Impact: [observed, not imagined]

## Scope and clock
Hosts/accounts/data sources: ...
Window: 2026-01-15T08:00:00Z/2026-01-15T09:00:00Z
Excluded or unavailable data: ...

## Evidence and method
| Evidence ID | Source / Record ID | UTC time | Fact | Integrity/location |
|---|---|---|---|---|

## Timeline and analysis
For each claim: query → result → interpretation → alternative explanation.

## Decision and authorized next action
Decision threshold met/not met: ...
Owner/approver: ...
Verification and rollback: ...

## Reproduce safely
Versions, synthetic fixture source, exact read-only query, expected result.

## Limitations and lessons
Retention, permissions, parser assumptions, false positives, next test.`} />
    <Alert type="info" title="صور أقل، traceability أكثر">
      صورة dashboard لا تسمح بإعادة الاختبار غالبًا. أضف query كنص، schema/version، UTC window، result count، evidence identifier وexpected output. استخدم الصورة فقط لإثبات واجهة أو chart مهم وبعد التنقيح.
    </Alert>
    <section className="grid md:grid-cols-2 gap-4">
      <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-5"><h2 className="font-bold text-green-300">لغة صحيحة</h2><p className="mt-2 text-sm leading-7 text-gray-300">“Observed 14 failed logons for one account in 10 minutes; no linked success was visible in retained data.”</p></div>
      <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-5"><h2 className="font-bold text-red-300">لغة غير مدعومة</h2><p className="mt-2 text-sm leading-7 text-gray-300">“Hacker brute-forced the server and stole data.” من failures فقط.</p></div>
    </section>
  </div>
);

// ProjectsDetailedSection is the active ten-project curriculum. This export remains only for compatibility.
export const ProjectsListSection = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-cyan-400">🏗️ المشاريع العملية</h1>
    <Alert type="info">استخدم صفحة «المشاريع الـ10» المفصلة في التنقل؛ لكل مشروع safety، زمن، خطوات، تسليمات ومعايير قبول.</Alert>
  </div>
);

export const ProjectsWriteupsSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400">✍️ Write-ups تثبت التفكير لا حفظ الحل</h1>
    <Alert type="warning" title="احترم قواعد المنصة والملكية">
      بعض المنصات تمنع نشر answers أو flags أو محتوى مدفوع. افحص Terms وقاعدة التحدي. اجعل write-up خاصًا إذا لم يكن النشر مسموحًا، ولا تنسخ walkthrough.
    </Alert>
    <Table headers={['قسم write-up', 'السؤال الذي يجيب عنه']} rows={[
      ['Objective', 'ما المهارة/الفرضية التي اختبرتها؟'],
      ['Evidence inventory', 'ما artifacts والوقت والhash/ID؟'],
      ['Method', 'لماذا اخترت query/tool؟ وما البديل؟'],
      ['Findings', 'ما fact وما interpretation وما confidence؟'],
      ['Dead ends', 'ماذا جربت ولماذا فشل؟'],
      ['Detection opportunity', 'ما data requirement وpositive/negative test؟'],
      ['Reflection', 'هل تستطيع إعادة الحل دون guide وشرحه شفهيًا؟'],
    ]} />
    <CodeBlock title="اختبار الأصالة قبل النشر" language="text" code={`[ ] كتبت من ملاحظاتي لا من walkthrough
[ ] لا flags/answers/paid screenshots
[ ] نسبت أي اقتباس أو rule خارجيًا مع license
[ ] لا أسرار أو بيانات مستخدمين
[ ] شرحت limitation وبديلًا benign
[ ] أستطيع إعادة الخطوات وشرح القرار في 5 دقائق`} />
    <Alert type="golden" title="الأولوية">
      Case من مختبرك بfixture آمن واختبارات قابلة للتكرار أقوى عادةً من عشرات شهادات completion أو write-ups متشابهة.
    </Alert>
  </div>
);

export const ProjectsCVSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400">💼 تحويل المشروع إلى CV وLinkedIn بلا مبالغة</h1>
    <CodeBlock title="صيغة bullet: فعل + نطاق + طريقة + نتيجة مثبتة" language="text" code={`Self-Directed SOC Lab — [Repository link]
• Investigated a synthetic Windows authentication dataset across [N] records using named XML fields; built a UTC timeline with Record IDs and documented two competing hypotheses.
• Authored and tested one [Sigma/Wazuh/KQL] detection against [N] positive and [N] benign fixtures; recorded false-positive conditions and required telemetry.
• Operated a [version] lab with [actual sources]; measured alert latency at [actual median/range] in [N] controlled runs.

Do not copy the numbers. Replace every bracket with evidence you can show.`} />
    <Table headers={['بدل هذا', 'اكتب هذا']} rows={[
      ['Expert in SIEM', 'Built/tested [specific query/rule] on [specific lab/version]'],
      ['Detected real attacks', 'Investigated synthetic or authorized lab scenarios'],
      ['Reduced alerts 80%', 'لا تذكرها إلا مع baseline، denominator، test period وreview'],
      ['SOC Analyst — Home Lab', 'Self-Directed SOC Projects / Home Lab'],
      ['Security+ certified', 'Security+ — in progress، target date (إن كان صحيحًا)'],
    ]} />
    <CodeBlock title="LinkedIn post يعلّم ويعرض دليلًا" language="text" code={`Built: [specific artifact]
Question: [what I tested]
Evidence: [sanitized source and count]
Finding: [what the data supports]
Limitation: [what it cannot prove]
Changed after testing: [one tuning decision]
Repository: [direct artifact link]

This was a self-directed isolated lab using synthetic data.`} />
    <Alert type="info">لا يلزم post لكل commit. تابع views والرسائل والردود أسبوعيًا، لكن لا تجعل النشر يستهلك وقت المختبر والتقديم.</Alert>
  </div>
);

export const ProjectsRubricSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400">📊 Rubric جودة المشروع</h1>
    <Table headers={['المعيار', '0 — غير موجود', '1 — موجود سطحيًا', '2 — جاهز للعرض']} rows={[
      ['سؤال ونطاق', 'لا سؤال/وقت', 'سؤال بلا exclusions', 'سؤال، entities، UTC window، exclusions'],
      ['Traceability', 'لا IDs', 'صور فقط', 'Evidence IDs/Record IDs/hash ومصدر لكل claim'],
      ['تحليل', 'Verdict مباشر', 'تفسير واحد', 'Facts منفصلة + بدائل + confidence'],
      ['Reproducibility', 'لا خطوات', 'أوامر بلا fixture', 'versions + safe fixture + expected output'],
      ['Detection test', 'لا اختبار', 'positive فقط', 'positive + negative + tuning + gaps'],
      ['Safety/privacy', 'بيانات/أسرار', 'تنقيح غير موثق', 'synthetic/redacted + checklist + history scan'],
      ['Communication', 'لا summary', 'summary تقني فقط', 'executive + technical + owners/actions'],
      ['Oral defense', 'لا يستطيع الشرح', 'يقرأ README', 'يشرح 5 دقائق ويجيب limitations'],
    ]} />
    <Alert type="golden" title="بوابة النشر">
      لا تنشر المشروع إذا كانت السلامة/الخصوصية أو traceability = 0. الهدف 14/16 مع عدم وجود صفر، وليس تضخيم عدد repositories.
    </Alert>
  </div>
);

export const ProjectsChecklistSection = () => {
  const groups = [
    { title: 'الدليل', items: ['مشروعان عميقان على الأقل', 'رابط مباشر لأفضل artifact', 'كل claim له evidence ID أو test', 'Competing hypothesis وconfidence', 'تفسير شفهي 5 دقائق'] },
    { title: 'السلامة', items: ['Synthetic أو authorized data', 'إزالة users/hosts/emails/tokens/metadata', 'Secret scan للملفات والتاريخ', 'لا public sandbox upload لبيانات حساسة', 'ترخيص وقواعد المنصة محترمة'] },
    { title: 'قابلية الإعادة', items: ['Versions وschema موثقة', 'UTC window واضح', 'Positive وnegative fixtures', 'Expected output وknown gaps', 'روابط تعمل من نافذة خاصة'] },
    { title: 'التقديم', items: ['CV bullets مطابقة للدليل', 'Self-directed ليس employment', 'LinkedIn وGitHub متسقان', 'طلب توظيف مخصص جاري', 'سجل أسبوعي للطلبات والردود والفجوات'] },
  ];
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-cyan-400">✅ بوابة Portfolio والتقديم</h1>
      <Alert type="info" title="لا تنتظر الكمال">
        ابدأ التقديم الاستكشافي عندما تستطيع الدفاع عن مشروعين جيدين، وواصل التحسين. لا يوجد عدد مشاريع أو commit frequency يضمن مقابلة أو وظيفة.
      </Alert>
      {groups.map((group, groupIndex) => <section key={group.title} className="space-y-2"><h2 className="text-xl font-bold text-white">{group.title}</h2>{group.items.map((item, itemIndex) => <ChecklistItem key={item} text={item} id={`portfolio-v2-${groupIndex}-${itemIndex}`} />)}</section>)}
      <div className="rounded-xl border border-cyan-500/30 bg-cyan-900/10 p-6">
        <h2 className="font-bold text-cyan-300">المقياس الأسبوعي</h2>
        <p className="mt-2 leading-8 text-gray-300">Artifact تحسن، mastery retest، 5–8 طلبات موجهة من الشهر الخامس كهدف تشغيلي، ورسالتا networking ذواتا سياق. راجع conversion من طلب→رد→مقابلة وعدّل CV/targets؛ لا تفسر أسبوعًا ضعيفًا كحكم على قيمتك.</p>
      </div>
    </div>
  );
};
