import Alert from '../../components/Alert';
import CodeBlock from '../../components/CodeBlock';
import Table from '../../components/Table';

const LinuxUsersSection = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
        <span>👤</span>
        المستخدمون والصلاحيات
      </h1>

      <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

      {/* /etc/passwd */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">ملف /etc/passwd</h2>
        
        <p className="text-gray-300">يحتوي على معلومات المستخدمين بالشكل التالي:</p>

        <CodeBlock
          title="صيغة السطر في /etc/passwd"
          code={`username:x:1000:1000:Full Name:/home/username:/bin/bash
   │      │  │    │      │           │              │
   │      │  │    │      │           │              └── الـ shell الافتراضي
   │      │  │    │      │           └── المجلد الشخصي
   │      │  │    │      └── الاسم الكامل/التعليق
   │      │  │    └── رقم المجموعة GID
   │      │  └── رقم المستخدم UID
   │      └── علامة x = كلمة المرور في shadow
   └── اسم المستخدم`}
        />

        <Alert type="danger" title="🚨 علامات مشبوهة في /etc/passwd">
          <ul className="space-y-2 mt-2">
            <li>• <strong>مستخدم جديد</strong> لم تنشئه أنت</li>
            <li>• <strong>مستخدم بـ UID = 0</strong> غير root ← خطير جداً! يعني صلاحيات root</li>
            <li>• <strong>مستخدم بـ shell هو /bin/bash</strong> بدون سبب واضح</li>
          </ul>
        </Alert>

        <CodeBlock
          title="البحث عن مستخدمين بصلاحيات root"
          code={`# مستخدمون بـ UID = 0 (صلاحيات root)
awk -F: '$3 == 0 {print $1}' /etc/passwd

# مستخدمون يمكنهم تسجيل الدخول
grep -v '/nologin\\|/false' /etc/passwd | cut -d: -f1`}
        />
      </section>

      {/* /etc/shadow */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">ملف /etc/shadow</h2>
        
        <Alert type="info">
          يحتوي على كلمات المرور المشفرة. لا يمكن قراءته إلا بصلاحيات root.
        </Alert>

        <CodeBlock
          code={`sudo cat /etc/shadow | head -5`}
        />
      </section>

      {/* الصلاحيات */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">الصلاحيات على الملفات (Permissions)</h2>

        <CodeBlock
          title="عرض الصلاحيات"
          code={`ls -l filename

# النتيجة:
-rwxr-xr-- 1 user group 1024 Jan 1 12:00 filename
│└┬┘└┬┘└┬┘
│ │  │  └── صلاحيات الآخرين (r--)
│ │  └── صلاحيات المجموعة (r-x)
│ └── صلاحيات المالك (rwx)
└── نوع الملف (- ملف، d مجلد، l رابط)`}
        />

        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-bold text-cyan-400 mb-4">الصلاحيات بالأرقام</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="text-3xl font-bold text-green-400">4</div>
              <div className="text-gray-300">قراءة (r)</div>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="text-3xl font-bold text-yellow-400">2</div>
              <div className="text-gray-300">كتابة (w)</div>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="text-3xl font-bold text-red-400">1</div>
              <div className="text-gray-300">تنفيذ (x)</div>
            </div>
          </div>
          <p className="text-gray-400 text-center mt-4">
            مثال: <code className="bg-gray-700 px-2 py-1 rounded">755</code> = rwxr-xr-x
          </p>
        </div>

        <Alert type="danger" title="علامات مشبوهة في الصلاحيات">
          <ul className="space-y-2 mt-2">
            <li>• ملف بصلاحية <code className="bg-gray-700 px-2 py-1 rounded text-red-400">777</code> = الكل يستطيع كل شيء ← خطير!</li>
            <li>• ملف SUID بصلاحية root (<code className="bg-gray-700 px-2 py-1 rounded text-red-400">4755</code>) ← يستحق التحقيق</li>
          </ul>
        </Alert>

        <CodeBlock
          title="البحث عن ملفات SUID مشبوهة"
          code={`# ملفات SUID (تعمل بصلاحيات المالك)
find / -perm -4000 -type f 2>/dev/null

# ملفات SGID (تعمل بصلاحيات المجموعة)
find / -perm -2000 -type f 2>/dev/null

# ملفات بصلاحية 777 (خطيرة)
find / -perm 777 -type f 2>/dev/null`}
        />
      </section>

      {/* Sudo */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">صلاحيات Sudo</h2>

        <CodeBlock
          title="فحص صلاحيات sudo"
          code={`# عرض ملف sudoers
sudo cat /etc/sudoers

# عرض ملفات sudoers.d
ls -la /etc/sudoers.d/

# المستخدمون في مجموعة sudo
grep sudo /etc/group`}
        />

        <Alert type="warning">
          مستخدم في مجموعة <code className="bg-gray-700 px-2 py-1 rounded">sudo</code> أو <code className="bg-gray-700 px-2 py-1 rounded">wheel</code> يستطيع تنفيذ أي أمر كـ root!
        </Alert>
      </section>

      {/* جدول ملخص */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">📊 أوامر فحص المستخدمين السريعة</h2>

        <Table
          headers={['الأمر', 'الوظيفة']}
          rows={[
            ['cat /etc/passwd', 'عرض كل المستخدمين'],
            ['who', 'من مسجل الدخول الآن'],
            ['last', 'آخر تسجيلات الدخول'],
            ['lastb', 'محاولات الدخول الفاشلة'],
            ['id username', 'معلومات المستخدم'],
            ['groups username', 'مجموعات المستخدم'],
          ]}
        />
      </section>
    </div>
  );
};

export default LinuxUsersSection;
