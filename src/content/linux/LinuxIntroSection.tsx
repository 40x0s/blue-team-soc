import Alert from '../../components/Alert';

const LinuxIntroSection = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
        <span>🐧</span>
        Linux للمحلل الأمني SOC - النسخة الكاملة
      </h1>

      <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

      {/* تقييم الصفحة */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4">📋 تقييم الصفحة الأصلية</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-900/20 rounded-lg p-4 border border-green-500/30">
            <h3 className="text-green-400 font-bold mb-3">✅ الجيد فيها:</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• التركيز على auth.log ممتاز لأنه أهم ملف للمحلل</li>
              <li>• شرح SSH Hardening فكرة جيدة</li>
              <li>• وجود تطبيقات Labs ممتاز</li>
              <li>• أسئلة المقابلات في النهاية فكرة ممتازة جداً</li>
            </ul>
          </div>

          <div className="bg-red-900/20 rounded-lg p-4 border border-red-500/30">
            <h3 className="text-red-400 font-bold mb-3">❌ النواقص الحرجة:</h3>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li>• لا يوجد شرح لبنية نظام الملفات</li>
              <li>• غياب أوامر التحقيق (ps, top, netstat, ss)</li>
              <li>• غياب شرح المستخدمين والصلاحيات</li>
              <li>• غياب systemd و services</li>
              <li>• غياب cron jobs (مهم للـ persistence)</li>
              <li>• غياب bash history وأهميته</li>
              <li>• غياب auditd بشكل كامل</li>
              <li>• غياب process investigation</li>
              <li>• غياب network investigation على Linux</li>
              <li>• غياب علامات rootkits و backdoors</li>
            </ul>
          </div>
        </div>
      </div>

      {/* الفلسفة */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">الفلسفة قبل البداية</h2>

        <Alert type="golden" title="أنت كمحلل SOC على Linux ستفعل ثلاثة أشياء رئيسية:">
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <div className="bg-gray-800/50 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">📋</div>
              <p className="text-cyan-400 font-bold">قراءة السجلات</p>
              <p className="text-gray-400 text-sm">Logs لاكتشاف ما حدث</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">⚙️</div>
              <p className="text-cyan-400 font-bold">فحص العمليات</p>
              <p className="text-gray-400 text-sm">Processes لمعرفة ماذا يعمل الآن</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">🌐</div>
              <p className="text-cyan-400 font-bold">تحليل الشبكة</p>
              <p className="text-gray-400 text-sm">Network لمعرفة من يتصل بمن</p>
            </div>
          </div>
        </Alert>

        <Alert type="info">
          كل ما تتعلمه في هذا القسم يخدم هذه الأهداف الثلاثة.
        </Alert>
      </section>

      {/* ملخص المحتوى */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">📚 ما ستتعلمه في هذا القسم</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: '📁', title: 'بنية نظام الملفات', desc: 'المجلدات المهمة للمحلل' },
            { icon: '👤', title: 'المستخدمون والصلاحيات', desc: 'passwd, shadow, permissions' },
            { icon: '📋', title: 'السجلات Logs', desc: 'auth.log, syslog, journalctl' },
            { icon: '⌨️', title: 'أوامر CLI', desc: 'grep, awk, sed, regex' },
            { icon: '⚙️', title: 'العمليات Processes', desc: 'ps, top, lsof, /proc' },
            { icon: '🌐', title: 'تحليل الشبكة', desc: 'ss, netstat, ip' },
            { icon: '🔄', title: 'Persistence', desc: 'cron, systemd, startup' },
            { icon: '📜', title: 'Bash History', desc: 'تتبع أوامر المستخدمين' },
            { icon: '👁️', title: 'Auditd', desc: 'المراقبة المتقدمة' },
            { icon: '🛡️', title: 'Hardening', desc: 'تشديد SSH و UFW' },
            { icon: '🦠', title: 'كشف البرامج الضارة', desc: 'علامات الاختراق' },
            { icon: '✅', title: 'Labs عملية', desc: '5 تطبيقات كاملة' },
          ].map((item, index) => (
            <div key={index} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 hover:border-cyan-500/50 transition-colors">
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

export default LinuxIntroSection;
