import Alert from '../../components/Alert';
import Table from '../../components/Table';

const SocIntroSection = () => (
  <div className="space-y-10">
    <header className="space-y-4">
      <h1 className="flex items-center gap-3 text-3xl font-bold text-cyan-400"><span>🛡️</span>كيف يعمل محلل SOC L1 فعلًا؟</h1>
      <div className="h-1 w-32 rounded bg-gradient-to-l from-cyan-500 to-transparent"></div>
      <p className="max-w-4xl text-lg leading-8 text-gray-300">أنت لا «تغلق alerts» ولا تثبت قصة من Event ID. أنت تحوّل إشارة محدودة إلى قرار قابل للمراجعة: ما الحقيقة؟ ما النطاق؟ ما الفرضيات؟ ما الخطر؟ وما الإجراء التالي المسموح؟ السرعة مطلوبة، لكن السرعة بلا صحة بيانات وتوثيق تنقل الخطأ إلى غيرك.</p>
    </header>

    <Alert type="golden" title="العقد المهني">
      اعمل وفق playbook وSLA وصلاحيات منظمتك. لا تعزل جهازًا، تعطل حسابًا، تحظر بنية مشتركة، تمسح ملفًا أو تتواصل مع مستخدم بصيغة اتهام لأن alert «مرتفع». احفظ الدليل، صرّح بالثقة والفجوات، وصعّد للمالك المخوّل.
    </Alert>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">حلقة العمل من الاستلام إلى القرار</h2>
      <Table headers={['المرحلة', 'أسئلة المحلل', 'المخرج القابل للمراجعة']} rows={[
        ['1. Intake', 'ما rule/version/data source/window؟ ما SLA والـseverity الأصلية؟', 'Alert identity ووقت الاستلام وسبب التوليد.'],
        ['2. Data health', 'هل sensor/parser/clock/ingestion/retention سليم؟ هل النتيجة empty أم المصدر مفقود؟', 'Provenance وفجوات telemetry معلنة.'],
        ['3. Facts', 'ما الحقول الخام؟ من subject ومن target؟ ما النتيجة المرصودة؟', 'حقائق منسوبة إلى event/query لا قصة مهاجم.'],
        ['4. Context', 'ما أهمية الأصل والهوية؟ هل يوجد baseline أو change أو owner؟', 'سياق business وidentity وasset موثق.'],
        ['5. Scope', 'هل تكرر عبر users/hosts/IPs/time؟ هل يوجد success أو أثر لاحق؟', 'حدود البحث وعدد الكيانات والنافذة.'],
        ['6. Hypotheses', 'ما التفسير الضار؟ ما البديل الحميد؟ ما الدليل الفاصل؟', 'فرضيات قابلة للدحض وnext queries.'],
        ['7. Decision', 'هل الأدلة تكفي للتصنيف والأولوية؟ ماذا لا نعرف؟', 'Verdict مؤقت + confidence + impact + gaps.'],
        ['8. Communicate', 'من المالك؟ ماذا يحتاج؟ ما الإجراء المسموح وشرط rollback؟', 'Ticket أو escalation يمكن لغيرك متابعته دون تخمين.'],
      ]} />
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">L1 وL2 وIR وEngineering: الحدود ليست عالمية</h2>
      <p className="text-sm leading-7 text-gray-300">Tier labels تختلف بين المؤسسات. اقرأ RACI والـplaybook بدل افتراض أن «L1 لا يحقق» أو «L2 يعزل». النموذج التالي شائع للتوجيه فقط:</p>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ['L1 / Queue', 'استلام، صحة البيانات، enrichment، scope أولي، تصنيف، توثيق وتصعيد ضمن runbook.'],
          ['L2 / Deep investigation', 'Correlation أوسع، endpoint/identity/cloud analysis، tuning feedback، وتنسيق قرارات أعلى أثرًا.'],
          ['Incident Response', 'قيادة الحادث، containment/eradication/recovery المصرح، evidence handling وتنسيق الأطراف.'],
          ['Detection / Platform', 'Onboarding وparsing، rule engineering، testing، health، coverage، tuning وقياس الجودة.'],
        ].map(([title, text]) => (
          <article key={title} className="rounded-xl border border-gray-700 bg-gray-800/50 p-5">
            <h3 className="font-bold text-cyan-300">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-gray-300">{text}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">بداية الوردية ونهايتها</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <article className="rounded-xl border border-cyan-500/30 bg-cyan-900/10 p-5">
          <h3 className="font-bold text-cyan-300">عند الاستلام</h3>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-gray-300">
            <li>• اقرأ handover وincidents المفتوحة والتغييرات والصيانة.</li>
            <li>• افحص queue age/backlog وSLA القريبة، لا severity فقط.</li>
            <li>• راجع SIEM/EDR/identity/email ingestion health وفجوات sensors.</li>
            <li>• أكد time zone وقنوات التصعيد والـon-call.</li>
          </ul>
        </article>
        <article className="rounded-xl border border-green-500/30 bg-green-900/10 p-5">
          <h3 className="font-bold text-green-300">عند التسليم</h3>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-gray-300">
            <li>• لكل حالة: آخر fact، queries المنفذة، النتيجة، owner، الموعد التالي.</li>
            <li>• اذكر ما لم يُنفذ وما ينتظر تفويضًا؛ لا تستخدم «تم التعامل».</li>
            <li>• مرر telemetry gaps وrule noise والمخاطر المتراكمة.</li>
            <li>• تحقق أن الروابط والأوقات وIDs قابلة للوصول للوردية التالية.</li>
          </ul>
        </article>
      </div>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">المقاييس: عرّف المقام قبل الرقم</h2>
      <Table headers={['Metric محتمل', 'يفيد عندما', 'كيف قد يضلل']} rows={[
        ['Time to acknowledge / triage', 'البداية والنهاية وpaused states وseverity معرفة.', 'خفضه بإغلاق سطحي أو بدء timer مختلف.'],
        ['SLA compliance', 'SLA واقعي ومجزأ حسب نوع الحالة وتوفر البيانات.', 'نسبة عالية مع إعادة فتح وتصعيد ضعيف.'],
        ['Escalation quality / rework', 'يوجد review rubric وسبب قبول/إرجاع.', 'اختلاف reviewers أو الخوف من التصعيد.'],
        ['Backlog age', 'تقيس الحجم والعمر وstaffing/data outages معًا.', 'إخفاء alerts أو bulk close يحسن الرقم فقط.'],
        ['False-positive / benign-positive rate', 'التصنيفات معرفة وsample مراجع ووقت القياس ثابت.', 'عدم رؤية false negatives؛ وBP ليس rule خاطئة بالضرورة.'],
        ['MTTD', 'نقطة بدء النشاط ونقطة detection معروفتان.', 'قد يكون metric للـdetection pipeline لا أداء L1 وحده.'],
      ]} />
      <Alert type="warning">لا تحسن metric منفردًا على حساب الأمان. راقب السرعة مع الجودة، إعادة العمل، missed detections التي كُشفت لاحقًا، وصحة telemetry. الرقم بلا تعريف وwindow ومقام ليس دليل أداء.</Alert>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">اختبار خروج قصير</h2>
      <ol className="space-y-2 text-sm leading-7 text-gray-300">
        <li>1. خذ alert fixture وحدد rule/source/schema/time window وSLA.</li>
        <li>2. خلال 20 دقيقة اكتب facts وscope وفرضيتين ودليلًا فاصلًا وقرارًا مؤقتًا.</li>
        <li>3. أنشئ escalation من 8–12 سطرًا يستطيع زميل متابعة القضية منه.</li>
        <li>4. اطلب من المراجع أن يسألك: ماذا لا يثبت alert؟ ما gap؟ ولماذا هذا الإجراء مخوّل؟</li>
        <li>5. لا تمر إذا اخترعت نتيجة، أخفيت مصدرًا مفقودًا، أو نسبت إجراءً لم تنفذه.</li>
      </ol>
    </section>
  </div>
);

export default SocIntroSection;
