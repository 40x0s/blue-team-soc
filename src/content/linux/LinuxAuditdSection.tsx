import Alert from '../../components/Alert';
import CodeBlock from '../../components/CodeBlock';

const LinuxAuditdSection = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
        <span>👁️</span>
        نظام Auditd للمراقبة المتقدمة
      </h1>

      <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

      <Alert type="info" title="ما هو auditd؟">
        نظام تدقيق متقدم يسجل كل ما يحدث في النظام. أقوى بكثير من السجلات العادية!
      </Alert>

      {/* التثبيت */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">تثبيت auditd</h2>

        <CodeBlock
          title="التثبيت"
          code={`# Debian/Ubuntu
sudo apt install auditd

# RHEL/CentOS
sudo yum install audit

# تشغيل الخدمة
sudo systemctl enable auditd
sudo systemctl start auditd`}
        />
      </section>

      {/* القواعد */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">قواعد مفيدة للمحلل</h2>

        <div className="space-y-4">
          {/* مراقبة ملف */}
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h3 className="text-cyan-400 font-bold mb-4">1. مراقبة ملف مهم</h3>
            <CodeBlock
              code={`sudo auditctl -w /etc/passwd -p wa -k passwd_changes
sudo auditctl -w /etc/shadow -p wa -k shadow_changes
sudo auditctl -w /etc/sudoers -p wa -k sudoers_changes`}
            />
            <div className="mt-4 text-sm text-gray-400">
              <p><code className="bg-gray-700 px-1 rounded">-w</code> = راقب الملف</p>
              <p><code className="bg-gray-700 px-1 rounded">-p wa</code> = على الكتابة (w) والتعديل (a)</p>
              <p><code className="bg-gray-700 px-1 rounded">-k</code> = مفتاح للبحث لاحقاً</p>
            </div>
          </div>

          {/* مراقبة الأوامر */}
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h3 className="text-cyan-400 font-bold mb-4">2. مراقبة تنفيذ الأوامر</h3>
            <CodeBlock
              code={`sudo auditctl -a always,exit -F arch=b64 -S execve -k command_execution`}
            />
            <p className="text-gray-400 text-sm mt-4">يسجل كل أمر يتم تنفيذه!</p>
          </div>

          {/* مراقبة SSH */}
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h3 className="text-cyan-400 font-bold mb-4">3. مراقبة SSH</h3>
            <CodeBlock
              code={`sudo auditctl -w /etc/ssh/sshd_config -p wa -k sshd_config
sudo auditctl -w /root/.ssh/authorized_keys -p wa -k ssh_keys`}
            />
          </div>
        </div>
      </section>

      {/* البحث في السجلات */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">البحث في سجلات Audit</h2>

        <CodeBlock
          title="أوامر ausearch"
          code={`# عرض القواعد الحالية
sudo auditctl -l

# البحث حسب المفتاح
sudo ausearch -k passwd_changes
sudo ausearch -k command_execution

# البحث حسب الوقت
sudo ausearch -ts today
sudo ausearch -ts recent

# البحث حسب المستخدم
sudo ausearch -ua root

# البحث حسب العملية
sudo ausearch -p 1234`}
        />

        <CodeBlock
          title="تقارير ملخصة"
          code={`# تقرير عام
sudo aureport

# ملخص
sudo aureport --summary

# محاولات الدخول الفاشلة
sudo aureport -au --failed

# الملفات المعدلة
sudo aureport -f

# الأوامر المنفذة
sudo aureport -x`}
        />
      </section>

      {/* قواعد دائمة */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">جعل القواعد دائمة</h2>

        <Alert type="warning">
          القواعد المضافة بـ auditctl تختفي بعد إعادة التشغيل!
        </Alert>

        <CodeBlock
          title="إضافة قواعد دائمة"
          code={`# أضف القواعد لهذا الملف
sudo nano /etc/audit/rules.d/custom.rules

# محتوى الملف:
-w /etc/passwd -p wa -k passwd_changes
-w /etc/shadow -p wa -k shadow_changes
-w /etc/sudoers -p wa -k sudoers_changes
-w /etc/ssh/sshd_config -p wa -k sshd_config

# أعد تحميل القواعد
sudo augenrules --load`}
        />
      </section>

      {/* مثال عملي */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">📋 مثال عملي</h2>

        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-300 mb-4">لنفترض تريد معرفة من عدّل /etc/passwd:</p>
          <CodeBlock
            code={`# 1. أضف القاعدة
sudo auditctl -w /etc/passwd -p wa -k passwd_watch

# 2. انتظر أو افتعل تعديل للاختبار
sudo useradd testuser

# 3. ابحث
sudo ausearch -k passwd_watch

# 4. النتيجة تظهر:
# - من عدّل الملف
# - متى
# - من أي terminal
# - ما الأمر المستخدم`}
          />
        </div>
      </section>
    </div>
  );
};

export default LinuxAuditdSection;
