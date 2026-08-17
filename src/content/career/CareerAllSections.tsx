import Alert from '../../components/Alert';
import CodeBlock from '../../components/CodeBlock';
import ChecklistItem from '../../components/ChecklistItem';

// === CV Rules Section ===
export const CareerCVSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>📄</span>كتابة CV احترافي لـ SOC Analyst</h1>
    <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

    <Alert type="golden" title="لماذا هذا الدرس مهم؟">
      عندما تملك أدلة تقنية حقيقية، تحتاج تحويلها إلى ملف توظيف واضح يستطيع المراجع التحقق منه. ابدأ مبكرًا وحدّثه كلما أنجزت مشروعًا متقنًا.
    </Alert>

    {/* القواعد */}
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">📏 قواعد CV لسوق الأمن السيبراني</h2>

      <div className="grid md:grid-cols-2 gap-4">
        {/* القاعدة 1 */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-cyan-400 font-bold mb-3">📏 القاعدة 1: الاختصار والملاءمة</h3>
          <p className="text-gray-300 text-sm">صفحة واحدة غالبًا تكفي لطالب أو Junior، لكن الوضوح والدليل أهم من رقم جامد. اجعل أول نصف صفحة يجيب: من أنت؟ ما الدور؟ وما أقوى دليل مهارة؟</p>
        </div>

        {/* القاعدة 2 */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-cyan-400 font-bold mb-3">🤖 القاعدة 2: ATS-Friendly</h3>
          <p className="text-gray-300 text-sm mb-2">ATS = نظام فلترة CVs تلقائياً</p>
          <ul className="text-gray-400 text-xs space-y-1">
            <li>❌ لا جداول أو أعمدة معقدة</li>
            <li>❌ لا صور أو ألوان كثيرة</li>
            <li>❌ لا headers و footers</li>
            <li>✅ خطوط عادية (Calibri, Arial)</li>
            <li>✅ اتبع صيغة الإعلان واختبر استخراج النص</li>
            <li>✅ استخدم كلمات الإعلان التي تنطبق عليك فقط</li>
          </ul>
        </div>

        {/* القاعدة 4 */}
        <div className="bg-green-900/20 rounded-xl p-6 border border-green-500/30 md:col-span-2">
          <h3 className="text-green-400 font-bold mb-3">🎯 القاعدة 3: النتائج وليس المهام</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-red-900/20 rounded p-3 border border-red-500/30">
              <p className="text-red-400 text-xs font-bold mb-2">❌ خطأ:</p>
              <p className="text-gray-400 text-sm">"Studied cybersecurity topics"</p>
              <p className="text-gray-400 text-sm">"Learned about Windows logs"</p>
            </div>
            <div className="bg-green-900/20 rounded p-3 border border-green-500/30">
              <p className="text-green-400 text-xs font-bold mb-2">✅ صحيح:</p>
              <p className="text-gray-300 text-sm">"Investigated a simulated password-spray case using Windows events and documented scope, timeline, and escalation decision"</p>
              <p className="text-gray-300 text-sm">"Built and validated a Wazuh rule against [N] labeled lab events, documenting [measured result] and false positives"</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* الكلمات المفتاحية */}
    <section className="space-y-4 mt-8">
      <h2 className="text-2xl font-bold text-white">🔑 الكلمات المفتاحية للـ SOC (ضعها في CV)</h2>
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <div className="flex flex-wrap gap-2">
          {['SOC','SIEM','Incident Response','Threat Detection','Log Analysis','Windows Event Logs','Sysmon','PowerShell','Wireshark','MITRE ATT&CK','Threat Intelligence','Triage','TCP/IP','DNS','Active Directory','Kerberos','Phishing Analysis','IOC','EDR','Splunk','Wazuh','KQL','Python','Bash','Linux','Windows Server','CompTIA Security+','Blue Team','NIST','Network Security','Forensics','Malware Analysis'].map((kw, i) => (
            <span key={i} className="px-3 py-1 bg-cyan-900/30 border border-cyan-500/30 rounded-full text-cyan-400 text-xs">{kw}</span>
          ))}
        </div>
      </div>
      <Alert type="warning" title="ليست قائمة نسخ">
        ضع فقط الكلمات التي تستطيع إثباتها بمشروع أو شرحها في مقابلة. وجود Splunk أو Python أو Malware Analysis في الوصف الوظيفي لا يبرر إضافتها إن لم تستخدمها فعلًا.
      </Alert>
    </section>

    {/* ترتيب الأقسام */}
    <section className="space-y-4 mt-8">
      <h2 className="text-2xl font-bold text-white">📋 الترتيب الصحيح لأقسام CV</h2>
      <div className="space-y-2">
        {[
          { num: 1, name: 'Header', desc: 'الاسم ومعلومات التواصل' },
          { num: 2, name: 'Professional Summary', desc: 'ملخص احترافي - 3 سطور' },
          { num: 3, name: 'Technical Skills', desc: 'المهارات التقنية' },
          { num: 4, name: 'Projects & Hands-on Experience', desc: '⭐ المشاريع العملية (بدل Experience)' },
          { num: 5, name: 'Education', desc: 'التعليم' },
          { num: 6, name: 'Certifications', desc: 'الشهادات' },
          { num: 7, name: 'Training & Platforms', desc: 'التدريب والمنصات' },
        ].map((item) => (
          <div key={item.num} className="flex items-center gap-4 bg-gray-800/50 rounded-lg p-3 border border-gray-700">
            <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center text-white font-bold text-sm">{item.num}</div>
            <div>
              <span className="text-white font-bold text-sm">{item.name}</span>
              <span className="text-gray-400 text-sm mr-2"> - {item.desc}</span>
            </div>
          </div>
        ))}
      </div>
      <Alert type="warning">
        <strong>لا تضع Experience في الأعلى</strong> إذا ما عندك خبرة عمل في SOC. ضع <strong>Projects</strong> بدلاً منها!
      </Alert>
    </section>
  </div>
);

// === CV Template Section ===
export const CareerCVTemplateSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>📋</span>قالب CV كامل جاهز</h1>
    <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

    <Alert type="info">انسخ هذا القالب وعدّل عليه بمعلوماتك الشخصية ومشاريعك الفعلية.</Alert>

    <Alert type="danger" title="ممنوع استخدام بيانات المثال كأنها إنجازاتك">
      كل حقل بين أقواس مربعة يجب أن تستبدله بحقيقة قابلة للإثبات أو تحذفه. لا تكتب عدد agents أو rules أو أحداث أو نسبة تحسين إلا إذا نفذتها وقستها واحتفظت بالدليل.
    </Alert>

    <CodeBlock
      title="CV Template - Evidence Based"
      code={`[FULL NAME]
[City, Country] | [Phone] | [Professional email]
LinkedIn: [URL] | GitHub: [URL]

TARGET
Junior SOC Analyst / Cybersecurity Defense Analyst

SUMMARY
Final-year [major] student with hands-on practice in security
monitoring, Windows/Linux log analysis, network traffic analysis,
and incident documentation. Demonstrated these skills through
[2–3 strongest real projects]. Comfortable explaining investigation
scope, timelines, SIEM queries, and escalation decisions.

TECHNICAL SKILLS
SIEM / Querying: [only tools and languages you actually used]
Endpoint / Logs: [actual Windows/Linux telemetry used]
Network: [protocols and tools you can demonstrate]
Frameworks: [frameworks you applied in a report]
Scripting: [language + what you built; omit if not demonstrable]

SELECTED PROJECTS
[PROJECT TITLE] | [GitHub URL]
- Investigated [lab scenario] using [data sources/tools].
- Correlated [specific events] to build a timeline covering [scope].
- Documented [classification/escalation/detection] and [limitation].
- Measured [N labeled events / query runtime / alert volume] using
  [method].                         # احذف السطر إن لم تقس شيئًا

[PROJECT TITLE] | [GitHub URL]
- Built [what you actually built] in an isolated home lab.
- Validated it with [benign test] and documented false positives,
  troubleshooting, cleanup, and sensitive-data redaction.

EDUCATION
Bachelor of [Major], [University], [Country]
Expected graduation: [Month Year]
Relevant coursework: [only relevant completed/current courses]

CERTIFICATIONS
[Certification actually earned] — [Issuer], [Year]
# لا تضع “in progress” هنا؛ يمكن ذكر التدريب في قسم منفصل.

TRAINING
[Course/platform/path actually completed or actively studied]
[Home lab topology in one short line]

LANGUAGES
Arabic: [level] | English: [honest level]`}
    />

    <section className="space-y-4 mt-8">
      <h2 className="text-2xl font-bold text-white">✏️ تعديل CV حسب الوصف الوظيفي</h2>
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <ol className="text-gray-300 text-sm space-y-3">
          <li><strong className="text-white">1. اقرأ الوصف الوظيفي</strong> - حدد الكلمات المفتاحية والمتطلبات</li>
          <li><strong className="text-white">2. قارن مع CV</strong> - أي متطلبات عندك وأيها لا؟</li>
          <li><strong className="text-white">3. عدّل Summary</strong> - أضف الكلمات المفتاحية من الوصف</li>
          <li><strong className="text-white">4. رتّب المهارات</strong> - ضع المطلوبة في الأعلى</li>
          <li><strong className="text-white">5. رتّب المشاريع</strong> - ضع الأقرب للوظيفة أولاً</li>
        </ol>
      </div>

      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <h3 className="text-cyan-400 font-bold mb-3">مثال: إذا الوظيفة تطلب Splunk + MITRE</h3>
        <CodeBlock code={`# عدّل Summary ليصبح:
Final-year cybersecurity student with tested self-directed lab
projects in Windows log analysis and SOC case documentation.
Applied MITRE ATT&CK mapping and Wazuh SIEM operations
[add Splunk only if you actually used and can demonstrate it].
Portfolio includes reproducible evidence, limitations, and
escalation decisions.`} />
      </div>
    </section>
  </div>
);

// === Mistakes Section ===
export const CareerMistakesSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>❌</span>أخطاء شائعة تضعف CV</h1>
    <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

    <div className="grid md:grid-cols-2 gap-4">
      {[
        { title: 'Objective عام بدل Summary مدعوم', bad: '"Seeking a position where I can learn..."', good: '"Final-year cybersecurity student with tested SOC lab projects in..."', note: 'اذكر القيمة والدليل وما تستهدفه باختصار، دون ادعاء خبرة وظيفية لم تمارسها.' },
        { title: 'مهارات بدون دليل', bad: 'Skills: Wireshark, Splunk, Python, SIEM (بدون أي إثبات)', good: 'مهارات + مشاريع تثبت استخدامها', note: '' },
        { title: 'معلومات شخصية غير مطلوبة', bad: 'رقم هوية أو بيانات حساسة لا يطلبها الإعلان', good: 'الاسم، الموقع، الهاتف، الإيميل، LinkedIn، GitHub؛ وأضف ما يطلبه السوق/الدور قانونيًا فقط', note: 'الجنسية أو أهلية العمل قد تكون مطلوبة لبعض الأدوار؛ تعامل معها بصدق ولا تنشر رقم هوية.' },
        { title: 'GPA بلا سياق', bad: 'رقم بلا scale أو تضليل بالتقريب', good: 'اذكره اختياريًا مع scale والتقدير كما هو، خصوصًا إذا طلب الإعلان ذلك', note: '' },
        { title: 'أخطاء إنجليزية', bad: 'أخطاء متكررة تقلل الثقة في قدرتك على التوثيق', good: 'راجع بنفسك ثم بأداة تدقيق وشخص آخر إن أمكن', note: '' },
        { title: 'صيغة الملف لا تطابق الطلب', bad: 'Word قد يتغير تنسيقه، وPDF قد يرفضه نظام يطلب DOCX', good: 'اتبع صيغة الإعلان؛ PDF غالبًا يحفظ التنسيق إذا لم يُطلب غيره', note: 'اختبر قابلية النسخ والقراءة في ATS ولا تستخدم PDF ممسوحًا كصورة.' },
        { title: 'اسم الملف سيء', bad: '"CV.pdf" أو "resume-final-final2.pdf"', good: '"Ahmed-Alanazi-SOC-Analyst-Resume.pdf"', note: '' },
      ].map((mistake, i) => (
        <div key={i} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-red-400 font-bold mb-3">❌ خطأ {i+1}: {mistake.title}</h3>
          {mistake.bad && <div className="bg-red-900/20 rounded p-2 mb-2"><p className="text-red-300 text-xs">{mistake.bad}</p></div>}
          {mistake.good && <div className="bg-green-900/20 rounded p-2 mb-2"><p className="text-green-300 text-xs">{mistake.good}</p></div>}
          {mistake.note && <p className="text-gray-400 text-xs mt-2">{mistake.note}</p>}
        </div>
      ))}
    </div>
  </div>
);

// === Cover Letter Section ===
export const CareerCoverLetterSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>✉️</span>Cover Letter</h1>
    <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

    <Alert type="info">
      أرسل Cover Letter عندما يكون مطلوبًا أو تستطيع تخصيصه بدليل واضح على ملاءمتك. رسالة عامة منسوخة قد لا تضيف قيمة.
    </Alert>

    <CodeBlock
      title="قالب Cover Letter"
      code={`Subject: Application for [Exact Job Title] - [Your Name]

Dear [Hiring Manager or Team],

I am a final-year cybersecurity student applying for the
[Exact Job Title] role at [Company]. The role's focus on
[one requirement from the posting] matches work I completed
in self-directed SOC lab projects.

Relevant evidence:
- [Completed project]: [measured result or investigation output]
- [Completed project]: [query, timeline, detection test, or report]
- [Relevant skill]: [where the portfolio proves it]

In [most relevant project], I [what you actually did], tested
[positive/negative or failure case], and documented [decision,
limitations, and safe next action]. The sanitized evidence is at:
[direct portfolio URL]

I would welcome the opportunity to explain this work and how
I approach triage, escalation, and careful documentation.

Thank you for your consideration.

Best regards,
[Your real name]
[Phone appropriate to your location]
[Email] | [LinkedIn] | [Portfolio]`}
    />
    <Alert type="warning">احذف أي bullet لا تستطيع فتح دليله وشرحه. «Self-directed lab project» وصف قوي وصادق؛ لا تحوّله إلى خبرة موظف أو incident حقيقي.</Alert>

    <section className="space-y-4 mt-8">
      <h2 className="text-2xl font-bold text-white">📄 ملخص CV بالعربي (إذا طُلب)</h2>
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <p className="text-gray-300 text-sm leading-relaxed">
          طالب أمن سيبراني في السنة الأخيرة يطوّر مهارات عملية في المراقبة الأمنية وتحليل سجلات Windows وLinux وحركة الشبكة وتوثيق الحوادث. طبّقت هذه المهارات في [اذكر مشروعين حقيقيين]، مع كتابة timeline واستعلامات وقرارات تصعيد وربط السلوك بـMITRE ATT&CK حيث كان الربط مبررًا.
        </p>
      </div>
      <Alert type="info">
        اتبع لغة الإعلان وتعليماته. الإنجليزية شائعة في أدوار SOC والتوثيق، وقد تُطلب نسخة عربية أو ثنائية اللغة حسب الجهة؛ لا تفترض قاعدة واحدة لكل القطاعات.
      </Alert>
    </section>
  </div>
);

// === Saudi Market Section ===
export const CareerSaudiSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>🇸🇦</span>نصائح خاصة بالسوق السعودي</h1>
    <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

    <Alert type="warning" title="افحص الأهلية قبل استثمار وقتك في الطلب">
      تختلف الفرص حسب المدينة والجنسية وأهلية العمل والقطاع. بعض الوظائف والأدوار المنظمة لدى مقدمي خدمات SOC قد تفرض متطلبات تأهيل أو جنسية سعودية. اقرأ الإعلان الحالي، وإطار NCA للقوى العاملة ومتطلبات الجهة، ولا تفترض الأهلية من عنوان الوظيفة.
    </Alert>

    {/* خريطة الجهات المستهدفة */}
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">🏢 خريطة الجهات المستهدفة — لا قائمة شغور ثابتة</h2>
      <p className="text-sm leading-7 text-gray-300">ابحث أسبوعيًا في هذه الفئات، ثم سجل اسم الجهة والرابط وتاريخ الإعلان والأهلية والـstack. وجود الجهة هنا لا يعني أن لديها شاغرًا الآن أو أنك مؤهل قانونيًا له.</p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[
          { title: 'MSOC / MSSP', text: 'مقدمو خدمات المراقبة المدارة؛ راجع القائمة/الترخيص الحاليين لدى NCA ومتطلبات الدور.' },
          { title: 'الاتصالات والسحابة', text: 'فرق SOC وcloud security وmanaged services لدى المشغلين ومقدمي التقنية.' },
          { title: 'البنوك والتأمين وFinTech', text: 'بيئات منظمة تحتاج monitoring وidentity وfraud/security coordination؛ تحقق من متطلبات SAMA والوظيفة.' },
          { title: 'الشركات الكبرى والبنية الحرجة', text: 'طاقة وصناعة ونقل وصحة؛ قد تختلف متطلبات OT والأهلية والموقع.' },
          { title: 'التكامل والاستشارات', text: 'System integrators وconsultancies التي تشغّل SIEM/EDR أو تقدم خدمات دفاعية لعملاء.' },
          { title: 'الجهات الحكومية والبرامج', text: 'تحقق من الجنسية والتصريح والمنصة الرسمية؛ لا تفترض أن الإعلان متاح لغير السعوديين.' },
        ].map(target => (
          <article key={target.title} className="rounded-xl border border-gray-700 bg-gray-800/50 p-4">
            <h3 className="font-bold text-cyan-300">{target.title}</h3>
            <p className="mt-2 text-sm leading-6 text-gray-300">{target.text}</p>
          </article>
        ))}
      </div>
      <Alert type="info">إذا كنت خارج السعودية أو لا تملك أهلية العمل، ابنِ مسارًا موازيًا: شركات محلية وإقليمية، أدوار remote المسموح بها قانونيًا، تدريب جامعي، وخدمات تقنية قريبة من SOC. لا تدفع رسومًا مقابل «عرض عمل»، ولا ترسل هوية أو بيانات بنكية قبل التحقق من الجهة والقناة.</Alert>
    </section>

    {/* كلمات مفتاحية */}
    <section className="space-y-4 mt-8">
      <h2 className="text-2xl font-bold text-white">🔑 كلمات الإعلان: استخدمها فقط عندما تثبتها</h2>
      <div className="space-y-4 rounded-xl border border-gray-700 bg-gray-800/50 p-4">
        <p className="text-sm text-gray-300"><strong className="text-cyan-300">SOC core:</strong> SIEM، alert triage، escalation، Windows/Linux، networking، EDR، incident documentation، KQL/SPL حسب المنتج.</p>
        <p className="text-sm text-gray-300"><strong className="text-green-300">سياق سعودي محتمل:</strong> NCA ECC وSCyWF، SAMA Cybersecurity Framework، PDPL أو متطلبات القطاع — أضفها فقط إذا طلبها الدور وتفهم علاقتها بعملك.</p>
        <p className="text-xs leading-6 text-gray-400">لا تحشو CV بـGRC أو frameworks لمجرد عبور ATS. طابق المصطلح الحقيقي في الإعلان مع مشروع أو مقرر أو معرفة تستطيع مناقشتها.</p>
      </div>
    </section>

    {/* مواقع التقديم */}
    <section className="space-y-4 mt-8">
      <h2 className="text-2xl font-bold text-white">🌐 مواقع التقديم في السعودية</h2>
      <div className="grid md:grid-cols-3 gap-3">
        {[
          { name: 'صفحات الشركات', desc: 'مصدر الإعلان والتعليمات الرسمي', priority: 'high' },
          { name: 'LinkedIn Jobs', desc: 'بحث وتنبيهات وتحقق من الموظفين', priority: 'high' },
          { name: 'Jadarat (جدارات)', desc: 'تحقق من شروط التسجيل والأهلية الحالية', priority: 'high' },
          { name: 'Tamheer (تمهير)', desc: 'برنامج تدريب؛ تحقق من شروط الأهلية الحالية', priority: 'high' },
          { name: 'مركز الجامعة والخريجون', desc: 'تدريب وإحالات ومعارض توظيف', priority: 'high' },
          { name: 'GulfTalent / Bayt', desc: 'بحث إقليمي مع فحص تاريخ الإعلان', priority: 'medium' },
          { name: 'Indeed', desc: 'بحث إضافي؛ ارجع للمصدر الرسمي', priority: 'medium' },
          { name: 'وكالات موثوقة', desc: 'لا تدفع رسوم توظيف أو تأشيرة لجهة مجهولة', priority: 'medium' },
          { name: 'قنوات محلية/إقليمية', desc: 'أضف القنوات التي تثبت نتائجها في tracker', priority: 'low' },
        ].map((site, i) => (
          <div key={i} className={`rounded-lg p-3 border ${
            site.priority === 'high' ? 'bg-green-900/20 border-green-500/30' :
            site.priority === 'medium' ? 'bg-gray-800/50 border-gray-700' :
            'bg-gray-800/30 border-gray-800'
          }`}>
            <p className={`font-bold text-sm ${site.priority === 'high' ? 'text-green-400' : 'text-gray-300'}`}>{site.name}</p>
            <p className="text-gray-400 text-xs">{site.desc}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);

// === Career Checklist Section ===
export const CareerChecklistSection = () => {
  const items = [
    'CV مختصر يطابق صيغة الإعلان؛ صفحة واحدة غالبًا مناسبة للمبتدئ',
    'Professional Summary صادق ومدعوم',
    'مهارات تقنية مرتبطة بدليل',
    'أقوى مشروعين أو ثلاثة مع artifacts منزوعة الحساسية',
    'كل مشروع منشور له README قابل لإعادة الإنتاج',
    'LinkedIn محدث ومتسق مع CV',
    'قالب Cover Letter يُخصص لكل دور عند الحاجة',
    'نسخة عربية عند طلبها أو فائدتها للسوق المستهدف',
    'قائمة وظائف مستهدفة مع الرابط والتاريخ والتحقق من الأهلية',
    'تنبيهات بحث على القنوات التي أثبتت نتائج',
    'اسم ملف مهني مطابق للصيغة المطلوبة',
    'مراجعة ذاتية + تدقيق آلي + شخص آخر إن أمكن',
    'روابط LinkedIn وPortfolio تعمل في نافذة خاصة',
    'مصطلحات الإعلان ذات الصلة فقط موجودة ومثبتة',
    'أي أرقام ونتائج في المشاريع مقاسة ومشروحة وليست مختلقة',
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>✅</span>Checklist قبل إرسال أول CV</h1>
      <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

      <div className="space-y-2">
        {items.map((item, i) => (
          <ChecklistItem key={i} text={item} id={`career-check-${i}`} />
        ))}
      </div>

      <Alert type="golden" title="الخطوات القادمة">
        <ol className="space-y-2 mt-2 text-sm">
          <li>1. راجع CV مقابل وظيفة فعلية واحذف كل ادعاء غير مثبت.</li>
          <li>2. حدّث LinkedIn وPortfolio بنفس الحقائق.</li>
          <li>3. قدّم 5–8 طلبات موجهة أسبوعيًا وسجّل النتيجة.</li>
          <li>4. تدرب على السيناريوهات والإنجليزية التقنية بصوت مسموع.</li>
          <li>5. حسّن أضعف نقطة بناءً على المقابلات والرفض، لا بالتخمين.</li>
        </ol>
      </Alert>

      <div className="bg-green-900/20 rounded-xl p-8 border border-green-500/30 text-center">
        <h2 className="text-2xl font-bold text-green-400 mb-4">🎯 ملفك جاهز للتجربة في السوق، لا يوجد ضمان للقبول</h2>
        <p className="text-gray-200">استمر في التقديم والقياس والتحسين مع بناء أدلة أقوى. 💪</p>
      </div>
    </div>
  );
};
