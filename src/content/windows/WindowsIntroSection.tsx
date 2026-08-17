import Alert from '../../components/Alert';

const WindowsIntroSection = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
        <span>🪟</span>
        Windows للمحلل الأمني SOC - النسخة الكاملة
      </h1>

      <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

      {/* تقييم الصفحة */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4">📋 تقييم الصفحة الأصلية</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-900/20 rounded-lg p-4 border border-green-500/30">
            <h3 className="text-green-400 font-bold mb-3">✅ الجيد فيها:</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• التركيز على Event IDs الأكثر استخداماً</li>
              <li>• ذكر PowerShell Logging و Sysmon</li>
              <li>• ذكر أهمية Audit Policy</li>
              <li>• الإشارة إلى Active Directory</li>
              <li>• أمثلة Get-WinEvent عملية</li>
            </ul>
          </div>

          <div className="bg-red-900/20 rounded-lg p-4 border border-red-500/30">
            <h3 className="text-red-400 font-bold mb-3">❌ النواقص الحرجة:</h3>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li>• قائمة Event IDs مختصرة جداً</li>
              <li>• غياب Logon Types بالتفصيل</li>
              <li>• غياب Lateral Movement investigations</li>
              <li>• غياب Kerberos events</li>
              <li>• غياب Sysmon Event IDs بالتفصيل</li>
              <li>• غياب LOLBins</li>
              <li>• غياب Process Tree analysis</li>
              <li>• غياب أمثلة تحقيقات كاملة</li>
            </ul>
          </div>
        </div>
      </div>

      {/* الفلسفة */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">الفلسفة قبل البداية</h2>

        <Alert type="golden" title="أنت كمحلل SOC على Windows ستفعل خمسة أشياء رئيسية:">
          <div className="grid md:grid-cols-5 gap-3 mt-4">
            <div className="bg-gray-800/50 rounded-lg p-3 text-center">
              <div className="text-2xl mb-2">🔐</div>
              <p className="text-cyan-400 font-bold text-sm">المصادقة</p>
              <p className="text-gray-400 text-xs">من دخل ومتى</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-3 text-center">
              <div className="text-2xl mb-2">⚙️</div>
              <p className="text-cyan-400 font-bold text-sm">العمليات</p>
              <p className="text-gray-400 text-xs">ماذا نُفذ</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-3 text-center">
              <div className="text-2xl mb-2">💻</div>
              <p className="text-cyan-400 font-bold text-sm">PowerShell</p>
              <p className="text-gray-400 text-xs">سلاح المهاجمين</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-3 text-center">
              <div className="text-2xl mb-2">🔀</div>
              <p className="text-cyan-400 font-bold text-sm">Lateral Movement</p>
              <p className="text-gray-400 text-xs">التنقل بين الأجهزة</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-3 text-center">
              <div className="text-2xl mb-2">🌐</div>
              <p className="text-cyan-400 font-bold text-sm">الشبكة</p>
              <p className="text-gray-400 text-xs">من يتصل بمن</p>
            </div>
          </div>
        </Alert>

        <Alert type="info">
          معظم تحقيقات SOC في الشركات تبدأ من Windows لأن <strong>80% من بيئات الشركات تعتمد على Active Directory</strong>.
        </Alert>
      </section>

      {/* ملخص المحتوى */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">📚 ما ستتعلمه في هذا القسم</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: '📋', title: 'بنية Event Logs', desc: 'Security, System, PowerShell, Sysmon' },
            { icon: '🔢', title: 'Event IDs الكاملة', desc: '50+ Event ID مهم' },
            { icon: '🔐', title: 'Logon Types', desc: '11 نوع وأهمية كل واحد' },
            { icon: '👁️', title: 'Event Viewer', desc: 'Custom Views, Filters' },
            { icon: '⚙️', title: 'تفعيل Auditing', desc: 'Audit Policy, Command Line' },
            { icon: '💻', title: 'PowerShell Logging', desc: 'Script Block, Module, Transcription' },
            { icon: '🔍', title: 'Get-WinEvent', desc: 'استعلامات PowerShell متقدمة' },
            { icon: '🔬', title: 'Sysmon بعمق', desc: '25+ Event ID, Config, Queries' },
            { icon: '🏢', title: 'Active Directory', desc: 'هجمات AD وكشفها' },
            { icon: '🕵️', title: 'تحقيقات شائعة', desc: 'Brute Force, Lateral Movement' },
            { icon: '⚠️', title: 'LOLBins', desc: 'Living off the Land Binaries' },
            { icon: '✅', title: 'Labs عملية', desc: '5 تطبيقات كاملة' },
          ].map((item, index) => (
            <div key={index} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 hover:border-blue-500/50 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="font-bold text-white">{item.title}</p>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WindowsIntroSection;
