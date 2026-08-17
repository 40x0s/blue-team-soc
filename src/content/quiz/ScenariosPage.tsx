import { useState } from 'react';

const scenarios = [
  {
    id: 1,
    title: 'PowerShell EncodedCommand at 2 AM',
    scenario: 'Alert: PowerShell -EncodedCommand detected on a Finance department workstation at 2:00 AM. What do you do?',
    scenarioAr: 'تنبيه: PowerShell -EncodedCommand على جهاز في قسم المالية الساعة 2 صباحًا. ماذا تفعل؟',
    answer: [
      'أثبت alert ID والوقت والمنطقة الزمنية والجهاز والمستخدم ومصدر الكشف، ثم أتحقق أن telemetry كاملة وليست event قديمًا أو test.',
      'أجمع Script Block 4104 إن كان مفعّلًا، وProcess Creation 4688 أو Sysmon 1، والـparent/child وcommand line والتوقيع والمسار. غياب 4104 فجوة رؤية وليس دليل سلامة.',
      'أفك EncodedCommand كبيانات فقط في أداة offline؛ PowerShell يستخدم عادة Base64 لنص UTF-16LE. لا ألصق الناتج في PowerShell ولا أنفذه.',
      'أربط الناتج بالاتصالات وDNS والملفات والـpersistence والـuser context والتغيير المعتمد. الساعة وencoding وIEX/DownloadString ترفع الشك لكنها لا تثبت الضرر منفردة.',
      'أبحث عن نفس hash/command/destination والحساب على أجهزة أخرى، وأحدد known/unknown وscope وimpact المحتمل.',
      'أصعّد بالحقائق والاستنتاج والثقة وفجوات الرؤية والخطوة المقترحة. أعزل الجهاز أو أوقف process فقط إذا خوّلني playbook أو incident commander، ثم أوثق الوقت والنتيجة.',
    ],
  },
  {
    id: 2,
    title: 'Mass Phishing Campaign',
    scenario: '50 users received the same phishing email. 3 clicked the link. 1 entered their password. What do you do?',
    scenarioAr: 'وصلت رسالة تصيد واحدة إلى 50 مستخدمًا؛ نقر 3 الرابط وأدخل مستخدم واحد كلمة مروره. ماذا تفعل؟',
    answer: [
      'أعامل إدخال credentials كأثر مؤكد يحتاج incident workflow، وأسجل message ID والوقت والمستلمين ومن نقر ومن أدخل البيانات.',
      'عبر الإجراء المخوّل: revoke sessions/tokens، reset credential، راجع MFA methods وOAuth consents. تفعيل MFA لاحقًا وحده لا يبطل session مسروقة ولا تسجيلًا خبيثًا.',
      'أراجع sign-ins والـIP/device/risk والتطبيقات، mailbox forwarding/inbox rules، الرسائل المرسلة، وتغييرات الحساب منذ النقر. أوسع النطاق إذا استُخدم الحساب.',
      'أفحص أجهزة الناقرين عبر EDR/browser/network telemetry حسب نوع الرابط؛ النقر لا يعني execution، وعدم إدخال كلمة مرور لا يثبت عدم الأثر.',
      'أستخرج sender/domain/URL/message ID والـattachment hash بأمان، ثم أنفذ search-and-purge والحظر عبر playbook. أقيّم أثر حظر shared domain قبل تطبيقه.',
      'أحفظ البريد الأصلي وفق السياسة ولا أرفعه إلى خدمة عامة، وأوثق containment والنتائج والمجهول ومالك كل إجراء. يكون التواصل موجّهًا وواضحًا لا رسالة ذعر عامة.',
    ],
  },
  {
    id: 3,
    title: 'Suspicious Service Installation at 3 AM',
    scenario: 'Event 7045 shows a new service named "UpdateService" with path C:\\Users\\admin\\AppData\\Local\\Temp\\svc.exe installed at 3 AM. Assessment?',
    scenarioAr: 'يظهر Event 7045 خدمة جديدة باسم UpdateService ومسارها داخل Temp، ثُبتت الساعة 3 فجرًا. ما تقييمك؟',
    answer: [
      'الوقت والمسار والاسم generic عوامل خطورة، لا verdict. أتحقق من hostname والـtimezone ودقة Event 7045 ومن نافذة صيانة أو deployment معتمد.',
      'أجمع service name وImagePath وstart type وservice account، وأربط Security 4697 إن كان auditing مفعّلًا مع 4688/Sysmon 1 وregistry/SCM telemetry لتحديد المنشئ والـparent.',
      'أحسب SHA-256 محليًا، وأفحص signature/publisher/version/prevalence وACLs ووقت الإنشاء. أستعلم عن الـhash في خدمة مسموحة؛ لا أرفع svc.exe أو بيانات المؤسسة إلى VirusTotal العام.',
      'أراجع process tree والاتصالات والملفات والـpersistence والlogons قبل/بعد الحدث، وأبحث عن نفس service/hash/path عبر بقية البيئة.',
      'أصنف الحالة حسب اجتماع الأدلة والأصل الحرج والأثر. قد تكون updater سيئة التغليف أو أداة إدارة أو نشاطًا خبيثًا؛ أذكر ما يثبت أو ينفي كل فرضية.',
      'إن اجتمع دليل قوي، أصعّد واقترح عزلًا/إيقاف خدمة/حفظ عينة وفق playbook. لا أحذف الملف أو أوقف الخدمة قبل حفظ الأدلة والتأكد من الصلاحية والأثر التشغيلي.',
    ],
  },
];

const scoring = [
  ['0–2', 'جمع الحقائق: الكيانات، الزمن، data source، والتحقق من جودة telemetry'],
  ['0–2', 'التحليل: ربط endpoint/identity/network وفصل القرينة عن الحكم'],
  ['0–2', 'النطاق والأثر: بحث مماثل، criticality، وما لا تستطيع رؤيته'],
  ['0–2', 'القرار: severity/confidence وخطوة تالية متناسبة مع الدليل'],
  ['0–2', 'السلامة والتواصل: authorization، حفظ الأدلة، وتوثيق escalation'],
];

const loadDrafts = (): Record<number, string> => {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem('soc-scenario-drafts') || '{}');
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
    return Object.fromEntries(
      Object.entries(parsed).filter(([id, value]) => scenarios.some(scenario => String(scenario.id) === id) && typeof value === 'string'),
    );
  } catch {
    return {};
  }
};

const ScenariosPage = () => {
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [showTranslation, setShowTranslation] = useState<Record<number, boolean>>({});
  const [drafts, setDrafts] = useState<Record<number, string>>(loadDrafts);

  const updateDraft = (id: number, value: string) => {
    setDrafts(previous => {
      const next = { ...previous, [id]: value };
      try { localStorage.setItem('soc-scenario-drafts', JSON.stringify(next)); } catch { /* storage may be unavailable */ }
      return next;
    });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>💼</span>سيناريوهات المقابلة والتحقيق</h1>
      <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

      <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
        <p className="text-gray-300 text-sm leading-7">
          هذه سيناريوهات تدريبية ممثلة وليست أسئلة مسرّبة أو وصفًا لكل SOC. اكتب إجابتك قبل المقارنة. لا توجد “إجابة نموذجية” وحيدة: صلاحيات L1 والـSLA والأدوات والـplaybook تختلف؛ المطلوب منهج قرار آمن ومدعوم بالدليل.
        </p>
      </div>

      <div className="space-y-6">
        {scenarios.map((scenario) => {
          const draft = drafts[scenario.id] || '';
          const canReveal = draft.trim().length >= 40;
          return (
            <div key={scenario.id} className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <h3 className="text-lg font-bold text-white" dir="ltr">Scenario {scenario.id}: {scenario.title}</h3>
                  <button
                    type="button"
                    onClick={() => setShowTranslation(previous => ({ ...previous, [scenario.id]: !previous[scenario.id] }))}
                    className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs text-gray-200 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    aria-pressed={Boolean(showTranslation[scenario.id])}
                  >
                    {showTranslation[scenario.id] ? 'Hide Arabic' : 'عربي'}
                  </button>
                </div>

                <div className="bg-yellow-900/20 rounded-lg p-4 border border-yellow-500/30 mb-4" dir="ltr">
                  <p className="text-yellow-300 text-sm">{scenario.scenario}</p>
                </div>

                {showTranslation[scenario.id] && (
                  <div className="bg-cyan-900/20 rounded-lg p-4 border border-cyan-500/20 mb-4">
                    <p className="text-cyan-300 text-sm">{scenario.scenarioAr}</p>
                  </div>
                )}

                <label htmlFor={`scenario-answer-${scenario.id}`} className="block text-sm font-bold text-white mb-2">
                  إجابتك: Facts → Context → Scope → Decision → Escalation
                </label>
                <textarea
                  id={`scenario-answer-${scenario.id}`}
                  value={draft}
                  onChange={(event) => updateDraft(scenario.id, event.target.value)}
                  rows={6}
                  dir="auto"
                  placeholder="اكتب ما ستجمعه، كيف ستختبر الفرضيات، ما الإجراء المخوّل، وماذا ستصعّد..."
                  className="w-full mb-3 rounded-lg border border-gray-600 bg-gray-950/70 p-3 text-sm text-gray-100 placeholder:text-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                />

                {!revealed[scenario.id] ? (
                  <div>
                    <button
                      type="button"
                      disabled={!canReveal}
                      onClick={() => setRevealed(previous => ({ ...previous, [scenario.id]: true }))}
                      className="w-full py-3 bg-green-600 enabled:hover:bg-green-700 disabled:bg-gray-700 disabled:text-gray-500 rounded-lg text-white font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-green-300"
                    >
                      قارن بإجابة الخبير
                    </button>
                    {!canReveal && <p className="text-xs text-gray-400 mt-2">اكتب 40 حرفًا على الأقل حتى لا يتحول التدريب إلى قراءة سلبية.</p>}
                  </div>
                ) : (
                  <div className="bg-green-900/20 rounded-lg p-4 border border-green-500/30">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <h4 className="text-green-400 font-bold">نقاط مقارنة — ليست وصفة وحيدة</h4>
                      <button type="button" onClick={() => setRevealed(previous => ({ ...previous, [scenario.id]: false }))} className="text-xs text-gray-300 underline">إخفاء</button>
                    </div>
                    <ol className="space-y-2">
                      {scenario.answer.map((step, index) => (
                        <li key={step} className="flex items-start gap-3 text-gray-300 text-sm leading-6">
                          <span className="w-6 h-6 rounded-full bg-green-600/50 flex items-center justify-center text-green-300 text-xs font-bold flex-shrink-0">{index + 1}</span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <section className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 space-y-4">
        <h3 className="text-lg font-bold text-cyan-400">Rubric من 10 لكل إجابة</h3>
        <div className="space-y-2">
          {scoring.map(([score, criterion]) => (
            <div key={criterion} className="flex items-start gap-3 text-sm"><span className="text-cyan-300 font-bold min-w-10" dir="ltr">{score}</span><span className="text-gray-300">{criterion}</span></div>
          ))}
        </div>
        <p className="text-gray-300 text-sm leading-7">
          استهدف 8/10 في ثمانية سيناريوهات مختلفة، ثم أعدها شفهيًا بزمن 3–5 دقائق وسجّل نفسك. هذه بوابة إتقان للمقرر وليست شهادة جاهزية للعمل أو ضمان مقابلة؛ اطلب من زميل مراجعة الدليل والمنطق، لا البلاغة فقط.
        </p>
      </section>
    </div>
  );
};

export default ScenariosPage;
