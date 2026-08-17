import Alert from '../../components/Alert';
import CodeBlock from '../../components/CodeBlock';
import Table from '../../components/Table';

const queryOperators = [
  ['table / index', 'اختر مصدرًا واحدًا مناسبًا', 'SecurityEvent', 'index=windows', 'index="windows-*"'],
  ['where / search', 'قلّل الصفوف بشروط واضحة', '| where EventID == 4625', 'EventCode=4625', 'query: event.code:4625'],
  ['project / table', 'اعرض الحقول اللازمة فقط', '| project TimeGenerated, Account', '| table _time, Account', 'select fields من الواجهة'],
  ['extend / eval', 'أنشئ حقلًا مشتقًا', '| extend User=tolower(Account)', '| eval User=lower(Account)', 'scripted/runtime field عند الحاجة'],
  ['summarize / stats', 'جمّع واحسب حسب كيان', '| summarize Attempts=count() by Account', '| stats count as Attempts by Account', 'aggregation terms + value_count'],
  ['sort / sort', 'رتب بعد التجميع', '| sort by Attempts desc', '| sort - Attempts', 'order: desc'],
];

export const SocQueryingSection = () => (
  <div className="space-y-10">
    <header>
      <h1 className="text-3xl font-bold text-cyan-400">⌨️ SIEM Querying: فكّر في البيانات قبل اللغة</h1>
      <p className="mt-3 max-w-4xl text-lg leading-8 text-gray-300">المحلل القوي لا يحفظ query جاهزة. يعرّف السؤال، يحدد مصدر البيانات والحقول والزمن، يبني نتيجة صغيرة صحيحة، ثم يوسّعها مع التحقق من جودة البيانات.</p>
    </header>

    <Alert type="golden" title="خوارزمية الاستعلام في 7 أسئلة">
      1) ما القرار الذي أريد اتخاذه؟ 2) ما الكيان: user/host/IP/process؟ 3) أي log source يراه؟ 4) ما time range؟ 5) ما الحقول ودلالتها؟ 6) ما baseline أو المقارنة؟ 7) كيف أتأكد أن صفر نتائج لا يعني انقطاع ingestion؟
    </Alert>

    <section>
      <h2 className="text-2xl font-bold text-white">1. عقد البيانات Data Contract</h2>
      <Table
        headers={['الحقل المنطقي', 'Windows/Sentinel مثال', 'Elastic ECS مثال', 'لماذا يهم']}
        rows={[
          ['timestamp', 'TimeGenerated', '@timestamp', 'الـtimeline والـwindow؛ اعرف هل هو event time أم ingestion time'],
          ['event identity', 'EventID / OperationName', 'event.code / event.action', 'لا يكفي ID دون provider/source'],
          ['user', 'Account / UserPrincipalName', 'user.name / user.domain', 'انتبه للصيغة DOMAIN\\user وUPN والحسابات الخدمية'],
          ['source', 'IpAddress / SourceNetworkAddress', 'source.ip', 'قد يكون proxy/NAT/VPN وليس جهاز المهاجم'],
          ['destination', 'Computer / Resource', 'destination.* / host.name', 'حدد الأصل الذي تأثر'],
          ['outcome', 'ResultType / Activity', 'event.outcome', 'success/failure قد تكون أرقامًا أو نصوصًا مختلفة'],
          ['process', 'NewProcessName / CommandLine', 'process.*', 'يلزم parent + user + hash + signer + network للسياق'],
        ]}
      />
      <Alert type="warning" title="الـschema ليس عالميًا">
        أسماء الحقول تختلف حسب connector والإصدار وparser. افحص 5 أحداث خام أولًا، ثم اكتب query. الاستعلام الذي يعمل في بيئة قد يفشل أو يعطي معنى مختلفًا في أخرى.
      </Alert>
    </section>

    <section>
      <h2 className="text-2xl font-bold text-white">2. الترجمة بين KQL وSPL وOpenSearch</h2>
      <Table headers={['العملية', 'المعنى', 'KQL', 'SPL', 'OpenSearch/DSL مختصر']} rows={queryOperators} />
      <p className="text-sm text-gray-400">KQL هنا هي Kusto Query Language في Sentinel، وليست Kibana Query Language التي تحمل الاختصار نفسه أحيانًا.</p>
    </section>

    <section className="rounded-xl border border-cyan-500/30 bg-cyan-950/10 p-6">
      <h2 className="text-2xl font-bold text-white">3. KQL من الصفر ببيانات قابلة للتجربة</h2>
      <CodeBlock title="Dataset تدريبي — الصقه في Sentinel Logs أو Azure Data Explorer" language="kusto" code={`let AuthEvents = datatable(TimeGenerated:datetime, User:string, SrcIp:string, Host:string, Result:string, Country:string)
[
 datetime(2026-08-17 08:00:00), "amal", "10.10.5.20", "WS-01", "Failure", "SA",
 datetime(2026-08-17 08:01:00), "amal", "10.10.5.20", "WS-01", "Failure", "SA",
 datetime(2026-08-17 08:02:00), "amal", "10.10.5.20", "WS-01", "Success", "SA",
 datetime(2026-08-17 08:03:00), "svc-backup", "10.10.5.30", "SRV-01", "Success", "SA",
 datetime(2026-08-17 08:04:00), "noura", "198.51.100.24", "CLOUD", "Failure", "GB",
 datetime(2026-08-17 08:05:00), "noura", "198.51.100.24", "CLOUD", "Failure", "GB"
];
AuthEvents
| where TimeGenerated between (datetime(2026-08-17 08:00:00) .. datetime(2026-08-17 08:10:00))
| summarize Failures=countif(Result == "Failure"), Successes=countif(Result == "Success"), FirstSeen=min(TimeGenerated), LastSeen=max(TimeGenerated) by User, SrcIp
| extend FailureThenSuccess = Failures > 0 and Successes > 0
| sort by Failures desc`} />
      <div className="mt-4 grid gap-3 md:grid-cols-4">
        {[
          ['where', 'فلترة صفوف؛ طبّق الزمن مبكرًا لتقليل البيانات.'],
          ['summarize', 'يحوّل الأحداث إلى نمط حول كيان؛ لا تنسَ group-by.'],
          ['extend', 'يضيف منطقًا مشتقًا دون تغيير المصدر.'],
          ['sort/top', 'يعطي أولوية، لكنه لا يثبت الخبث.'],
        ].map(([op, explanation]) => <div key={op} className="rounded-lg border border-gray-700 bg-gray-900/70 p-4"><code className="text-cyan-300">{op}</code><p className="mt-2 text-xs leading-6 text-gray-300">{explanation}</p></div>)}
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold text-white">4. مثال حقيقي: فشل دخول Windows</h2>
      <CodeBlock title="KQL — افحص schema في بيئتك" language="kusto" code={`let Lookback = 1h;
SecurityEvent
| where TimeGenerated >= ago(Lookback)
| where EventID == 4625
| where AccountType =~ "User"
| summarize Attempts=count(), FirstSeen=min(TimeGenerated), LastSeen=max(TimeGenerated), Hosts=make_set(Computer, 10) by Account, IpAddress
| where Attempts >= 5
| sort by Attempts desc`} />
      <CodeBlock title="SPL — المنطق نفسه" language="spl" code={`index=windows earliest=-1h EventCode=4625 Account_Type="User"
| stats count as Attempts min(_time) as FirstSeen max(_time) as LastSeen values(host) as Hosts by Account_Name Source_Network_Address
| where Attempts >= 5
| sort - Attempts`} />
      <Alert type="info" title="كيف تحلل النتيجة؟">
        العتبة 5 نقطة بداية وليست حقيقة أمنية. قارن بـbaseline، افصل أجهزة scanner والخدمات المعروفة، ابحث عن نجاح بعد الفشل، نوع logon، الأصول الحساسة، ومصدر IP. حساب واحد من IP واحد يختلف عن password spray: IP واحد ضد حسابات كثيرة.
      </Alert>
    </section>

    <section>
      <h2 className="text-2xl font-bold text-white">5. تمارين mastery — لا تعرض الحل أولًا</h2>
      <div className="space-y-3">
        {[
          ['T1', 'عدّل AuthEvents لاكتشاف source واحد فشل ضد مستخدمين متعددين. المخرج: SrcIp, DistinctUsers, Failures.'],
          ['T2', 'اكتشف failure ثم success لنفس user+IP ضمن 10 دقائق، واشرح لماذا ليس TP تلقائيًا.'],
          ['T3', 'اكتب query تظهر ingestion delay باستخدام TimeGenerated ووقت ingestion إن كان المصدر يدعمه.'],
          ['T4', 'حوّل T1 إلى SPL، ثم اكتب الشكل المنطقي لـOpenSearch aggregation دون نسخ query جاهزة.'],
        ].map(([id, task]) => <div key={id} className="rounded-xl border border-gray-700 bg-gray-800/40 p-5"><strong className="text-cyan-300">{id}</strong><p className="mt-2 text-sm leading-7 text-gray-300">{task}</p></div>)}
      </div>
      <details className="mt-4 rounded-xl border border-gray-700 bg-gray-900/70 p-5">
        <summary className="cursor-pointer font-bold text-yellow-300">افتح معيار التصحيح بعد المحاولة</summary>
        <ul className="mt-3 space-y-2 text-sm text-gray-300">
          <li>• 40% صحة الجدول والحقول والزمن.</li><li>• 25% صحة aggregation والكيان.</li><li>• 20% تفسير false positives والقيود.</li><li>• 15% فحص ingestion/schema بدل تفسير الصفر كسلامة.</li>
        </ul>
      </details>
    </section>

    <section>
      <h2 className="text-2xl font-bold text-white">6. Data quality جزء من الدفاع</h2>
      <Table
        headers={['العَرَض', 'فرضيات محتملة', 'التحقق']}
        rows={[
          ['انخفضت alerts فجأة', 'لا هجوم / rule معطلة / source توقف / parser فشل', 'قارن raw event volume وagent health وآخر timestamp'],
          ['قفزة هائلة', 'هجوم / loop / policy change / duplicate ingestion', 'عينة raw + count by host/source + change record'],
          ['حقول user فارغة', 'نوع event لا يحملها / decoder كسر / mapping تغير', 'قارن raw log بالparsed fields'],
          ['timestamps مستقبلية', 'clock drift / timezone parsing', 'NTP + source timezone + ingestion time'],
          ['host صامت', 'متوقف / agent disconnected / network', 'asset status + heartbeat + owner confirmation'],
        ]}
      />
      <Alert type="golden" title="منتج Portfolio">
        أنشئ query-pack من 20 استعلامًا. لكل استعلام: السؤال، مصدر البيانات، الحقول، query، عينة نتيجة منزوعة الحساسية، تفسير، false positives، وفحص data quality. هذا أقوى من ملف استعلامات بلا شرح.
      </Alert>
    </section>
  </div>
);

export const SocCaseworkSection = () => (
  <div className="space-y-10">
    <header>
      <h1 className="text-3xl font-bold text-cyan-400">🎫 Case Management: من Alert إلى قرار قابل للمراجعة</h1>
      <p className="mt-3 max-w-4xl text-lg leading-8 text-gray-300">عمل L1 ليس إعلان “خبيث/سليم”. هو الحفاظ على سلسلة تفكير: ماذا نعرف؟ ماذا نفترض؟ ما النقص؟ ما الخطر؟ من يجب أن يعلم؟ ومتى؟</p>
    </header>

    <section>
      <h2 className="text-2xl font-bold text-white">1. افصل بين أربع طبقات</h2>
      <Table
        headers={['الطبقة', 'مثال', 'الخطأ الشائع']}
        rows={[
          ['Fact حقيقة', 'Event 4625 ظهر 12 مرة للحساب amal من 10.0.0.8', 'كتابة “المهاجم حاول” دون إثبات هوية المصدر'],
          ['Enrichment سياق', 'IP داخلي يخص VPN gateway والحساب في shift مسجل', 'اعتبار threat-intel verdict حقيقة مطلقة'],
          ['Hypothesis فرضية', 'قد يكون password mistype أو spray عبر VPN', 'تثبيت أول فرضية وعدم محاولة نفيها'],
          ['Decision قرار', 'تصعيد للتحقق من success لاحق وحالة الحساب', 'إغلاق “لا دليل” مع وجود فجوة telemetry'],
        ]}
      />
    </section>

    <section className="rounded-xl border border-gray-700 bg-gray-800/50 p-6">
      <h2 className="text-2xl font-bold text-white">2. دورة التذكرة العملية</h2>
      <div className="mt-5 grid gap-3 md:grid-cols-4">
        {[
          ['1 — Acknowledge', 'سجّل أنك استلمت ضمن SLA المؤسسة؛ لا تفترض رقمًا عامًا.'],
          ['2 — Scope', 'user/host/IP/time/source وعدد الأصول المتأثرة.'],
          ['3 — Investigate', 'فرضيات وأسئلة واستعلامات ونتائج؛ احتفظ بالأدلة الخام.'],
          ['4 — Decide', 'TP/FP/BP/undetermined مع confidence وسبب.'],
          ['5 — Act/Escalate', 'إجراء مصرح فقط؛ لا تعزل أو تعطل حسابًا دون صلاحية/playbook.'],
          ['6 — Document', 'timeline UTC، روابط queries، owner، next step.'],
          ['7 — Communicate', 'من يحتاج أن يعرف وبأي TLP/channel؟'],
          ['8 — Close/Handover', 'closure criteria أو handover قابل للتنفيذ.'],
        ].map(([title, text]) => <article key={title} className="rounded-lg border border-gray-700 bg-gray-900/60 p-4"><h3 className="font-bold text-cyan-300">{title}</h3><p className="mt-2 text-xs leading-6 text-gray-300">{text}</p></article>)}
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold text-white">3. الأولوية ليست Severity الأداة</h2>
      <p className="mt-2 text-gray-300">قيّم أربع جهات، ثم اتبع matrix مؤسستك: <strong>الأثر</strong> (أصل/بيانات/استمرارية)، <strong>الاحتمال والثقة</strong>، <strong>الانتشار</strong>، و<strong>الاستعجال</strong>. Alert “High” على test host قد يكون أدنى من “Medium” على domain controller.</p>
      <Table
        headers={['الحالة', 'الأولوية المقترحة', 'السبب']}
        rows={[
          ['Malware behavior على جهاز واحد معزول وEDR block ناجح', 'High أو Medium حسب السياسة', 'TP محتمل لكن containment قائم؛ تحقق من persistence وscope'],
          ['Impossible travel بلا دليل إضافي والمستخدم على VPN', 'Needs context', 'الإشارة قابلة للخطأ بسبب VPN/proxy/IP geolocation'],
          ['إضافة credential إلى service principal إنتاجي خارج change window', 'High/Critical', 'هوية غير بشرية قد تمنح persistence واسعًا'],
          ['انقطاع logs من domain controllers', 'High operational', 'لا يوجد verdict هجومي لكن فقد الرؤية خطر مباشر'],
        ]}
      />
    </section>

    <section>
      <h2 className="text-2xl font-bold text-white">4. قالب Case Note احترافي</h2>
      <CodeBlock title="انسخه ثم املأ نتائج حقيقية" language="markdown" code={`# Case ID / Alert title
Status: New | Investigating | Escalated | Closed
Priority: ___  | Confidence: Low / Medium / High
TLP: ___       | Owner: ___

## Executive summary
[ماذا حدث + الأصل + الأثر الحالي + القرار، 3 أسطر]

## Scope
- First/last seen (UTC):
- Users / hosts / IPs / cloud resources:
- Data sources checked and missing:

## Timeline (UTC)
- 08:01 — [fact + source/event ID]
- 08:04 — [fact + source/event ID]

## Analysis
- Hypothesis A:
  - Supporting evidence:
  - Contradicting/missing evidence:
- Hypothesis B:
  - Supporting evidence:
  - Contradicting/missing evidence:

## Actions
- [time, actor, authorized action, result]

## Decision and next step
Classification: TP / FP / BP / Undetermined
Rationale:
Escalation question or closure criteria:
Evidence references (not secrets):`} />
    </section>

    <section className="grid gap-4 md:grid-cols-2">
      <article className="rounded-xl border border-purple-500/30 bg-purple-900/10 p-5">
        <h2 className="text-xl font-bold text-purple-300">Shift handover الجيد</h2>
        <ul className="mt-3 space-y-2 text-sm text-gray-300">
          <li>• الحالة والأولوية وSLA المتبقي.</li><li>• آخر fact مؤكد وtime range.</li><li>• ما فُحص وما لم يُفحص ولماذا.</li><li>• query/link ومكان evidence.</li><li>• الإجراء التالي وowner وشرط التصعيد.</li>
        </ul>
      </article>
      <article className="rounded-xl border border-yellow-500/30 bg-yellow-900/10 p-5">
        <h2 className="text-xl font-bold text-yellow-300">لا تكتب</h2>
        <ul className="mt-3 space-y-2 text-sm text-gray-300">
          <li>• “Checked, all good” دون scope ودليل.</li><li>• “VirusTotal clean = safe”.</li><li>• IP أو hash وحده كحكم نهائي.</li><li>• أسرار أو tokens أو بيانات شخصية في ticket عام.</li><li>• إجراء لم تنفذه بصيغة الماضي.</li>
        </ul>
      </article>
    </section>

    <section>
      <h2 className="text-2xl font-bold text-white">5. Evidence handling وTLP 2.0</h2>
      <Table
        headers={['الوسم', 'المشاركة المسموحة باختصار']}
        rows={[
          ['TLP:RED', 'للمستلمين الأفراد المحددين فقط؛ لا مشاركة إضافية.'],
          ['TLP:AMBER+STRICT', 'داخل منظمة المستلم فقط وعلى أساس need-to-know.'],
          ['TLP:AMBER', 'داخل المنظمة ومع عملائها عند الحاجة لحمايتهم وعلى أساس need-to-know.'],
          ['TLP:GREEN', 'داخل المجتمع المحدد، وليس عبر قنوات عامة.'],
          ['TLP:CLEAR', 'قابل للنشر العام مع مراعاة حقوق النشر والضوابط العادية.'],
        ]}
      />
      <p className="text-sm leading-7 text-gray-300">احسب hash للنسخة التي استلمتها، سجّل المصدر والوقت وcollector، اعمل على نسخة، واضبط access. هذا لا يحول تدريبك إلى تحقيق جنائي كامل؛ اتبع سياسة المؤسسة والجهة القانونية في الحوادث الفعلية.</p>
      <Alert type="danger" title="VirusTotal والرفع العام">
        لا ترفع ملفًا أو URL أو document داخليًا حساسًا إلى خدمة عامة لمجرد فحصه. الـhash lookup أقل كشفًا لكنه قد يكشف اهتمام منظمتك. استخدم وسيلة private معتمدة وسياسة المؤسسة، أو حلل metadata وhash داخليًا.
      </Alert>
    </section>

    <section>
      <h2 className="text-2xl font-bold text-white">6. تمرين وردية مدته 25 دقيقة</h2>
      <div className="rounded-xl border border-gray-700 bg-gray-900/70 p-6 text-sm leading-7 text-gray-300">
        <p><strong className="text-white">08:00:</strong> تنبيه 8 failures للحساب finance.user من VPN IP.</p>
        <p><strong className="text-white">08:03:</strong> success من IP نفسه، MFA success.</p>
        <p><strong className="text-white">08:07:</strong> mailbox rule جديدة تحول رسائل invoice إلى RSS Feeds.</p>
        <p><strong className="text-white">08:09:</strong> المستخدم لا يرد والهاتف في CMDB قديم.</p>
        <p className="mt-3 text-cyan-300">المطلوب: facts، فرضيتان، scope، 3 queries، priority، action مصرح، escalation note من 150 كلمة وhandover من 4 أسطر.</p>
      </div>
      <details className="mt-4 rounded-xl border border-gray-700 bg-gray-800/50 p-5"><summary className="cursor-pointer font-bold text-yellow-300">معيار التقييم</summary><p className="mt-3 text-sm text-gray-300">25 timeline/scope، 20 hypotheses ونفيها، 20 queries/data sources، 20 قرار وتصعيد، 15 وضوح/سرية. المرور 80، ولا توجد نقاط لعبارة “اختراق مؤكد” دون attribution ودليل.</p></details>
    </section>
  </div>
);

export const SocIdentityCloudSection = () => (
  <div className="space-y-10">
    <header>
      <h1 className="text-3xl font-bold text-cyan-400">☁️ تحقيقات الهوية وMicrosoft 365 / Entra</h1>
      <p className="mt-3 max-w-4xl text-lg leading-8 text-gray-300">في السحابة تصبح الهوية هي المحيط: token وMFA وdevice وapp وrole قد تكون أهم من IP. مهمتك ربط sign-in بالتغيير الذي حدث بعده.</p>
    </header>

    <section>
      <h2 className="text-2xl font-bold text-white">1. النموذج العقلي للمصادقة</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {[
          ['Authentication', 'هل أثبت الكيان هويته؟ password/MFA/certificate/token.'],
          ['Authorization', 'ماذا يحق له بعد الدخول؟ role, scope, app consent.'],
          ['Session/Token', 'قد يستمر الوصول بعد تغيير كلمة المرور؛ افحص revoke وrefresh tokens.'],
          ['Human identity', 'موظف/ضيف؛ له نمط جهاز وموقع وساعات.'],
          ['Workload identity', 'service principal/managed identity؛ لا يتصرف كبشر ولا يستخدم MFA بالطريقة نفسها.'],
          ['Control plane', 'Audit logs: من غيّر role/policy/app/credential؟'],
        ].map(([title, text]) => <article key={title} className="rounded-xl border border-gray-700 bg-gray-800/50 p-5"><h3 className="font-bold text-cyan-300">{title}</h3><p className="mt-2 text-sm leading-7 text-gray-300">{text}</p></article>)}
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold text-white">2. مصادر Entra التي يجب أن تميّزها</h2>
      <Table
        headers={['المصدر/الجدول', 'يرى ماذا', 'سؤال تحقيق']}
        rows={[
          ['SigninLogs', 'تسجيلات دخول المستخدم التفاعلية', 'نجح أم فشل؟ app/device/CA/MFA/IP؟'],
          ['AADNonInteractiveUserSignInLogs', 'تسجيلات غير تفاعلية وتجديد tokens', 'هل استمر session أو client بعد الحدث؟'],
          ['AADServicePrincipalSignInLogs', 'تسجيل workload/service principal', 'أي app/credential/resource/IP؟'],
          ['AADManagedIdentitySignInLogs', 'managed identities لموارد Azure', 'هل المورد والهدف متوقعان؟'],
          ['AuditLogs', 'تغييرات الدليل والسياسات والتطبيقات', 'من أضاف role/credential/consent؟ وما target؟'],
          ['AADUserRiskEvents / RiskyUsers', 'إشارات Identity Protection إن كانت الرخصة/connector متاحة', 'ما risk detection وحالته؟ لا تعتبره verdict منفردًا'],
        ]}
      />
    </section>

    <section>
      <h2 className="text-2xl font-bold text-white">3. التحقيق في sign-in مشبوه</h2>
      <ol className="mt-4 space-y-3 text-sm leading-7 text-gray-300">
        <li><strong className="text-cyan-300">1. ثبّت الزمن والنتيجة:</strong> interactive أم non-interactive؟ ResultType ومعناه من schema.</li>
        <li><strong className="text-cyan-300">2. اربط الكيانات:</strong> user، app، device ID/compliance، IP/ASN، location، session/correlation ID.</li>
        <li><strong className="text-cyan-300">3. افهم MFA وConditional Access:</strong> النجاح قد يعني claim سابقًا أو trusted location؛ افحص التفاصيل لا الحقل المختصر فقط.</li>
        <li><strong className="text-cyan-300">4. ابنِ baseline:</strong> 7–30 يومًا لنفس المستخدم وpeers، مع مراعاة السفر وVPN والموبايل.</li>
        <li><strong className="text-cyan-300">5. ابحث عما بعد الدخول:</strong> mailbox rules، OAuth consent، role changes، downloads، app credential، forwarding.</li>
        <li><strong className="text-cyan-300">6. حدّد scope:</strong> جلسات وحسابات وأجهزة وتطبيقات أخرى من IP/indicator نفسه.</li>
      </ol>
      <CodeBlock title="KQL — timeline مستخدم، افحص أسماء الحقول في tenant" language="kusto" code={`let TargetUser = "user@example.com";
let WindowStart = ago(24h);
SigninLogs
| where TimeGenerated >= WindowStart
| where UserPrincipalName =~ TargetUser
| project TimeGenerated, UserPrincipalName, AppDisplayName, IPAddress, Location, ResultType,
          ResultDescription, DeviceDetail, ConditionalAccessStatus, AuthenticationRequirement, CorrelationId
| sort by TimeGenerated asc`} />
      <CodeBlock title="KQL — IP يستهدف حسابات متعددة" language="kusto" code={`SigninLogs
| where TimeGenerated >= ago(1h)
| where ResultType != 0
| summarize Attempts=count(), Users=dcount(UserPrincipalName), UserSet=make_set(UserPrincipalName, 20) by IPAddress
| where Attempts >= 10 and Users >= 5
| sort by Users desc`} />
    </section>

    <section>
      <h2 className="text-2xl font-bold text-white">4. أنماط L1 عالية القيمة</h2>
      <Table
        headers={['النمط', 'لماذا مهم', 'ما ينفي/يؤكد']}
        rows={[
          ['MFA fatigue', 'دفع approvals متكررة حتى يوافق المستخدم', 'عدد prompts، methods، user confirmation، success، changes بعده'],
          ['Impossible travel', 'موقعان متباعدان بزمن قصير', 'VPN/proxy/mobile egress، دقة GeoIP، session type، device'],
          ['Mailbox forwarding/rule', 'persistence أو إخفاء مراسلات BEC', 'منشئ rule، destination، وقتها، sign-in قبلها، رسائل تأثرت'],
          ['OAuth consent مشبوه', 'app قد يصل للبريد/الملفات دون password لاحقًا', 'publisher، permissions، consent actor، tenant-wide أم user'],
          ['Role assignment', 'رفع صلاحيات control plane', 'PIM/change ticket، actor/target، الوقت، نشاط لاحق'],
          ['Service principal credential', 'persistence لهوية غير بشرية', 'credential type/expiry، actor، change window، sign-ins بعدها'],
        ]}
      />
      <Alert type="warning" title="IP ≠ شخص وMFA success ≠ شرعي">
        NAT وVPN وproxy والموبايل تشترك في IPs، وtoken theft قد يتجاوز إدخال password. لا تنسب الهجوم لشخص أو بلد من GeoIP وحده، ولا تغلق الحالة لأن MFA نجح.
      </Alert>
    </section>

    <section>
      <h2 className="text-2xl font-bold text-white">5. Shared responsibility بسرعة</h2>
      <p className="mt-2 text-gray-300">مزود السحابة يؤمّن أجزاء من البنية، لكن العميل يبقى مسؤولًا عن الهوية والبيانات والتكوين والصلاحيات بدرجات تختلف حسب IaaS/PaaS/SaaS. في Microsoft 365 لا يعني SaaS أن forwarding وOAuth consent وadmin roles مسؤولية المزود.</p>
      <div className="mt-4 rounded-xl border border-purple-500/30 bg-purple-900/10 p-5">
        <h3 className="font-bold text-purple-300">تمرين Portfolio: Identity compromise case</h3>
        <p className="mt-2 text-sm leading-7 text-gray-300">استخدم بيانات مصطنعة فقط. ابنِ timeline فيه failures → MFA success → mailbox rule → OAuth consent. اكتب 5 KQL queries، حدّد telemetry الناقصة، containment المقترح مع authorization caveat، وclosure criteria. أضف صفحة “ما الذي قد يجعل استنتاجي خاطئًا؟”.</p>
      </div>
    </section>
  </div>
);

export const SocDetectionReasoningSection = () => (
  <div className="space-y-10">
    <header>
      <h1 className="text-3xl font-bold text-cyan-400">🧠 Detection Reasoning وMalware Triage الآمن</h1>
      <p className="mt-3 max-w-4xl text-lg leading-8 text-gray-300">Detection جيد يربط سلوكًا قابلًا للرصد بمصدر بيانات وكيان ونافذة زمنية واستجابة. لا يبدأ باسم أداة ولا ينتهي بـIOC.</p>
    </header>

    <section>
      <h2 className="text-2xl font-bold text-white">1. من الفرضية إلى قاعدة</h2>
      <Table
        headers={['العنصر', 'سؤال المحلل', 'مثال PowerShell download cradle']}
        rows={[
          ['Threat behavior', 'ما السلوك لا اسم العينة؟', 'PowerShell يجلب محتوى ثم ينفذه'],
          ['Telemetry', 'أي sensor يرى المراحل؟', '4104 + process creation + DNS/network'],
          ['Observable', 'ما الحقول/العلاقة؟', 'parent، command line، URL، user، destination'],
          ['Logic', 'ما الشرط والنافذة؟', 'encoded/IEX/download + child/network في 5 دقائق'],
          ['Baseline', 'متى هو شرعي؟', 'deployment scripts موقعة من management host'],
          ['Validation', 'كيف نولد حدثًا حميدًا؟', 'نص test غير ضار داخل VM'],
          ['Response', 'ما السؤال التالي؟', 'process tree، signer، download، persistence، scope'],
        ]}
      />
    </section>

    <section>
      <h2 className="text-2xl font-bold text-white">2. Sigma ليست زر تحويل سحري</h2>
      <CodeBlock title="Sigma تعليمي — انتبه إلى YAML والـbackslash" language="yaml" code={`title: Suspicious PowerShell Download Behavior
status: experimental
logsource:
  product: windows
  category: process_creation
detection:
  selection_image:
    Image|endswith: '\\powershell.exe'
  selection_terms:
    CommandLine|contains:
      - 'DownloadString'
      - 'Invoke-WebRequest'
      - 'FromBase64String'
  condition: selection_image and 1 of selection_terms
falsepositives:
  - Approved administration or deployment scripts
level: medium`} />
      <p className="text-sm leading-7 text-gray-300">تحقق من schema والbackend conversion والـfield mappings. جرّب true-positive simulation وbenign-positive، ثم راقب volume. مستوى medium في YAML لا يحدد وحده أولوية الحادث.</p>
    </section>

    <section>
      <h2 className="text-2xl font-bold text-white">3. Malware triage بلا تشغيل عينة</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <article className="rounded-xl border border-green-500/30 bg-green-900/10 p-5"><h3 className="font-bold text-green-300">آمن لمسار L1</h3><ul className="mt-3 space-y-2 text-sm text-gray-300"><li>• اجمع filename/size/hash/source/path.</li><li>• افحص signer وfile type وmetadata.</li><li>• اربط process tree وnetwork وpersistence.</li><li>• hash reputation وفق سياسة المؤسسة.</li><li>• استخدم EDR/sandbox معتمدة إن كانت متاحة.</li></ul></article>
        <article className="rounded-xl border border-red-500/30 bg-red-900/10 p-5"><h3 className="font-bold text-red-300">لا تفعله</h3><ul className="mt-3 space-y-2 text-sm text-gray-300"><li>• لا تشغّل ملفًا مجهولًا على جهازك.</li><li>• لا تعطّل الحماية لتجربة العينة.</li><li>• لا ترفع ملف جهة عمل إلى public sandbox.</li><li>• لا تفك malware حقيقيًا خارج مختبر متخصص.</li><li>• لا تقل clean لأن منصة واحدة لم تعرف hash.</li></ul></article>
      </div>
      <CodeBlock title="Windows — metadata/hash فقط، لا تشغيل" language="powershell" code={`$Path = 'C:/Lab/unknown.bin'
Get-Item -LiteralPath $Path | Select-Object Name,Length,CreationTimeUtc,LastWriteTimeUtc
Get-FileHash -LiteralPath $Path -Algorithm SHA256
Get-AuthenticodeSignature -LiteralPath $Path | Select-Object Status,StatusMessage,SignerCertificate`} />
      <CodeBlock title="Linux — metadata/hash/type/strings محدود" code={`stat -- sample.bin
sha256sum -- sample.bin
file -- sample.bin
strings -a -n 8 -- sample.bin | head -n 50
# لا تنفذ الملف ولا تمنحه صلاحية تشغيل`} />
    </section>

    <section>
      <h2 className="text-2xl font-bold text-white">4. تقييم Detection Engineering مصغر</h2>
      <p className="mt-2 text-gray-300">اختر سلوكًا واحدًا: scheduled task، new service، suspicious PowerShell أو mailbox forwarding. سلّم:</p>
      <ol className="mt-3 space-y-2 text-sm text-gray-300"><li>1. فرضية وMITRE mapping مع سبب.</li><li>2. مصادر وحقول وdata gaps.</li><li>3. query أولية ثم تحسين baseline.</li><li>4. اختبار TP حميد وBP موثق.</li><li>5. نتيجة volume ومقاييس precision تقريبية من dataset معروف.</li><li>6. triage guide وrollback.</li></ol>
      <Alert type="golden" title="لا تختلق الدقة">
        لا تكتب “95% accuracy” لأن القاعدة التقطت اختبارك. إن كانت لديك 20 حالة مصنفة ونجحت في 18، اذكر dataset وطريقة التصنيف والقيود. وإلا استخدم وصفًا نوعيًا صادقًا.
      </Alert>
    </section>
  </div>
);
