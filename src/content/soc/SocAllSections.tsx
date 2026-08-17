import Alert from '../../components/Alert';
import CodeBlock from '../../components/CodeBlock';
import ChecklistItem from '../../components/ChecklistItem';
import Table from '../../components/Table';

// === SOC Structure Section ===
export const SocStructureSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400">🏢 كيف يعمل SOC؟</h1>
    <Alert type="warning" title="Tier ليس معيارًا عالميًا">
      قد يجمع SOC صغير triage وIR وengineering في شخص واحد، وقد يفصل MSSP الأدوار حسب العميل. اقرأ الوصف الوظيفي وRACI والـplaybooks الفعلية؛ لا تفترض أن Tier 1 يغلق نسبة محددة أو يملك containment.
    </Alert>

    <div className="grid md:grid-cols-2 gap-4">
      {[
        ['L1 / Monitoring & Triage', ['مراقبة queues وصحة ingestion', 'تثبيت facts والسياق والنطاق الأولي', 'توثيق وصياغة escalation قابلة للعمل', 'تنفيذ actions المسموحة فقط']],
        ['L2 / Investigation & Response', ['تحقيق أعمق وتوسيع scope', 'تنسيق containment/eradication/recovery', 'مراجعة الأدلة والقرارات', 'تحسين playbooks مع أصحابها']],
        ['Detection / Hunting / Engineering', ['هندسة telemetry وdetections', 'اختبارات positive/negative وقياس الجودة', 'Threat hunting قائم على فرضية', 'إدارة content lifecycle']],
        ['Leadership / Incident Command', ['الأولويات والمخاطر والموارد', 'قرارات incident وstakeholder communication', 'KPIs بلا حوافز ضارة', 'التحسين والامتثال والمورّدون']],
      ].map(([role, duties]) => (
        <article key={role as string} className="rounded-xl border border-gray-700 bg-gray-800/50 p-6">
          <h3 className="font-bold text-cyan-300">{role as string}</h3>
          <ul className="mt-3 space-y-2 text-sm text-gray-300">{(duties as string[]).map(duty => <li key={duty}>• {duty}</li>)}</ul>
        </article>
      ))}
    </div>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">نماذج التغطية</h2>
      <Table headers={['النموذج', 'الفكرة', 'سؤال المخاطر']} rows={[
        ['24×7 shifts', 'فريق يغطي الساعة محليًا', 'handover، staffing، fatigue؟'],
        ['Follow-the-sun', 'فرق في مناطق زمنية مختلفة', 'context loss وdata residency؟'],
        ['Business hours + on-call', 'تغطية يومية وتصعيد خارجها', 'ما alert sources التي تستدعي on-call؟'],
        ['MSSP / hybrid', 'طرف خارجي مع فريق داخلي', 'من يملك القرار والبيانات والـSLA؟'],
      ]} />
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">KPIs لا تُقرأ منفردة</h2>
      <Table headers={['Metric', 'يفيد في', 'خطر القياس']} rows={[
        ['Time to acknowledge/triage', 'زمن queue والعمل الأولي', 'إغلاق سريع ضعيف الجودة'],
        ['Escalation quality', 'اكتمال facts/scope/gaps', 'تقليل التصعيد لإرضاء رقم'],
        ['Detection precision/coverage', 'جودة content', 'precision مرتفع مع false negatives'],
        ['Telemetry health', 'freshness/loss/parser failures', 'تنبيه صامت بسبب ingestion gap'],
        ['Case rework / QA', 'قابلية إعادة التحقيق', 'لوم الفرد بدل إصلاح العملية'],
      ]} />
      <Alert type="info">الأهداف والأزمنة تحددها المؤسسة حسب المخاطر والعقود؛ لا يوجد رقم 15 دقيقة أو نسبة إغلاق تصلح لكل SOC.</Alert>
    </section>
  </div>
);

// === Alert Lifecycle Section ===
export const SocAlertLifecycleSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400">🔄 Alert Lifecycle</h1>
    <Alert type="info" title="Event ≠ Alert ≠ Incident">
      Event ملاحظة telemetry؛ alert ناتج detection أو بلاغ يحتاج triage؛ incident حدث adverse يحقق معايير المؤسسة ويحتاج إدارة استجابة. لا تحوّل severity الأداة إلى verdict.
    </Alert>

    <div className="space-y-3">
      {[
        ['1', 'Receive & validate', 'سجّل alert ID/source/time، تحقق من schema وfreshness وduplicate/suppression.'],
        ['2', 'Contextualize', 'اربط asset/user/role/change/baseline وcriticality.'],
        ['3', 'Scope & investigate', 'ابحث قبل/بعد وعبر الكيانات، وافصل facts عن hypotheses.'],
        ['4', 'Classify & prioritize', 'طبّق taxonomy وconfidence وimpact/urgency وسياسة المؤسسة.'],
        ['5', 'Escalate / respond', 'سلّم evidence؛ نفّذ فقط action مخولًا مع rollback/verification.'],
        ['6', 'Communicate & document', 'حدّث ticket أثناء العمل: queries، IDs، gaps، decisions، owners.'],
        ['7', 'Close & improve', 'closure criteria، QA، tuning/test، telemetry gap وlesson owner/date.'],
      ].map(([n, title, body]) => <article key={n} className="flex gap-4 rounded-xl border border-gray-700 bg-gray-800/50 p-5"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-700 font-bold text-white">{n}</span><div><h3 className="font-bold text-cyan-300">{title}</h3><p className="mt-1 text-sm leading-7 text-gray-300">{body}</p></div></article>)}
    </div>

    <Table headers={['التصنيف', 'تعريف عملي', 'ملاحظة']} rows={[
      ['True Positive', 'Detection طابق السلوك المقصود وكان security-relevant وفق التعريف', 'لا يحدد severity أو action وحده'],
      ['False Positive', 'Detection طابق حالة خارج المنطق المقصود', 'أصلح logic/test لا مجرد allowlist سريع'],
      ['Benign Positive', 'السلوك المقصود حدث لكنه مصرح/حميد في السياق', 'قد يحتاج توثيق/tuning محدود مع حفظ coverage'],
      ['False Negative', 'سلوك مطلوب كشفه حدث دون alert مناسب', 'يظهر عبر hunt/test/incident؛ أصلح data أو logic أو operations'],
      ['Insufficient evidence', 'المتاح لا يسمح بقرار', 'اذكر المطلوب والمالك والموعد؛ لا تجبر binary verdict'],
    ]} />

    <Alert type="warning">الـTP لا يعني «احتوِ فورًا»، والـBenign Positive لا يعني «استثنِ دائمًا». القرار يتبع impact وscope والثقة والـplaybook والسلطة.</Alert>
  </div>
);

// === Triage Playbook Section ===
export const SocTriageSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400">📋 Triage Playbook</h1>
    <Alert type="golden" title="مخرج triage">
      ليس «وجدت string». المخرج: facts + context + scope + competing hypotheses + confidence/gaps + decision + authorized next step.
    </Alert>

    <div className="space-y-4">
      {[
        ['1 — ثبّت التنبيه', ['Alert/rule/version وrecord IDs', 'event time مقابل ingestion time وtimezone', 'source health/schema/duplicates']],
        ['2 — افهم المنطق', ['ما conditions/threshold/window؟', 'ما expected data؟', 'ما الذي لم تختبره القاعدة؟']],
        ['3 — تحقق من الكيانات', ['Asset role/owner/criticality', 'User/service identity وprivilege', 'IP/domain/hash age/shared context']],
        ['4 — ابنِ timeline ونطاقًا', ['ابحث قبل/بعد بوقت مبرر', 'pivot عبر host/user/process/network', 'سجل sources searched وnot available']],
        ['5 — اختبر بدائل', ['Change/admin/scanner/backup', 'Unauthorized action أو compromised identity', 'أي evidence يفرق الفرضيتين؟']],
        ['6 — قرر وصعّد', ['classification + severity حسب policy', 'confidence وimpact observed/potential', 'action مشروط + owner + deadline']],
      ].map(([title, details]) => <article key={title as string} className="rounded-xl border border-gray-700 bg-gray-800/50 p-6"><h3 className="font-bold text-cyan-300">{title as string}</h3><ul className="mt-3 space-y-2 text-sm text-gray-300">{(details as string[]).map(d => <li key={d}>• {d}</li>)}</ul></article>)}
    </div>

    <Alert type="danger" title="Threat intel وخصوصية البيانات">
      استعلم عن IP/domain/hash كقرينة وبمنصة معتمدة، وسجّل source/confidence/first-last seen. لا ترفع file/email/URL داخليًا أو raw logs إلى VirusTotal أو URLscan أو sandbox عامة. Reputation clean لا يثبت benign، وmatch قد يكون stale/shared.
    </Alert>

    <CodeBlock title="Triage note" language="text" code={`Alert / rule / event IDs: ...
Observed facts (UTC): ...
Asset + identity context: ...
Scope searched / not searched: ...
Competing hypotheses: ...
Corroboration and gaps: ...
Classification / severity / confidence: ...
Authorized next step / owner / SLA: ...`} />
  </div>
);

// === Escalation Section ===
export const SocEscalationSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400">⬆️ Escalation: متى وكيف؟</h1>
    <Alert type="warning" title="صعّد وفق trigger لا وفق الخوف">
      الـmatrix والـSLA والـon-call path تخص المؤسسة. عند احتمال أثر كبير لا تنتظر اليقين؛ صعّد بوضوح أن المعلومات أولية، لكن لا تصف indicator منفردًا كـcompromise مؤكد.
    </Alert>

    <div className="grid md:grid-cols-2 gap-4">
      <article className="rounded-xl border border-red-500/30 bg-red-900/10 p-6">
        <h2 className="font-bold text-red-300">Urgent trigger أمثلة</h2>
        <ul className="mt-3 space-y-2 text-sm text-gray-300">
          <li>• Impact جارٍ: encryption/destruction/exfiltration/service outage.</li>
          <li>• Privileged identity أو critical asset مع evidence مترابط.</li>
          <li>• انتشار متعدد hosts أو lateral activity قيد التنفيذ.</li>
          <li>• Safety/legal/regulatory trigger حسب الخطة.</li>
          <li>• Loss of visibility متزامن مع adverse activity.</li>
        </ul>
      </article>
      <article className="rounded-xl border border-yellow-500/30 bg-yellow-900/10 p-6">
        <h2 className="font-bold text-yellow-300">Prompt escalation أمثلة</h2>
        <ul className="mt-3 space-y-2 text-sm text-gray-300">
          <li>• Investigation تجاوز صلاحية L1 أو timebox.</li>
          <li>• Evidence غير كافٍ لكن potential impact مرتفع.</li>
          <li>• Action يحتاج owner/IR/legal/identity/cloud authority.</li>
          <li>• Tool/telemetry failure يمنع القرار.</li>
          <li>• Playbook conflict أو classification/TLP حساس.</li>
        </ul>
      </article>
    </div>

    <Alert type="info">Event 1102، tool-name match، foreign sign-in، reputation hit أو privileged username ترفع الأولوية، لكنها لا تثبت intent/compromise منفردة. اربط outcome/context/scope.</Alert>

    <CodeBlock title="Escalation handoff" language="text" code={`[ESCALATION] [Case ID] [Policy priority] — factual title
Observed impact / urgency: ...
Affected and searched scope: ...
UTC timeline + source/event IDs: ...
Facts vs hypotheses: ...
Corroboration / competing explanation: ...
Confidence and visibility gaps: ...
Actions actually taken + authority + result: ...
Decision/action requested, owner, deadline: ...
Evidence location / handling label: ...`} />
  </div>
);

// === Kill Chain Section ===
export const SocKillChainSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>⚔️</span>Cyber Kill Chain</h1>
    <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>
    <Alert type="info">نموذج Lockheed Martin يصف سبع مراحل مفاهيمية. النشاط الواقعي قد يتخطى مراحل أو يكررها، كما أن النموذج أقل تفصيلًا لهجمات الهوية/السحابة؛ استخدمه للاتصال لا كدليل أن «المهاجم في مرحلة محددة».</Alert>

    <div className="space-y-3">
      {[
        { num: 1, name: 'Reconnaissance (الاستطلاع)', what: 'المهاجم يجمع معلومات: OSINT, DNS enumeration, Port scanning', see: 'Port scans, DNS queries غير معتادة, Web crawlers مشبوهة' },
        { num: 2, name: 'Weaponization (التسليح)', what: 'بناء الـ payload: Malware, Exploit, Phishing email', see: 'لا شيء عادة (تحدث على جانب المهاجم)' },
        { num: 3, name: 'Delivery (التوصيل)', what: 'إيصال الـ payload: Phishing email, Malicious website, USB', see: 'Suspicious emails, Connections لـ URLs مشبوهة' },
        { num: 4, name: 'Exploitation (الاستغلال)', what: 'استغلال ثغرة: Browser exploit, Document macro', see: 'Browser crashes, Office spawning suspicious processes' },
        { num: 5, name: 'Installation (التثبيت)', what: 'تثبيت backdoor: Malware drop, Persistence', see: 'Event 4697/7045 (service), 4698 (task), Registry changes' },
        { num: 6, name: 'Command & Control (C2)', what: 'اتصال بسيرفر المهاجم: HTTP/HTTPS beaconing, DNS tunneling', see: 'Beaconing patterns, DNS مشبوه, Encrypted traffic لـ IPs غريبة' },
        { num: 7, name: 'Actions on Objectives', what: 'الهدف النهائي: Data exfiltration, Ransomware, Lateral movement', see: 'Large data uploads, File encryption, Privileged account abuse' },
      ].map((stage) => (
        <div key={stage.num} className="bg-gray-800/50 rounded-xl p-5 border border-gray-700">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center text-white font-bold">{stage.num}</div>
            <h3 className="text-lg font-bold text-white">{stage.name}</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mr-14">
            <div><p className="text-gray-400 text-xs font-bold mb-1">ما يحدث:</p><p className="text-gray-300 text-sm">{stage.what}</p></div>
            <div><p className="text-cyan-400 text-xs font-bold mb-1">ما تراه كمحلل:</p><p className="text-cyan-300 text-sm">{stage.see}</p></div>
          </div>
        </div>
      ))}
    </div>

    <Alert type="golden" title="القيمة العملية">
      سمِّ evidence المرصود والـvisibility لكل مرحلة، ثم اسأل: ما السلوك التالي المحتمل وما control أو query التي تختبره؟ التدخل المبكر قد يقلل الأثر غالبًا، لكن التكلفة والقرار يعتمدان على السياق والسلطة.
    </Alert>
  </div>
);

// === MITRE ATT&CK Section ===
export const SocMitreSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>🎯</span>MITRE ATT&CK بعمق</h1>
    <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

    <Alert type="info">قاعدة معرفية عالمية للتكتيكات والتقنيات المستخدمة من المهاجمين. <strong>ATT&CK</strong>: Adversarial Tactics, Techniques, and Common Knowledge</Alert>

    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
      <h3 className="text-lg font-bold text-white mb-4">14 تكتيك في Enterprise:</h3>
      <div className="grid md:grid-cols-2 gap-2">
        {[
          { id: 'TA0043', name: 'Reconnaissance', ar: 'جمع معلومات' },
          { id: 'TA0042', name: 'Resource Development', ar: 'تطوير الموارد' },
          { id: 'TA0001', name: 'Initial Access', ar: 'الوصول الأولي' },
          { id: 'TA0002', name: 'Execution', ar: 'التنفيذ' },
          { id: 'TA0003', name: 'Persistence', ar: 'البقاء' },
          { id: 'TA0004', name: 'Privilege Escalation', ar: 'تصعيد الصلاحيات' },
          { id: 'TA0005', name: 'Defense Evasion', ar: 'التهرب من الدفاعات' },
          { id: 'TA0006', name: 'Credential Access', ar: 'الوصول لبيانات الاعتماد' },
          { id: 'TA0007', name: 'Discovery', ar: 'الاستكشاف' },
          { id: 'TA0008', name: 'Lateral Movement', ar: 'الحركة الجانبية' },
          { id: 'TA0009', name: 'Collection', ar: 'الجمع' },
          { id: 'TA0011', name: 'Command and Control', ar: 'القيادة والتحكم' },
          { id: 'TA0010', name: 'Exfiltration', ar: 'التسريب' },
          { id: 'TA0040', name: 'Impact', ar: 'التأثير' },
        ].map((t, i) => (
          <div key={i} className="flex items-center gap-3 p-2 bg-gray-700/50 rounded-lg">
            <span className="text-xs text-gray-500 font-mono min-w-[60px]">{t.id}</span>
            <span className="text-cyan-400 font-bold text-sm min-w-[160px]">{t.name}</span>
            <span className="text-gray-400 text-sm">{t.ar}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
      <h3 className="text-lg font-bold text-white mb-4">⭐ أهم Techniques يجب أن تعرفها</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {[
          { category: 'Initial Access', items: ['T1566 - Phishing (001: Attachment, 002: Link)', 'T1190 - Exploit Public-Facing App', 'T1078 - Valid Accounts'] },
          { category: 'Execution', items: ['T1059.001 - PowerShell', 'T1059.003 - Windows Command Shell', 'T1053 - Scheduled Task/Job', 'T1204 - User Execution'] },
          { category: 'Persistence', items: ['T1547.001 - Registry Run Keys / Startup Folder', 'T1053 - Scheduled Task/Job', 'T1543.003 - Windows Service', 'T1136 - Create Account'] },
          { category: 'Credential Access', items: ['T1003.001 - LSASS Memory', 'T1110 - Brute Force', 'T1558.003 - Kerberoasting'] },
          { category: 'Lateral Movement', items: ['T1021.001 - RDP', 'T1021.002 - SMB/Windows Admin Shares', 'T1550.002 - Pass the Hash'] },
          { category: 'Defense Evasion', items: ['T1070.001 - Clear Windows Event Logs', 'T1027 - Obfuscated/Compressed Files and Information', 'T1218.005/.010/.011 - Mshta/Regsvr32/Rundll32'] },
        ].map((cat, i) => (
          <div key={i} className="bg-gray-700/30 rounded-lg p-4">
            <h4 className="text-purple-400 font-bold text-sm mb-2">{cat.category}</h4>
            <ul className="text-gray-300 text-xs space-y-1">{cat.items.map((item, j) => <li key={j} className="font-mono">• {item}</li>)}</ul>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
      <h3 className="text-lg font-bold text-white mb-4">💡 كيف تستخدم MITRE في عملك اليومي</h3>
      <ol className="space-y-2 text-gray-300 text-sm">
        <li>1. <strong>صف observation:</strong> process/event/argument/outcome، لا اسم tool فقط.</li>
        <li>2. <strong>افتح النسخة الحالية:</strong> اقرأ procedure examples وdata components والمنصات.</li>
        <li>3. <strong>اختر أدق sub-technique:</strong> ولا تضف tactic غير مدعوم بهدف السلوك.</li>
        <li>4. <strong>اربط evidence:</strong> event ID/query/time/entity مع كل mapping.</li>
        <li>5. <strong>سجّل الحدود:</strong> mapping لا يثبت attribution ولا intent ولا نجاح action.</li>
      </ol>
      <CodeBlock language="text" code={`Observation: powershell.exe process creation with recorded command line\nEvidence: host / UTC / event ID / query\nATT&CK: T1059.001 — PowerShell\nWhy: PowerShell interpreter execution is observed\nNot claimed: payload success, maliciousness, actor attribution\nPossible additional mapping: T1027 only if obfuscation evidence meets its definition`} />
    </div>
  </div>
);

// === Pyramid of Pain Section ===
export const SocPyramidSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>🔺</span>Pyramid of Pain</h1>
    <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>
    <Alert type="info">النموذج المهم من David Bianco - يصنف IOCs حسب صعوبة تغييرها على المهاجم</Alert>

    <div className="flex flex-col items-center space-y-2">
      {[
        { level: 'TTPs', pain: 'الأصعب', value: 'عالية جداً', width: 'w-48', color: 'bg-red-600', desc: 'تغيير منهجية كاملة' },
        { level: 'Tools', pain: 'صعب', value: 'عالية', width: 'w-64', color: 'bg-orange-600', desc: 'تطوير أداة جديدة' },
        { level: 'Network/Host Artifacts', pain: 'متوسط', value: 'متوسطة-عالية', width: 'w-80', color: 'bg-yellow-600', desc: 'User-Agent, registry keys, paths' },
        { level: 'Domain Names', pain: 'أصعب قليلاً', value: 'متوسطة', width: 'w-96', color: 'bg-green-600', desc: 'تسجيل domain جديد' },
        { level: 'IP Addresses', pain: 'سهل', value: 'قليلة', width: 'w-[28rem]', color: 'bg-blue-600', desc: 'استخدام proxy أو IP جديد' },
        { level: 'Hash Values', pain: 'سهل جداً', value: 'قليلة', width: 'w-[32rem]', color: 'bg-gray-600', desc: 'تغيير bit واحد = hash جديد' },
      ].map((item, i) => (
        <div key={i} className={`${item.width} ${item.color} rounded-lg p-3 text-center text-white`}>
          <p className="font-bold">{item.level}</p>
          <p className="text-xs opacity-80">صعوبة التغيير: {item.pain} | القيمة: {item.value}</p>
          <p className="text-xs opacity-60">{item.desc}</p>
        </div>
      ))}
    </div>

    <Alert type="golden" title="الدرس العملي">
      لا تهمل IPs وhashes؛ هي سريعة ومفيدة للـscoping والاحتواء رغم قصر عمرها. استثمر أيضًا في كشف السلوك وTTPs لأنه أصعب تغييرًا غالبًا، لكن اختبر التغطية والـfalse positives: تطابق technique لا يثبت attribution ولا «يقضي» على مجموعة هجوم.
    </Alert>
  </div>
);

// === Diamond Model Section ===
export const SocDiamondSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>💎</span>Diamond Model</h1>
    <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>
    <Alert type="info">نموذج الماس يربط أربعة عناصر في كل هجوم</Alert>

    <div className="flex justify-center">
      <div className="grid grid-cols-3 gap-4 max-w-lg">
        <div></div>
        <div className="bg-red-900/20 rounded-xl p-6 border border-red-500/30 text-center">
          <div className="text-3xl mb-2">👤</div>
          <h3 className="text-red-400 font-bold">Adversary</h3>
          <p className="text-gray-400 text-xs mt-1">من؟ مجموعة معروفة؟ الدوافع؟</p>
        </div>
        <div></div>
        <div className="bg-purple-900/20 rounded-xl p-6 border border-purple-500/30 text-center">
          <div className="text-3xl mb-2">⚙️</div>
          <h3 className="text-purple-400 font-bold">Capability</h3>
          <p className="text-gray-400 text-xs mt-1">الأدوات والتقنيات</p>
        </div>
        <div className="flex items-center justify-center"><span className="text-4xl">💎</span></div>
        <div className="bg-cyan-900/20 rounded-xl p-6 border border-cyan-500/30 text-center">
          <div className="text-3xl mb-2">🌐</div>
          <h3 className="text-cyan-400 font-bold">Infrastructure</h3>
          <p className="text-gray-400 text-xs mt-1">C2 servers, Domains, IPs</p>
        </div>
        <div></div>
        <div className="bg-green-900/20 rounded-xl p-6 border border-green-500/30 text-center">
          <div className="text-3xl mb-2">🎯</div>
          <h3 className="text-green-400 font-bold">Victim</h3>
          <p className="text-gray-400 text-xs mt-1">الأنظمة والمستخدمين المستهدفين</p>
        </div>
        <div></div>
      </div>
    </div>

    <Alert type="success" title="استخدامه في التحقيق">
      كل دليل تجده يُصنف تحت أحد العناصر الأربعة. يساعدك على ربط الأحداث وفهم الصورة الكاملة.
    </Alert>
  </div>
);

// === Threat Intel Section ===
export const SocThreatIntelSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>🧠</span>Threat Intelligence بعمق</h1>
    <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

    <div className="grid md:grid-cols-4 gap-4">
      {[
        { type: 'Strategic', who: 'للقيادة وصنّاع القرار', what: 'اتجاهات ومخاطر وimplications طويلة المدى' },
        { type: 'Tactical', who: 'للدفاع والهندسة', what: 'TTPs وكيفية الكشف/التخفيف' },
        { type: 'Operational', who: 'للاستجابة والتحقيق', what: 'سياق حملات أو عمليات محددة عند توفره' },
        { type: 'Technical', who: 'للأدوات والمحللين', what: 'Observables مثل IP/domain/hash مع عمر وثقة' },
      ].map((t) => (
        <div key={t.type} className="rounded-xl border border-gray-700 bg-gray-800/50 p-4">
          <h3 className="mb-2 font-bold text-cyan-300">{t.type}</h3>
          <p className="mb-1 text-xs text-gray-400">{t.who}</p>
          <p className="text-sm text-gray-300">{t.what}</p>
        </div>
      ))}
    </div>

    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
      <h3 className="text-lg font-bold text-white mb-4">🚦 TLP (Traffic Light Protocol)</h3>
      <div className="grid md:grid-cols-5 gap-2">
        {[
          { name: 'TLP:RED', desc: 'للمستلمين الأفراد فقط؛ بلا مشاركة إضافية', bg: 'bg-red-700' },
          { name: 'TLP:AMBER+STRICT', desc: 'داخل منظمة المستلم فقط وبقدر الحاجة', bg: 'bg-amber-700' },
          { name: 'TLP:AMBER', desc: 'المنظمة وعملاؤها المحتاجون للمعلومة لحماية أنفسهم', bg: 'bg-amber-600' },
          { name: 'TLP:GREEN', desc: 'داخل المجتمع المعني؛ ليس في قنوات عامة', bg: 'bg-green-700' },
          { name: 'TLP:CLEAR', desc: 'قابل للنشر العام مع الضوابط المعتادة', bg: 'bg-gray-600' },
        ].map((tlp, i) => (
          <div key={i} className={`${tlp.bg} rounded-lg p-3 text-center text-white`}>
            <p className="font-bold text-sm">{tlp.name}</p>
            <p className="text-xs opacity-80 mt-1">{tlp.desc}</p>
          </div>
        ))}
      </div>
      <p className="text-gray-300 text-xs mt-3">هذه تسميات FIRST TLP 2.0. يحددها المصدر ولا تخفّضها من نفسك. TLP يضبط نطاق المشاركة ولا يستبدل تصنيف المعلومات أو سياسة الاحتفاظ والسرية في المؤسسة.</p>
    </div>

    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
      <h3 className="text-lg font-bold text-white mb-4">🔗 مصادر Threat Intel مجانية</h3>
      <div className="grid md:grid-cols-3 gap-3">
        {[
          { name: 'AlienVault OTX', type: 'Threat Feed' },
          { name: 'Abuse.ch (URLhaus, MalwareBazaar)', type: 'Threat Feed' },
          { name: 'VirusTotal', type: 'Analysis Platform' },
          { name: 'MISP', type: 'Sharing Platform' },
          { name: 'Mandiant Reports', type: 'Vendor Report' },
          { name: 'CISA (US)', type: 'Government' },
        ].map((s, i) => (
          <div key={i} className="bg-gray-700/50 rounded-lg p-3">
            <p className="text-cyan-400 font-bold text-sm">{s.name}</p>
            <p className="text-gray-400 text-xs">{s.type}</p>
          </div>
        ))}
      </div>
    </div>
    <Alert type="danger" title="الاستعلام لا يعني الرفع">
      راجع شروط المصدر وسياسة المؤسسة. في المنصات العامة قد تُشارك الملفات أو URLs أو metadata مع أطراف أخرى. ابدأ بالـhash/observable فقط إذا كان مصرحًا، ولا تنشر نتيجة reputation كحكم أو attribution.
    </Alert>
  </div>
);

// === SIEM Section ===
export const SocSIEMSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400">📊 SIEM للمحلل</h1>
    <Alert type="info" title="SIEM ليس صندوق كشف سحري">
      يجمع ويبحث ويربط telemetry حسب connectors/parsers/licensing/retention. نتيجة query صحيحة نحويًا قد تكون خاطئة تحليليًا إذا كانت الحقول ناقصة أو الساعة/النطاق غير صحيحين.
    </Alert>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Pipeline يجب أن تفهمه</h2>
      <CodeBlock language="text" code={`Source clock/event → agent/collector → queue → parser/normalization
→ index/table + retention → detection schedule → alert/case → analyst`} />
      <Table headers={['فحص', 'سؤال']} rows={[
        ['Freshness', 'ما الفرق بين event time وingestion time؟'],
        ['Completeness', 'هل كل expected hosts/categories ترسل؟ gaps/loss؟'],
        ['Parsing', 'هل raw value وصل للحقل الصحيح أم صار null/mis-typed؟'],
        ['Uniqueness', 'هل retries/forwarders صنعوا duplicates؟ ما event identifier؟'],
        ['Retention/access', 'هل النافذة متاحة وهل RBAC أخفى مصادر؟'],
        ['Detection state', 'rule version/window/lookback/suppression/last run؟'],
      ]} />
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">KQL: query قابلة للتفسير</h2>
      <CodeBlock title="Microsoft Sentinel / SecurityEvent — تحقق من schema في workspace" language="kusto" code={`let start = ago(24h);
let finish = now();
SecurityEvent
| where TimeGenerated >= start and TimeGenerated < finish
| where EventID == 4625
| project TimeGenerated, Computer, Account, IpAddress, LogonType, Activity
| summarize Failures=count(), FirstSeen=min(TimeGenerated), LastSeen=max(TimeGenerated),
            Hosts=dcount(Computer)
  by Account, IpAddress
| order by Failures desc`} />
      <CodeBlock title="Network logon candidates — ليس verdict lateral movement" language="kusto" code={`SecurityEvent
| where TimeGenerated >= ago(24h)
| where EventID == 4624 and LogonType == 3
| summarize Events=count(), Destinations=dcount(Computer),
            FirstSeen=min(TimeGenerated), LastSeen=max(TimeGenerated)
  by Account, IpAddress
| order by Destinations desc`} />
      <p className="text-sm leading-7 text-gray-300">LogonType 3 يشمل نشاطًا شرعيًا كثيرًا. اربط source host/process و4648 وservice/task/SMB/WinRM/RDP والتغيير والـbaseline. لا تختر threshold اعتباطيًا؛ قِس distribution واختبر labeled fixtures.</p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Portability بدل حفظ syntax</h2>
      <Table headers={['نية query', 'KQL', 'Splunk SPL concept']} rows={[
        ['Scope time/source', 'table + where TimeGenerated', 'index/sourcetype + earliest/latest'],
        ['Filter', 'where', 'search / where'],
        ['Select fields', 'project', 'fields / table'],
        ['Aggregate', 'summarize ... by', 'stats ... by'],
        ['Order/limit', 'order by / top', 'sort / head'],
      ]} />
      <Alert type="warning">أسماء fields ليست موحدة بين connector وproduct/version. افتح raw event، اعرض sample schema، ثم اختبر nulls/types قبل نسخ query.</Alert>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Evidence لأي hunt</h2>
      <CodeBlock language="text" code={`Question/hypothesis: ...
Platform + table/index + query version: ...
UTC window [start, end) and ingestion delay: ...
Sources expected / present / absent: ...
Results + sampled raw records + IDs: ...
False-positive alternatives and missing telemetry: ...
Decision/confidence/next step: ...`} />
    </section>
  </div>
);

// === Common Alerts Investigation ===
export const SocAlertsSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>🚨</span>تحقيق Alerts الشائعة</h1>
    <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

    {[
      { name: 'Multiple Failed Logons', icon: '🔓', indicators: 'Event 4625 متكرر | نفس المستخدم أو IP', steps: ['كم محاولة وفي أي مدة؟', 'من نفس IP أم متعدد؟', 'هل حدث نجاح لنفس الحساب/المصدر؟', 'هل المصدر VPN/proxy/scanner معروف؟'], decision: 'صنّف بعد ربط النجاح والجهاز ونوع Logon والـbaseline. الفشل الخارجي لا يعني حظرًا تلقائيًا؛ اتبع threshold وplaybook.' },
      { name: 'Suspicious PowerShell', icon: '💻', indicators: 'Event 4104 فيه encoding أو download | Sysmon Event 1 بسلسلة غير معتادة', steps: ['فك النص كبيانات دون تنفيذه', 'ما parent/child process؟', 'ما user/host والسياق؟', 'هل توجد شبكة أو ملفات أو persistence؟'], decision: 'IEX/DownloadString ترفع الشك ولا تثبت الضرر؛ قارن بالتوقيع والمسار والسياسة والتغيير المعتمد ثم صعّد بالأدلة.' },
      { name: 'Suspicious Outbound', icon: '🌐', indicators: 'تطابق feed | domain حديث | دورية أو حجم غير معتاد', steps: ['ما العملية والجهاز؟', 'ما DNS/SNI والبيانات المنقولة؟', 'هل الدورية آلية شرعية؟', 'ما عمر وثقة مؤشر السمعة؟'], decision: 'IOC أو beaconing قرينة لا verdict. صعّد عند اجتماع سياق endpoint وشبكة وتهديد؛ سجّل فجوات الرؤية.' },
      { name: 'New Account Created', icon: '👤', indicators: 'Event 4720', steps: ['من أنشأ الحساب؟', 'هل توجد تذكرة تغيير؟', 'ما الزمن ونطاق الأصل؟', 'ما المجموعات والنشاط اللاحق؟'], decision: 'وجود admin ووقت دوام لا يثبت الشرعية. تحقق من الطلب والمالك؛ creation غير المصرح مع privilege أو نشاط لاحق يرفع الأولوية.' },
      { name: 'Service Installation', icon: '⚙️', indicators: 'System 7045 أو Security 4697 عند تفعيل auditing', steps: ['اسم الخدمة والمسار والحساب', 'hash/signature/prevalence', 'parent والناشر والتغيير المعتمد', 'اتصالات ونشاط تالٍ'], decision: 'PSEXESVC قد يكون إدارة شرعية أو حركة جانبية. الاسم/المسار وحده لا يكفي؛ قرر بالسياق والسلوك.' },
      { name: 'Security Log Cleared', icon: '🗑️', indicators: 'Event 1102 في سجل Security', steps: ['أي حساب وجهاز؟', 'هل صيانة معتمدة؟', 'ما الأحداث والعمليات قبلها؟', 'هل بقيت نسخة مركزية وهل مسحت سجلات أخرى؟'], decision: 'حدث عالي الحساسية لكنه ليس TP دائمًا. ارفع الأولوية وصعّد وفق playbook بعد التحقق من الصيانة والسياق.' },
    ].map((alert, i) => (
      <div key={i} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-bold text-white mb-4">{alert.icon} Alert {i + 1}: {alert.name}</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gray-700/30 rounded p-3">
            <p className="text-yellow-400 text-xs font-bold mb-2">المؤشرات:</p>
            <p className="text-gray-300 text-sm">{alert.indicators}</p>
          </div>
          <div className="bg-gray-700/30 rounded p-3">
            <p className="text-cyan-400 text-xs font-bold mb-2">خطوات التحقيق:</p>
            <ul className="text-gray-300 text-xs space-y-1">{alert.steps.map((s, j) => <li key={j}>{j + 1}. {s}</li>)}</ul>
          </div>
          <div className="bg-gray-700/30 rounded p-3">
            <p className="text-green-400 text-xs font-bold mb-2">القرار:</p>
            <p className="text-gray-300 text-sm">{alert.decision}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
);

// === NIST IR Lifecycle ===
export const SocNISTSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>📜</span>NIST Incident Response — SP 800-61 Rev. 3</h1>
    <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>
    <Alert type="info" title="النسخة الحالية">
      صدر NIST SP 800-61 Rev. 3 نهائيًا في أبريل 2025 وحل محل Rev. 2. لم يعد النموذج الرسمي قائمة مراحل خطية مستقلة؛ بل يدمج الاستجابة للحوادث في وظائف NIST CSF 2.0 الست. قد تسمع في المقابلة أسماء Rev. 2 القديمة، لذلك افهم الربط ولا تدّعِ أنها مراحل Rev. 3.
    </Alert>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">الخريطة التي تعمل بها</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {[
          { name: 'GOVERN + IDENTIFY + PROTECT', role: 'دعم الاستعداد والتحسين المستمر', items: ['سياسة وصلاحيات واتصالات ومورّدون', 'أصول ومخاطر واعتماديات وبيانات مهمة', 'هويات وحماية بيانات وصيانة ومرونة', 'تُنفذ قبل الحادث وتتحسن بعده'] },
          { name: 'DETECT', role: 'العثور على الحدث وتحليله', items: ['Continuous Monitoring (DE.CM)', 'Adverse Event Analysis (DE.AE)', 'ربط مصادر وتقدير النطاق والأثر', 'تقرير هل الحدث Incident وفق معايير المؤسسة'] },
          { name: 'RESPOND', role: 'إدارة الحادث وتقليل أثره', items: ['Incident Management (RS.MA)', 'Incident Analysis (RS.AN)', 'Reporting & Communication (RS.CO)', 'Incident Mitigation (RS.MI): احتواء وإزالة حسب الخطة'] },
          { name: 'RECOVER', role: 'استعادة التشغيل بأمان', items: ['Incident Recovery Plan Execution (RC.RP)', 'Incident Recovery Communication (RC.CO)', 'التحقق من السلامة والمراقبة بعد الاستعادة', 'إدخال الدروس في Identify/Improve والسياسات'] },
        ].map((phase) => <div key={phase.name} className="bg-gray-800/50 rounded-xl p-5 border border-gray-700"><h3 dir="ltr" className="text-cyan-300 font-bold">{phase.name}</h3><p className="text-white text-sm mt-1">{phase.role}</p><ul className="text-gray-300 text-sm mt-3 space-y-1">{phase.items.map(item => <li key={item}>• {item}</li>)}</ul></div>)}
      </div>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">ترجمة المصطلحات القديمة بلا خلط</h2>
      <Table headers={['ما ستسمعه', 'مكانه العملي في Rev. 3', 'مثال']} rows={[
        ['Preparation', 'Govern/Identify/Protect مع التحسين', 'قائمة أصول، logging، playbooks، صلاحيات اتصال وتمارين'],
        ['Detection & Analysis', 'Detect ثم Respond/Analysis', 'تجميع أدلة، إعلان Incident، scope وتأثير'],
        ['Containment', 'Respond/Mitigation', 'عزل host أو revoke session بإذن وبأقل أثر'],
        ['Eradication', 'Respond/Mitigation + Analysis', 'إزالة persistence، معالجة السبب والتحقق من بقية النطاق'],
        ['Recovery', 'Recover', 'استعادة مرحلية ومعايير دخول/رجوع ومراقبة'],
        ['Lessons Learned', 'تحسين مستمر عبر جميع الوظائف', 'سد telemetry gap وتحديث rule/playbook/risk register'],
      ]} />
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">ما يفعله SOC L1 عند Incident محتمل</h2>
      <ol className="space-y-3 text-gray-300">
        {[
          'سجّل alert ID والوقت والمنطقة الزمنية والمصدر؛ لا تغيّر الأصل.',
          'تحقق من صحة البيانات والـasset/user ثم افصل الحقائق عن الفرضيات.',
          'ابحث عن نفس الكيان قبل/بعد الحدث وحدد نطاقًا أوليًا وثغرات الرؤية.',
          'طبّق severity وincident criteria وSLA الخاصة بالمؤسسة، لا معيارًا اخترعته.',
          'صعّد بقصة قصيرة: ماذا حدث، من/أين/متى، الدليل، الأثر المحتمل، ما لم يُعرف، والخطوة المقترحة.',
          'لا تعزل أو تحظر أو تعطل حسابًا إلا إذا فوضك playbook؛ وثّق صاحب القرار والوقت والنتيجة.',
        ].map((item, i) => <li key={item} className="bg-gray-800/50 border border-gray-700 rounded-lg p-3"><strong className="text-cyan-300 ml-2">{i + 1}.</strong>{item}</li>)}
      </ol>
      <Alert type="warning" title="ليست دورة سهم واحد">
        قد تبدأ استعادة خدمة بينما يستمر تحليل النطاق، وقد يعيد دليل جديد الفريق إلى Detect أو Respond. النجاح هو قرارات مخوّلة ودليل محفوظ وتقليل أثر وتعافٍ متحقق منه، لا المرور على ست خانات بالترتيب.
      </Alert>
    </section>
  </div>
);

// === Phishing Investigation ===

export const SocPhishingSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>🎣</span>Phishing Investigation</h1>
    <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

    <div className="grid md:grid-cols-4 gap-3">
      {[
        { name: 'Spear Phishing', desc: 'موجه لشخص محدد' },
        { name: 'Whaling', desc: 'موجه لمسؤولين كبار' },
        { name: 'Clone Phishing', desc: 'نسخ إيميل شرعي وتعديله' },
        { name: 'BEC', desc: 'احتيال تجاري عبر بريد منتحل أو حساب مخترق؛ قد لا يحوي رابطًا أو ملفًا' },
      ].map((t, i) => (
        <div key={i} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 text-center">
          <p className="text-cyan-400 font-bold text-sm">{t.name}</p>
          <p className="text-gray-400 text-xs mt-1">{t.desc}</p>
        </div>
      ))}
    </div>

    <Alert type="danger" title="قاعدة السلامة والخصوصية">
      لا تنقر ولا تفتح ولا تفك مرفقًا على جهازك اليومي. لا ترفع الرسالة أو الملف أو URL داخليًا إلى VirusTotal أو URLscan أو sandbox عامة؛ الإرسال العام قد يكشف المحتوى والوجهات. ابدأ بالـheaders وhash في بيئة معتمدة، ولا تنفذ dynamic analysis إلا في sandbox مؤسسية معزولة وبصلاحية.
    </Alert>

    <div className="space-y-4">
      {[
        { step: 1, title: 'احفظ الأصل والنطاق', desc: 'سجّل message ID والوقت والمنطقة الزمنية والمبلّغ؛ احفظ .eml وفق السياسة، واعمل على نسخة. اسأل: هل نقر أو أدخل credentials أو فتح الملف؟' },
        { step: 2, title: 'افهم Headers', desc: 'اقرأ Received من الأسفل للأعلى بحذر، From/Reply-To/Return-Path وAuthentication-Results. اختلاف الحقول قد يكون شرعيًا؛ الأهم SPF وDKIM ثم DMARC alignment والسياق.' },
        { step: 3, title: 'حلل الهوية والنطاق', desc: 'قارن الاسم والعنوان وReply-To، Unicode/typosquatting، عمر النطاق عند السماح، والمراسلات السابقة. Display name وحده لا يثبت المرسل.' },
        { step: 4, title: 'حلل الطلب لا الأسلوب فقط', desc: 'ما الإجراء المطلوب: دفع، credential، OAuth consent، تغيير حساب بنكي؟ تحقق من الطلب بقناة مستقلة معروفة؛ الأخطاء أو الإلحاح قرائن ضعيفة ويمكن أن توجد في بريد شرعي.' },
        { step: 5, title: 'استخرج الروابط بلا زيارة', desc: 'استخرج القيمة نصيًا، وسّع redirect فقط بأداة مؤسسية، وقارن host وpunycode. ابحث عن domain/URL في منصة معتمدة دون إرسال بيانات حساسة.' },
        { step: 6, title: 'حلل المرفق بأقل تعرض', desc: 'سجّل الاسم والحجم والنوع الحقيقي واحسب SHA-256 محليًا. ابحث عن الـhash فقط أولًا. لا تفك archive أو تشغّل macro إلا في sandbox خاصة معزولة وبإذن.' },
        { step: 7, title: 'Scope وimpact', desc: 'ابحث بـmessage ID/sender/subject/domain/hash: من استلم؟ هل سُلّم أو حُذف؟ من نقر أو سجّل دخولًا؟ راجع sign-ins وmailbox rules وOAuth عند الاشتباه بالهوية.' },
        { step: 8, title: 'قرار واستجابة مخوّلة', desc: 'وثّق facts وconfidence. نفّذ purge/block/session revoke/reset فقط عبر playbook وصاحب صلاحية؛ اختبر أثر الحظر لأن shared hosting وdomains الشرعية قد تتضرر.' },
      ].map((s) => (
        <div key={s.step} className="bg-gray-800/50 rounded-xl p-5 border border-gray-700 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold flex-shrink-0">{s.step}</div>
          <div>
            <h3 className="text-white font-bold">{s.title}</h3>
            <p className="text-gray-300 text-sm mt-1">{s.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// === EDR/XDR Section ===
export const SocEDRSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400">🔬 EDR وXDR للمحلل</h1>
    <Alert type="warning" title="الاسم لا يضمن coverage">
      EDR visibility تختلف حسب OS/sensor version/policy/licensing/network health/tamper state/retention. XDR مصطلح سوقي يربط مصادر متعددة بدرجات مختلفة. تحقق من data الفعلية بدل افتراض «يرى كل شيء».
    </Alert>

    <Table headers={['قد يوفر', 'سؤال التحقق']} rows={[
      ['Process tree/command/signature', 'هل sensor بدأ قبل الحدث؟ command line كاملة؟ PID reuse؟'],
      ['File create/write/hash/quarantine', 'هل كل filesystem/archives covered؟ ما action/result؟'],
      ['Network metadata', 'DNS/SNI/remote endpoint؟ هل traffic قبل sensor أو داخل container؟'],
      ['Identity/logon context', 'Local أم Entra/AD؟ token/session mapping صحيح؟'],
      ['Response actions: isolate/kill/quarantine/collect', 'من مخول؟ ما exclusions/rollback/business impact؟'],
    ]} />

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Process tree checklist</h2>
      <CodeBlock language="text" code={`Host + sensor health/version + UTC
Process GUID/entity ID + PID + start time
Image path/hash/signature/version/user/integrity
Parent GUID/path/arguments and children
File/network/registry/module events with outcomes
Prevalence/baseline/change/owner
Alert logic and raw event IDs
Gaps + competing hypotheses + confidence`} />
      <p className="leading-8 text-gray-300">Parent-child غير المعتاد signal فقط؛ updaters، deployment tools وassistive software قد تصنع trees غريبة. لا تعتمد screenshot؛ صدّر IDs/queries ضمن السياسة.</p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Response action gate</h2>
      <ol className="space-y-2 text-sm leading-7 text-gray-300">
        <li>1. اربط case وasset criticality وscope والثقة.</li>
        <li>2. تحقق من authority ومن معنى action في المنتج.</li>
        <li>3. احفظ volatile/remote evidence المطلوب قبل action إن سمح الوقت والخطة.</li>
        <li>4. قيّم management path، cluster، user safety وbusiness impact.</li>
        <li>5. نفذ أقل action لازم، سجل actor/time/request ID.</li>
        <li>6. تحقق من النتيجة والمضاعفات وخطة rollback/reconnect.</li>
      </ol>
      <Alert type="danger">Isolate قد يبقي قنوات إدارة vendor أو يستثني traffic؛ kill/quarantine قد يفشل أو يزيل artifact. لا تكتب «تم الاحتواء» من click؛ تحقق من state وtelemetry.</Alert>
    </section>
  </div>
);

// === SOC Checklist Section ===
export const SocChecklistSection = () => {
  const items = [
    'أشرح مصطلحات SOC الأساسية بالعربية والإنجليزية داخل تحقيق', 'أفهم أن توزيع Tier 1/2/3 يختلف بين المؤسسات', 'أشرح Alert Lifecycle كاملاً',
    'أفصل True/False/Benign Positive عن severity', 'أطبق SLA وKPIs المؤسسة دون التلاعب بالمقياس', 'أستخدم Cyber Kill Chain عندما يناسب السؤال',
    'أشرح Pyramid of Pain وحدوده', 'أستخدم Diamond Model كأداة تحليل لا كإثبات', 'أربط السلوك بتقنيات MITRE الصحيحة مع الدليل',
    'أشرح تكامل NIST SP 800-61 Rev. 3 مع CSF 2.0', 'أنجز Triage ضمن SLA اللاب مع الحفاظ على الجودة', 'أحدد متى ولماذا أصعّد',
    'أكتب Incident Report يميز facts والفرضيات', 'أحلل Phishing email بأمان', 'أتعامل مع IOC كقرينة لها ثقة وعمر',
    'أستخدم Wazuh وأتحقق من ingestion', 'أكتب وأشرح queries بـ KQL ثم أنقل المنطق لأداة أخرى', 'أستعلم من threat intel دون رفع بيانات حساسة',
    'أبني MITRE mapping لسلوك مدعوم بالدليل', 'أحقق في Brute Force', 'أحقق في Suspicious PowerShell',
    'أحقق في Lateral Movement', 'أحقق في Phishing', 'نشرت مشاريع قليلة عميقة منزوعة الحساسية مع أدلة اختبار',
  ];

  const deliverables = [
    'triage-exercise-01.md', 'investigation-report-01.md', 'mitre-mapping-exercise.md',
    'wazuh-e2e-validation.md مع screenshots منقحة وقياسات ingestion', 'phishing-analysis-fixture-01.md', 'ioc-hunt-01.md',
    'soc-terminology-cheatsheet.md', 'incident-report-template.md', 'escalation-template.md',
  ];

  const interviewQA = [
    { q: 'ما الفرق بين IDS و IPS؟', a: 'IDS يراقب ويولد اكتشافات عادةً؛ IPS يكون غالبًا inline ويمكنه المنع وفق السياسة. الاسم لا يضمن الدقة أو أن كل alert حُظر.' },
    { q: 'ما الفرق بين SIEM و SOAR؟', a: 'SIEM يركز على جمع/تطبيع/بحث/ربط telemetry؛ SOAR ينسق الأدوات وcase workflow وplaybooks الآلية. المنتجات قد تتداخل.' },
    { q: 'ما الفرق بين EDR و XDR؟', a: 'EDR يركز على endpoint telemetry والاستجابة. XDR تسمية منتج لربط endpoint بهوية/بريد/شبكة/سحابة؛ النطاق الفعلي يختلف حسب المورد والترخيص.' },
    { q: 'كيف تكشف Lateral Movement؟', a: 'أبني baseline ثم أربط remote logon والهوية والمصدر والوجهة والبروتوكول والعملية: مثل 4624/LogonType 3، 4648، SMB/RDP/WinRM وservice/task creation. لا يكفي Event ID منفرد.' },
    { q: 'ما أهمية Pyramid of Pain؟', a: 'يساعد على موازنة مؤشرات سريعة قصيرة العمر مع detections سلوكية أصعب تغييرًا؛ لا يلغي hashes/IPs ولا يجعل TTP attribution يقينيًا.' },
    { q: 'ما علامات Ransomware؟', a: 'معدل تعديل/إعادة تسمية مرتفع، notes، حذف recovery artifacts، عمليات غير معتادة ووصول واسع للملفات. أتحقق من السياق لأن كل علامة منفردة قد تكون إدارية.' },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>✅</span>Checklist SOC النهائية</h1>
      <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">📋 قائمة المهارات</h2>
        <div className="space-y-2">{items.map((item, i) => <ChecklistItem key={i} text={item} id={`soc-item-${i}`} />)}</div>
      </section>

      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">📁 المخرجات المطلوبة</h2>
        <div className="space-y-2">{deliverables.map((item, i) => <ChecklistItem key={i} text={item} id={`soc-del-${i}`} />)}</div>
      </section>

      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">💼 أسئلة المقابلات</h2>
        <div className="space-y-3">{interviewQA.map((qa, i) => (
          <div key={i} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <h3 className="text-cyan-400 font-bold text-sm mb-2">{qa.q}</h3>
            <p className="text-gray-300 text-sm">{qa.a}</p>
          </div>
        ))}</div>
      </section>

      <Alert type="golden" title="بوابة النجاح">
        <p className="text-xl font-bold">Observe 🔍 → Reason 🧠 → Communicate 📢 → Document 📝</p>
        <p className="mt-2">السرعة مهمة داخل SLA، لكن لا تُشترى بالدقة أو السلطة. اجتز المختبر بتقرير قابل للإعادة، queries/IDs، حدود واضحة، QA وشرح شفهي.</p>
      </Alert>
    </div>
  );
};
