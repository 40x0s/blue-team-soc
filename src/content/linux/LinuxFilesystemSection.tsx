import Alert from '../../components/Alert';
import CodeBlock from '../../components/CodeBlock';

const LinuxFilesystemSection = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
        <span>📁</span>
        بنية نظام الملفات في Linux
      </h1>

      <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

      <Alert type="info">
        معرفة بنية الملفات تساعدك في معرفة أين تبحث عن الأدلة أثناء التحقيق.
      </Alert>

      {/* المجلدات الأساسية */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">المجلدات الأساسية التي يجب أن تعرفها</h2>

        <div className="space-y-4">
          {/* /etc */}
          <div className="bg-red-900/20 rounded-xl p-6 border border-red-500/30">
            <h3 className="text-xl font-bold text-red-400 mb-4">/etc - ملفات الإعدادات</h3>
            <p className="text-gray-300 mb-4">يحتوي على إعدادات النظام والخدمات. أهم المجلدات للمحلل:</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-800/50 rounded-lg p-3">
                <code className="text-cyan-400">/etc/passwd</code>
                <p className="text-gray-400 text-sm">معلومات المستخدمين</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3">
                <code className="text-cyan-400">/etc/shadow</code>
                <p className="text-gray-400 text-sm">كلمات المرور المشفرة</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3">
                <code className="text-cyan-400">/etc/sudoers</code>
                <p className="text-gray-400 text-sm">صلاحيات sudo</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3">
                <code className="text-cyan-400">/etc/ssh/sshd_config</code>
                <p className="text-gray-400 text-sm">إعدادات SSH</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3">
                <code className="text-cyan-400">/etc/crontab</code>
                <p className="text-gray-400 text-sm">المهام المجدولة</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3">
                <code className="text-cyan-400">/etc/hosts</code>
                <p className="text-gray-400 text-sm">تعيينات DNS المحلية</p>
              </div>
            </div>
          </div>

          {/* /var/log */}
          <div className="bg-green-900/20 rounded-xl p-6 border border-green-500/30">
            <h3 className="text-xl font-bold text-green-400 mb-4">/var/log - السجلات ⭐</h3>
            <Alert type="golden">
              هذا أهم مجلد بالنسبة لك كمحلل! كل السجلات هنا.
            </Alert>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-800/50 rounded-lg p-3">
                <code className="text-cyan-400">/var/log/auth.log</code>
                <p className="text-gray-400 text-sm">تسجيل الدخول، SSH، sudo</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3">
                <code className="text-cyan-400">/var/log/syslog</code>
                <p className="text-gray-400 text-sm">أحداث النظام العامة</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3">
                <code className="text-cyan-400">/var/log/kern.log</code>
                <p className="text-gray-400 text-sm">رسائل النواة Kernel</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3">
                <code className="text-cyan-400">/var/log/apache2/</code>
                <p className="text-gray-400 text-sm">سجلات الويب</p>
              </div>
            </div>
          </div>

          {/* /home و /root */}
          <div className="bg-blue-900/20 rounded-xl p-6 border border-blue-500/30">
            <h3 className="text-xl font-bold text-blue-400 mb-4">/home و /root - مجلدات المستخدمين</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-800/50 rounded-lg p-3">
                <code className="text-cyan-400">/home/username/</code>
                <p className="text-gray-400 text-sm">ملفات المستخدم العادي</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3">
                <code className="text-cyan-400">/root/</code>
                <p className="text-gray-400 text-sm">المجلد الشخصي لـ root</p>
              </div>
            </div>
            <p className="text-gray-300 mt-4">ابحث هنا عن: <code className="bg-gray-700 px-2 py-1 rounded">.bash_history</code>, <code className="bg-gray-700 px-2 py-1 rounded">.ssh/</code></p>
          </div>

          {/* /tmp */}
          <div className="bg-yellow-900/20 rounded-xl p-6 border border-yellow-500/30">
            <h3 className="text-xl font-bold text-yellow-400 mb-4">/tmp - ملفات مؤقتة ⚠️</h3>
            <Alert type="warning">
              المهاجمون كثيراً ما يضعون ملفاتهم هنا! افحصه دائماً.
            </Alert>
            <CodeBlock
              title="فحص /tmp"
              code={`ls -la /tmp/
ls -la /dev/shm/
ls -la /var/tmp/`}
            />
          </div>

          {/* /proc */}
          <div className="bg-purple-900/20 rounded-xl p-6 border border-purple-500/30">
            <h3 className="text-xl font-bold text-purple-400 mb-4">/proc - معلومات العمليات</h3>
            <p className="text-gray-300 mb-4">نظام ملفات افتراضي يعطيك معلومات عن العمليات الجارية.</p>
            <CodeBlock
              code={`# معلومات عن عملية معينة
ls -l /proc/1234/
cat /proc/1234/cmdline  # الأمر الكامل
cat /proc/1234/status   # حالة العملية
ls -l /proc/1234/exe    # الملف التنفيذي
ls -l /proc/1234/cwd    # مجلد العمل`}
            />
          </div>

          {/* ملخص سريع */}
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">📊 ملخص سريع للمحلل</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="px-4 py-2 text-right text-cyan-400">المجلد</th>
                    <th className="px-4 py-2 text-right text-cyan-400">ماذا تجد فيه</th>
                    <th className="px-4 py-2 text-right text-cyan-400">متى تفحصه</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-700">
                    <td className="px-4 py-2 font-mono text-green-400">/var/log/</td>
                    <td className="px-4 py-2 text-gray-300">السجلات</td>
                    <td className="px-4 py-2 text-gray-300">دائماً - أول مكان</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="px-4 py-2 font-mono text-green-400">/etc/</td>
                    <td className="px-4 py-2 text-gray-300">الإعدادات</td>
                    <td className="px-4 py-2 text-gray-300">فحص المستخدمين والخدمات</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="px-4 py-2 font-mono text-yellow-400">/tmp/</td>
                    <td className="px-4 py-2 text-gray-300">ملفات مؤقتة</td>
                    <td className="px-4 py-2 text-gray-300">بحث عن malware</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="px-4 py-2 font-mono text-green-400">/home/</td>
                    <td className="px-4 py-2 text-gray-300">ملفات المستخدمين</td>
                    <td className="px-4 py-2 text-gray-300">bash_history, ssh keys</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-green-400">/proc/</td>
                    <td className="px-4 py-2 text-gray-300">العمليات</td>
                    <td className="px-4 py-2 text-gray-300">تحقيق في عملية مشبوهة</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LinuxFilesystemSection;
