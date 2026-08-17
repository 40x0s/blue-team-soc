import Alert from '../../components/Alert';
import CodeBlock from '../../components/CodeBlock';
import ChecklistItem from '../../components/ChecklistItem';

// === LinkedIn Main Section ===
export const CareerLinkedInSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>🔗</span>LinkedIn Optimization لـ SOC Analyst</h1>
    <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

    <Alert type="golden" title="لماذا LinkedIn مهم جداً لك؟">
      <p className="text-xl font-bold">70% من وظائف SOC في السعودية تُملأ عبر LinkedIn.</p>
      <p className="mt-2">ليس عن طريق إعلانات الوظائف، بل عن طريق: Recruiters يبحثون عنك، HR يفحصون قبل المقابلة، Networking مع أشخاص داخل الشركات، Referrals من موظفين حاليين.</p>
    </Alert>

    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
      <blockquote className="text-xl text-cyan-400 font-bold border-r-4 border-cyan-500 pr-4">
        CV يفتح لك باب التقديم، LinkedIn يفتح لك باب الفرص.
      </blockquote>
    </div>

    {/* الصورة الشخصية */}
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">📸 الصورة الشخصية Profile Photo</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-green-900/20 rounded-xl p-6 border border-green-500/30">
          <h3 className="text-green-400 font-bold mb-3">✅ الصورة الصحيحة</h3>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• خلفية بسيطة (أبيض، رمادي)</li>
            <li>• وجه واضح يأخذ 60% من الإطار</li>
            <li>• نظرة مباشرة للكاميرا</li>
            <li>• ابتسامة خفيفة احترافية</li>
            <li>• لباس رسمي</li>
            <li>• إضاءة جيدة طبيعية</li>
            <li>• جودة عالية HD</li>
          </ul>
        </div>
        <div className="bg-red-900/20 rounded-xl p-6 border border-red-500/30">
          <h3 className="text-red-400 font-bold mb-3">❌ أخطاء قاتلة</h3>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• صورة سيلفي</li>
            <li>• صورة من مناسبة عائلية</li>
            <li>• صورة مع أصدقاء</li>
            <li>• نظارة شمسية</li>
            <li>• خلفية شاطئ أو سيارة</li>
            <li>• جودة منخفضة</li>
            <li>• صورة قديمة لا تشبهك</li>
          </ul>
        </div>
      </div>
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <h3 className="text-cyan-400 font-bold mb-3">📱 كيف تأخذ صورة احترافية مجاناً</h3>
        <ol className="text-gray-300 text-sm space-y-1">
          <li>1. خلفية بيضاء (جدار أبيض)</li>
          <li>2. كاميرا جوال حديث</li>
          <li>3. إضاءة من النافذة</li>
          <li>4. 10 لقطات مختلفة → اختر أفضل واحدة</li>
          <li>5. استخدم <strong>Remove.bg</strong> لإزالة الخلفية إذا احتجت</li>
        </ol>
      </div>
    </section>

    {/* Banner */}
    <section className="space-y-4 mt-8">
      <h2 className="text-2xl font-bold text-white">🖼️ Banner / Cover Image</h2>
      <Alert type="info">كثير يتجاهلونه. هذا خطأ! Banner احترافي يقول للموظف خلال ثانية: "هذا شخص أمن سيبراني محترف".</Alert>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <h4 className="text-cyan-400 font-bold mb-2">خيار 1: تصميم Canva</h4>
          <p className="text-gray-400 text-sm">قالب بسيط بألوان داكنة + نص "SOC Analyst | Blue Team | Threat Detection"</p>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <h4 className="text-cyan-400 font-bold mb-2">خيار 2: صورة أمنية</h4>
          <p className="text-gray-400 text-sm">من Unsplash ابحث "cybersecurity" أو "network"</p>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <h4 className="text-cyan-400 font-bold mb-2">خيار 3: لون + شعار</h4>
          <p className="text-gray-400 text-sm">خلفية بلون واحد + أيقونة قفل أو شعار بسيط</p>
        </div>
      </div>
    </section>

    {/* Headline */}
    <section className="space-y-4 mt-8">
      <h2 className="text-2xl font-bold text-white">✍️ الـ Headline (الأهم!)</h2>
      <Alert type="warning">السطر تحت اسمك مباشرة. يظهر في نتائج البحث والتعليقات والإشعارات. <strong>220 حرف كحد أقصى.</strong></Alert>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-red-900/20 rounded-xl p-4 border border-red-500/30">
          <h4 className="text-red-400 font-bold mb-2">❌ ضعيف</h4>
          <p className="text-gray-400 text-sm font-mono" dir="ltr">Cybersecurity Student at King Saud University</p>
        </div>
        <div className="bg-green-900/20 rounded-xl p-4 border border-green-500/30">
          <h4 className="text-green-400 font-bold mb-2">✅ قوي</h4>
          <p className="text-gray-300 text-sm font-mono" dir="ltr">Aspiring SOC Analyst | Blue Team | Threat Detection | SIEM | MITRE ATT&CK | Cybersecurity Senior Student</p>
        </div>
      </div>

      <div className="bg-cyan-900/20 rounded-xl p-6 border border-cyan-500/30">
        <h3 className="text-cyan-400 font-bold mb-3">🎯 الـ Headline المقترح لك</h3>
        <p className="text-white font-mono text-sm" dir="ltr">Aspiring Junior SOC Analyst | Blue Team | SIEM | Threat Detection | MITRE ATT&CK | Building Hands-on Security Projects</p>
      </div>
    </section>

    {/* About */}
    <section className="space-y-4 mt-8">
      <h2 className="text-2xl font-bold text-white">📝 قسم About</h2>
      <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
        <p className="text-gray-400 text-sm mb-2">القواعد: ضمير المتكلم (I am) | 3-5 فقرات قصيرة | ابدأ بشيء يجذب | انتهي بـ Call to Action</p>
      </div>

      <CodeBlock
        title="قالب About جاهز لك"
        code={`🛡️ Aspiring SOC Analyst passionate about defensive cybersecurity and threat detection.

As a senior cybersecurity student, I've built strong foundations in security operations through extensive hands-on practice in my home lab environment, combining theoretical knowledge with real-world application.

🎯 What I do:
▸ Build and analyze security detections using Wazuh SIEM, Sysmon, and Windows Event Logs
▸ Investigate simulated attacks including brute force, lateral movement, credential dumping, and persistence
▸ Create detection rules mapped to MITRE ATT&CK framework
▸ Develop automation tools using Python and PowerShell for log analysis and IOC extraction
▸ Document complete incident investigations following NIST IR Lifecycle methodology

💼 Technical Skills:
• SIEM: Wazuh, Splunk basics
• Endpoint: Sysmon, Windows Event Viewer, PowerShell
• Network: Wireshark, TCP/IP analysis, DNS/TLS deep dive
• Scripting: Python, PowerShell, Bash
• Frameworks: MITRE ATT&CK, NIST, Cyber Kill Chain
• OS: Windows Server, Windows 11, Ubuntu, Kali Linux

🚀 Featured Projects (on GitHub):
▸ Wazuh SIEM Deployment with custom detection rules
▸ Windows AD Lateral Movement Detection Lab
▸ Linux SSH Brute Force Investigation with Python automation
▸ Network Traffic Analysis (DNS, TCP, TLS)
▸ Phishing Email Investigation playbook

🤝 Open to:
▸ Junior SOC Analyst positions
▸ Cybersecurity internships
▸ Networking with security professionals

📫 Let's connect!
GitHub: github.com/[your-username]
Email: your.email@example.com`}
      />
    </section>

    {/* Featured */}
    <section className="space-y-4 mt-8">
      <h2 className="text-2xl font-bold text-white">⭐ Featured Section</h2>
      <p className="text-gray-400 text-sm">قسم يظهر بعد About ويعرض روابط مهمة بشكل مرئي.</p>
      <div className="grid md:grid-cols-2 gap-4">
        {[
          { num: 1, title: 'GitHub Portfolio Repository', desc: 'SOC Blue Team Portfolio - 8+ hands-on security projects' },
          { num: 2, title: 'أفضل مشروع لك', desc: 'مثلاً Wazuh Deployment Project مع screenshot' },
          { num: 3, title: 'TryHackMe Profile', desc: 'إذا عندك إنجازات ومستوى جيد' },
          { num: 4, title: 'مقال LinkedIn كتبته', desc: 'أي post حصل على تفاعل جيد' },
        ].map(item => (
          <div key={item.num} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center text-white font-bold text-sm">{item.num}</div>
              <div>
                <p className="text-white font-bold text-sm">{item.title}</p>
                <p className="text-gray-400 text-xs">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Experience */}
    <section className="space-y-4 mt-8">
      <h2 className="text-2xl font-bold text-white">💼 Experience Section</h2>
      <Alert type="golden" title="إذا ما عندك خبرة عمل">
        أضف "Self-Directed Projects" كـ Experience. يظهر أنك تتعلم ذاتياً ويحتوي كلمات ATS ويربط بـ GitHub!
      </Alert>

      <CodeBlock
        title="نموذج Experience بدون خبرة عمل"
        code={`Title: SOC Analyst Projects (Self-Directed)
Company: Personal Home Lab
Duration: January 2025 - Present
Location: Riyadh, Saudi Arabia

Conducting hands-on cybersecurity projects in a personal home lab environment to develop practical SOC analyst skills.

Key Activities:
▸ Deployed Wazuh SIEM with 3 endpoints and created 8 custom detection rules
▸ Investigated simulated attacks including PowerShell attacks, lateral movement via PsExec, and credential dumping
▸ Built automation tools in Python and PowerShell for log parsing and IOC extraction
▸ Analyzed network traffic captures (PCAPs) to detect port scanning, DGA patterns, and beaconing
▸ Created comprehensive incident reports mapped to MITRE ATT&CK following NIST IR Lifecycle
▸ Documented all projects with detailed write-ups on GitHub

Tools: Wazuh, Sysmon, Wireshark, PowerShell, Python, Windows Event Logs, MITRE ATT&CK
GitHub: github.com/[your-username]/soc-portfolio`}
      />

      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <h3 className="text-cyan-400 font-bold mb-3">إذا عندك خبرة سابقة (حتى لو مش أمن)</h3>
        <p className="text-gray-400 text-sm mb-3">اربطها بمهارات قابلة للنقل:</p>
        <CodeBlock code={`Title: Technical Support
Company: [Company Name]
Duration: 2023 - 2024

▸ Resolved 100+ technical issues weekly, developing troubleshooting skills applicable to SOC analysis
▸ Documented technical procedures and incidents, similar to incident reporting in SOC
▸ Communicated with stakeholders at various levels, essential for SOC escalation`} />
      </div>
    </section>

    {/* Skills */}
    <section className="space-y-4 mt-8">
      <h2 className="text-2xl font-bold text-white">🛠️ Skills Section (30+ مهارة)</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
          <h4 className="text-red-400 font-bold mb-2">🔴 الأساسية (أعلى الترتيب)</h4>
          <div className="flex flex-wrap gap-1">{['SOC','Incident Response','Threat Detection','SIEM','Log Analysis','MITRE ATT&CK','Windows Security','Network Security','Cybersecurity','Blue Team'].map((s,i) => <span key={i} className="px-2 py-1 bg-red-900/30 rounded text-red-400 text-xs">{s}</span>)}</div>
        </div>
        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
          <h4 className="text-blue-400 font-bold mb-2">🔵 الأدوات</h4>
          <div className="flex flex-wrap gap-1">{['Wazuh','Wireshark','Sysmon','Splunk','PowerShell','Python','Bash','Windows Event Viewer'].map((s,i) => <span key={i} className="px-2 py-1 bg-blue-900/30 rounded text-blue-400 text-xs">{s}</span>)}</div>
        </div>
        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
          <h4 className="text-green-400 font-bold mb-2">🟢 المفاهيم التقنية</h4>
          <div className="flex flex-wrap gap-1">{['TCP/IP','DNS','TLS/SSL','Active Directory','Kerberos','Firewalls','IDS','Vulnerability Management','Phishing Analysis','Threat Intelligence'].map((s,i) => <span key={i} className="px-2 py-1 bg-green-900/30 rounded text-green-400 text-xs">{s}</span>)}</div>
        </div>
        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
          <h4 className="text-purple-400 font-bold mb-2">🟣 Soft Skills</h4>
          <div className="flex flex-wrap gap-1">{['Problem Solving','Technical Writing','Attention to Detail','Communication','Teamwork'].map((s,i) => <span key={i} className="px-2 py-1 bg-purple-900/30 rounded text-purple-400 text-xs">{s}</span>)}</div>
        </div>
      </div>
    </section>
  </div>
);

// === LinkedIn Content Strategy ===
export const CareerLinkedInContentSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>📱</span>استراتيجية المحتوى على LinkedIn</h1>
    <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

    <Alert type="golden" title="القاعدة الذهبية">
      LinkedIn algorithm يحب الحسابات النشطة. حساب نشط = يظهر أكثر = فرص أكثر.
    </Alert>

    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 mb-8">
      <h3 className="text-white font-bold mb-3">📅 جدول النشر الموصى به</h3>
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="bg-cyan-900/20 rounded p-3"><p className="text-cyan-400 font-bold">الأحد</p><p className="text-gray-400 text-xs">شرح مفهوم</p></div>
        <div className="bg-green-900/20 rounded p-3"><p className="text-green-400 font-bold">الثلاثاء</p><p className="text-gray-400 text-xs">تحديث مشروع أو درس</p></div>
        <div className="bg-purple-900/20 rounded p-3"><p className="text-purple-400 font-bold">الخميس</p><p className="text-gray-400 text-xs">تفاعل مع خبر أمني</p></div>
      </div>
      <p className="text-gray-400 text-xs text-center mt-3">3 منشورات أسبوعياً = نشاط ممتاز</p>
    </div>

    {/* أنواع المنشورات */}
    <div className="space-y-6">
      {/* نوع 1 */}
      <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
        <div className="p-4 bg-cyan-900/20 border-b border-gray-700">
          <h3 className="text-cyan-400 font-bold">📝 Post نوع 1: شرح مفهوم أمني</h3>
        </div>
        <div className="p-4">
          <CodeBlock code={`🛡️ ما هو الـ Lateral Movement؟

في عالم الأمن السيبراني، Lateral Movement هو خطوة حرجة يقوم بها المهاجم بعد اختراق جهاز واحد.

📍 ماذا يفعل المهاجم؟
بعد اختراق جهاز في قسم المالية، يحاول الانتقال لأجهزة أخرى للوصول لسيرفر قاعدة البيانات.

🔍 كيف نكتشفه؟ (من تجربتي في اللاب)
▸ Windows Event 4624 بـ Logon Type 3 من جهاز داخلي لآخر
▸ Windows Event 7045 لخدمة جديدة باسم PSEXESVC
▸ Sysmon Event 1 لـ psexec.exe أو wmic.exe
▸ Sysmon Event 3 لاتصالات SMB غير معتادة (port 445)

📊 MITRE ATT&CK:
- Tactic: Lateral Movement (TA0008)
- Technique: T1021.002 - SMB/Windows Admin Shares

💡 Detection Tip:
محطات العمل لا يجب أن تتصل ببعضها عبر SMB.

#cybersecurity #blueteam #SOC #SIEM #MITREATTACK`} />
        </div>
      </div>

      {/* نوع 2 */}
      <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
        <div className="p-4 bg-green-900/20 border-b border-gray-700">
          <h3 className="text-green-400 font-bold">🚀 Post نوع 2: مشاركة مشروع</h3>
        </div>
        <div className="p-4">
          <CodeBlock code={`🚀 أكملت مشروعي الجديد: Wazuh SIEM Deployment

📋 ما أنجزته:
✅ نشر Wazuh server على Ubuntu 22.04
✅ ربط 3 agents (DC, Windows Client, Ubuntu)
✅ كتابة 8 قواعد كشف custom
✅ ربط القواعد بـ MITRE ATT&CK
✅ اختبار شامل بسيناريوهات حقيقية

💡 أهم درس تعلمته:
الـ false positives تتطلب tuning مستمر. القاعدة الأولى كانت تنتج 50 تنبيه يومياً، وبعد التحسين أصبحت 2-3 فقط.

📁 المشروع كامل على GitHub: [رابط]

#cybersecurity #wazuh #SIEM #detectionengineering #SOC`} />
        </div>
      </div>

      {/* نوع 3 */}
      <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
        <div className="p-4 bg-yellow-900/20 border-b border-gray-700">
          <h3 className="text-yellow-400 font-bold">📚 Post نوع 3: مشاركة تعلم</h3>
        </div>
        <div className="p-4">
          <CodeBlock code={`📚 درس مهم تعلمته اليوم:

اكتشفت أهمية حقل ParentProcessName في Event 4688.

🎯 الفرق:
❌ مشبوه: powershell.exe ← Parent: winword.exe
   (Word يفتح PowerShell؟ هذا macro malware!)

✅ طبيعي: powershell.exe ← Parent: ConfigMgr.exe
   (SCCM agent ينفذ سكريبت إدارة عادي)

💡 الدرس:
لا تنظر للأمر فقط، انظر دائماً للـ parent process.

"Office app spawning PowerShell = 🚨 always investigate"

#SOCanalyst #cybersecurity #blueteam #incidentresponse`} />
        </div>
      </div>

      {/* نوع 4 */}
      <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
        <div className="p-4 bg-red-900/20 border-b border-gray-700">
          <h3 className="text-red-400 font-bold">🔥 Post نوع 4: التفاعل مع أخبار أمنية</h3>
        </div>
        <div className="p-4">
          <CodeBlock code={`🔥 تحليل: ثغرة CVE-2025-XXXXX الجديدة

📊 التفاصيل:
- CVSS Score: 9.8 (Critical)
- النوع: Authentication Bypass
- التأثير: تنفيذ كود عن بعد

🎯 ما يجب أن يفعله SOC Analysts:
1. تحديد الأجهزة المتأثرة
2. تطبيق patch فوراً
3. مراقبة logs للعلامات
4. تحديث detection rules

ما رأيكم؟ كيف تتعاملون مع zero-days في فرقكم؟

#cybersecurity #vulnerability #SOC #blueteam`} />
        </div>
      </div>
    </div>
  </div>
);

// === Networking & Strategy ===
export const CareerLinkedInNetworkSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>🤝</span>Networking واستراتيجية البحث</h1>
    <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

    {/* من تضيف */}
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">👥 من تضيف؟ (حسب الأولوية)</h2>
      <div className="space-y-3">
        {[
          { priority: 1, title: 'Recruiters متخصصون في Cybersecurity', search: '"Cybersecurity Recruiter" Saudi Arabia' },
          { priority: 2, title: 'SOC Managers و Team Leads', search: '"SOC Manager" Saudi Arabia' },
          { priority: 3, title: 'Senior SOC Analysts في الشركات المستهدفة', search: '"SOC Analyst" Aramco' },
          { priority: 4, title: 'محتوى الأمن السيبراني العربي', search: 'أشهر مؤلفين عرب في الأمن' },
          { priority: 5, title: 'زملاء الدراسة والخريجين', search: 'من جامعتك والجامعات السعودية' },
        ].map(item => (
          <div key={item.priority} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-cyan-600 flex items-center justify-center text-white font-bold">{item.priority}</div>
            <div>
              <p className="text-white font-bold text-sm">{item.title}</p>
              <p className="text-gray-400 text-xs font-mono" dir="ltr">{item.search}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* قوالب الرسائل */}
    <section className="space-y-4 mt-8">
      <h2 className="text-2xl font-bold text-white">💌 قوالب Connection Request</h2>
      <Alert type="warning">أرسل <strong>دائماً</strong> مع رسالة مخصصة. الرسالة الفارغة = 90% رفض!</Alert>

      <div className="space-y-4">
        <CodeBlock title="للـ Recruiters" code={`Hi [Name],

I came across your profile and noticed you specialize in cybersecurity recruitment in Saudi Arabia. I'm a final-year cybersecurity student building hands-on SOC skills through home lab projects, currently exploring opportunities in the field.

I'd love to connect and learn from your network.

Best regards, Ahmed`} />

        <CodeBlock title="للـ SOC Managers" code={`Hi [Name],

Your work in cybersecurity at [Company] is inspiring. As an aspiring SOC analyst, I follow professionals like you to learn industry best practices.

I'd appreciate connecting to learn from your insights and journey in the field.

Best regards, Ahmed`} />

        <CodeBlock title="رسالة بعد التقديم على وظيفة" code={`Hi [Name],

I recently applied for the Junior SOC Analyst position at [Company] and noticed you're part of the team. I'd love to learn more about the team culture and the role.

I've built several hands-on SOC projects in my home lab, and I'm passionate about contributing to [Company]'s security operations.

Would you have 15 minutes for a brief chat?

Best regards, Ahmed
[Your LinkedIn URL]`} />
      </div>
    </section>

    {/* البحث عن وظائف */}
    <section className="space-y-4 mt-8">
      <h2 className="text-2xl font-bold text-white">🔍 البحث عن وظائف عبر LinkedIn</h2>

      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <h3 className="text-cyan-400 font-bold mb-3">⚙️ إعدادات Open to Work</h3>
        <ol className="text-gray-300 text-sm space-y-2">
          <li>1. اذهب لـ Profile → "Open to" → "Finding a new job"</li>
          <li>2. Job titles: <span className="text-cyan-400">SOC Analyst, Security Analyst, Cybersecurity Analyst, Junior SOC, Blue Team Analyst</span></li>
          <li>3. Locations: <span className="text-cyan-400">Riyadh, Jeddah, Dammam, Saudi Arabia, Remote</span></li>
          <li>4. Start date: <span className="text-cyan-400">Immediately</span></li>
          <li>5. Job types: <span className="text-cyan-400">Full-time, Internship</span></li>
          <li>6. Visibility: <span className="text-green-400">All LinkedIn members</span> (لأنك طالب)</li>
        </ol>
      </div>

      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <h3 className="text-cyan-400 font-bold mb-3">🔎 كيف تبحث</h3>
        <div className="grid md:grid-cols-3 gap-3">
          <div className="bg-gray-700/30 rounded p-3">
            <p className="text-white font-bold text-xs mb-1">Search Bar</p>
            <p className="text-gray-400 text-xs font-mono" dir="ltr">"SOC Analyst" Saudi Arabia</p>
          </div>
          <div className="bg-gray-700/30 rounded p-3">
            <p className="text-white font-bold text-xs mb-1">Filters</p>
            <p className="text-gray-400 text-xs">Past Week + Entry level + Internship</p>
          </div>
          <div className="bg-gray-700/30 rounded p-3">
            <p className="text-white font-bold text-xs mb-1">Job Alerts</p>
            <p className="text-gray-400 text-xs">Set alert لكل بحث</p>
          </div>
        </div>
      </div>
    </section>

    {/* Recommendations */}
    <section className="space-y-4 mt-8">
      <h2 className="text-2xl font-bold text-white">⭐ Recommendations</h2>
      <p className="text-gray-400 text-sm">شهادات مكتوبة من أشخاص يعرفونك. أقوى من Endorsements بكثير.</p>

      <div className="grid md:grid-cols-3 gap-3">
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <p className="text-cyan-400 font-bold text-sm">أولوية 1</p>
          <p className="text-gray-300 text-sm">أساتذة جامعة</p>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <p className="text-cyan-400 font-bold text-sm">أولوية 2</p>
          <p className="text-gray-300 text-sm">مدير تدريب أو وظيفة سابقة</p>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <p className="text-cyan-400 font-bold text-sm">أولوية 3</p>
          <p className="text-gray-300 text-sm">زملاء مشاريع جامعية</p>
        </div>
      </div>
    </section>
  </div>
);

// === LinkedIn Checklist ===
export const CareerLinkedInChecklistSection = () => {
  const sections = [
    { title: 'Profile Basics', items: ['صورة شخصية احترافية','Banner مخصص','Headline قوي بكلمات مفتاحية','Custom URL (linkedin.com/in/your-name)','الموقع محدد بدقة'] },
    { title: 'About Section', items: ['فقرات منظمة','كلمات مفتاحية موجودة','Call to action في النهاية','روابط GitHub و Email'] },
    { title: 'Featured', items: ['رابط GitHub Portfolio','أفضل مشروع','أي إنجاز مرئي'] },
    { title: 'Experience', items: ['Self-Directed Projects مضافة','أي خبرة سابقة (حتى لو غير أمنية)','أي تدريب صيفي'] },
    { title: 'Education & Skills', items: ['الجامعة موجودة','المواد ذات الصلة مذكورة','30+ مهارة مرتبة','طلبت Endorsements','كل الشهادات مضافة','Languages (العربية والإنجليزية)'] },
    { title: 'Open to Work & Activity', items: ['Open to Work مفعّل','الوظائف والمواقع محددة','أول منشور منشور','تعليقات على منشورات الآخرين','متابعة 50+ شركة'] },
    { title: 'Networking', items: ['100+ Connection ذات صلة','رسائل مخصصة مرسلة','انضمام لـ 10+ مجموعات','طلبت Recommendations من 3+ أشخاص'] },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>✅</span>Checklist LinkedIn النهائية</h1>
      <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

      {sections.map((section, sIdx) => (
        <div key={sIdx} className="space-y-2">
          <h2 className="text-xl font-bold text-white">{section.title}</h2>
          {section.items.map((item, iIdx) => (
            <ChecklistItem key={iIdx} text={item} id={`linkedin-${sIdx}-${iIdx}`} />
          ))}
        </div>
      ))}

      {/* المهمة العملية */}
      <div className="bg-gradient-to-l from-cyan-900/30 to-transparent rounded-xl p-6 border border-cyan-500/30">
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">📅 المهمة العملية - 7 أيام</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { day: 'اليوم 1', tasks: 'صورة احترافية + Banner + Headline' },
            { day: 'اليوم 2', tasks: 'About كامل + Skills + Languages' },
            { day: 'اليوم 3', tasks: 'Experience + Education + Certifications' },
            { day: 'اليوم 4', tasks: 'Open to Work + 30 شخص للتواصل + 10 requests' },
            { day: 'اليوم 5', tasks: 'أول منشور + 10 تعليقات + 5 مجموعات' },
            { day: 'اليوم 6', tasks: 'Recommendation + تابع 30 شركة + ابدأ بحث' },
            { day: 'اليوم 7', tasks: 'مراجعة + قدّم على 5 وظائف + تواصل مع موظفين' },
          ].map(item => (
            <div key={item.day} className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
              <p className="text-cyan-400 font-bold text-sm">{item.day}</p>
              <p className="text-gray-300 text-xs">{item.tasks}</p>
            </div>
          ))}
        </div>
      </div>

      <Alert type="golden">
        <p className="text-xl font-bold">أنت الآن في مرحلة التنفيذ!</p>
        <p className="mt-2">كل دقيقة تقرأ فيها بدون عمل = دقيقة ضائعة. افتح LinkedIn الآن. ابدأ بتحديث Headline. لا تنتظر.</p>
        <p className="mt-4 text-2xl">نراك في القمة قريباً 🚀</p>
      </Alert>
    </div>
  );
};
