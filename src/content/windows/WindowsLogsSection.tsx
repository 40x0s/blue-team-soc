import Alert from '../../components/Alert';

const WindowsLogsSection = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
        <span>📋</span>
        بنية Windows Event Logs
      </h1>

      <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

      {/* السجلات الكلاسيكية */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">السجلات الكلاسيكية الثلاثة</h2>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-red-900/20 rounded-xl p-6 border border-red-500/30">
            <h3 className="text-xl font-bold text-red-400 mb-4">🔐 Security</h3>
            <p className="text-gray-300 text-sm mb-4">أهم سجل لك!</p>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>• تسجيل دخول/خروج</li>
              <li>• تغيير حسابات</li>
              <li>• صلاحيات</li>
              <li>• تدقيق</li>
            </ul>
            <div className="mt-4 p-2 bg-gray-800/50 rounded text-xs text-gray-400">
              Event Viewer → Windows Logs → Security
            </div>
          </div>

          <div className="bg-blue-900/20 rounded-xl p-6 border border-blue-500/30">
            <h3 className="text-xl font-bold text-blue-400 mb-4">⚙️ System</h3>
            <p className="text-gray-300 text-sm mb-4">أحداث النظام</p>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>• خدمات</li>
              <li>• Drivers</li>
              <li>• إعادة تشغيل</li>
              <li>• أخطاء النظام</li>
            </ul>
            <div className="mt-4 p-2 bg-gray-800/50 rounded text-xs text-gray-400">
              Event Viewer → Windows Logs → System
            </div>
          </div>

          <div className="bg-green-900/20 rounded-xl p-6 border border-green-500/30">
            <h3 className="text-xl font-bold text-green-400 mb-4">📱 Application</h3>
            <p className="text-gray-300 text-sm mb-4">أحداث التطبيقات</p>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>• أخطاء IIS</li>
              <li>• أخطاء SQL</li>
              <li>• تطبيقات أخرى</li>
            </ul>
            <div className="mt-4 p-2 bg-gray-800/50 rounded text-xs text-gray-400">
              Event Viewer → Windows Logs → Application
            </div>
          </div>
        </div>
      </section>

      {/* السجلات المتقدمة */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">السجلات المتقدمة (Applications and Services)</h2>

        <div className="grid md:grid-cols-2 gap-4">
          {/* PowerShell */}
          <div className="bg-purple-900/20 rounded-xl p-6 border border-purple-500/30">
            <h3 className="text-lg font-bold text-purple-400 mb-2">💻 PowerShell</h3>
            <p className="text-gray-400 text-sm mb-2">تنفيذ سكربتات PowerShell</p>
            <code className="text-xs text-cyan-400 bg-gray-800 px-2 py-1 rounded block">
              Microsoft → Windows → PowerShell → Operational
            </code>
            <span className="inline-block mt-2 px-2 py-1 bg-red-900/50 text-red-400 text-xs rounded">عالية جداً</span>
          </div>

          {/* Sysmon */}
          <div className="bg-orange-900/20 rounded-xl p-6 border border-orange-500/30">
            <h3 className="text-lg font-bold text-orange-400 mb-2">🔬 Sysmon</h3>
            <p className="text-gray-400 text-sm mb-2">عمليات، شبكة، DNS، ملفات</p>
            <code className="text-xs text-cyan-400 bg-gray-800 px-2 py-1 rounded block">
              Microsoft → Windows → Sysmon → Operational
            </code>
            <span className="inline-block mt-2 px-2 py-1 bg-red-900/50 text-red-400 text-xs rounded">عالية جداً (إذا مثبت)</span>
          </div>

          {/* Windows Defender */}
          <div className="bg-green-900/20 rounded-xl p-6 border border-green-500/30">
            <h3 className="text-lg font-bold text-green-400 mb-2">🛡️ Windows Defender</h3>
            <p className="text-gray-400 text-sm mb-2">تنبيهات الحماية</p>
            <code className="text-xs text-cyan-400 bg-gray-800 px-2 py-1 rounded block">
              Microsoft → Windows → Windows Defender → Operational
            </code>
            <span className="inline-block mt-2 px-2 py-1 bg-yellow-900/50 text-yellow-400 text-xs rounded">عالية</span>
          </div>

          {/* TaskScheduler */}
          <div className="bg-yellow-900/20 rounded-xl p-6 border border-yellow-500/30">
            <h3 className="text-lg font-bold text-yellow-400 mb-2">📅 TaskScheduler</h3>
            <p className="text-gray-400 text-sm mb-2">المهام المجدولة (persistence)</p>
            <code className="text-xs text-cyan-400 bg-gray-800 px-2 py-1 rounded block">
              Microsoft → Windows → TaskScheduler → Operational
            </code>
            <span className="inline-block mt-2 px-2 py-1 bg-yellow-900/50 text-yellow-400 text-xs rounded">عالية</span>
          </div>

          {/* WMI */}
          <div className="bg-cyan-900/20 rounded-xl p-6 border border-cyan-500/30">
            <h3 className="text-lg font-bold text-cyan-400 mb-2">🔧 WMI-Activity</h3>
            <p className="text-gray-400 text-sm mb-2">نشاط WMI (يستخدم في الهجمات)</p>
            <code className="text-xs text-cyan-400 bg-gray-800 px-2 py-1 rounded block">
              Microsoft → Windows → WMI-Activity → Operational
            </code>
          </div>

          {/* RDP */}
          <div className="bg-red-900/20 rounded-xl p-6 border border-red-500/30">
            <h3 className="text-lg font-bold text-red-400 mb-2">🖥️ RDP (Terminal Services)</h3>
            <p className="text-gray-400 text-sm mb-2">جلسات Remote Desktop</p>
            <code className="text-xs text-cyan-400 bg-gray-800 px-2 py-1 rounded block">
              Microsoft → Windows → TerminalServices-LocalSessionManager → Operational
            </code>
            <span className="inline-block mt-2 px-2 py-1 bg-yellow-900/50 text-yellow-400 text-xs rounded">عالية</span>
          </div>
        </div>
      </section>

      {/* أين تُسجل الأحداث */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">📍 أين تُسجل الأحداث؟ (مهم جداً)</h2>

        <Alert type="golden" title="القاعدة الأساسية">
          كل جهاز يسجل أحداثه الخاصة على نفسه
        </Alert>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h3 className="text-cyan-400 font-bold mb-4">💻 على Workstation / Server عادي</h3>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>• يسجل Logon و Logoff الخاص بنفسه</li>
              <li>• Event 4624 و 4625</li>
            </ul>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h3 className="text-purple-400 font-bold mb-4">🏢 على Domain Controller</h3>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>• نشاط حسابات الدومين (Account Logon)</li>
              <li>• أحداث Active Directory</li>
              <li>• Kerberos events (4768, 4769, 4771)</li>
              <li>• LDAP queries</li>
            </ul>
          </div>
        </div>

        <Alert type="info" title="ملاحظة مهمة للتحقيقات الكبيرة">
          أنت تجمع السجلات من <strong>أكثر من جهاز</strong> وتربطها بالزمن.
          <br />
          مثال: محاولة دخول فاشلة على workstation تظهر فيه (4625)، لكن أيضاً ستظهر على DC (4768 أو 4771).
        </Alert>
      </section>
    </div>
  );
};

export default WindowsLogsSection;
