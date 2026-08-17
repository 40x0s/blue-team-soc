import Alert from '../../components/Alert';
import CodeBlock from '../../components/CodeBlock';
import Table from '../../components/Table';

const LinuxProcessesSection = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
        <span>⚙️</span>
        العمليات Processes للمحلل
      </h1>

      <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

      {/* ps */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">أمر ps</h2>

        <CodeBlock
          title="عرض كل العمليات"
          code={`ps aux
ps -ef`}
        />

        <Table
          headers={['العمود', 'المعنى', 'ملاحظة للمحلل']}
          rows={[
            ['USER', 'المستخدم', 'من يشغل العملية؟'],
            ['PID', 'رقم العملية', 'للتتبع والإيقاف'],
            ['%CPU', 'استخدام المعالج', 'عالي = مشبوه؟'],
            ['%MEM', 'استخدام الذاكرة', 'عالي = مشبوه؟'],
            ['COMMAND', 'الأمر', 'الأهم! ما هو البرنامج؟'],
          ]}
        />

        <CodeBlock
          title="البحث عن عملية معينة"
          code={`ps aux | grep nginx
ps aux | grep -E "/tmp|/dev/shm"  # بحث عن مسارات مشبوهة`}
        />

        <CodeBlock
          title="عرض شجرة العمليات (مهم جداً)"
          code={`ps auxf
pstree

# يظهر العلاقة بين العمليات (الأم والابن)`}
        />
      </section>

      {/* علامات مشبوهة */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">🚨 علامات مشبوهة في العمليات</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <Alert type="danger">
            <ul className="space-y-2">
              <li>• عملية تعمل من <code className="bg-gray-700 px-1 rounded">/tmp</code></li>
              <li>• عملية بأسماء عشوائية</li>
              <li>• عملية تستهلك موارد عالية بشكل غير طبيعي</li>
            </ul>
          </Alert>
          <Alert type="warning">
            <ul className="space-y-2">
              <li>• عملية بصلاحيات root غير معروفة</li>
              <li>• عملية أم غير منطقية (bash يطلق nginx؟)</li>
              <li>• عملية بدون ملف تنفيذي</li>
            </ul>
          </Alert>
        </div>
      </section>

      {/* top & htop */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">أمر top و htop</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h3 className="text-cyan-400 font-bold mb-4">top</h3>
            <CodeBlock code={`top`} />
            <p className="text-gray-400 text-sm mt-4">داخل top:</p>
            <ul className="text-gray-300 text-sm space-y-1 mt-2">
              <li>• <code className="bg-gray-700 px-1 rounded">P</code> - ترتيب حسب CPU</li>
              <li>• <code className="bg-gray-700 px-1 rounded">M</code> - ترتيب حسب الذاكرة</li>
              <li>• <code className="bg-gray-700 px-1 rounded">k</code> - إنهاء عملية</li>
              <li>• <code className="bg-gray-700 px-1 rounded">q</code> - خروج</li>
            </ul>
          </div>

          <div className="bg-green-900/20 rounded-xl p-6 border border-green-500/30">
            <h3 className="text-green-400 font-bold mb-4">htop (أفضل وأجمل)</h3>
            <CodeBlock code={`# تثبيت
sudo apt install htop

# تشغيل
htop`} />
            <p className="text-gray-400 text-sm mt-4">واجهة ملونة وتفاعلية!</p>
          </div>
        </div>
      </section>

      {/* فحص عملية بعمق */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">فحص عملية بعمق</h2>

        <Alert type="info">
          كل عملية لها مجلد في <code className="bg-gray-700 px-2 py-1 rounded">/proc/PID/</code>
        </Alert>

        <CodeBlock
          title="معلومات تفصيلية عن عملية"
          code={`# استبدل 1234 برقم PID الفعلي
ls -l /proc/1234/

# الأمر الكامل الذي شغل العملية
cat /proc/1234/cmdline

# حالة العملية
cat /proc/1234/status

# الملف التنفيذي الحقيقي
ls -l /proc/1234/exe

# مجلد العمل الحالي
ls -l /proc/1234/cwd`}
        />

        <CodeBlock
          title="الملفات المفتوحة من عملية"
          code={`lsof -p 1234`}
        />

        <CodeBlock
          title="الاتصالات الشبكية من عملية"
          code={`lsof -i -p 1234
netstat -tnp | grep 1234
ss -tnp | grep 1234`}
        />
      </section>

      {/* مثال عملي */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">📋 مثال عملي: تحقيق في عملية مشبوهة</h2>

        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-300 mb-4">لنفترض وجدت عملية مشبوهة PID=5678:</p>

          <CodeBlock
            code={`# 1. ما هو الأمر الذي شغلها؟
cat /proc/5678/cmdline; echo

# 2. من أين تعمل؟
ls -l /proc/5678/exe
ls -l /proc/5678/cwd

# 3. من المستخدم؟
ps -p 5678 -o user=

# 4. ما هي الملفات المفتوحة؟
lsof -p 5678

# 5. هل لها اتصالات شبكية؟
ss -tnp | grep 5678

# 6. من العملية الأم؟
ps -o ppid= -p 5678

# 7. إيقاف العملية (بعد التوثيق!)
sudo kill -9 5678`}
          />
        </div>
      </section>
    </div>
  );
};

export default LinuxProcessesSection;
