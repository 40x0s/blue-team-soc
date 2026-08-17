import Alert from '../../components/Alert';
import CodeBlock from '../../components/CodeBlock';

const LinuxHardeningSection = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
        <span>🛡️</span>
        التشديد الأمني Hardening
      </h1>

      <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

      {/* SSH Hardening */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">تشديد SSH</h2>

        <CodeBlock
          title="الملف الرئيسي"
          code={`sudo nano /etc/ssh/sshd_config`}
        />

        <div className="space-y-4">
          {/* PermitRootLogin */}
          <div className="bg-red-900/20 rounded-xl p-6 border border-red-500/30">
            <h3 className="text-red-400 font-bold mb-4">1. منع تسجيل دخول root مباشرة</h3>
            <CodeBlock code={`PermitRootLogin no`} />
          </div>

          {/* Key Auth */}
          <div className="bg-green-900/20 rounded-xl p-6 border border-green-500/30">
            <h3 className="text-green-400 font-bold mb-4">2. استخدام مفاتيح بدل كلمات المرور</h3>
            <CodeBlock code={`PasswordAuthentication no
PubkeyAuthentication yes`} />
            <Alert type="danger" title="تحذير مهم جداً!">
              لا تطبق PasswordAuthentication no قبل ما تتأكد من إعداد المفاتيح!
            </Alert>
          </div>

          {/* Port */}
          <div className="bg-yellow-900/20 rounded-xl p-6 border border-yellow-500/30">
            <h3 className="text-yellow-400 font-bold mb-4">3. تغيير المنفذ الافتراضي</h3>
            <CodeBlock code={`Port 2222`} />
          </div>

          {/* AllowUsers */}
          <div className="bg-cyan-900/20 rounded-xl p-6 border border-cyan-500/30">
            <h3 className="text-cyan-400 font-bold mb-4">4. تحديد المستخدمين المسموحين</h3>
            <CodeBlock code={`AllowUsers admin developer`} />
          </div>

          {/* Other settings */}
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h3 className="text-white font-bold mb-4">5. إعدادات إضافية</h3>
            <CodeBlock code={`MaxAuthTries 3          # حد محاولات الدخول
LoginGraceTime 30       # مهلة الاتصال
ClientAliveInterval 300 # نبض كل 5 دقائق
ClientAliveCountMax 2   # بعد 2 فشل = قطع`} />
          </div>
        </div>

        <CodeBlock
          title="إعادة تشغيل SSH"
          code={`sudo systemctl restart ssh`}
        />

        <Alert type="warning">
          اعمل Snapshot قبل أي تعديل في اللاب!
        </Alert>
      </section>

      {/* UFW */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">جدار الحماية UFW</h2>

        <CodeBlock
          title="الأوامر الأساسية"
          code={`# تفعيل UFW
sudo ufw enable

# السماح بمنفذ
sudo ufw allow 22
sudo ufw allow 443

# السماح من عنوان محدد فقط
sudo ufw allow from 192.168.1.0/24 to any port 22

# حظر منفذ
sudo ufw deny 23

# عرض القواعد
sudo ufw status verbose

# حذف قاعدة
sudo ufw delete allow 22`}
        />
      </section>

      {/* تشديد إضافي */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">تشديد إضافي</h2>

        <div className="grid md:grid-cols-2 gap-4">
          {/* تعطيل الخدمات */}
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h3 className="text-cyan-400 font-bold mb-4">تعطيل الخدمات غير المستخدمة</h3>
            <CodeBlock code={`sudo systemctl disable telnet
sudo systemctl stop telnet`} />
          </div>

          {/* التحديث */}
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h3 className="text-cyan-400 font-bold mb-4">تحديث النظام</h3>
            <CodeBlock code={`sudo apt update && sudo apt upgrade -y`} />
          </div>

          {/* مراجعة المستخدمين */}
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h3 className="text-cyan-400 font-bold mb-4">مراجعة المستخدمين</h3>
            <CodeBlock code={`# من يستطيع تسجيل الدخول؟
grep -v '/nologin\\|/false' /etc/passwd | cut -d: -f1`} />
          </div>

          {/* مراجعة sudo */}
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h3 className="text-cyan-400 font-bold mb-4">مراجعة sudo</h3>
            <CodeBlock code={`sudo cat /etc/sudoers
ls -la /etc/sudoers.d/`} />
          </div>
        </div>
      </section>

      {/* ملخص Hardening */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">📋 Checklist للتشديد</h2>

        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <ul className="space-y-2 text-gray-300">
            <li>☐ منع root login على SSH</li>
            <li>☐ استخدام key authentication</li>
            <li>☐ تغيير منفذ SSH</li>
            <li>☐ تحديد MaxAuthTries</li>
            <li>☐ تفعيل UFW</li>
            <li>☐ السماح بمنافذ محددة فقط</li>
            <li>☐ تعطيل الخدمات غير المستخدمة</li>
            <li>☐ تحديث النظام</li>
            <li>☐ مراجعة المستخدمين وصلاحياتهم</li>
            <li>☐ تفعيل auditd</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default LinuxHardeningSection;
