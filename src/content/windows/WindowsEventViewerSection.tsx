import Alert from '../../components/Alert';
import CodeBlock from '../../components/CodeBlock';

const WindowsEventViewerSection = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
        <span>👁️</span>
        Event Viewer للمحلل
      </h1>

      <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

      {/* فتح Event Viewer */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">فتح Event Viewer</h2>

        <CodeBlock code={`eventvwr.msc`} />
        <p className="text-gray-400">أو من Start menu ابحث عن "Event Viewer"</p>
      </section>

      {/* التنقل الذكي */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">📍 التنقل الذكي</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h3 className="text-cyan-400 font-bold mb-3">Windows Logs</h3>
            <p className="text-gray-400 text-sm">السجلات الكلاسيكية الثلاثة (Security, System, Application)</p>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h3 className="text-cyan-400 font-bold mb-3">Applications and Services Logs</h3>
            <p className="text-gray-400 text-sm">السجلات المتخصصة (PowerShell, Sysmon, etc.)</p>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h3 className="text-cyan-400 font-bold mb-3">Custom Views</h3>
            <p className="text-gray-400 text-sm">Views مخصصة يمكنك إنشاؤها</p>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h3 className="text-cyan-400 font-bold mb-3">Subscriptions</h3>
            <p className="text-gray-400 text-sm">لجمع السجلات من أجهزة أخرى (WEF)</p>
          </div>
        </div>
      </section>

      {/* إنشاء Custom View */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">🛠️ إنشاء Custom View للمحلل</h2>

        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-cyan-400 font-bold mb-4">الخطوات:</h3>
          <ol className="space-y-2 text-gray-300 list-decimal list-inside">
            <li>Right click على Custom Views → Create Custom View</li>
            <li>حدد الفترة الزمنية (Logged)</li>
            <li>حدد مستوى الخطورة (Event level)</li>
            <li>اختر السجل (By log) مثل Security</li>
            <li>أدخل Event IDs (مثلاً: 4624,4625,4672,4688)</li>
            <li>احفظ View باسم واضح</li>
          </ol>
        </div>

        <div className="bg-green-900/20 rounded-xl p-6 border border-green-500/30">
          <h3 className="text-green-400 font-bold mb-4">💡 Views مفيدة للمحلل</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-800/50 rounded p-3">
              <p className="text-cyan-400 font-bold text-sm">المراقبة العامة</p>
              <code className="text-gray-400 text-xs">4624,4625,4634,4672,4688</code>
            </div>
            <div className="bg-gray-800/50 rounded p-3">
              <p className="text-cyan-400 font-bold text-sm">الحسابات</p>
              <code className="text-gray-400 text-xs">4720,4722,4725,4726,4728,4732,4756</code>
            </div>
            <div className="bg-gray-800/50 rounded p-3">
              <p className="text-cyan-400 font-bold text-sm">الأخطار</p>
              <code className="text-gray-400 text-xs">1102,4719,4720,4732,4624</code>
            </div>
            <div className="bg-gray-800/50 rounded p-3">
              <p className="text-cyan-400 font-bold text-sm">PowerShell</p>
              <code className="text-gray-400 text-xs">4103,4104</code>
            </div>
          </div>
        </div>
      </section>

      {/* قراءة Event */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">📖 قراءة Event بشكل احترافي</h2>

        <Alert type="info">
          عندما تفتح حدث، انتبه لـ <strong>General tab</strong> (الوصف العام) و <strong>Details tab</strong> (التفاصيل الكاملة)
        </Alert>

        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-cyan-400 font-bold mb-4">الحقول المهمة في حدث Logon (4624/4625)</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-purple-400 font-bold mb-2">Subject</h4>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• Security ID</li>
                <li>• Account Name</li>
                <li>• Account Domain</li>
                <li>• Logon ID</li>
              </ul>
            </div>

            <div>
              <h4 className="text-purple-400 font-bold mb-2">New Logon</h4>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• Security ID</li>
                <li>• Account Name ⭐</li>
                <li>• Account Domain</li>
                <li>• Logon ID</li>
              </ul>
            </div>

            <div>
              <h4 className="text-purple-400 font-bold mb-2">Network Information</h4>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• Workstation Name</li>
                <li>• Source Network Address ⭐</li>
                <li>• Source Port</li>
              </ul>
            </div>

            <div>
              <h4 className="text-purple-400 font-bold mb-2">Logon Information</h4>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• Logon Type ⭐</li>
                <li>• Elevated Token</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WindowsEventViewerSection;
