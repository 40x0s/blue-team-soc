
import ChecklistItem from '../components/ChecklistItem';
import Alert from '../components/Alert';

const ChecklistSection: React.FC = () => {
  const checklistItems = [
    'أشرح OSI بـ 4 طبقات فقط (L2, L3, L4, L7)',
    'أحفظ 15+ port مهم وأعرف وش يخدم',
    'أفهم DNS records (A, AAAA, CNAME, MX, TXT, NS, PTR)',
    'أكتشف NXDOMAIN flooding (DGA)',
    'أشرح TCP handshake وأقرأه في Wireshark',
    'أكتشف TCP RST scan',
    'أفهم TLS handshake (ClientHello, ServerHello, SNI)',
    'أعرف ليش TLS يصعّب على SOC وكيف نتحايل',
    'أقرأ HTTP status codes وأعرف وش يدل كل واحد',
    'أحفظ 10+ Wireshark filter',
    'أكتب Network Investigation Note كامل',
    'أكتشف Port Scan في PCAP',
    'أكتشف Brute Force في HTTP/SSH',
    'أعرف SMB, RDP, Kerberos وعلامات الهجوم',
    'أعرف 3 مصادر Threat Intel مجانية على الأقل',
    'رفعت 3 PCAPs محللة على GitHub',
  ];

  const deliverables = [
    'lab1-https-analysis.md + PCAP',
    'lab2-portscan-detection.md + PCAP',
    'lab3-dga-detection.md + PCAP',
    'lab4-bruteforce-http.md + PCAP',
    'wireshark-cheatsheet.md (نسختك الشخصية)',
    'dns-investigation-guide.md (ملخصك)',
  ];

  const clearAllChecks = () => {
    checklistItems.forEach((_, index) => {
      localStorage.removeItem(`checklist-item-${index}`);
    });
    deliverables.forEach((_, index) => {
      localStorage.removeItem(`checklist-deliverable-${index}`);
    });
    window.location.reload();
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
        <span>✅</span>
        الجزء 12: Checklist للجاهزية في Networking
      </h1>

      <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

      <Alert type="warning" title="قبل ما تنتقل لـ Linux">
        تأكد أنك تقدر تسوي كل هذه النقاط. علّم عليها وأنت تتقدم!
      </Alert>

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
            <ChecklistItem key={index} text={item} id={`item-${index}`} />
          ))}
        </div>
      </section>

      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">📁 المخرجات المطلوبة لإنهاء هذا القسم</h2>
        <p className="text-gray-400">ارفع على GitHub:</p>

        <div className="space-y-2">
          {deliverables.map((item, index) => (
            <ChecklistItem key={index} text={item} id={`deliverable-${index}`} />
          ))}
        </div>
      </section>

      <Alert type="golden" title="قاعدة ذهبية أخيرة قبل ما ننتقل">
        <p className="text-xl font-bold">
          لا تنتقل لصفحة Linux قبل ما تخلص 4 Labs على الأقل + تكتب 4 تقارير + ترفعها GitHub.
        </p>
        <p className="mt-4">التطبيق هو اللي يثبت العلم. القراءة وحدها = نسيان بعد أسبوع.</p>
      </Alert>

      <div className="mt-12 bg-gradient-to-l from-green-900/30 to-transparent rounded-xl p-8 border border-green-500/30 text-center">
        <h2 className="text-2xl font-bold text-green-400 mb-4">🎉 جاهز للصفحة التالية؟</h2>
        <p className="text-gray-300 mb-4">
          عندما تخلص Networking وتنزل المخرجات على GitHub، انتقل لصفحة <strong>Linux</strong>
        </p>
        <p className="text-2xl mt-6">💪 بالتوفيق يا بطل، أنت في الطريق الصحيح!</p>
      </div>
    </div>
  );
};

export default ChecklistSection;
