import { useState } from 'react';
import type { Lab } from '../types';
import Alert from './Alert';
import CodeBlock from './CodeBlock';

interface LabTheme {
  icon: string;
  name: string;
  text: string;
  border: string;
  softBackground: string;
  solidBackground: string;
  gradient: string;
}

interface LabViewerProps {
  lab?: Lab;
  theme: LabTheme;
}

const readProgress = (lab: Lab): number[] => {
  try {
    const raw = localStorage.getItem(`soc-course:lab:${lab.id}`);
    const value: unknown = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(value)) return [];
    const validSteps = new Set(lab.steps.map(step => step.step));
    return [...new Set(value)].filter((item): item is number => Number.isInteger(item) && validSteps.has(item as number));
  } catch {
    return [];
  }
};

const saveProgress = (labId: string, steps: number[]) => {
  try {
    localStorage.setItem(`soc-course:lab:${labId}`, JSON.stringify(steps));
  } catch {
    // استمرار عمل الكورس أهم من التخزين إذا منع المتصفح localStorage.
  }
};

const LabViewer: React.FC<LabViewerProps> = ({ lab, theme }) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>(() => lab ? readProgress(lab) : []);
  const [showDeliverable, setShowDeliverable] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!lab) return <div className="text-red-400">تعذّر العثور على المختبر.</div>;

  const toggleStep = (stepNumber: number) => {
    const updated = completedSteps.includes(stepNumber)
      ? completedSteps.filter(step => step !== stepNumber)
      : [...completedSteps, stepNumber];
    setCompletedSteps(updated);
    saveProgress(lab.id, updated);
  };

  const resetProgress = () => {
    setCompletedSteps([]);
    saveProgress(lab.id, []);
  };

  const copyDeliverable = async () => {
    try {
      await navigator.clipboard.writeText(lab.deliverable);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const progress = lab.steps.length ? (completedSteps.length / lab.steps.length) * 100 : 0;
  const evidence = lab.evidence ?? ['لقطة شاشة للنتيجة', 'الأمر أو الفلتر المستخدم', 'تفسيرك لما حدث', 'تقرير منزوع البيانات الحساسة'];

  return (
    <div className="space-y-8">
      <div className={`bg-gradient-to-l ${theme.gradient} to-transparent rounded-xl p-6 border ${theme.border}`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className={`text-3xl font-bold ${theme.text}`}>{theme.icon} {lab.title}</h1>
          {lab.estimatedMinutes && <span className="rounded-full bg-gray-950/60 px-3 py-1 text-sm text-gray-300">⏱️ {lab.estimatedMinutes} دقيقة تقريبًا</span>}
        </div>
        <p className="text-gray-200 text-lg mt-4">{lab.objective}</p>
      </div>

      <Alert type="danger" title="ميثاق المختبر الآمن — اقرأه قبل التنفيذ">
        <ul className="space-y-1">
          <li>• نفّذ فقط على أجهزة افتراضية تملكها وفي شبكة معزولة Host-only/Internal Network.</li>
          <li>• خذ Snapshot قبل البدء، ولا تستخدم حسابًا أو كلمة مرور حقيقية.</li>
          <li>• لا توجّه scans أو محاولات دخول إلى الإنترنت أو أجهزة الآخرين.</li>
          <li>• لا ترفع PCAP أو EVTX أو logs قبل حذف الأسماء، العناوين، الرموز السرية وأي بيانات شخصية.</li>
          <li>• لا تعتبر الخطوة مكتملة حتى ترى الدليل المتوقع وتستطيع تفسيره بكلماتك.</li>
        </ul>
        {lab.safety && <p className="mt-2 font-bold">تنبيه هذا المختبر: {lab.safety}</p>}
      </Alert>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700">
          <h2 className="text-lg font-bold text-cyan-400 mb-3">🛠️ الأدوات المطلوبة</h2>
          <div className="flex flex-wrap gap-2">
            {lab.tools.map(tool => <span key={tool} className={`px-3 py-1 ${theme.softBackground} border ${theme.border} rounded-full ${theme.text} text-sm`}>{tool}</span>)}
          </div>
        </div>
        <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700">
          <h2 className="text-lg font-bold text-cyan-400 mb-3">✅ قبل أن تبدأ</h2>
          <ul className="text-sm text-gray-300 space-y-1">
            {(lab.prerequisites ?? ['Snapshot حديث', 'الوقت والتاريخ صحيحان', 'التسجيل المطلوب مفعّل', 'تعرف عنوان كل جهاز ودوره']).map(item => <li key={item}>• {item}</li>)}
          </ul>
        </div>
      </div>

      <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
        <div className="flex items-center justify-between gap-3 mb-2">
          <span className="text-gray-300 text-sm">التقدم المحفوظ لهذا المختبر</span>
          <div className="flex items-center gap-3">
            <span className={`${theme.text} text-sm`}>{completedSteps.length} / {lab.steps.length}</span>
            {completedSteps.length > 0 && <button type="button" onClick={resetProgress} className="text-xs text-red-300 hover:text-red-200">تصفير</button>}
          </div>
        </div>
        <div className="h-3 bg-gray-700 rounded-full overflow-hidden" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
          <div className={`h-full ${theme.solidBackground} transition-all duration-500`} style={{ width: `${progress}%` }} />
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">📋 افهم ← نفّذ ← تحقّق ← فسّر</h2>
        {lab.steps.map(step => {
          const done = completedSteps.includes(step.step);
          return (
            <article key={step.step} className={`bg-gray-800/50 rounded-xl p-5 border ${done ? `${theme.border} ${theme.softBackground}` : 'border-gray-700'}`}>
              <div className="flex items-start gap-4">
                <button
                  type="button"
                  onClick={() => toggleStep(step.step)}
                  aria-label={done ? `إلغاء إكمال الخطوة ${step.step}` : `تحديد الخطوة ${step.step} كمكتملة`}
                  className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-lg font-bold ${done ? `${theme.solidBackground} text-white` : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                >
                  {done ? '✓' : step.step}
                </button>
                <div className="flex-1 min-w-0">
                  <p className={`text-lg font-medium ${done ? theme.text : 'text-white'}`}>{step.description}</p>
                  {step.why && <p className="mt-2 text-sm text-gray-300"><strong className="text-cyan-300">لماذا؟</strong> {step.why}</p>}
                  {step.caution && <div className="mt-3 rounded-lg border border-yellow-500/40 bg-yellow-900/20 p-3 text-sm text-yellow-200">⚠️ {step.caution}</div>}
                  {step.command && <CodeBlock code={step.command} />}
                  {step.expected && (
                    <div className="mt-3 p-3 bg-gray-950/60 rounded-lg border border-gray-700">
                      <span className="text-gray-400 text-sm">دليل النجاح: </span>
                      <span className={`${theme.text} text-sm`}>{step.expected}</span>
                    </div>
                  )}
                  <button type="button" onClick={() => toggleStep(step.step)} className={`mt-4 px-3 py-2 rounded-lg text-sm ${done ? 'bg-gray-700 text-gray-300' : `${theme.solidBackground} text-white`}`}>
                    {done ? 'إعادة فتح الخطوة' : 'تحققت من الدليل — اكتملت'}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {lab.filters && lab.filters.length > 0 && (
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-cyan-400 mb-4">🔍 الأوامر والفلاتر المرجعية</h2>
          <div className="space-y-2">{lab.filters.map(filter => <code key={filter} className="block bg-gray-900 px-3 py-2 rounded text-green-400 text-sm font-mono overflow-x-auto">{filter}</code>)}</div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700">
          <h2 className="text-lg font-bold text-yellow-300 mb-3">📦 دليل الإتقان المطلوب</h2>
          <ul className="text-sm text-gray-300 space-y-1">{evidence.map(item => <li key={item}>□ {item}</li>)}</ul>
        </div>
        <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700">
          <h2 className="text-lg font-bold text-green-300 mb-3">🧹 التنظيف</h2>
          <p className="text-sm text-gray-300">{lab.cleanup ?? 'أعد الجهاز إلى الـSnapshot إذا غيّر المختبر إعدادات النظام، واحذف فقط العناصر التي أنشأها المختبر بعد التحقق من أسمائها.'}</p>
        </div>
      </div>

      <div className="bg-gradient-to-l from-purple-900/30 to-transparent rounded-xl border border-purple-500/30 overflow-hidden">
        <button type="button" aria-expanded={showDeliverable} onClick={() => setShowDeliverable(value => !value)} className="w-full p-6 flex items-center justify-between hover:bg-purple-900/20">
          <h2 className="text-xl font-bold text-purple-300">📝 قالب التقرير — هذا هو منتجك المهني</h2>
          <span className="text-purple-300 text-2xl">{showDeliverable ? '−' : '+'}</span>
        </button>
        {showDeliverable && (
          <div className="p-6 pt-0">
            <Alert type="warning" title="قبل النشر">املأه بنتائجك الحقيقية فقط، ثم احذف كلمات المرور وtokens والأسماء والعناوين الداخلية والبيانات الشخصية. لا تنشر ملفات جهة عمل أو جامعة دون إذن مكتوب.</Alert>
            <pre className="mt-4 bg-gray-900 rounded-lg p-4 overflow-x-auto text-gray-300 text-sm whitespace-pre-wrap font-mono" dir="ltr">{lab.deliverable}</pre>
            <button type="button" onClick={copyDeliverable} className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white text-sm">{copied ? '✓ نُسخ القالب' : '📋 نسخ القالب'}</button>
          </div>
        )}
      </div>

      {progress === 100 && (
        <Alert type="success" title="أنهيت الخطوات — بقي اختبار الإتقان">
          أغلق التعليمات، ثم أعد المختبر من الـSnapshot مع الاعتماد على ملاحظاتك فقط. إذا استطعت تفسير كل دليل وكتابة التقرير دون نسخ، فقد أتقنت المختبر.
        </Alert>
      )}
    </div>
  );
};

export default LabViewer;
