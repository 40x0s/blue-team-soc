import Alert from '../../components/Alert';
import CodeBlock from '../../components/CodeBlock';
import Table from '../../components/Table';

const LinuxCLISection = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
        <span>⌨️</span>
        أوامر CLI للمحلل
      </h1>

      <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

      {/* grep */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">أمر grep بعمق</h2>

        <CodeBlock
          title="الاستخدام الأساسي"
          code={`grep "pattern" file.log`}
        />

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <h3 className="text-cyan-400 font-bold mb-3">الخيارات الأساسية</h3>
            <CodeBlock
              code={`-i   # بدون حساسية لحالة الأحرف
-v   # العكس (ما لا يطابق)
-c   # عدد المطابقات فقط
-n   # مع رقم السطر
-r   # البحث في كل المجلدات`}
            />
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <h3 className="text-cyan-400 font-bold mb-3">خيارات السياق</h3>
            <CodeBlock
              code={`-A 3   # 3 أسطر بعد المطابقة
-B 3   # 3 أسطر قبل المطابقة
-C 2   # 2 أسطر قبل وبعد`}
            />
          </div>
        </div>

        <CodeBlock
          title="أمثلة عملية للمحلل"
          code={`# بحث بدون حساسية لحالة الأحرف
grep -i "error" file.log

# استبعاد نمط معين
grep -v "INFO" file.log

# عدد المطابقات فقط
grep -c "Failed" auth.log

# البحث عن عدة أنماط
grep -E "error|warning|critical" file.log

# استخراج الجزء المطابق فقط
grep -oE "[0-9]+\\.[0-9]+\\.[0-9]+\\.[0-9]+" auth.log`}
        />
      </section>

      {/* Regex */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">التعابير النمطية Regex للمحلل</h2>

        <Table
          headers={['الرمز', 'المعنى', 'مثال']}
          rows={[
            ['.', 'أي حرف واحد', 'a.c = abc, aXc'],
            ['*', 'صفر أو أكثر', 'ab* = a, ab, abb'],
            ['+', 'واحد أو أكثر', 'ab+ = ab, abb'],
            ['?', 'صفر أو واحد', 'ab? = a, ab'],
            ['^', 'بداية السطر', '^Error'],
            ['$', 'نهاية السطر', 'end$'],
            ['[abc]', 'أي حرف من المجموعة', '[aeiou]'],
            ['[0-9]', 'أي رقم', '[0-9]+'],
            ['[a-z]', 'أي حرف صغير', '[a-zA-Z]'],
          ]}
        />

        <CodeBlock
          title="أنماط مفيدة للمحلل"
          code={`# استخراج عنوان IP
grep -oE "[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}" file.log

# استخراج البريد الإلكتروني
grep -oE "[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}" file.log

# استخراج URLs
grep -oE "https?://[^ ]+" file.log

# استخراج المنافذ
grep -oE "port [0-9]+" file.log

# استخراج التواريخ (YYYY-MM-DD)
grep -oE "[0-9]{4}-[0-9]{2}-[0-9]{2}" file.log`}
        />
      </section>

      {/* awk */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">أمر awk للمحلل</h2>

        <Alert type="info">
          awk يعمل على الأعمدة. كل عمود يكون $1, $2, $3 وهكذا. $0 = السطر كامل.
        </Alert>

        <CodeBlock
          title="الاستخدام الأساسي"
          code={`# استخراج عمود معين
awk '{print $1}' file.log

# استخراج عدة أعمدة
awk '{print $1, $5, $9}' auth.log

# تغيير الفاصل (نقطتين بدل المسافة)
awk -F: '{print $1}' /etc/passwd

# استخراج بشرط
awk '$9 == "Failed" {print $11}' auth.log

# حساب مجموع
awk '{sum += $1} END {print sum}' numbers.txt`}
        />

        <CodeBlock
          title="استخدامات عملية"
          code={`# عد محاولات الدخول لكل IP
awk '/Failed password/ {print $11}' /var/log/auth.log | sort | uniq -c | sort -rn

# استخراج العناوين والمستخدمين معاً
awk '/Failed password/ {print $11, $9}' /var/log/auth.log`}
        />
      </section>

      {/* sed */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">أمر sed للمحلل</h2>

        <CodeBlock
          title="الاستخدام الأساسي"
          code={`# استبدال (أول تكرار)
sed 's/old/new/' file.txt

# استبدال (كل التكرارات في السطر)
sed 's/old/new/g' file.txt

# حذف أسطر تحتوي pattern
sed '/pattern/d' file.txt

# طباعة أسطر محددة (10 إلى 20)
sed -n '10,20p' file.txt`}
        />
      </section>

      {/* أوامر مساعدة */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">أوامر مساعدة مهمة</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <h3 className="text-cyan-400 font-bold mb-3">sort</h3>
            <CodeBlock
              code={`sort file.txt      # أبجدي
sort -r file.txt   # عكسي
sort -n file.txt   # رقمي
sort -k 2 file.txt # حسب العمود الثاني
sort -u file.txt   # مع إزالة المكرر`}
            />
          </div>

          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <h3 className="text-cyan-400 font-bold mb-3">uniq</h3>
            <CodeBlock
              code={`uniq file.txt    # إزالة المكرر
uniq -c file.txt # مع عدد التكرارات
uniq -d file.txt # المكرر فقط`}
            />
          </div>

          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <h3 className="text-cyan-400 font-bold mb-3">cut</h3>
            <CodeBlock
              code={`cut -d: -f1 /etc/passwd  # عمود 1 بفاصل :
cut -c1-10 file.txt      # أحرف 1-10`}
            />
          </div>

          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <h3 className="text-cyan-400 font-bold mb-3">wc</h3>
            <CodeBlock
              code={`wc -l file.txt  # عدد الأسطر
wc -w file.txt  # عدد الكلمات
wc -c file.txt  # عدد الأحرف`}
            />
          </div>

          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <h3 className="text-cyan-400 font-bold mb-3">head & tail</h3>
            <CodeBlock
              code={`head -n 10 file.txt      # أول 10 أسطر
tail -n 10 file.txt      # آخر 10 أسطر
tail -f /var/log/auth.log  # متابعة مباشرة`}
            />
          </div>

          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <h3 className="text-cyan-400 font-bold mb-3">find</h3>
            <CodeBlock
              code={`find / -name "*.log"     # بالاسم
find / -type f -mtime -1 # ملفات آخر 24 ساعة
find / -perm -4000       # ملفات SUID`}
            />
          </div>
        </div>
      </section>

      {/* Pipes */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">الـ Pipes للجمع بين الأوامر</h2>

        <Alert type="golden" title="القوة الحقيقية في الجمع!">
          <CodeBlock
            code={`cat auth.log | grep "Failed" | awk '{print $11}' | sort | uniq -c | sort -rn | head -10`}
          />
          <p className="mt-2">هذا الأمر يعطيك أعلى 10 عناوين IP في محاولات brute force!</p>
        </Alert>
      </section>
    </div>
  );
};

export default LinuxCLISection;
