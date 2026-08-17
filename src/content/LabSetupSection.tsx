import Alert from '../components/Alert';
import ChecklistItem from '../components/ChecklistItem';
import CodeBlock from '../components/CodeBlock';
import Table from '../components/Table';

const LabSetupSection = () => (
  <div className="space-y-10">
    <header>
      <h1 className="text-3xl font-bold text-cyan-400">🧰 بناء مختبر SOC آمن من الصفر</h1>
      <p className="mt-3 max-w-4xl text-lg leading-8 text-gray-300">الهدف ليس جمع أدوات كثيرة، بل بناء مصدر بيانات تستطيع التحكم فيه: تولّد حدثًا معروفًا، تثبت وصوله إلى السجل، تبحث عنه، ثم تعيد البيئة لحالة نظيفة.</p>
    </header>

    <Alert type="danger" title="حدود قانونية وأمنية غير قابلة للتفاوض">
      استخدم أجهزة افتراضية تملكها فقط. اجعل شبكة التجارب العدائية Host-only أو Internal. لا تعمل scanning أو brute force أو malware على شبكة الجامعة/العمل/المنزل المشتركة أو الإنترنت. لا تستخدم عينات برمجيات ضارة حقيقية في هذا المسار؛ المحاكاة الآمنة كافية لتعلّم L1.
    </Alert>

    <section>
      <h2 className="text-2xl font-bold text-white">1. التصميم الموصى به</h2>
      <Table
        headers={['الجهاز', 'المواصفات الدنيا', 'الدور', 'الشبكة']}
        rows={[
          ['Ubuntu Server', '4 vCPU / 8 GB / 60 GB تقريبًا', 'Wazuh all-in-one للمختبر', 'NAT للتحديث + Host-only للـlogs'],
          ['Windows 10/11 Eval', '2 vCPU / 4 GB / 60 GB', 'Endpoint + Event Logs + Sysmon', 'Host-only؛ NAT مؤقت للتحديث فقط'],
          ['Ubuntu Desktop/Server', '1–2 vCPU / 2 GB / 25 GB', 'Linux endpoint والتحقيق', 'Host-only؛ NAT مؤقت للتحديث فقط'],
          ['Analyst workstation', '2 vCPU / 4 GB / 30 GB', 'Wireshark وكتابة التقارير', 'Host-only'],
        ]}
      />
      <p className="text-sm text-gray-400">إذا كان RAM جهازك 8 GB: شغّل جهازين فقط في كل مرة، واستخدم Wazuh cloud trial أو اكتفِ أولًا بالسجلات المحلية. إذا كان 16 GB أو أكثر فالتصميم الكامل عملي.</p>
    </section>

    <section className="rounded-xl border border-gray-700 bg-gray-800/50 p-6">
      <h2 className="text-2xl font-bold text-white">2. مخطط الشبكة والعناوين</h2>
      <CodeBlock title="Topology — مثال لا تخلط بينه وبين شبكتك الحقيقية" language="text" code={`Internet (updates only)
          |
       NAT adapter  ← افصله أثناء المحاكاة
          |
[ Wazuh 192.168.56.10 ]
          |
  Host-only 192.168.56.0/24
     |                 |
[Windows .20]      [Linux .30]

ممنوع: Bridged Adapter أثناء تجارب scan/login.`} />
      <Alert type="info" title="لماذا محولان؟">
        NAT يعطي الجهاز خروجًا للتحديث ولا يجعله هدفًا مباشرًا من الشبكة الخارجية عادةً. Host-only يتيح تواصل VMs مع المضيف وبعضها. افصل NAT بعد التحديث قبل توليد السلوك المشبوه؛ هذه خطوة تقليل أثر وليست حماية مطلقة.
      </Alert>
    </section>

    <section>
      <h2 className="text-2xl font-bold text-white">3. ترتيب البناء الصحيح</h2>
      <ol className="mt-5 space-y-4">
        {[
          ['ثبّت hypervisor', 'VirtualBox أو VMware Workstation. فعّل virtualization من BIOS/UEFI إن لم تبدأ VMs.'],
          ['أنشئ Host-only network', 'مثال 192.168.56.0/24. لا تستخدم نفس subnet للشبكة المنزلية.'],
          ['ثبّت الأنظمة من مصادر رسمية', 'تحقق من hash إن كان المصدر ينشره. لا تحمل صورًا معدلة مجهولة.'],
          ['حدّث ثم افصل NAT', 'سجّل إصدار النظام والأداة؛ الواجهات والأوامر تتغير مع الإصدارات.'],
          ['اضبط الوقت', 'NTP والمنطقة الزمنية أساسيان؛ timeline خاطئ يفسد التحقيق. احتفظ بالـlogs بـUTC واعرض المحلي عند الحاجة.'],
          ['ثبّت telemetry', 'Windows auditing وPowerShell logging وSysmon؛ Linux journald/auth/auditd؛ ثم agent إن استخدمت SIEM.'],
          ['اختبر end-to-end', 'ولّد حدثًا حميدًا معروفًا، اعثر عليه محليًا، ثم في SIEM، وقارن timestamp والحقول.'],
          ['خذ Baseline Snapshot', 'سمّه 00-clean-telemetry. لا تعتمد على snapshot بدل النسخ الاحتياطي للملفات المهمة.'],
        ].map(([title, detail], index) => (
          <li key={title} className="flex gap-4 rounded-xl border border-gray-700 bg-gray-800/40 p-5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-600 font-bold text-white">{index + 1}</span>
            <div><h3 className="font-bold text-white">{title}</h3><p className="mt-1 text-sm leading-7 text-gray-300">{detail}</p></div>
          </li>
        ))}
      </ol>
    </section>

    <section>
      <h2 className="text-2xl font-bold text-white">4. فحوص الاتصال والزمن</h2>
      <CodeBlock title="Linux — identity, routes, listening services, clock" code={`ip -br address
ip route
ss -lntup
hostnamectl
systemctl status systemd-timesyncd --no-pager
journalctl --since "10 minutes ago" --no-pager | tail -n 30`} />
      <CodeBlock title="Windows PowerShell — run as Administrator only where stated" language="powershell" code={`Get-NetIPConfiguration
Get-NetRoute -AddressFamily IPv4 | Sort-Object RouteMetric
Get-NetTCPConnection -State Listen | Sort-Object LocalPort
Get-Date
w32tm /query /status
Get-Service W32Time`} />
      <Alert type="warning" title="علامة نجاح لا مجرد أمر يعمل">
        وثّق: IP لكل جهاز، subnet، gateway إن وُجد، فروق الساعة بين الأجهزة أقل من دقيقة، والخدمة التي تستمع على كل منفذ. إذا لم تستطع تفسير route أو listening port فلا تكمل ingestion.
      </Alert>
    </section>

    <section>
      <h2 className="text-2xl font-bold text-white">5. Wazuh بطريقة صحيحة الإصدار</h2>
      <p className="mt-2 text-gray-300">استخدم الإصدار الحالي من الدليل الرسمي عند التنزيل؛ وقت تحديث هذا المنهج السلسلة الحالية هي 4.14. لا تثبّت رقمًا قديمًا من مقال. افهم المكونات أولًا:</p>
      <Table
        headers={['المكوّن', 'ما يفعله', 'اختبار الصحة']}
        rows={[
          ['Agent', 'يجمع أحداث endpoint ويرسلها', 'حالة agent = active وزمن آخر اتصال حديث'],
          ['Manager', 'يفك الترميز ويطابق القواعد ويولّد alerts', 'الخدمة active ولا توجد أخطاء decoder/rule'],
          ['Indexer', 'يخزن ويتيح البحث', 'الفهارس تتلقى documents حديثة'],
          ['Dashboard', 'واجهة البحث والتنبيهات', 'ترى الحدث المتوقع وحقوله الصحيحة'],
        ]}
      />
      <CodeBlock title="Wazuh manager — فحص الخدمات والقواعد" code={`sudo systemctl status wazuh-manager --no-pager
sudo /var/ossec/bin/wazuh-control status
sudo /var/ossec/bin/wazuh-logtest
# الصق log تجريبيًا، ثم Ctrl+D لإنهاء الاختبار`} />
      <p className="text-sm leading-7 text-gray-300">ضع القواعد المحلية في <code dir="ltr" className="text-cyan-300">/var/ossec/etc/rules/local_rules.xml</code> والـdecoders في <code dir="ltr" className="text-cyan-300">/var/ossec/etc/decoders/local_decoder.xml</code>. استخدم <code dir="ltr">wazuh-logtest</code> قبل restart، ثم أعد تشغيل manager لتوليد alerts بالقواعد الجديدة.</p>
    </section>

    <section className="grid gap-4 md:grid-cols-2">
      <article className="rounded-xl border border-green-500/30 bg-green-900/10 p-5">
        <h2 className="text-xl font-bold text-green-300">اختبار end-to-end حميد</h2>
        <ol className="mt-3 space-y-2 text-sm leading-6 text-gray-300">
          <li>1. سجّل UTC الآن واسم الجهاز.</li>
          <li>2. نفّذ محاولة دخول فاشلة واحدة بحساب مختبر.</li>
          <li>3. اثبت ظهورها محليًا في log الصحيح.</li>
          <li>4. ابحث عنها في SIEM بـhost + time range.</li>
          <li>5. قارن user/source/result، ثم احسب ingestion delay.</li>
        </ol>
      </article>
      <article className="rounded-xl border border-red-500/30 bg-red-900/10 p-5">
        <h2 className="text-xl font-bold text-red-300">إذا لم يصل الحدث</h2>
        <ol className="mt-3 space-y-2 text-sm leading-6 text-gray-300">
          <li>1. هل الحدث موجود أصلًا على المصدر؟</li>
          <li>2. هل الساعة وtime range صحيحان؟</li>
          <li>3. هل agent active ويصل للmanager؟</li>
          <li>4. هل القناة/الملف مشمول في الجمع؟</li>
          <li>5. هل decoder تعرّف عليه؟ هل rule أسقطه؟</li>
          <li>6. هل index/search permission صحيحة؟</li>
        </ol>
      </article>
    </section>

    <section>
      <h2 className="text-2xl font-bold text-white">6. بروتوكول Snapshot والتنظيف</h2>
      <Table
        headers={['الاسم', 'متى', 'العودة إليه']}
        rows={[
          ['00-clean-os', 'بعد النظام والتحديث', 'إذا فسد إعداد telemetry'],
          ['01-clean-telemetry', 'بعد نجاح logs وagent', 'قبل كل مختبر تحقيق'],
          ['02-case-start', 'بعد تجهيز بيانات السيناريو', 'لإعادة التحقيق عمياء'],
        ]}
      />
      <p className="text-sm leading-7 text-gray-300">سجّل أي حساب/ملف/task/service أنشأه المختبر. عند التنظيف لا تستخدم wildcard واسعًا ولا تحذف log لإخفاء الأثر؛ أوقف العنصر المحدد، صدّر الأدلة، ثم ارجع للSnapshot. الاحتفاظ بالأثر جزء من التعلم.</p>
    </section>

    <section>
      <h2 className="text-2xl font-bold text-white">7. بوابة جاهزية المختبر</h2>
      <div className="mt-4 space-y-3">
        <ChecklistItem id="lab-ready-1" text="كل VM له اسم ودور وIP موثق، والشبكة العدائية غير Bridged." />
        <ChecklistItem id="lab-ready-2" text="الوقت متزامن ويمكنني التحويل بين UTC والوقت المحلي." />
        <ChecklistItem id="lab-ready-3" text="ولّدت حدثًا حميدًا ووجدته محليًا ثم في SIEM." />
        <ChecklistItem id="lab-ready-4" text="أعرف تأخر ingestion الطبيعي في مختبري ولا أخلطه مع غياب البيانات." />
        <ChecklistItem id="lab-ready-5" text="أملك Snapshot نظيفًا وخطة تنظيف لكل تغيير." />
        <ChecklistItem id="lab-ready-6" text="أنشأت مجلد evidence خاصًا وآخر public منزوع الحساسية." />
      </div>
    </section>

    <Alert type="golden" title="اختبار الإتقان">
      أعطِ المخطط لشخص لا يعرف مختبرك. يجب أن يستطيع تحديد مسار الحدث من endpoint إلى dashboard، أين يفحص عند الانقطاع، وما الشبكة التي تمنع خروج التجربة. إذا لم تستطع شرح ذلك، أصلح التصميم قبل زيادة الأدوات.
    </Alert>
  </div>
);

export default LabSetupSection;
