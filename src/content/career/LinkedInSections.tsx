import Alert from '../../components/Alert';
import CodeBlock from '../../components/CodeBlock';
import ChecklistItem from '../../components/ChecklistItem';

// === LinkedIn Main Section ===
export const CareerLinkedInSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>🔗</span>LinkedIn Optimization لـ SOC Analyst</h1>
    <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

    <Alert type="golden" title="دور LinkedIn — بلا أرقام مختلقة">
      <p>LinkedIn قناة مفيدة للبحث والإعلانات والتحقق من الخلفية المهنية وبناء علاقات، لكنه ليس مصدر كل الوظائف ولا يوجد هنا دليل موثوق على نسبة ثابتة في السعودية. استخدمه مع صفحات الشركات ومنصات التوظيف ومركز الجامعة والإحالات، ثم قِس من أين تأتي المشاهدات والردود والمقابلات.</p>
    </Alert>

    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
      <blockquote className="text-xl text-cyan-400 font-bold border-r-4 border-cyan-500 pr-4">
        CV يفتح لك باب التقديم، LinkedIn يفتح لك باب الفرص.
      </blockquote>
    </div>

    {/* الصورة الشخصية */}
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">📸 الصورة الشخصية Profile Photo</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-green-900/20 rounded-xl p-6 border border-green-500/30">
          <h3 className="text-green-400 font-bold mb-3">✅ خيارات عملية شائعة</h3>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• خلفية بسيطة (أبيض، رمادي)</li>
            <li>• وجه واضح يأخذ 60% من الإطار</li>
            <li>• نظرة مباشرة للكاميرا</li>
            <li>• ابتسامة خفيفة احترافية</li>
            <li>• لباس رسمي</li>
            <li>• إضاءة جيدة طبيعية</li>
            <li>• جودة عالية HD</li>
          </ul>
        </div>
        <div className="bg-red-900/20 rounded-xl p-6 border border-red-500/30">
          <h3 className="text-red-400 font-bold mb-3">⚠️ ما قد يشتت أو يضلل</h3>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• صورة سيلفي</li>
            <li>• صورة من مناسبة عائلية</li>
            <li>• صورة مع أصدقاء</li>
            <li>• نظارة شمسية</li>
            <li>• خلفية شاطئ أو سيارة</li>
            <li>• جودة منخفضة</li>
            <li>• صورة قديمة لا تشبهك</li>
          </ul>
        </div>
      </div>
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <h3 className="text-cyan-400 font-bold mb-3">📱 كيف تأخذ صورة احترافية مجاناً</h3>
        <ol className="text-gray-300 text-sm space-y-1">
          <li>1. خلفية بيضاء (جدار أبيض)</li>
          <li>2. كاميرا جوال حديث</li>
          <li>3. إضاءة من النافذة</li>
          <li>4. 10 لقطات مختلفة → اختر أفضل واحدة</li>
          <li>5. استخدم <strong>Remove.bg</strong> لإزالة الخلفية إذا احتجت</li>
        </ol>
      </div>
    </section>

    {/* Banner */}
    <section className="space-y-4 mt-8">
      <h2 className="text-2xl font-bold text-white">🖼️ Banner / Cover Image</h2>
      <Alert type="info">الـBanner عنصر اختياري للاتساق البصري، وليس دليل خبرة ولن يعوض مشروعًا أو وصفًا صادقًا. استخدم تصميمًا بسيطًا تملك حق استخدامه ولا تضع شعارات شركات أو شهادات لا تخصك.</Alert>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <h4 className="text-cyan-400 font-bold mb-2">خيار 1: تصميم Canva</h4>
          <p className="text-gray-400 text-sm">قالب بسيط بألوان داكنة + نص "SOC Analyst | Blue Team | Threat Detection"</p>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <h4 className="text-cyan-400 font-bold mb-2">خيار 2: صورة أمنية</h4>
          <p className="text-gray-400 text-sm">من Unsplash ابحث "cybersecurity" أو "network"</p>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <h4 className="text-cyan-400 font-bold mb-2">خيار 3: لون + شعار</h4>
          <p className="text-gray-400 text-sm">خلفية بلون واحد + أيقونة قفل أو شعار بسيط</p>
        </div>
      </div>
    </section>

    {/* Headline */}
    <section className="space-y-4 mt-8">
      <h2 className="text-2xl font-bold text-white">✍️ الـ Headline: واجهة البحث الأولى</h2>
      <Alert type="warning">السطر تحت اسمك مباشرة وقد يظهر في نتائج البحث والتفاعل. التزم بالحد الذي تعرضه واجهة LinkedIn وقت التعديل؛ قد تتغير حدود المنتج. اكتب دورًا مستهدفًا + 2–4 مهارات تستطيع إثباتها + وضعك الحقيقي.</Alert>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-red-900/20 rounded-xl p-4 border border-red-500/30">
          <h4 className="text-red-400 font-bold mb-2">❌ ضعيف</h4>
          <p className="text-gray-400 text-sm font-mono" dir="ltr">Student | Looking for opportunities</p>
        </div>
        <div className="bg-green-900/20 rounded-xl p-4 border border-green-500/30">
          <h4 className="text-green-400 font-bold mb-2">✅ قوي</h4>
          <p className="text-gray-300 text-sm font-mono" dir="ltr">Aspiring SOC Analyst | Blue Team | Threat Detection | SIEM | MITRE ATT&CK | Cybersecurity Senior Student</p>
        </div>
      </div>

      <div className="bg-cyan-900/20 rounded-xl p-6 border border-cyan-500/30">
        <h3 className="text-cyan-400 font-bold mb-3">🎯 الـ Headline المقترح لك</h3>
        <p className="text-white font-mono text-sm" dir="ltr">Aspiring Junior SOC Analyst | Blue Team | SIEM | Threat Detection | MITRE ATT&CK | Building Hands-on Security Projects</p>
      </div>
    </section>

    {/* About */}
    <section className="space-y-4 mt-8">
      <h2 className="text-2xl font-bold text-white">📝 قسم About</h2>
      <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
        <p className="text-gray-400 text-sm mb-2">القواعد: ضمير المتكلم (I am) | 3-5 فقرات قصيرة | ابدأ بشيء يجذب | انتهي بـ Call to Action</p>
      </div>

      <CodeBlock
        title="قالب About جاهز لك"
        code={`🛡️ Final-year cybersecurity student preparing for junior SOC and security operations roles.

I practice a repeatable workflow in an isolated home lab: validate telemetry, query events, triage alerts, preserve evidence, and write concise escalation notes.

Evidence I can discuss:
▸ [Project name]: [what you actually built] — [measured test and result]
▸ [Investigation]: [data sources] — [decision and evidence]
▸ [Detection]: [hypothesis] — [labeled tests, limitations, and tuning]

Tools I have used hands-on:
• SIEM/query: [only products and languages used]
• Endpoint/network: [tools used]
• Systems/scripting: [skills you can demonstrate]
• Frameworks: [how you applied them, not names alone]

I am currently exploring [internship / junior SOC] roles in [truthful locations or remote eligibility].
Portfolio: [URL]
Contact: [professional email]`}
      />
      <Alert type="danger">استبدل كل حقل بين [ ] بحقيقة يمكنك عرض دليلها أو احذفه. لا تنسخ أدوات أو هجمات أو مشاريع من المثال، ولا تصف مختبرًا بأنه خبرة عمل.</Alert>
    </section>

    {/* Featured */}
    <section className="space-y-4 mt-8">
      <h2 className="text-2xl font-bold text-white">⭐ Featured Section</h2>
      <p className="text-gray-400 text-sm">قسم يظهر بعد About ويعرض روابط مهمة بشكل مرئي.</p>
      <div className="grid md:grid-cols-2 gap-4">
        {[
          { num: 1, title: 'GitHub Portfolio Repository', desc: '2–3 دراسات عميقة موثقة أفضل من عدد كبير سطحي' },
          { num: 2, title: 'أفضل مشروع لك', desc: 'مثلاً Wazuh Deployment Project مع screenshot' },
          { num: 3, title: 'TryHackMe Profile', desc: 'إذا عندك إنجازات ومستوى جيد' },
          { num: 4, title: 'مقال LinkedIn كتبته', desc: 'أي post حصل على تفاعل جيد' },
        ].map(item => (
          <div key={item.num} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center text-white font-bold text-sm">{item.num}</div>
              <div>
                <p className="text-white font-bold text-sm">{item.title}</p>
                <p className="text-gray-400 text-xs">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Experience */}
    <section className="space-y-4 mt-8">
      <h2 className="text-2xl font-bold text-white">💼 Experience Section</h2>
      <Alert type="golden" title="إذا لم تكن لديك خبرة عمل أمنية">
        يمكنك عرض “Self-Directed Projects” بوضوح كمشاريع شخصية أو في قسم Projects؛ لا تضع شركة وهمية ولا تسمها وظيفة SOC. الهدف أن يستطيع القارئ تمييز التعليم والمختبر والخبرة المدفوعة فورًا.
      </Alert>

      <CodeBlock
        title="نموذج Experience بدون خبرة عمل"
        code={`Title: Security Operations Home Lab (Self-Directed Project)
Organization: Personal project — not employment
Dates: [actual month/year] – [end or Present]
Location: Remote / [truthful location]

Goal: [specific skill or problem]
Environment: [VMs, data sources, versions]

▸ Built [what you actually configured] and verified ingestion with [benign test event]
▸ Investigated [simulated scenario] using [queries/data], concluding [measured outcome]
▸ Tested [detection] against [N labeled cases]; recorded [real result and limitation]
▸ Produced [sanitized report/runbook/repository link]

Tools used hands-on: [only tools you can demonstrate]
Evidence: [repository or write-up URL]`}
      />

      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <h3 className="text-cyan-400 font-bold mb-3">إذا عندك خبرة سابقة (حتى لو مش أمن)</h3>
        <p className="text-gray-400 text-sm mb-3">اربطها بمهارات قابلة للنقل:</p>
        <CodeBlock code={`Title: [Actual role]
Company: [Actual organization]
Dates: [Actual dates]

▸ Resolved [measured number, only if recorded] technical issues by reproducing symptoms, isolating causes, and documenting outcomes
▸ Wrote [actual procedure/report] used by [actual audience or omit]
▸ Communicated priority, impact, and next steps to [actual stakeholders]

Translate the workflow, but do not relabel support work as incident response or SOC experience.`} />
      </div>
    </section>

    {/* Skills */}
    <section className="space-y-4 mt-8">
      <h2 className="text-2xl font-bold text-white">🛠️ Skills Section — الجودة قبل العدد</h2>
      <p className="text-gray-300 text-sm">اختر المهارات المطابقة للدور والتي استخدمتها فعلًا. القوائم أدناه بنك اقتراحات وليست قائمة تُنسخ كاملة؛ احذف Splunk أو Kerberos أو أي مهارة لا تستطيع شرحها وتنفيذ مثال عليها.</p>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
          <h4 className="text-red-400 font-bold mb-2">🔴 الأساسية (أعلى الترتيب)</h4>
          <div className="flex flex-wrap gap-1">{['SOC','Incident Response','Threat Detection','SIEM','Log Analysis','MITRE ATT&CK','Windows Security','Network Security','Cybersecurity','Blue Team'].map((s,i) => <span key={i} className="px-2 py-1 bg-red-900/30 rounded text-red-400 text-xs">{s}</span>)}</div>
        </div>
        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
          <h4 className="text-blue-400 font-bold mb-2">🔵 الأدوات</h4>
          <div className="flex flex-wrap gap-1">{['Wazuh','Wireshark','Sysmon','Splunk','PowerShell','Python','Bash','Windows Event Viewer'].map((s,i) => <span key={i} className="px-2 py-1 bg-blue-900/30 rounded text-blue-400 text-xs">{s}</span>)}</div>
        </div>
        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
          <h4 className="text-green-400 font-bold mb-2">🟢 المفاهيم التقنية</h4>
          <div className="flex flex-wrap gap-1">{['TCP/IP','DNS','TLS/SSL','Active Directory','Kerberos','Firewalls','IDS','Vulnerability Management','Phishing Analysis','Threat Intelligence'].map((s,i) => <span key={i} className="px-2 py-1 bg-green-900/30 rounded text-green-400 text-xs">{s}</span>)}</div>
        </div>
        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
          <h4 className="text-purple-400 font-bold mb-2">🟣 Soft Skills</h4>
          <div className="flex flex-wrap gap-1">{['Problem Solving','Technical Writing','Attention to Detail','Communication','Teamwork'].map((s,i) => <span key={i} className="px-2 py-1 bg-purple-900/30 rounded text-purple-400 text-xs">{s}</span>)}</div>
        </div>
      </div>
    </section>
  </div>
);

// === LinkedIn Content Strategy ===
export const CareerLinkedInContentSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>📱</span>استراتيجية المحتوى على LinkedIn</h1>
    <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

    <Alert type="golden" title="القاعدة العملية">
      لا نعرف خوارزمية LinkedIn كاملة ولا يضمن النشر فرصة. انشر فقط ما يضيف دليلًا أو شرحًا صحيحًا، وتابع أسبوعيًا profile views والرسائل والردود. إذا استهلك المحتوى وقت المختبرات والتقديم، خفّضه.
    </Alert>

    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 mb-8">
      <h3 className="text-white font-bold mb-3">📅 جدول النشر الموصى به</h3>
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="bg-cyan-900/20 rounded p-3"><p className="text-cyan-400 font-bold">الأحد</p><p className="text-gray-400 text-xs">شرح مفهوم</p></div>
        <div className="bg-green-900/20 rounded p-3"><p className="text-green-400 font-bold">الثلاثاء</p><p className="text-gray-400 text-xs">تحديث مشروع أو درس</p></div>
        <div className="bg-purple-900/20 rounded p-3"><p className="text-purple-400 font-bold">الخميس</p><p className="text-gray-400 text-xs">تفاعل مع خبر أمني</p></div>
      </div>
      <p className="text-gray-400 text-xs text-center mt-3">هذا بنك أفكار لا حصة إلزامية: منشور موثق كل 1–2 أسبوع مع تفاعل حقيقي قد يكون أنسب لوقتك. اختبر وعدّل.</p>
    </div>

    {/* أنواع المنشورات */}
    <div className="space-y-6">
      {/* نوع 1 */}
      <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
        <div className="p-4 bg-cyan-900/20 border-b border-gray-700">
          <h3 className="text-cyan-400 font-bold">📝 Post نوع 1: شرح مفهوم أمني</h3>
        </div>
        <div className="p-4">
          <CodeBlock code={`🛡️ ما هو الـ Lateral Movement؟

في عالم الأمن السيبراني، Lateral Movement هو خطوة حرجة يقوم بها المهاجم بعد اختراق جهاز واحد.

📍 ماذا يفعل المهاجم؟
بعد اختراق جهاز في قسم المالية، يحاول الانتقال لأجهزة أخرى للوصول لسيرفر قاعدة البيانات.

🔍 كيف نكتشفه؟ (من تجربتي في اللاب)
▸ Windows Event 4624 بـ Logon Type 3 من جهاز داخلي لآخر
▸ Windows Event 7045 لخدمة جديدة باسم PSEXESVC
▸ Sysmon Event 1 لـ psexec.exe أو wmic.exe
▸ Sysmon Event 3 لاتصالات SMB غير معتادة (port 445)

📊 MITRE ATT&CK:
- Tactic: Lateral Movement (TA0008)
- Technique: T1021.002 - SMB/Windows Admin Shares

💡 Detection Tip:
لا أفترض أن اتصال SMB بين محطات العمل خبيث. أبني baseline وأربط المصدر والهوية والوجهة ووقت الاتصال وprocess/service creation؛ سياسة الشبكة هي التي تحدد المسموح.

#cybersecurity #blueteam #SOC #SIEM #MITREATTACK`} />
        </div>
      </div>

      {/* نوع 2 */}
      <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
        <div className="p-4 bg-green-900/20 border-b border-gray-700">
          <h3 className="text-green-400 font-bold">🚀 Post نوع 2: مشاركة مشروع</h3>
        </div>
        <div className="p-4">
          <CodeBlock code={`🔬 مختبر موثق: [اسم المشروع]

السؤال الذي اختبرته:
[فرضية محددة]

البيئة:
[إصدارات وعدد endpoints الحقيقي]

الاختبار والنتيجة:
✅ ولّدت [N] أحداث حميدة/موسومة
✅ تحققت من وصولها إلى [data source]
✅ اختبرت query/rule على [N] حالات
📊 النتيجة المقاسة: [TP/FP/FN أو زمن ingestion الحقيقي]

أهم قيد:
[ما لا يغطيه الاختبار أو سبب false positive]

📁 تقرير منزوع الحساسية وخطوات إعادة الاختبار: [رابط]

#cybersecurity #SIEM #detectionengineering #SOC`} />
        </div>
      </div>

      {/* نوع 3 */}
      <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
        <div className="p-4 bg-yellow-900/20 border-b border-gray-700">
          <h3 className="text-yellow-400 font-bold">📚 Post نوع 3: مشاركة تعلم</h3>
        </div>
        <div className="p-4">
          <CodeBlock code={`📚 درس من مختبر Windows telemetry:

ظهور powershell.exe كابن لـ winword.exe يرفع الشك، لكنه لا يثبت وحده وجود macro خبيث.

ما جمعته قبل القرار:
▸ Command line وScript Block logging إن توفر
▸ Parent/child lineage والتوقيع والمسار
▸ اتصالات الشبكة والملفات الناتجة
▸ المستخدم والجهاز والتغيير الإداري المعتمد

النتيجة في حالتي:
[اكتب نتيجتك الحقيقية والدليل أو قل إن الحكم بقي غير محسوم]

💡 الدرس: process relationship نقطة بدء للتحقيق، لا verdict.

#SOCanalyst #cybersecurity #blueteam #incidentresponse`} />
        </div>
      </div>

      {/* نوع 4 */}
      <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
        <div className="p-4 bg-red-900/20 border-b border-gray-700">
          <h3 className="text-red-400 font-bold">🔥 Post نوع 4: التفاعل مع أخبار أمنية</h3>
        </div>
        <div className="p-4">
          <CodeBlock code={`🔎 مراجعة دفاعية: [CVE-ID الحقيقي]

المصادر الأولية:
- Vendor advisory: [URL]
- CVE record / CISA KEV إن انطبق: [URL]

ما تحقق منه:
- المنتجات والإصدارات المتأثرة: [نص دقيق]
- الاستغلال المعروف: [نعم/لا/غير معلوم مع المصدر والتاريخ]
- أصولنا المتأثرة: [نتيجة inventory أو «لا أملك بيئة مؤسسة»]

أولوية العمل لا يحددها CVSS وحده؛ أربط exposure وasset criticality والاستغلال والضوابط.

خطوات SOC المقترحة:
1. Inventory وتأكيد النسخة
2. تطبيق توجيه المورد عبر change process
3. Hunt بمؤشرات/سلوك منشور وموثق
4. توثيق فجوات telemetry والنتيجة

#cybersecurity #vulnerability #SOC #blueteam`} />
        </div>
      </div>
    </div>
  </div>
);

// === Networking & Strategy ===
export const CareerLinkedInNetworkSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>🤝</span>Networking واستراتيجية البحث</h1>
    <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

    {/* من تضيف */}
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">👥 من تتواصل معه؟ — حسب هدفك وأهليتك</h2>
      <p className="text-gray-300 text-sm">استبدل البلد والشركات بالسوق الذي تستطيع العمل فيه قانونيًا أو عن بُعد. بعض الأدوار المنظمة قد تقيد الجنسية أو الموقع؛ اقرأ الإعلان ولا تبنِ قائمة على الرغبة فقط.</p>
      <div className="space-y-3">
        {[
          { priority: 1, title: 'Recruiters لأدوار Cybersecurity المناسبة', search: '"Cybersecurity Recruiter" [eligible country]' },
          { priority: 2, title: 'SOC Managers و Team Leads', search: '"SOC Manager" [target city/country]' },
          { priority: 3, title: 'SOC Analysts في شركات مستهدفة', search: '"SOC Analyst" [target company]' },
          { priority: 4, title: 'محتوى الأمن السيبراني العربي', search: 'أشهر مؤلفين عرب في الأمن' },
          { priority: 5, title: 'زملاء الدراسة والخريجين', search: 'من جامعتك والجامعات السعودية' },
        ].map(item => (
          <div key={item.priority} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-cyan-600 flex items-center justify-center text-white font-bold">{item.priority}</div>
            <div>
              <p className="text-white font-bold text-sm">{item.title}</p>
              <p className="text-gray-400 text-xs font-mono" dir="ltr">{item.search}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* قوالب الرسائل */}
    <section className="space-y-4 mt-8">
      <h2 className="text-2xl font-bold text-white">💌 قوالب Connection Request</h2>
      <Alert type="warning">لا توجد هنا نسبة رفض موثوقة ولا قاعدة أن كل طلب يحتاج رسالة. إذا كتبت، اجعلها قصيرة وصادقة واذكر سببًا محددًا؛ لا تطلب إحالة أو 15 دقيقة من شخص غريب في أول تواصل، ولا ترسل دفعات آلية.</Alert>

      <div className="space-y-4">
        <CodeBlock title="للـ Recruiters" code={`Hi [Name] — I saw that you recruit for [specific security area/region]. I am a final-year cybersecurity student with a documented lab project on [relevant skill]. I would be glad to connect and follow roles for which I meet the location and eligibility requirements. — [Your name]`} />

        <CodeBlock title="للـ SOC Managers" code={`Hi [Name] — your post about [specific topic] helped me improve [specific lab step]. I documented the result here: [optional URL]. Thank you for sharing it; I would be glad to connect. — [Your name]`} />

        <CodeBlock title="رسالة بعد التقديم على وظيفة" code={`Hi [Name] — I applied through the official channel for [exact role, requisition ID] on [date]. My closest evidence is [one relevant project/result]: [URL]. I meet [location/work authorization if the posting asks]. No action is needed; I wanted to share the relevant evidence. Thank you. — [Your name]`} />
      </div>
    </section>

    {/* البحث عن وظائف */}
    <section className="space-y-4 mt-8">
      <h2 className="text-2xl font-bold text-white">🔍 البحث عن وظائف عبر LinkedIn</h2>

      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <h3 className="text-cyan-400 font-bold mb-3">⚙️ إعدادات Open to Work</h3>
        <ol className="text-gray-300 text-sm space-y-2">
          <li>1. اذهب لـ Profile → "Open to" → "Finding a new job"</li>
          <li>2. Job titles: <span className="text-cyan-400">SOC Analyst, Security Analyst, Cybersecurity Analyst, Junior SOC, Blue Team Analyst</span></li>
          <li>3. Locations: <span className="text-cyan-400">أماكن تستطيع الحضور أو الانتقال إليها فعلًا؛ وRemote لا يعني العمل من أي دولة</span></li>
          <li>4. Start date: <span className="text-cyan-400">تاريخ تفرغك الحقيقي مع التزامات الجامعة</span></li>
          <li>5. Job types: <span className="text-cyan-400">ما تقبله فعلًا: Full-time / Internship / Co-op</span></li>
          <li>6. Visibility: <span className="text-green-400">اخترها وفق خصوصيتك ووضعك الحالي؛ الظهور العام ليس إلزاميًا</span></li>
        </ol>
      </div>

      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <h3 className="text-cyan-400 font-bold mb-3">🔎 كيف تبحث</h3>
        <div className="grid md:grid-cols-3 gap-3">
          <div className="bg-gray-700/30 rounded p-3">
            <p className="text-white font-bold text-xs mb-1">Search Bar</p>
            <p className="text-gray-400 text-xs font-mono" dir="ltr">"SOC Analyst" Saudi Arabia</p>
          </div>
          <div className="bg-gray-700/30 rounded p-3">
            <p className="text-white font-bold text-xs mb-1">Filters</p>
            <p className="text-gray-400 text-xs">Past Week + Entry level + Internship</p>
          </div>
          <div className="bg-gray-700/30 rounded p-3">
            <p className="text-white font-bold text-xs mb-1">Job Alerts</p>
            <p className="text-gray-400 text-xs">Set alert لكل بحث</p>
          </div>
        </div>
      </div>
    </section>

    {/* Recommendations */}
    <section className="space-y-4 mt-8">
      <h2 className="text-2xl font-bold text-white">⭐ Recommendations</h2>
      <p className="text-gray-400 text-sm">اطلب توصية فقط من شخص عمل معك ويستطيع ذكر سلوك أو نتيجة محددة. التوصية ليست بديلًا عن الدليل، ولا تطلب من شخص أن يشهد بمهارة لم يرها.</p>

      <div className="grid md:grid-cols-3 gap-3">
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <p className="text-cyan-400 font-bold text-sm">أولوية 1</p>
          <p className="text-gray-300 text-sm">أساتذة جامعة</p>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <p className="text-cyan-400 font-bold text-sm">أولوية 2</p>
          <p className="text-gray-300 text-sm">مدير تدريب أو وظيفة سابقة</p>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <p className="text-cyan-400 font-bold text-sm">أولوية 3</p>
          <p className="text-gray-300 text-sm">زملاء مشاريع جامعية</p>
        </div>
      </div>
    </section>
  </div>
);

// === LinkedIn Checklist ===
export const CareerLinkedInChecklistSection = () => {
  const sections = [
    { title: 'Profile Basics', items: ['صورة شخصية احترافية','Banner مخصص','Headline قوي بكلمات مفتاحية','Custom URL (linkedin.com/in/your-name)','الموقع محدد بدقة'] },
    { title: 'About Section', items: ['فقرات منظمة','كلمات مفتاحية موجودة','Call to action في النهاية','روابط GitHub و Email'] },
    { title: 'Featured', items: ['رابط GitHub Portfolio','أفضل مشروع','أي إنجاز مرئي'] },
    { title: 'Experience', items: ['Self-Directed Projects مضافة','أي خبرة سابقة (حتى لو غير أمنية)','أي تدريب صيفي'] },
    { title: 'Education & Skills', items: ['الجامعة والدرجة والتاريخ صحيحة','المواد ذات الصلة مذكورة إن كانت قوية','كل مهارة مدعومة بمثال','لا Endorsements متبادلة مصطنعة','الشهادات المكتملة فقط مع رابط تحقق إن توفر','Languages بمستوى صادق'] },
    { title: 'Open to Work & Activity', items: ['إعدادات Open to Work تناسب خصوصيتي','الوظائف والمواقع والأهلية دقيقة','نشرت دليلًا مفيدًا إن كان لدي ما يستحق','كتبت تعليقات نوعية لا مجاملات آلية','أتابع الشركات المؤهلة والمناسبة'] },
    { title: 'Networking', items: ['Connections ذات صلة لا رقم فارغ','الرسائل مخصصة وقليلة','المجموعات مفيدة ونشطة إن وجدت','Recommendations من أشخاص شاهدوا عملي فقط'] },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>✅</span>Checklist LinkedIn النهائية</h1>
      <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

      {sections.map((section, sIdx) => (
        <div key={sIdx} className="space-y-2">
          <h2 className="text-xl font-bold text-white">{section.title}</h2>
          {section.items.map((item, iIdx) => (
            <ChecklistItem key={iIdx} text={item} id={`linkedin-${sIdx}-${iIdx}`} />
          ))}
        </div>
      ))}

      {/* المهمة العملية */}
      <div className="bg-gradient-to-l from-cyan-900/30 to-transparent rounded-xl p-6 border border-cyan-500/30">
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">📅 المهمة العملية - 7 أيام</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { day: 'اليوم 1', tasks: 'صورة احترافية + Banner + Headline' },
            { day: 'اليوم 2', tasks: 'About كامل + Skills + Languages' },
            { day: 'اليوم 3', tasks: 'Experience + Education + Certifications' },
            { day: 'اليوم 4', tasks: 'Open to Work بدقة + قائمة أشخاص ذوي صلة + رسالتان نوعيتان' },
            { day: 'اليوم 5', tasks: 'انشر دليل مشروع إن كان جاهزًا + تعليقات تضيف معلومة' },
            { day: 'اليوم 6', tasks: 'تابع شركات مؤهلة + فعّل searches/alerts مناسبة' },
            { day: 'اليوم 7', tasks: 'راجع الأخطاء والخصوصية + قدّم لفرص عالية الملاءمة وسجّل النتيجة' },
          ].map(item => (
            <div key={item.day} className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
              <p className="text-cyan-400 font-bold text-sm">{item.day}</p>
              <p className="text-gray-300 text-xs">{item.tasks}</p>
            </div>
          ))}
        </div>
      </div>

      <Alert type="golden">
        <p className="text-xl font-bold">نفّذ نسخة أولى ثم قِسها</p>
        <p className="mt-2">خصص جلسة محدودة لتحديث الملف، ثم عد إلى المختبر والتقديم. راجع أسبوعيًا: ظهور البحث، مشاهدات المشاريع، الردود، والمقابلات. غيّر headline أو الأدلة عنصرًا واحدًا في كل مرة لتعرف ما الذي تحسن.</p>
      </Alert>
    </div>
  );
};
