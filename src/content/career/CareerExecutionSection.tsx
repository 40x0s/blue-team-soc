import Alert from '../../components/Alert';
import CodeBlock from '../../components/CodeBlock';
import Table from '../../components/Table';

const CareerExecutionSection = () => (
  <div className="space-y-10">
    <header>
      <h1 className="text-3xl font-bold text-cyan-400">📈 خطة التوظيف الأسبوعية والمقابلة</h1>
      <p className="mt-3 max-w-4xl text-lg leading-8 text-gray-300">التوظيف مسار قياس: وظيفة مناسبة → CV مخصص → دليل مهارة → متابعة → نتيجة → تحسين. لا تنتظر إنهاء كل شيء، ولا ترسل مئات الطلبات العامة.</p>
    </header>

    <Alert type="warning" title="النتيجة ليست تحت سيطرتك بالكامل">
      لا توجد خطة تضمن القبول. ركّز على المتغيرات التي تستطيع تحسينها: جودة الأساس، وضوح الدليل، ملاءمة الطلب، اللغة، المقابلة، عدد المحاولات المؤهلة، والأهلية القانونية.
    </Alert>

    <section>
      <h2 className="text-2xl font-bold text-white">1. Minimum Viable Candidate</h2>
      <Table
        headers={['المحور', 'حد البدء بالتقديم', 'دليل أقوى خلال شهرين']}
        rows={[
          ['Networking/OS', 'تشرح DNS/TCP/TLS وWindows/Linux logs', 'PCAP + تحقيق دخول موثق'],
          ['SOC workflow', 'Triage وتصعيد وتذكرة واضحة', '5 cases زمنية مع handover'],
          ['SIEM/query', 'بحث وfilter وaggregation في أداة واحدة', '20 KQL/SPL queries مفسرة'],
          ['Portfolio', 'مشروعان حقيقيان تستطيع شرحهما', '3 مشاريع عميقة بمحددات وredaction'],
          ['Communication', 'ملخص عربي واضح وإنجليزية تقنية بسيطة', '10 تسجيلات mock interview وتحسن مرصود'],
          ['Career assets', 'CV وLinkedIn وروابط تعمل', 'نسخة مخصصة لكل عائلة وظائف'],
        ]}
      />
      <p className="text-sm text-gray-400">إذا حققت عمود “حد البدء”، ابدأ تقديمًا محدودًا وتعلّم من رد السوق بينما تواصل بناء العمود الثالث.</p>
    </section>

    <section className="rounded-xl border border-gray-700 bg-gray-800/50 p-6">
      <h2 className="text-2xl font-bold text-white">2. لوحة تقديم أسبوعية</h2>
      <CodeBlock title="applications.csv — لا تخزن بيانات حساسة" language="csv" code={`date,company,role,url,location,eligibility,fit_score,cv_version,status,next_action,feedback
2026-08-17,Example Co,SOC Analyst L1,[URL],Riyadh,verify,8/10,cv-soc-v3,applied,follow up 2026-08-24,
2026-08-18,Example MSSP,Security Monitoring Analyst,[URL],Remote,eligible,7/10,cv-mssp-v2,screening,prepare SIEM examples,asked about shifts`} />
      <div className="mt-5 grid gap-3 md:grid-cols-4">
        {[
          ['5–8', 'طلبات موجهة/أسبوع؛ عدّل الرقم حسب جودة الفرص.'],
          ['2', 'رسائل تواصل محترمة بلا طلب إحالة مباشر من غريب.'],
          ['1', 'مقابلة تجريبية مسجلة كاملة.'],
          ['1', 'تحسين واحد في مشروع أو CV بناءً على دليل.'],
        ].map(([number, text]) => <div key={text} className="rounded-lg border border-gray-700 bg-gray-900/60 p-4 text-center"><strong className="text-2xl text-cyan-300">{number}</strong><p className="mt-2 text-xs leading-5 text-gray-300">{text}</p></div>)}
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold text-white">3. Fit score قبل التقديم</h2>
      <p className="mt-2 text-gray-300">أعطِ نقطة لكل عنصر موجود بصدق: أهلية العمل، مستوى الخبرة مناسب، Windows/Linux/networking، SIEM/query، shifts، اللغة، الموقع، ودليل مشروع قريب. لا تجعل غياب أداة بعينها يمنعك إذا فهمت المنتج المنطقي، لكن لا تدّع استخدامها.</p>
      <Table
        headers={['النتيجة', 'التصرف']}
        rows={[
          ['7–8', 'قدّم الآن وخصص summary وترتيب المشاريع.'],
          ['5–6', 'قدّم إن كانت المتطلبات تفضيلية، واكتب كيف تنتقل من أدواتك الحالية.'],
          ['3–4', 'احتفظ بها للمستقبل؛ سد فجوة واحدة كبيرة أولًا.'],
          ['0–2 أو غير مؤهل قانونيًا', 'لا تستهلك وقتك؛ ابحث عن دور/موقع/مسار أهلية آخر.'],
        ]}
      />
    </section>

    <section>
      <h2 className="text-2xl font-bold text-white">4. طريقة جواب السيناريو: SCOPE</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-5">
        {[
          ['S — State', 'لخّص alert وما هو fact.'],
          ['C — Context', 'asset/user/time/baseline/data quality.'],
          ['O — Observe', 'مصادر وqueries وأدلة تؤكد/تنفي.'],
          ['P — Prioritize', 'impact/confidence/scope/SLA.'],
          ['E — Escalate', 'قرار، إجراء مصرح، توثيق وhandover.'],
        ].map(([title, text]) => <article key={title} className="rounded-xl border border-gray-700 bg-gray-800/50 p-4"><h3 className="font-bold text-cyan-300">{title}</h3><p className="mt-2 text-xs leading-6 text-gray-300">{text}</p></article>)}
      </div>
      <Alert type="info" title="إذا لم تعرف الأداة">
        قل: “لم أستخدم المنتج X في بيئة عمل، لكن أستخدم نفس workflow في Wazuh/KQL: أحدد data source والحقول والزمن، أبحث وأجمّع حسب الكيان، أتحقق من ingestion، ثم أوثق القرار. سأراجع schema والـRBAC الخاصة بالمنتج.” هذا صادق وأقوى من التخمين.
      </Alert>
    </section>

    <section className="grid gap-4 md:grid-cols-2">
      <article className="rounded-xl border border-cyan-500/30 bg-cyan-950/10 p-5">
        <h2 className="text-xl font-bold text-cyan-300">Technical English — Case update</h2>
        <CodeBlock language="text" code={`At 08:14 UTC, the SIEM generated multiple failed-sign-in alerts for user [redacted]. I confirmed [N] failures from [source type], followed by [result]. I checked [data sources]. The activity is currently classified as [classification] with [confidence] confidence because [evidence]. I escalated the case to [team] to verify [specific question].`} />
      </article>
      <article className="rounded-xl border border-purple-500/30 bg-purple-950/10 p-5">
        <h2 className="text-xl font-bold text-purple-300">مصطلحات تمنع المبالغة</h2>
        <ul className="mt-3 space-y-2 text-sm text-gray-300"><li><strong>indicates:</strong> يشير، لا يثبت.</li><li><strong>consistent with:</strong> متوافق مع نمط.</li><li><strong>observed / confirmed:</strong> حقيقة رأيتها.</li><li><strong>not observed:</strong> لم يظهر في البيانات المتاحة، وليس “لم يحدث”.</li><li><strong>data gap:</strong> مصدر ناقص يمنع الحكم.</li><li><strong>requires validation:</strong> يحتاج تحققًا من owner/Tier 2.</li></ul>
      </article>
    </section>

    <section>
      <h2 className="text-2xl font-bold text-white">5. Mock interview قابل للقياس</h2>
      <ol className="mt-4 space-y-3 text-sm leading-7 text-gray-300">
        <li>1. اختر 5 أسئلة: DNS/TCP، Windows logon، phishing، failed logons، مشروعك.</li>
        <li>2. سجّل الشاشة والصوت: دقيقتان لكل جواب دون ملاحظات.</li>
        <li>3. قيّم من 0–4: دقة، هيكل، دليل، قيود، وضوح إنجليزي.</li>
        <li>4. راجع فقط أضعف معيار، ثم أعد التسجيل بعد 48 ساعة.</li>
        <li>5. النجاح: ≥3 في كل معيار، لا متوسط يخفي ضعفًا خطيرًا.</li>
      </ol>
    </section>

    <section>
      <h2 className="text-2xl font-bold text-white">6. تشخيص funnel كل 4 أسابيع</h2>
      <Table
        headers={['العَرَض', 'الاحتمال', 'التجربة التالية']}
        rows={[
          ['طلبات مناسبة كثيرة بلا screening', 'CV/أهلية/استهداف/روابط', 'مراجعة CV على 3 إعلانات + تحقق أهلية + اختبار الروابط'],
          ['screening بلا technical interview', 'summary/تواصل/أساس أو توقع راتب/موقع', 'mock recruiter call وتوضيح الأمثلة'],
          ['technical بلا offer', 'عمق السيناريو/الأداة/التوثيق/المنافسة', 'اطلب feedback إن أمكن، وأعد الأسئلة التي تعثرت بها'],
          ['لا توجد وظائف مناسبة', 'سوق/موقع/أهلية/مسمى ضيق', 'وسّع إلى monitoring, security operations, NOC-to-SOC, internship, MSSP'],
        ]}
      />
      <Alert type="golden" title="قاعدة مالية عملية">
        لا تشترِ شهادات أو منصات غالية قبل معرفة ما إذا كانت فجوتك الفعلية شهادة أم دليلًا عمليًا أم أهلية. استخدم الموارد المتاحة والمختبر أولًا، ثم استثمر فقط عندما يرتبط القرار بإعلانات مستهدفة وميزانية واضحة.
      </Alert>
    </section>
  </div>
);

export default CareerExecutionSection;
