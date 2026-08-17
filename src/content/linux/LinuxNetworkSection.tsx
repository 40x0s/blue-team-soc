import Alert from '../../components/Alert';
import CodeBlock from '../../components/CodeBlock';

const LinuxNetworkSection = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
        <span>🌐</span>
        تحليل الشبكة على Linux
      </h1>

      <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

      {/* netstat */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">أمر netstat (قديم لكن شائع)</h2>

        <CodeBlock
          title="عرض كل الاتصالات"
          code={`netstat -antup`}
        />

        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
          <h3 className="text-cyan-400 font-bold mb-3">شرح الخيارات</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
            <div className="bg-gray-700/50 rounded p-2 text-center">
              <code className="text-green-400">-a</code>
              <p className="text-gray-400 text-xs">جميع الاتصالات</p>
            </div>
            <div className="bg-gray-700/50 rounded p-2 text-center">
              <code className="text-green-400">-n</code>
              <p className="text-gray-400 text-xs">أرقام بدل أسماء</p>
            </div>
            <div className="bg-gray-700/50 rounded p-2 text-center">
              <code className="text-green-400">-t</code>
              <p className="text-gray-400 text-xs">TCP</p>
            </div>
            <div className="bg-gray-700/50 rounded p-2 text-center">
              <code className="text-green-400">-u</code>
              <p className="text-gray-400 text-xs">UDP</p>
            </div>
            <div className="bg-gray-700/50 rounded p-2 text-center">
              <code className="text-green-400">-p</code>
              <p className="text-gray-400 text-xs">مع اسم العملية</p>
            </div>
          </div>
        </div>

        <CodeBlock
          title="عرض المنافذ المفتوحة فقط (Listening)"
          code={`netstat -tlnp`}
        />
      </section>

      {/* ss */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">أمر ss (الحديث والأسرع) ⭐</h2>

        <Alert type="info">
          <code className="bg-gray-700 px-2 py-1 rounded">ss</code> أسرع وأفضل من netstat في الأنظمة الحديثة.
        </Alert>

        <CodeBlock
          title="أوامر ss الأساسية"
          code={`# عرض كل الاتصالات
ss -antup

# عرض المنافذ المفتوحة
ss -tlnp

# عرض الاتصالات لعنوان معين
ss -ant dst 192.168.1.10

# عرض الاتصالات من عنوان معين
ss -ant src 192.168.1.10

# إحصائيات الاتصالات
ss -s`}
        />
      </section>

      {/* أمر ip */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">أمر ip</h2>

        <CodeBlock
          title="أوامر ip الأساسية"
          code={`# عرض واجهات الشبكة
ip addr
ip a

# جدول التوجيه
ip route

# جدول ARP
ip neigh`}
        />
      </section>

      {/* علامات مشبوهة */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">🚨 علامات مشبوهة على الشبكة</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-red-900/20 rounded-xl p-6 border border-red-500/30">
            <h3 className="text-red-400 font-bold mb-4">⚠️ اتصالات مشبوهة</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• اتصال صادر إلى IP عام غير معتاد</li>
              <li>• عملية تستمع على منفذ غير معتاد (4444, 6666)</li>
              <li>• اتصالات كثيرة لنفس العنوان (beaconing)</li>
              <li>• عملية ليست خدمة معروفة تستمع على منافذ</li>
            </ul>
          </div>

          <div className="bg-yellow-900/20 rounded-xl p-6 border border-yellow-500/30">
            <h3 className="text-yellow-400 font-bold mb-4">🔍 أوامر الفحص</h3>
            <CodeBlock
              code={`# الاتصالات النشطة
ss -antup | grep ESTAB

# المنافذ المفتوحة
ss -tlnp

# البحث عن منافذ مشبوهة
ss -tlnp | grep -E ":4444|:6666|:1337"`}
            />
          </div>
        </div>
      </section>

      {/* مثال تحقيق */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">📋 مثال: تحقيق في اتصال مشبوه</h2>

        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <CodeBlock
            code={`# 1. اكتشف الاتصالات النشطة
ss -antup | grep ESTAB

# 2. لنفترض وجدت اتصال مشبوه على منفذ 4444
# حدد رقم العملية (PID)
ss -antup | grep 4444

# 3. تحقق من العملية
ps aux | grep PID
ls -l /proc/PID/exe
cat /proc/PID/cmdline

# 4. اكتشف كل اتصالات هذه العملية
lsof -i -p PID

# 5. وثّق ثم أوقف العملية
sudo kill -9 PID`}
          />
        </div>
      </section>

      {/* ملخص سريع */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">📊 ملخص أوامر الشبكة</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-cyan-900/20 rounded-lg p-4 border border-cyan-500/30 text-center">
            <code className="text-cyan-400 text-lg">ss -antup</code>
            <p className="text-gray-400 text-xs mt-2">كل الاتصالات</p>
          </div>
          <div className="bg-cyan-900/20 rounded-lg p-4 border border-cyan-500/30 text-center">
            <code className="text-cyan-400 text-lg">ss -tlnp</code>
            <p className="text-gray-400 text-xs mt-2">المنافذ المفتوحة</p>
          </div>
          <div className="bg-cyan-900/20 rounded-lg p-4 border border-cyan-500/30 text-center">
            <code className="text-cyan-400 text-lg">ip addr</code>
            <p className="text-gray-400 text-xs mt-2">واجهات الشبكة</p>
          </div>
          <div className="bg-cyan-900/20 rounded-lg p-4 border border-cyan-500/30 text-center">
            <code className="text-cyan-400 text-lg">lsof -i</code>
            <p className="text-gray-400 text-xs mt-2">الملفات الشبكية</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LinuxNetworkSection;
