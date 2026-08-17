import Alert from '../../components/Alert';
import CodeBlock from '../../components/CodeBlock';
import ChecklistItem from '../../components/ChecklistItem';

// === CV Rules Section ===
export const CareerCVSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>📄</span>كتابة CV احترافي لـ SOC Analyst</h1>
    <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

    <Alert type="golden" title="لماذا هذا الدرس الآن؟">
      خلصت كل المحتوى التقني. الآن تحتاج تحول معرفتك إلى <strong>ملف توظيف يفتح لك الأبواب</strong>.
    </Alert>

    {/* القواعد */}
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">📏 قواعد CV لسوق الأمن السيبراني</h2>

      <div className="grid md:grid-cols-2 gap-4">
        {/* القاعدة 1 */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-cyan-400 font-bold mb-3">📏 القاعدة 1: صفحة واحدة فقط</h3>
          <p className="text-gray-300 text-sm">أنت Junior. لا يوجد سبب لأكثر من صفحة.</p>
          <p className="text-yellow-400 text-sm mt-2">المُوظِف يقضي <strong>6-10 ثوانٍ</strong> على CV.</p>
        </div>

        {/* القاعدة 2 */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-cyan-400 font-bold mb-3">🤖 القاعدة 2: ATS-Friendly</h3>
          <p className="text-gray-300 text-sm mb-2">ATS = نظام فلترة CVs تلقائياً</p>
          <ul className="text-gray-400 text-xs space-y-1">
            <li>❌ لا جداول أو أعمدة معقدة</li>
            <li>❌ لا صور أو ألوان كثيرة</li>
            <li>❌ لا headers و footers</li>
            <li>✅ خطوط عادية (Calibri, Arial)</li>
            <li>✅ احفظ PDF</li>
            <li>✅ الكلمات المفتاحية من الوصف الوظيفي</li>
          </ul>
        </div>

        {/* القاعدة 4 */}
        <div className="bg-green-900/20 rounded-xl p-6 border border-green-500/30 md:col-span-2">
          <h3 className="text-green-400 font-bold mb-3">🎯 القاعدة 3: النتائج وليس المهام</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-red-900/20 rounded p-3 border border-red-500/30">
              <p className="text-red-400 text-xs font-bold mb-2">❌ خطأ:</p>
              <p className="text-gray-400 text-sm">"Studied cybersecurity topics"</p>
              <p className="text-gray-400 text-sm">"Learned about Windows logs"</p>
            </div>
            <div className="bg-green-900/20 rounded p-3 border border-green-500/30">
              <p className="text-green-400 text-xs font-bold mb-2">✅ صحيح:</p>
              <p className="text-gray-300 text-sm">"Built 8 hands-on SOC projects including SIEM deployment and threat detection"</p>
              <p className="text-gray-300 text-sm">"Analyzed 1000+ Windows Security Events to detect brute force and lateral movement"</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* الكلمات المفتاحية */}
    <section className="space-y-4 mt-8">
      <h2 className="text-2xl font-bold text-white">🔑 الكلمات المفتاحية للـ SOC (ضعها في CV)</h2>
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <div className="flex flex-wrap gap-2">
          {['SOC','SIEM','Incident Response','Threat Detection','Log Analysis','Windows Event Logs','Sysmon','PowerShell','Wireshark','MITRE ATT&CK','Threat Intelligence','Triage','TCP/IP','DNS','Active Directory','Kerberos','Phishing Analysis','IOC','EDR','Splunk','Wazuh','KQL','Python','Bash','Linux','Windows Server','CompTIA Security+','Blue Team','NIST','Network Security','Forensics','Malware Analysis'].map((kw, i) => (
            <span key={i} className="px-3 py-1 bg-cyan-900/30 border border-cyan-500/30 rounded-full text-cyan-400 text-xs">{kw}</span>
          ))}
        </div>
      </div>
    </section>

    {/* ترتيب الأقسام */}
    <section className="space-y-4 mt-8">
      <h2 className="text-2xl font-bold text-white">📋 الترتيب الصحيح لأقسام CV</h2>
      <div className="space-y-2">
        {[
          { num: 1, name: 'Header', desc: 'الاسم ومعلومات التواصل' },
          { num: 2, name: 'Professional Summary', desc: 'ملخص احترافي - 3 سطور' },
          { num: 3, name: 'Technical Skills', desc: 'المهارات التقنية' },
          { num: 4, name: 'Projects & Hands-on Experience', desc: '⭐ المشاريع العملية (بدل Experience)' },
          { num: 5, name: 'Education', desc: 'التعليم' },
          { num: 6, name: 'Certifications', desc: 'الشهادات' },
          { num: 7, name: 'Training & Platforms', desc: 'التدريب والمنصات' },
        ].map((item) => (
          <div key={item.num} className="flex items-center gap-4 bg-gray-800/50 rounded-lg p-3 border border-gray-700">
            <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center text-white font-bold text-sm">{item.num}</div>
            <div>
              <span className="text-white font-bold text-sm">{item.name}</span>
              <span className="text-gray-400 text-sm mr-2"> - {item.desc}</span>
            </div>
          </div>
        ))}
      </div>
      <Alert type="warning">
        <strong>لا تضع Experience في الأعلى</strong> إذا ما عندك خبرة عمل في SOC. ضع <strong>Projects</strong> بدلاً منها!
      </Alert>
    </section>
  </div>
);

// === CV Template Section ===
export const CareerCVTemplateSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>📋</span>قالب CV كامل جاهز</h1>
    <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

    <Alert type="info">انسخ هذا القالب وعدّل عليه بمعلوماتك الشخصية ومشاريعك الفعلية.</Alert>

    <CodeBlock
      title="CV Template - Junior SOC Analyst"
      code={`============================================================
                    AHMED MOHAMMED ALANAZI
============================================================
Riyadh, Saudi Arabia
+966 5XX XXX XXXX
ahmed.alanazi@email.com
linkedin.com/in/ahmed-alanazi-sec
github.com/ahmed-alanazi-sec

============================================================
                   PROFESSIONAL SUMMARY
============================================================
Junior SOC Analyst with hands-on experience in threat
detection, incident investigation, and log analysis across
Windows and Linux environments. Built 8+ security projects
including SIEM deployment, PowerShell attack detection, and
network traffic analysis. Proficient in MITRE ATT&CK mapping,
incident reporting, and security automation using Python
and PowerShell.

============================================================
                    TECHNICAL SKILLS
============================================================
Security Tools:    Wireshark, Sysmon, Wazuh SIEM, Event
                   Viewer, Windows Defender, Nmap

Operating Systems: Windows Server 2022, Windows 11,
                   Ubuntu Server 22.04, Kali Linux

Log Analysis:      Windows Security Events (4624/4625/4688/
                   4720/7045/1102), Sysmon Events,
                   PowerShell Script Block Logging (4104),
                   Linux auth.log, syslog, journalctl

Scripting:         Python (log parsing, IOC extraction),
                   PowerShell (Get-WinEvent, security queries),
                   Bash (log analysis automation)

Frameworks:        MITRE ATT&CK, NIST IR Lifecycle,
                   Cyber Kill Chain, Pyramid of Pain

Networking:        TCP/IP, DNS, TLS/SSL, HTTP/HTTPS, SMB,
                   RDP, Kerberos, ICMP, ARP, DHCP

Concepts:          Triage, Incident Response, Threat Intel,
                   Active Directory, IOC/IOA, Phishing,
                   Detection Engineering

============================================================
           PROJECTS & HANDS-ON EXPERIENCE
============================================================
SOC Blue Team Portfolio
github.com/ahmed-alanazi-sec/soc-portfolio
January 2025 - Present

Wazuh SIEM Deployment & Detection Engineering
- Deployed Wazuh SIEM with 3 agents (Windows Server,
  Windows Client, Ubuntu) in home lab environment
- Created 8 custom detection rules for PowerShell attacks,
  lateral movement, and credential dumping
- Mapped all detections to MITRE ATT&CK techniques
- Reduced false positives by 40% through rule tuning

Windows AD Attack Detection Lab
- Simulated and detected PsExec lateral movement using
  Windows Event 7045 and Sysmon Event 1
- Analyzed 500+ security events to build complete attack
  timeline from initial access to persistence
- Created Sigma detection rules for common attack patterns

Network Traffic Analysis
- Captured and analyzed HTTPS traffic using Wireshark,
  documenting DNS, TCP, and TLS handshake phases
- Detected port scanning patterns and DGA-generated DNS
  queries in lab environment

Linux SSH Brute Force Investigation
- Analyzed auth.log to investigate 500+ failed SSH attempts
- Built Python tool for automated IOC extraction
- Created Bash script for real-time log summarization

Phishing Email Analysis
- Analyzed phishing campaigns including header verification,
  SPF/DKIM/DMARC validation, and URL reputation
- Created standardized phishing investigation playbook

Threat Hunting Exercises
- Conducted proactive hunts for C2 beaconing patterns
- Created KQL and SPL queries for automated hunting

============================================================
                      EDUCATION
============================================================
Bachelor of Science in Cybersecurity
[University Name], Riyadh, Saudi Arabia
Expected Graduation: June 2025

Relevant Coursework: Network Security, OS Security,
Digital Forensics, Cryptography, Risk Management

============================================================
                    CERTIFICATIONS
============================================================
- (ISC)2 Certified in Cybersecurity (CC)         2025
- CompTIA Security+ (In Progress)       Expected 2025

============================================================
                 TRAINING & PLATFORMS
============================================================
- TryHackMe: SOC Level 1 Path (Top X%)
- LetsDefend: SOC Analyst Learning Path
- CyberDefenders: DFIR Challenges
- Home Lab: VMware environment with AD, Sysmon,
  Wazuh SIEM, and multi-OS investigation setup`}
    />

    <section className="space-y-4 mt-8">
      <h2 className="text-2xl font-bold text-white">✏️ تعديل CV حسب الوصف الوظيفي</h2>
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <ol className="text-gray-300 text-sm space-y-3">
          <li><strong className="text-white">1. اقرأ الوصف الوظيفي</strong> - حدد الكلمات المفتاحية والمتطلبات</li>
          <li><strong className="text-white">2. قارن مع CV</strong> - أي متطلبات عندك وأيها لا؟</li>
          <li><strong className="text-white">3. عدّل Summary</strong> - أضف الكلمات المفتاحية من الوصف</li>
          <li><strong className="text-white">4. رتّب المهارات</strong> - ضع المطلوبة في الأعلى</li>
          <li><strong className="text-white">5. رتّب المشاريع</strong> - ضع الأقرب للوظيفة أولاً</li>
        </ol>
      </div>

      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <h3 className="text-cyan-400 font-bold mb-3">مثال: إذا الوظيفة تطلب Splunk + MITRE</h3>
        <CodeBlock code={`# عدّل Summary ليصبح:
Junior SOC Analyst with hands-on experience in Windows log
analysis and incident response. Proficient in MITRE ATT&CK
mapping and SIEM operations including Splunk and Wazuh.
Built 8+ security projects demonstrating threat detection
and investigation capabilities.`} />
      </div>
    </section>
  </div>
);

// === Mistakes Section ===
export const CareerMistakesSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>❌</span>أخطاء شائعة تقتل CV</h1>
    <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

    <div className="grid md:grid-cols-2 gap-4">
      {[
        { title: 'Objective بدل Summary', bad: '"Seeking a position where I can learn..."', good: '"Junior SOC Analyst with hands-on experience in..."', note: 'المُوظِف لا يهتم بما تريد. يهتم بما تستطيع تقديمه.' },
        { title: 'مهارات بدون دليل', bad: 'Skills: Wireshark, Splunk, Python, SIEM (بدون أي إثبات)', good: 'مهارات + مشاريع تثبت استخدامها', note: '' },
        { title: 'معلومات شخصية زائدة', bad: 'تاريخ الميلاد، الجنسية، الحالة الاجتماعية، صورة، رقم الهوية', good: 'فقط: الاسم، الموقع، الهاتف، الإيميل، LinkedIn، GitHub', note: '' },
        { title: 'GPA منخفض', bad: 'ذكر GPA أقل من 3.5', good: 'إذا أعلى من 3.5 اذكره. أقل = لا تذكره', note: '' },
        { title: 'أخطاء إنجليزية', bad: 'خطأ واحد في spelling = رفض فوري في بعض الشركات', good: 'راجع 3 مرات + استخدم Grammarly', note: '' },
        { title: 'ملف Word بدل PDF', bad: 'Word قد يتغير تنسيقه', good: 'دائماً أرسل PDF', note: '' },
        { title: 'اسم الملف سيء', bad: '"CV.pdf" أو "resume-final-final2.pdf"', good: '"Ahmed-Alanazi-SOC-Analyst-Resume.pdf"', note: '' },
      ].map((mistake, i) => (
        <div key={i} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-red-400 font-bold mb-3">❌ خطأ {i+1}: {mistake.title}</h3>
          {mistake.bad && <div className="bg-red-900/20 rounded p-2 mb-2"><p className="text-red-300 text-xs">{mistake.bad}</p></div>}
          {mistake.good && <div className="bg-green-900/20 rounded p-2 mb-2"><p className="text-green-300 text-xs">{mistake.good}</p></div>}
          {mistake.note && <p className="text-gray-400 text-xs mt-2">{mistake.note}</p>}
        </div>
      ))}
    </div>
  </div>
);

// === Cover Letter Section ===
export const CareerCoverLetterSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>✉️</span>Cover Letter</h1>
    <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

    <Alert type="info">
      حتى لو لم يُطلب، Cover Letter قصير يميزك عن الباقين.
    </Alert>

    <CodeBlock
      title="قالب Cover Letter"
      code={`Subject: Application for Junior SOC Analyst - [Company Name]

Dear Hiring Manager,

I am writing to express my interest in the Junior SOC Analyst
position at [Company Name]. As a senior cybersecurity student
at [University], I have built practical skills in threat
detection, incident investigation, and security monitoring
through extensive hands-on projects.

My experience includes:
- Deploying and configuring Wazuh SIEM with custom detection
  rules mapped to MITRE ATT&CK
- Investigating Windows security events including brute force
  attacks, lateral movement, and credential dumping
- Building automated analysis tools using Python and PowerShell
  for log parsing and IOC extraction
- Creating comprehensive incident reports following NIST IR
  Lifecycle methodology

I have documented all my projects on GitHub at:
github.com/[your-username]/soc-portfolio

I am eager to contribute to [Company Name]'s security
operations team and continue developing my skills in a
professional SOC environment.

Thank you for considering my application.

Best regards,
Ahmed Mohammed Alanazi
+966 5XX XXX XXXX
ahmed.alanazi@email.com
linkedin.com/in/ahmed-alanazi-sec`}
    />

    <section className="space-y-4 mt-8">
      <h2 className="text-2xl font-bold text-white">📄 ملخص CV بالعربي (إذا طُلب)</h2>
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <p className="text-gray-300 text-sm leading-relaxed">
          محلل أمن سيبراني مبتدئ متخصص في عمليات المراقبة الأمنية وكشف التهديدات والاستجابة للحوادث. خبرة عملية في تحليل سجلات Windows و Linux واستخدام أنظمة SIEM وأدوات التحقيق الأمني. بنيت أكثر من 8 مشاريع عملية تشمل نشر SIEM وكشف الهجمات وكتابة قواعد الكشف مع ربطها بإطار MITRE ATT&CK.
        </p>
      </div>
      <Alert type="info">
        الشركات الأجنبية والمختلطة: إنجليزي فقط | القطاع الحكومي: عربي وإنجليزي | الشركات السعودية الكبيرة: إنجليزي غالباً
      </Alert>
    </section>
  </div>
);

// === Saudi Market Section ===
export const CareerSaudiSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>🇸🇦</span>نصائح خاصة بالسوق السعودي</h1>
    <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

    <Alert type="golden" title="الفرص كثيرة!">
      رؤية 2030 وتوسع الأمن السيبراني يفتح أبواب كثيرة. الهيئة الوطنية NCA وشركات MSSP تنمو بسرعة.
    </Alert>

    {/* الشركات المستهدفة */}
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">🏢 الشركات المستهدفة</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-green-900/20 rounded-xl p-4 border border-green-500/30">
          <h3 className="text-green-400 font-bold mb-3">🏛️ القطاع الحكومي</h3>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• الهيئة الوطنية للأمن السيبراني NCA</li>
            <li>• SITE (السعودية لتقنية المعلومات)</li>
            <li>• وزارة الداخلية</li>
            <li>• CERT-SA المركز الوطني الإرشادي</li>
          </ul>
        </div>

        <div className="bg-blue-900/20 rounded-xl p-4 border border-blue-500/30">
          <h3 className="text-blue-400 font-bold mb-3">🏦 البنوك والمالية</h3>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• البنك المركزي SAMA</li>
            <li>• الراجحي / الأهلي / بنك الرياض</li>
            <li>• سوق المال (تداول)</li>
          </ul>
        </div>

        <div className="bg-purple-900/20 rounded-xl p-4 border border-purple-500/30">
          <h3 className="text-purple-400 font-bold mb-3">📡 التقنية والاتصالات</h3>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• STC / Solutions by STC</li>
            <li>• Mobily / Zain</li>
            <li>• SCCC</li>
          </ul>
        </div>

        <div className="bg-red-900/20 rounded-xl p-4 border border-red-500/30">
          <h3 className="text-red-400 font-bold mb-3">🛡️ شركات الأمن السيبراني</h3>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• Sirar by STC</li>
            <li>• Elm / DarkMatter / Help AG</li>
            <li>• Integrity Global</li>
          </ul>
        </div>

        <div className="bg-yellow-900/20 rounded-xl p-4 border border-yellow-500/30">
          <h3 className="text-yellow-400 font-bold mb-3">🏭 الشركات الكبرى</h3>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• أرامكو / سابك</li>
            <li>• نيوم</li>
            <li>• مشاريع البحر الأحمر</li>
          </ul>
        </div>

        <div className="bg-cyan-900/20 rounded-xl p-4 border border-cyan-500/30">
          <h3 className="text-cyan-400 font-bold mb-3">🌐 MSSPs</h3>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• IBM Security</li>
            <li>• Deloitte / EY / PwC Cyber</li>
          </ul>
        </div>
      </div>
    </section>

    {/* كلمات مفتاحية */}
    <section className="space-y-4 mt-8">
      <h2 className="text-2xl font-bold text-white">🔑 كلمات مفتاحية إضافية للسوق السعودي</h2>
      <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
        <div className="flex flex-wrap gap-2">
          {['NCA Framework','SAMA Cybersecurity Framework','Saudi Cybersecurity','PDPL','Essential Cybersecurity Controls (ECC)','Risk Management','Compliance','GRC'].map((kw, i) => (
            <span key={i} className="px-3 py-1 bg-green-900/30 border border-green-500/30 rounded-full text-green-400 text-xs">{kw}</span>
          ))}
        </div>
      </div>
    </section>

    {/* مواقع التقديم */}
    <section className="space-y-4 mt-8">
      <h2 className="text-2xl font-bold text-white">🌐 مواقع التقديم في السعودية</h2>
      <div className="grid md:grid-cols-3 gap-3">
        {[
          { name: 'LinkedIn', desc: 'الأهم على الإطلاق', priority: 'high' },
          { name: 'Jadarat (جدارات)', desc: 'منصة التوظيف الوطنية', priority: 'high' },
          { name: 'Tamheer (تمهير)', desc: 'برنامج تدريب على رأس العمل', priority: 'high' },
          { name: 'GulfTalent', desc: 'وظائف الخليج', priority: 'medium' },
          { name: 'Bayt.com', desc: 'وظائف عامة', priority: 'medium' },
          { name: 'Indeed Saudi', desc: 'البحث العام', priority: 'medium' },
          { name: 'Bab Rizq Jameel', desc: 'مبادرة توظيف', priority: 'medium' },
          { name: 'مواقع الشركات مباشرة', desc: 'Careers pages', priority: 'high' },
          { name: 'Naukri Gulf', desc: 'وظائف تقنية', priority: 'low' },
        ].map((site, i) => (
          <div key={i} className={`rounded-lg p-3 border ${
            site.priority === 'high' ? 'bg-green-900/20 border-green-500/30' :
            site.priority === 'medium' ? 'bg-gray-800/50 border-gray-700' :
            'bg-gray-800/30 border-gray-800'
          }`}>
            <p className={`font-bold text-sm ${site.priority === 'high' ? 'text-green-400' : 'text-gray-300'}`}>{site.name}</p>
            <p className="text-gray-400 text-xs">{site.desc}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);

// === Career Checklist Section ===
export const CareerChecklistSection = () => {
  const items = [
    'CV صفحة واحدة بصيغة PDF',
    'Professional Summary قوي',
    'مهارات تقنية مرتبة',
    '6+ مشاريع على GitHub',
    'كل مشروع له README',
    'LinkedIn محدث',
    'Cover Letter جاهز',
    'نسخة عربية جاهزة (اختياري)',
    'قائمة 30+ شركة مستهدفة',
    'حسابات على مواقع التوظيف',
    'اسم ملف CV احترافي',
    'مراجعة إملائية 3 مرات',
    'روابط LinkedIn و GitHub تعمل',
    'الكلمات المفتاحية موجودة في CV',
    'المشاريع فيها أرقام ونتائج',
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>✅</span>Checklist قبل إرسال أول CV</h1>
      <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

      <div className="space-y-2">
        {items.map((item, i) => (
          <ChecklistItem key={i} text={item} id={`career-check-${i}`} />
        ))}
      </div>

      <Alert type="golden" title="الخطوات القادمة">
        <ol className="space-y-2 mt-2 text-sm">
          <li>1. ✅ CV (هذا الدرس) ← أنت هنا!</li>
          <li>2. 🔜 LinkedIn (الدرس القادم)</li>
          <li>3. 🔜 خطة التقديم على الوظائف</li>
          <li>4. 🔜 أسئلة المقابلات 200+ سؤال</li>
          <li>5. 🔜 اليوم الأول في الوظيفة</li>
        </ol>
      </Alert>

      <div className="bg-green-900/20 rounded-xl p-8 border border-green-500/30 text-center">
        <h2 className="text-2xl font-bold text-green-400 mb-4">🎯 أنت قاب قوسين أو أدنى من التوظيف!</h2>
        <p className="text-xl text-white">استمر! 💪</p>
      </div>
    </div>
  );
};
