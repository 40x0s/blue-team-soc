import Alert from '../../components/Alert';
import CodeBlock from '../../components/CodeBlock';
import Table from '../../components/Table';

const LinuxLogsSection = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
        <span>📋</span>
        السجلات Logs بعمق
      </h1>

      <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

      {/* خريطة السجلات */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">خريطة السجلات الكاملة</h2>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Debian/Ubuntu */}
          <div className="bg-orange-900/20 rounded-xl p-6 border border-orange-500/30">
            <h3 className="text-lg font-bold text-orange-400 mb-4">🟠 Debian / Ubuntu</h3>
            <div className="space-y-3">
              <div className="bg-gray-800/50 rounded-lg p-3">
                <code className="text-cyan-400 text-sm">/var/log/auth.log</code>
                <p className="text-gray-400 text-xs">SSH, sudo, تسجيل الدخول ⭐</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3">
                <code className="text-cyan-400 text-sm">/var/log/syslog</code>
                <p className="text-gray-400 text-xs">أحداث النظام العامة</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3">
                <code className="text-cyan-400 text-sm">/var/log/kern.log</code>
                <p className="text-gray-400 text-xs">رسائل النواة</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3">
                <code className="text-cyan-400 text-sm">/var/log/dpkg.log</code>
                <p className="text-gray-400 text-xs">تثبيت/حذف البرامج</p>
              </div>
            </div>
          </div>

          {/* RedHat/CentOS */}
          <div className="bg-red-900/20 rounded-xl p-6 border border-red-500/30">
            <h3 className="text-lg font-bold text-red-400 mb-4">🔴 RedHat / CentOS</h3>
            <div className="space-y-3">
              <div className="bg-gray-800/50 rounded-lg p-3">
                <code className="text-cyan-400 text-sm">/var/log/secure</code>
                <p className="text-gray-400 text-xs">مكافئ auth.log ⭐</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3">
                <code className="text-cyan-400 text-sm">/var/log/messages</code>
                <p className="text-gray-400 text-xs">مكافئ syslog</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* journalctl */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">استخدام journalctl باحتراف</h2>

        <Alert type="info">
          في الأنظمة الحديثة، استخدم <code className="bg-gray-700 px-2 py-1 rounded">journalctl</code> بدل قراءة الملفات مباشرة.
        </Alert>

        <CodeBlock
          title="أوامر journalctl الأساسية"
          code={`# عرض كل السجلات
journalctl

# سجلات خدمة معينة
journalctl -u ssh
journalctl -u nginx

# سجلات فترة زمنية
journalctl --since "2025-01-01" --until "2025-01-02"
journalctl --since "1 hour ago"
journalctl --since "yesterday"

# متابعة مباشرة (مثل tail -f)
journalctl -f

# آخر 100 سطر
journalctl -n 100

# تصفية حسب الأولوية
journalctl -p err       # أخطاء فقط
journalctl -p warning   # تحذيرات فقط

# تصدير بصيغة JSON
journalctl --since today -o json > today-logs.json`}
        />

        <Table
          headers={['المستوى', 'الرقم', 'المعنى']}
          rows={[
            ['emerg', '0', 'النظام غير قابل للاستخدام'],
            ['alert', '1', 'يجب التصرف فوراً'],
            ['crit', '2', 'حالة حرجة'],
            ['err', '3', 'خطأ'],
            ['warning', '4', 'تحذير'],
            ['notice', '5', 'ملاحظة مهمة'],
            ['info', '6', 'معلوماتي'],
            ['debug', '7', 'للتطوير'],
          ]}
        />
      </section>

      {/* auth.log بعمق */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">قراءة auth.log كمحلل SOC ⭐</h2>

        <Alert type="golden" title="هذا أهم ملف للمحلل">
          كل محاولات تسجيل الدخول، SSH، sudo موجودة هنا!
        </Alert>

        {/* الأنماط المهمة */}
        <div className="space-y-4">
          {/* Brute Force */}
          <div className="bg-red-900/20 rounded-xl p-6 border border-red-500/30">
            <h3 className="text-lg font-bold text-red-400 mb-4">1. محاولات SSH فاشلة (Brute Force)</h3>
            <CodeBlock
              code={`Jan 15 10:23:45 server sshd[1234]: Failed password for admin from 192.168.1.50 port 54321 ssh2`}
            />
            <CodeBlock
              title="البحث"
              code={`grep "Failed password" /var/log/auth.log`}
            />
          </div>

          {/* تسجيل دخول ناجح */}
          <div className="bg-green-900/20 rounded-xl p-6 border border-green-500/30">
            <h3 className="text-lg font-bold text-green-400 mb-4">2. تسجيل دخول ناجح</h3>
            <CodeBlock
              code={`Jan 15 10:25:00 server sshd[1235]: Accepted password for admin from 192.168.1.50 port 54322 ssh2`}
            />
            <CodeBlock
              title="البحث"
              code={`grep "Accepted password" /var/log/auth.log
grep "Accepted publickey" /var/log/auth.log`}
            />
          </div>

          {/* Invalid user */}
          <div className="bg-yellow-900/20 rounded-xl p-6 border border-yellow-500/30">
            <h3 className="text-lg font-bold text-yellow-400 mb-4">3. مستخدم غير موجود (علامة قوية على brute force)</h3>
            <CodeBlock
              code={`Jan 15 10:24:00 server sshd[1236]: Invalid user test from 192.168.1.50`}
            />
            <CodeBlock
              title="البحث"
              code={`grep "Invalid user" /var/log/auth.log`}
            />
          </div>

          {/* Sudo */}
          <div className="bg-purple-900/20 rounded-xl p-6 border border-purple-500/30">
            <h3 className="text-lg font-bold text-purple-400 mb-4">4. استخدام sudo</h3>
            <CodeBlock
              code={`Jan 15 11:00:00 server sudo: admin : TTY=pts/0 ; PWD=/home/admin ; USER=root ; COMMAND=/bin/cat /etc/shadow`}
            />
            <CodeBlock
              title="البحث"
              code={`grep "sudo:" /var/log/auth.log`}
            />
          </div>

          {/* User changes */}
          <div className="bg-cyan-900/20 rounded-xl p-6 border border-cyan-500/30">
            <h3 className="text-lg font-bold text-cyan-400 mb-4">5. إنشاء/حذف مستخدمين</h3>
            <CodeBlock
              title="البحث"
              code={`grep -E "useradd|userdel|usermod" /var/log/auth.log
grep "passwd" /var/log/auth.log`}
            />
          </div>
        </div>
      </section>

      {/* تحليل عملي */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">📊 تحليل عملي شامل لـ auth.log</h2>

        <CodeBlock
          title="استخراج جميع العناوين التي حاولت brute force"
          code={`grep "Failed password" /var/log/auth.log | awk '{print $11}' | sort | uniq -c | sort -rn

# النتيجة مثل:
# 523 192.168.1.100
# 312 10.0.0.50
# 87 172.16.0.20`}
        />

        <CodeBlock
          title="استخراج المستخدمين المستهدفين"
          code={`grep "Failed password" /var/log/auth.log | awk '{print $9}' | sort | uniq -c | sort -rn`}
        />

        <CodeBlock
          title="استخراج محاولات دخول ناجحة مع المصدر"
          code={`grep "Accepted" /var/log/auth.log | awk '{print $9, $11}' | sort | uniq -c`}
        />

        <CodeBlock
          title="حساب محاولات الدخول في كل ساعة"
          code={`grep "Failed password" /var/log/auth.log | awk '{print $3}' | cut -d: -f1 | sort | uniq -c`}
        />
      </section>
    </div>
  );
};

export default LinuxLogsSection;
