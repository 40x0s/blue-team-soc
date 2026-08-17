import Alert from '../../components/Alert';

const WindowsLogonTypesSection = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
        <span>🔐</span>
        Logon Types بالتفصيل
      </h1>

      <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

      <Alert type="golden" title="أهمية Logon Types">
        عندما ترى Event 4624 أو 4625، الحقل <strong>Logon Type</strong> يخبرك <strong>كيف</strong> تم تسجيل الدخول.
        هذا مهم جداً لأن كل نوع له دلالة أمنية مختلفة.
      </Alert>

      {/* جدول Logon Types */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">أنواع Logon Types الـ 11</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-800">
                <th className="px-4 py-3 text-right text-cyan-400">النوع</th>
                <th className="px-4 py-3 text-right text-cyan-400">الاسم</th>
                <th className="px-4 py-3 text-right text-cyan-400">المعنى</th>
                <th className="px-4 py-3 text-right text-cyan-400">أمثلة</th>
                <th className="px-4 py-3 text-right text-cyan-400">الأهمية الأمنية</th>
              </tr>
            </thead>
            <tbody>
              {[
                { type: '2', name: 'Interactive', meaning: 'دخول مباشر من الكيبورد', example: 'تسجيل دخول عادي', note: 'مشبوه من حساب خدمة' },
                { type: '3', name: 'Network', meaning: 'دخول من الشبكة', example: 'SMB, طباعة شبكية', note: '⭐ مهم لـ Lateral Movement' },
                { type: '4', name: 'Batch', meaning: 'تنفيذ مهمة مجدولة', example: 'Scheduled tasks', note: '' },
                { type: '5', name: 'Service', meaning: 'تشغيل خدمة', example: 'Windows services', note: '' },
                { type: '7', name: 'Unlock', meaning: 'فتح قفل الشاشة', example: 'العودة بعد القفل', note: '' },
                { type: '8', name: 'NetworkCleartext', meaning: 'دخول بكلمة مرور نص واضح', example: 'IIS basic auth', note: '🚨 مشبوه جداً' },
                { type: '9', name: 'NewCredentials', meaning: 'runas ببيانات مختلفة', example: 'runas /netonly', note: '⭐ علامة Lateral Movement' },
                { type: '10', name: 'RemoteInteractive', meaning: 'دخول RDP', example: 'Remote Desktop', note: '⭐ راقب دائماً' },
                { type: '11', name: 'CachedInteractive', meaning: 'دخول بكلمة مخزنة', example: 'لاب توب offline', note: '' },
              ].map((lt, index) => (
                <tr key={index} className={`border-b border-gray-800 hover:bg-gray-800/50 ${
                  ['3', '9', '10'].includes(lt.type) ? 'bg-yellow-900/10' :
                  lt.type === '8' ? 'bg-red-900/10' : ''
                }`}>
                  <td className="px-4 py-3 font-mono text-green-400 font-bold text-xl">{lt.type}</td>
                  <td className="px-4 py-3 text-purple-400 font-bold">{lt.name}</td>
                  <td className="px-4 py-3 text-white">{lt.meaning}</td>
                  <td className="px-4 py-3 text-gray-400">{lt.example}</td>
                  <td className="px-4 py-3 text-sm">{lt.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* أمثلة تحليل عملي */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">📋 أمثلة تحليل عملي</h2>

        <div className="grid md:grid-cols-3 gap-4">
          {/* مثال 1 */}
          <div className="bg-red-900/20 rounded-xl p-6 border border-red-500/30">
            <h3 className="text-red-400 font-bold mb-4">🚨 RDP Brute Force</h3>
            <p className="text-gray-300 text-sm mb-4">ابحث عن:</p>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>• Event ID 4625</li>
              <li>• Logon Type 10</li>
              <li>• نفس IP المصدر متكرر</li>
            </ul>
          </div>

          {/* مثال 2 */}
          <div className="bg-yellow-900/20 rounded-xl p-6 border border-yellow-500/30">
            <h3 className="text-yellow-400 font-bold mb-4">⚠️ PsExec Lateral Movement</h3>
            <p className="text-gray-300 text-sm mb-4">ابحث عن:</p>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>• Event ID 4624 على الهدف</li>
              <li>• Logon Type 3</li>
              <li>• Source من جهاز داخلي</li>
            </ul>
          </div>

          {/* مثال 3 */}
          <div className="bg-purple-900/20 rounded-xl p-6 border border-purple-500/30">
            <h3 className="text-purple-400 font-bold mb-4">🔍 runas مشبوه</h3>
            <p className="text-gray-300 text-sm mb-4">ابحث عن:</p>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>• Event ID 4648</li>
              <li>• Subject ≠ Target</li>
              <li>• العملية غريبة</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ملخص سريع */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">📊 ملخص سريع للمراقبة</h2>

        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-red-900/20 rounded-lg p-4 border border-red-500/30 text-center">
            <div className="text-3xl font-bold text-red-400">Type 10</div>
            <div className="text-gray-400 text-sm">RDP</div>
            <div className="text-red-300 text-xs mt-2">راقب دائماً</div>
          </div>
          <div className="bg-yellow-900/20 rounded-lg p-4 border border-yellow-500/30 text-center">
            <div className="text-3xl font-bold text-yellow-400">Type 3</div>
            <div className="text-gray-400 text-sm">Network</div>
            <div className="text-yellow-300 text-xs mt-2">Lateral Movement</div>
          </div>
          <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/30 text-center">
            <div className="text-3xl font-bold text-purple-400">Type 9</div>
            <div className="text-gray-400 text-sm">NewCredentials</div>
            <div className="text-purple-300 text-xs mt-2">runas</div>
          </div>
          <div className="bg-orange-900/20 rounded-lg p-4 border border-orange-500/30 text-center">
            <div className="text-3xl font-bold text-orange-400">Type 8</div>
            <div className="text-gray-400 text-sm">Cleartext</div>
            <div className="text-orange-300 text-xs mt-2">مشبوه!</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WindowsLogonTypesSection;
