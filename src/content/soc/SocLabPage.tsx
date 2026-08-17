import { useState } from 'react';
import { socLabs } from '../../data/socLabs';
import CodeBlock from '../../components/CodeBlock';
import Alert from '../../components/Alert';

const SocLabPage: React.FC<{ labId: string }> = ({ labId }) => {
  const lab = socLabs.find(l => l.id === labId);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showDeliverable, setShowDeliverable] = useState(false);

  if (!lab) return <div className="text-red-400">Lab not found</div>;

  const toggleStep = (n: number) => setCompletedSteps(prev => prev.includes(n) ? prev.filter(s => s !== n) : [...prev, n]);
  const progress = (completedSteps.length / lab.steps.length) * 100;

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-l from-emerald-900/30 to-transparent rounded-xl p-6 border border-emerald-500/30">
        <h1 className="text-3xl font-bold text-emerald-400 mb-4">🛡️ {lab.title}</h1>
        <p className="text-gray-300 text-lg">{lab.objective}</p>
      </div>

      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-cyan-400 mb-4">🛠️ الأدوات المطلوبة</h2>
        <div className="flex flex-wrap gap-2">
          {lab.tools.map((t, i) => (
            <span key={i} className="px-3 py-1 bg-emerald-900/30 border border-emerald-500/30 rounded-full text-emerald-400 text-sm">{t}</span>
          ))}
        </div>
      </div>

      <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-400 text-sm">التقدم</span>
          <span className="text-emerald-400 text-sm">{completedSteps.length} / {lab.steps.length}</span>
        </div>
        <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-l from-emerald-500 to-cyan-500 transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">📋 خطوات التنفيذ</h2>
        {lab.steps.map((step) => (
          <div key={step.step} className={`bg-gray-800/50 rounded-xl p-6 border transition-all cursor-pointer ${completedSteps.includes(step.step) ? 'border-emerald-500/50 bg-emerald-900/10' : 'border-gray-700 hover:border-emerald-500/50'}`} onClick={() => toggleStep(step.step)}>
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-all ${completedSteps.includes(step.step) ? 'bg-emerald-600 text-white' : 'bg-gray-700 text-gray-400'}`}>
                {completedSteps.includes(step.step) ? '✓' : step.step}
              </div>
              <div className="flex-1">
                <p className={`text-lg ${completedSteps.includes(step.step) ? 'text-emerald-400' : 'text-white'}`}>{step.description}</p>
                {step.command && <div className="mt-3" onClick={(e) => e.stopPropagation()}><CodeBlock code={step.command} /></div>}
                {step.expected && <div className="mt-3 p-3 bg-gray-700/50 rounded-lg"><span className="text-gray-400 text-sm">النتيجة المتوقعة: </span><span className="text-emerald-400 text-sm">{step.expected}</span></div>}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-l from-purple-900/30 to-transparent rounded-xl border border-purple-500/30 overflow-hidden">
        <button onClick={() => setShowDeliverable(!showDeliverable)} className="w-full p-6 flex items-center justify-between hover:bg-purple-900/20 transition-colors">
          <h2 className="text-xl font-bold text-purple-400 flex items-center gap-2"><span>📝</span>قالب التقرير (Deliverable)</h2>
          <span className="text-purple-400 text-2xl">{showDeliverable ? '−' : '+'}</span>
        </button>
        {showDeliverable && (
          <div className="p-6 pt-0">
            <Alert type="info">انسخ هذا القالب واملأه بنتائجك الفعلية</Alert>
            <div className="mt-4 bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-gray-300 text-sm whitespace-pre-wrap font-mono" dir="ltr">{lab.deliverable}</pre>
            </div>
            <button onClick={() => navigator.clipboard.writeText(lab.deliverable)} className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white text-sm transition-colors">📋 نسخ القالب</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocLabPage;
