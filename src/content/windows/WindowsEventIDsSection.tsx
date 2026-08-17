import Alert from '../../components/Alert';

const WindowsEventIDsSection = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
        <span>🔢</span>
        Event IDs الكاملة للمحلل
      </h1>

      <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

      {/* Authentication Events */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">🔐 أحداث المصادقة Authentication</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-800">
                <th className="px-4 py-3 text-right text-cyan-400">Event ID</th>
                <th className="px-4 py-3 text-right text-cyan-400">الوصف</th>
                <th className="px-4 py-3 text-right text-cyan-400">الأهمية</th>
                <th className="px-4 py-3 text-right text-cyan-400">ملاحظة</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: '4624', desc: 'تسجيل دخول ناجح', imp: 'عالية جداً', note: 'من، متى، كيف، من أين' },
                { id: '4625', desc: 'تسجيل دخول فاشل', imp: 'عالية جداً', note: 'Brute force indicator' },
                { id: '4634', desc: 'تسجيل خروج Logoff', imp: 'متوسطة', note: 'حساب مدة الجلسة' },
                { id: '4648', desc: 'دخول ببيانات صريحة', imp: 'عالية جداً', note: 'runas, psexec - Lateral Movement' },
                { id: '4672', desc: 'صلاحيات خاصة', imp: 'عالية', note: 'دخول admin - راقب دائماً' },
                { id: '4768', desc: 'طلب TGT Kerberos', imp: 'عالية', note: 'على DC فقط' },
                { id: '4769', desc: 'طلب Service Ticket', imp: 'عالية', note: 'كشف Kerberoasting' },
                { id: '4771', desc: 'فشل Kerberos pre-auth', imp: 'عالية', note: 'كلمة مرور خاطئة' },
                { id: '4776', desc: 'تحقق NTLM', imp: 'متوسطة', note: 'NTLM أضعف من Kerberos' },
                { id: '4740', desc: 'حساب مقفل', imp: 'عالية', note: 'محاولات فاشلة كثيرة' },
              ].map((event, index) => (
                <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/50">
                  <td className="px-4 py-3 font-mono text-green-400 font-bold">{event.id}</td>
                  <td className="px-4 py-3 text-white">{event.desc}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs ${
                      event.imp === 'عالية جداً' ? 'bg-red-900/50 text-red-400' :
                      event.imp === 'عالية' ? 'bg-yellow-900/50 text-yellow-400' :
                      'bg-gray-700 text-gray-400'
                    }`}>{event.imp}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-sm">{event.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Account Management */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">👤 أحداث الحسابات Account Management</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-red-900/20 rounded-xl p-6 border border-red-500/30">
            <h3 className="text-red-400 font-bold mb-4">🚨 حرجة - راقب دائماً</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="text-green-400 font-mono">4720</span> - إنشاء حساب جديد</li>
              <li><span className="text-green-400 font-mono">4726</span> - حذف حساب</li>
              <li><span className="text-green-400 font-mono">4724</span> - إعادة تعيين كلمة مرور (بواسطة admin)</li>
              <li><span className="text-green-400 font-mono">4728</span> - إضافة لـ Global Security Group</li>
              <li><span className="text-green-400 font-mono">4732</span> - إضافة لـ Local Security Group</li>
              <li><span className="text-green-400 font-mono">4756</span> - إضافة لـ Universal Security Group</li>
            </ul>
          </div>

          <div className="bg-yellow-900/20 rounded-xl p-6 border border-yellow-500/30">
            <h3 className="text-yellow-400 font-bold mb-4">⚠️ مهمة</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="text-green-400 font-mono">4722</span> - تفعيل حساب</li>
              <li><span className="text-green-400 font-mono">4725</span> - تعطيل حساب</li>
              <li><span className="text-green-400 font-mono">4738</span> - تعديل حساب</li>
              <li><span className="text-green-400 font-mono">4723</span> - تغيير كلمة مرور (بواسطة المستخدم)</li>
              <li><span className="text-green-400 font-mono">4729</span> - إزالة من Global Group</li>
              <li><span className="text-green-400 font-mono">4733</span> - إزالة من Local Group</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Process Events */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">⚙️ أحداث العمليات Process Events</h2>

        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-cyan-400 font-bold mb-3">Security Log</h3>
              <ul className="space-y-2 text-sm">
                <li><span className="text-green-400 font-mono">4688</span> - إنشاء عملية جديدة ⭐</li>
                <li><span className="text-green-400 font-mono">4689</span> - انتهاء عملية</li>
                <li><span className="text-green-400 font-mono">4697</span> - تثبيت خدمة جديدة</li>
              </ul>
            </div>
            <div>
              <h3 className="text-cyan-400 font-bold mb-3">System Log</h3>
              <ul className="space-y-2 text-sm">
                <li><span className="text-green-400 font-mono">7045</span> - تثبيت خدمة (نفس 4697)</li>
              </ul>
            </div>
          </div>
          <Alert type="warning" title="مهم جداً">
            يجب تفعيل "Include command line" لرؤية الأوامر كاملة في Event 4688
          </Alert>
        </div>
      </section>

      {/* Scheduled Tasks */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">📅 أحداث المهام المجدولة</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h3 className="text-cyan-400 font-bold mb-3">Security Log</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="text-green-400 font-mono">4698</span> - إنشاء مهمة 🚨</li>
              <li><span className="text-green-400 font-mono">4699</span> - حذف مهمة</li>
              <li><span className="text-green-400 font-mono">4700</span> - تفعيل مهمة</li>
              <li><span className="text-green-400 font-mono">4701</span> - تعطيل مهمة</li>
              <li><span className="text-green-400 font-mono">4702</span> - تعديل مهمة</li>
            </ul>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h3 className="text-cyan-400 font-bold mb-3">TaskScheduler Operational</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="text-green-400 font-mono">106</span> - تسجيل مهمة جديدة</li>
              <li><span className="text-green-400 font-mono">140</span> - تعديل مهمة</li>
              <li><span className="text-green-400 font-mono">141</span> - حذف مهمة</li>
              <li><span className="text-green-400 font-mono">200</span> - تنفيذ مهمة</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Audit Log Events */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">🚨 أحداث السجل Audit Log</h2>

        <div className="bg-red-900/20 rounded-xl p-6 border border-red-500/30">
          <h3 className="text-red-400 font-bold mb-4">إنذارات حرجة - محاولة إخفاء آثار</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <span className="text-green-400 font-mono">1102</span> - مسح Security log
              <span className="mr-2 text-red-400">🚨 حرج جداً!</span>
            </li>
            <li>
              <span className="text-green-400 font-mono">104</span> - مسح System/Application log
            </li>
            <li>
              <span className="text-green-400 font-mono">4719</span> - تغيير سياسة التدقيق
              <span className="mr-2 text-red-400">🚨 المهاجم يحاول إيقاف التسجيل</span>
            </li>
          </ul>
        </div>
      </section>

      {/* PowerShell Events */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">💻 أحداث PowerShell</h2>

        <div className="bg-purple-900/20 rounded-xl p-6 border border-purple-500/30">
          <ul className="space-y-3 text-sm">
            <li>
              <span className="text-green-400 font-mono">4103</span> - Module Logging
              <span className="text-gray-400 mr-2">- استدعاءات الموديولات</span>
            </li>
            <li>
              <span className="text-green-400 font-mono">4104</span> - Script Block Logging
              <span className="text-red-400 mr-2">⭐ الأهم - محتوى السكربت الكامل</span>
            </li>
            <li>
              <span className="text-green-400 font-mono">4105</span> - بدء تنفيذ سكربت
            </li>
            <li>
              <span className="text-green-400 font-mono">4106</span> - انتهاء تنفيذ سكربت
            </li>
            <li>
              <span className="text-green-400 font-mono">400</span> - بدء PowerShell engine (Windows PowerShell log)
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default WindowsEventIDsSection;
