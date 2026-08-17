import ChecklistItem from '../../components/ChecklistItem';
import Alert from '../../components/Alert';

const WindowsChecklistSection = () => {
  const checklistItems = [
    'أفهم بنية Windows Event Logs والسجلات المختلفة',
    'أحفظ 20+ Event ID مهم وأعرف معناها',
    'أفهم Logon Types الـ 11 ومتى تظهر كل واحدة',
    'أستطيع قراءة Event 4624 و 4625 بكل حقولها',
    'أعرف الفرق بين أحداث Workstation وأحداث DC',
    'أفعّل Audit Policy بشكل صحيح',
    'أفعّل Include Command Line لـ Event 4688',
    'أفعّل PowerShell Script Block Logging',
    'أثبت Sysmon بإعدادات احترافية',
    'أعرف Sysmon Event IDs الأهم',
    'أتقن Get-WinEvent مع FilterHashtable',
    'أكتب استعلامات معقدة بـ PowerShell',
    'أفهم أساسيات Active Directory',
    'أعرف هجمات AD الشائعة وعلاماتها',
    'أكشف Brute Force على RDP',
    'أكشف Lateral Movement بـ PsExec',
    'أكشف PowerShell attacks',
    'أكشف Credential Dumping',
    'أكشف Persistence عبر Scheduled Tasks',
    'أتعرف على LOLBins الأشهر',
    'أكتب تقرير تحقيق Windows كامل',
    'رفعت 5 تطبيقات على GitHub',
  ];

  const deliverables = [
    'lab1-windows-failed-logons.md مع الأوامر المستخدمة',
    'lab2-process-creation.md',
    'lab3-sysmon-investigation.md مع process tree',
    'lab4-powershell-investigation.md',
    'lab5-persistence-detection.md',
    'windows-event-ids-cheatsheet.md نسختك الشخصية',
    'powershell-queries-cheatsheet.md استعلاماتك الجاهزة',
    'sysmon-investigation-guide.md',
  ];

  const clearAllChecks = () => {
    checklistItems.forEach((_, index) => {
      localStorage.removeItem(`checklist-windows-item-${index}`);
    });
    deliverables.forEach((_, index) => {
      localStorage.removeItem(`checklist-windows-deliverable-${index}`);
    });
    window.location.reload();
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
        <span>✅</span>
        Checklist للجاهزية في Windows
      </h1>

      <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

      <Alert type="warning" title="قبل ما تنتقل لـ SOC">
        تأكد أنك تقدر تسوي كل هذه النقاط. علّم عليها وأنت تتقدم!
      </Alert>

      {/* قائمة المهارات */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">📋 قائمة المهارات</h2>
          <button
            onClick={clearAllChecks}
            className="text-sm text-gray-400 hover:text-red-400 transition-colors"
          >
            مسح الكل
          </button>
        </div>

        <div className="space-y-2">
          {checklistItems.map((item, index) => (
            <ChecklistItem key={index} text={item} id={`windows-item-${index}`} />
          ))}
        </div>
      </section>

      {/* المخرجات */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">📁 المخرجات المطلوبة</h2>
        <p className="text-gray-400">ارفع على GitHub:</p>

        <div className="space-y-2">
          {deliverables.map((item, index) => (
            <ChecklistItem key={index} text={item} id={`windows-deliverable-${index}`} />
          ))}
        </div>
      </section>

      {/* أسئلة المقابلات */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">💼 أسئلة المقابلات الشائعة</h2>

        <div className="space-y-4">
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <h3 className="text-cyan-400 font-bold mb-2">ما الفرق بين Event 4624 و 4768؟</h3>
            <p className="text-gray-300 text-sm">4624 = دخول ناجح على أي جهاز | 4768 = طلب TGT على DC فقط</p>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <h3 className="text-cyan-400 font-bold mb-2">كيف تكتشف Pass-the-Hash؟</h3>
            <p className="text-gray-300 text-sm">Event 4624 + Logon Type 3 + NTLM + من جهاز غير معتاد + بدون 4768</p>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <h3 className="text-cyan-400 font-bold mb-2">ما هو Sysmon ولماذا تستخدمه؟</h3>
            <p className="text-gray-300 text-sm">أداة من Sysinternals تسجل العمليات والشبكة والـ DNS - قدرة EDR مجانية</p>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <h3 className="text-cyan-400 font-bold mb-2">ما هي أهم Event IDs؟</h3>
            <p className="text-gray-300 text-sm">4624, 4625, 4672, 4688, 4720, 4732, 4698, 1102, 4104</p>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <h3 className="text-cyan-400 font-bold mb-2">ما هي علامات Lateral Movement؟</h3>
            <p className="text-gray-300 text-sm">Event 4624 Type 3 من جهاز لآخر | Event 4648 | Event 7045 (PSEXESVC)</p>
          </div>
        </div>
      </section>

      {/* القاعدة الذهبية */}
      <Alert type="golden" title="القاعدة الذهبية">
        <p className="text-xl font-bold">
          Windows هو قلب SOC في معظم الشركات. أتقن هذا القسم جيداً!
        </p>
        <p className="mt-2">التطبيق العملي ضروري - كل تطبيق ارفعه على GitHub مع screenshots.</p>
      </Alert>
    </div>
  );
};

export default WindowsChecklistSection;
