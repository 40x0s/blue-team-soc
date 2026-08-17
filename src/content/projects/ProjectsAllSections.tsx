import Alert from '../../components/Alert';
import CodeBlock from '../../components/CodeBlock';
import ChecklistItem from '../../components/ChecklistItem';

// === What Employer Looks For ===
export const ProjectsEmployerSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>👔</span>ما الذي يبحث عنه المُوظِف؟</h1>
    <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

    <Alert type="golden" title="ما يفحصه المُوظِف في GitHub خلال 60 ثانية">
      <p>6 أشياء فقط يتحقق منها قبل أن يقرر يكمل أو يقفل</p>
    </Alert>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[
        { num: 1, title: 'README الرئيسي', items: ['عرض واضح لمن أنت', 'قائمة مشاريع منظمة', 'روابط LinkedIn و Email', 'Badges تقنية'] },
        { num: 2, title: 'عدد المشاريع', items: ['أقل من 3: غير جدي', '3-5: مقبول', '6-10: قوي ⭐', 'أكثر من 10: ممتاز'] },
        { num: 3, title: 'جودة أول مشروع', items: ['يفتح أول مشروع', 'إذا README سيء = يقفل', 'الانطباع الأول هو كل شيء'] },
        { num: 4, title: 'التنوع', items: ['شبكات + Windows + Linux', 'SIEM + Threat Intel', 'Detection + IR', 'Scripts + Reports'] },
        { num: 5, title: 'التحديثات الأخيرة', items: ['آخر commit متى؟', 'مشروع كل شهر = ممتاز', 'آخر commit قبل سنة = ❌'] },
        { num: 6, title: 'التوثيق', items: ['Screenshots واضحة', 'شرح تفصيلي', 'نتائج واضحة', 'خطوات قابلة للتطبيق'] },
      ].map((item) => (
        <div key={item.num} className="bg-gray-800/50 rounded-xl p-5 border border-gray-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center text-white font-bold text-sm">{item.num}</div>
            <h3 className="text-white font-bold">{item.title}</h3>
          </div>
          <ul className="text-gray-300 text-sm space-y-1">{item.items.map((i, j) => <li key={j}>• {i}</li>)}</ul>
        </div>
      ))}
    </div>

    <div className="bg-red-900/20 rounded-xl p-6 border border-red-500/30">
      <h3 className="text-red-400 font-bold mb-4">❌ ما يكره أن يراه المُوظِف</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <ul className="text-gray-300 text-sm space-y-2">
          <li>❌ README فارغ أو "Hello World"</li>
          <li>❌ مشاريع منسوخة بدون فهم</li>
          <li>❌ ملفات بدون تنظيم</li>
          <li>❌ Code بدون شرح</li>
        </ul>
        <ul className="text-gray-300 text-sm space-y-2">
          <li>❌ Screenshots مفقودة أو ضبابية</li>
          <li>❌ Git history فقط commit واحد "initial"</li>
          <li>❌ مشاريع كلها متشابهة</li>
          <li>❌ خطوات غير قابلة للتنفيذ</li>
        </ul>
      </div>
    </div>
  </div>
);

// === GitHub Profile Section ===
export const ProjectsGitHubSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>🐙</span>GitHub Profile احترافي</h1>
    <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">الخطوة 1: إعداد Profile</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-green-900/20 rounded-xl p-6 border border-green-500/30">
          <h3 className="text-green-400 font-bold mb-3">✅ اسم احترافي</h3>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>✅ ahmedalanazi-sec</li>
            <li>✅ amohammed-soc</li>
          </ul>
        </div>
        <div className="bg-red-900/20 rounded-xl p-6 border border-red-500/30">
          <h3 className="text-red-400 font-bold mb-3">❌ أسماء سيئة</h3>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>❌ xx_killer_xx</li>
            <li>❌ gamer123</li>
          </ul>
        </div>
      </div>

      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <h3 className="text-cyan-400 font-bold mb-3">Bio مقترح</h3>
        <CodeBlock code={`Junior SOC Analyst | Blue Team | Detection Engineering
Building hands-on security projects | Saudi Arabia`} />
      </div>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">الخطوة 2: Profile README</h2>
      <Alert type="info">
        أنشئ repository بنفس اسم حسابك (مثل: <code className="bg-gray-700 px-1 rounded">username/username</code>) وضع فيها README.md
      </Alert>

      <CodeBlock
        title="نموذج Profile README احترافي"
        code={`# 👋 Hi, I'm Ahmed

## 🛡️ Junior SOC Analyst | Blue Team Enthusiast

Passionate about defensive security, threat detection, and incident response.
Building hands-on projects to bridge the gap between theory and practice.

### 🎯 Focus Areas
- Security Operations Center (SOC) Operations
- Threat Detection & Hunting
- Incident Response
- Log Analysis (Windows, Linux, Network)
- SIEM (Wazuh, Splunk)

### 🛠️ Technical Skills
![Windows](https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white)
![Linux](https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black)
![Wireshark](https://img.shields.io/badge/Wireshark-1679A7?style=for-the-badge&logo=wireshark&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![PowerShell](https://img.shields.io/badge/PowerShell-5391FE?style=for-the-badge&logo=powershell&logoColor=white)

### 📚 Featured Projects
🔍 **[PCAP Investigation](link)** - HTTPS Traffic Analysis
🐧 **[Linux SSH Brute Force](link)** - Full Investigation + Python
🪟 **[Windows AD Attack Detection](link)** - Lateral Movement
🚨 **[Wazuh SIEM Deployment](link)** - Custom Detection Rules

### 📫 Connect
- LinkedIn: [Your Profile](link)
- Email: your.email@example.com

### 🏆 Certifications
- CompTIA Security+ (In Progress)
- TryHackMe SOC Level 1 Path`}
      />
    </section>
  </div>
);

// === Repository Structure Section ===
export const ProjectsStructureSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>📁</span>هيكل Repository الاحترافي</h1>
    <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

    <CodeBlock
      title="الهيكل الموسع الموصى به"
      code={`soc-blue-team-portfolio/
│
├── README.md                    ← الصفحة الرئيسية
├── LICENSE
├── .gitignore
│
├── 01-network-analysis/
│   ├── README.md
│   ├── pcaps/
│   ├── reports/
│   └── screenshots/
│
├── 02-linux-investigations/
│   ├── README.md
│   ├── logs/
│   ├── scripts/          ← auth-summary.sh, extract-iocs.py
│   ├── reports/
│   └── screenshots/
│
├── 03-windows-investigations/
│   ├── README.md
│   ├── powershell/       ← get-failed-logons.ps1
│   ├── sysmon/           ← sysmon-config.xml
│   ├── reports/
│   └── screenshots/
│
├── 04-soc-analyst-work/
│   ├── playbooks/        ← phishing-triage.md, bruteforce.md
│   ├── incident-reports/ ← INC-001-phishing.md
│   ├── mitre-mapping/
│   └── triage-exercises/
│
├── 05-siem-detection/
│   ├── wazuh/            ← deployment + custom-rules.xml
│   ├── sigma-rules/      ← powershell-encoded.yml
│   └── splunk-queries/
│
├── 06-threat-hunting/
│   ├── hunt-reports/     ← HUNT-001-dns-tunneling.md
│   └── hypotheses/
│
├── 07-threat-intelligence/
│   ├── ioc-reports/
│   └── threat-actor-profiles/
│
├── 08-phishing-analysis/
│   ├── analyses/         ← PHISH-001.md
│   ├── headers/
│   └── screenshots/
│
├── 09-malware-analysis-basics/
│
├── 10-lab-setup/
│   ├── network-diagram.png
│   └── vm-configurations.md
│
├── templates/             ← قوالب جاهزة
├── cheatsheets/           ← مراجع سريعة
└── learning-notes/        ← ملاحظات الدراسة`}
    />

    <Alert type="golden" title="نصيحة مهمة">
      كل مجلد يجب أن يحتوي على <strong>README.md</strong> خاص يشرح محتوياته.
    </Alert>
  </div>
);

// === README Writing Section ===
export const ProjectsReadmeSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>📝</span>كتابة README احترافي</h1>
    <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

    <Alert type="info">
      README هو أول شيء يراه المُوظِف. اكتبه كأنك تقدم نفسك في مقابلة!
    </Alert>

    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
      <h3 className="text-cyan-400 font-bold mb-4">📋 عناصر README المثالي للـ Portfolio</h3>
      <ol className="text-gray-300 text-sm space-y-3">
        <li><strong className="text-white">1. العنوان + وصف مختصر</strong> - سطر واحد يلخص المشروع</li>
        <li><strong className="text-white">2. About Me</strong> - من أنت وماذا تعرف</li>
        <li><strong className="text-white">3. Lab Environment</strong> - بيئة العمل (DC01, WIN-CLIENT, KALI, WAZUH)</li>
        <li><strong className="text-white">4. Project Categories</strong> - المشاريع مصنفة بروابط</li>
        <li><strong className="text-white">5. Skills Matrix</strong> - جدول المهارات</li>
        <li><strong className="text-white">6. Certifications</strong> - الشهادات والتدريب</li>
        <li><strong className="text-white">7. Contact</strong> - LinkedIn, Email</li>
      </ol>
    </div>

    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
      <h3 className="text-cyan-400 font-bold mb-4">📋 عناصر README لكل مشروع</h3>
      <ol className="text-gray-300 text-sm space-y-3">
        <li><strong className="text-white">1. Executive Summary</strong> - ملخص تنفيذي في 2-3 جمل</li>
        <li><strong className="text-white">2. Environment</strong> - الأدوات والبيئة المستخدمة</li>
        <li><strong className="text-white">3. Investigation Timeline</strong> - جدول زمني للأحداث</li>
        <li><strong className="text-white">4. Detailed Analysis</strong> - التحليل خطوة بخطوة مع screenshots</li>
        <li><strong className="text-white">5. MITRE ATT&CK Mapping</strong> - ربط بالإطار</li>
        <li><strong className="text-white">6. IOCs / Evidence</strong> - المؤشرات والأدلة</li>
        <li><strong className="text-white">7. Response Actions</strong> - ما تم فعله</li>
        <li><strong className="text-white">8. Lessons Learned</strong> - الدروس المستفادة</li>
        <li><strong className="text-white">9. Tools & Filters Used</strong> - جدول الأدوات</li>
        <li><strong className="text-white">10. References</strong> - المراجع</li>
      </ol>
    </div>

    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
      <h3 className="text-cyan-400 font-bold mb-4">🏷️ Badges مفيدة</h3>
      <CodeBlock code={`![Windows](https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white)
![Linux](https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black)
![Wireshark](https://img.shields.io/badge/Wireshark-1679A7?style=for-the-badge&logo=wireshark&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![GitHub last commit](https://img.shields.io/github/last-commit/username/repo)`} />
    </div>
  </div>
);

// === 10 Projects Section ===
export const ProjectsListSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>🏗️</span>المشاريع الـ 10 الأساسية</h1>
    <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

    <Alert type="golden">
      كل مشروع يجب أن يحتوي على: README كامل + Screenshots + Scripts + MITRE Mapping + التقرير
    </Alert>

    <div className="space-y-4">
      {[
        { num: 1, title: 'PCAP Investigation - HTTPS Traffic Analysis', desc: 'إثبات فهمك لطبقات الشبكة من DNS إلى HTTPS', tools: 'Wireshark, curl, Kali', deliverables: 'PCAP file, تقرير تفصيلي, 3+ screenshots', difficulty: '🟢 متوسط' },
        { num: 2, title: 'Linux SSH Brute Force - Complete Investigation', desc: 'تحقيق كامل في هجوم SSH مع Bash + Python scripts', tools: 'Linux, grep, awk, Python', deliverables: 'auth.log, Bash script, Python script, تقرير, IOCs JSON', difficulty: '🟢 متوسط' },
        { num: 3, title: 'Windows AD - Lateral Movement Detection', desc: 'محاكاة وكشف Lateral Movement بـ PsExec', tools: 'Windows Server, Sysmon, PowerShell, PsExec', deliverables: 'EVTX files, PowerShell queries, Sigma rule, Process tree, تقرير', difficulty: '🟡 متقدم' },
        { num: 4, title: 'Wazuh SIEM - Complete Deployment', desc: 'نشر Wazuh كاملاً مع agents وقواعد مخصصة', tools: 'Ubuntu, Wazuh, Windows/Linux agents', deliverables: 'Deployment guide, Custom rules XML, Dashboard screenshots, Test results', difficulty: '🟡 متقدم' },
        { num: 5, title: 'Phishing Email Analysis', desc: 'تحليل phishing email احترافي كامل', tools: 'Email headers, VirusTotal, URLscan.io, any.run', deliverables: 'Headers analysis, IOCs, Full report, Screenshots', difficulty: '🟢 متوسط' },
        { num: 6, title: 'Threat Hunting - Beaconing Detection', desc: 'البحث الاستباقي عن C2 beaconing patterns', tools: 'SIEM, Python, KQL/SPL', deliverables: 'Hunt hypothesis, KQL queries, Python analysis, Hunt report', difficulty: '🔴 متقدم جداً' },
        { num: 7, title: 'Detection Engineering - Sigma Rules Pack', desc: 'كتابة مجموعة من 10+ Sigma detection rules', tools: 'Sigma, YAML', deliverables: '10+ Sigma rules, Testing documentation, MITRE mapping', difficulty: '🟡 متقدم' },
        { num: 8, title: 'Incident Response Tabletop Exercise', desc: 'محاكاة حادثة Ransomware كاملة وتوثيق الاستجابة', tools: 'Documentation, NIST framework', deliverables: 'Timeline, Decisions log, Stakeholder updates, Final report', difficulty: '🟢 متوسط' },
        { num: 9, title: 'MITRE ATT&CK Coverage Assessment', desc: 'تقييم تغطية الكشف لشركة افتراضية', tools: 'MITRE Navigator, Excel/Sheets', deliverables: 'Coverage heatmap, Gap analysis, Recommendations', difficulty: '🟡 متقدم' },
        { num: 10, title: 'Lab Setup Documentation', desc: 'توثيق كامل للـ Home Lab', tools: 'VirtualBox/VMware, Visio/draw.io', deliverables: 'Network diagram, VM specs, Configuration guide, Snapshots policy', difficulty: '🟢 سهل' },
      ].map((project) => (
        <div key={project.num} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-cyan-500/50 transition-colors">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">{project.num}</div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-white">{project.title}</h3>
                <span className="text-xs">{project.difficulty}</span>
              </div>
              <p className="text-gray-400 text-sm mb-3">{project.desc}</p>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-gray-700/30 rounded p-3">
                  <p className="text-cyan-400 text-xs font-bold mb-1">🛠️ الأدوات:</p>
                  <p className="text-gray-300 text-xs">{project.tools}</p>
                </div>
                <div className="bg-gray-700/30 rounded p-3">
                  <p className="text-green-400 text-xs font-bold mb-1">📦 المخرجات:</p>
                  <p className="text-gray-300 text-xs">{project.deliverables}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>

    <Alert type="warning" title="ملاحظة مهمة">
      <strong>ابدأ بالمشاريع 1-5</strong> (الأساسية) ثم أكمل 6-10. لا تحتاج إنهاء الكل قبل التقديم!
    </Alert>
  </div>
);

// === Write-ups Section ===
export const ProjectsWriteupsSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>✍️</span>Write-ups من المنصات</h1>
    <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

    <Alert type="info">
      Write-ups تُثبت أنك تتعلم وتطبق باستمرار. ضعها في repo خاص أو في مجلد داخل Portfolio.
    </Alert>

    <div className="grid md:grid-cols-3 gap-4">
      <div className="bg-green-900/20 rounded-xl p-6 border border-green-500/30">
        <h3 className="text-green-400 font-bold mb-4">🏴 TryHackMe</h3>
        <p className="text-gray-400 text-sm mb-3">أكمل وأكتب write-up لكل room:</p>
        <ul className="text-gray-300 text-sm space-y-1">
          <li>• SOC Level 1 Path كامل</li>
          <li>• Blue Team Fundamentals</li>
          <li>• Investigating Windows</li>
          <li>• Splunk: Basics</li>
          <li>• ELK 101</li>
        </ul>
      </div>

      <div className="bg-blue-900/20 rounded-xl p-6 border border-blue-500/30">
        <h3 className="text-blue-400 font-bold mb-4">🔵 LetsDefend</h3>
        <p className="text-gray-400 text-sm mb-3">لكل challenge اكتب:</p>
        <ul className="text-gray-300 text-sm space-y-1">
          <li>• ما التنبيه؟</li>
          <li>• خطوات التحقيق</li>
          <li>• الأدلة المجمعة</li>
          <li>• القرار النهائي</li>
        </ul>
      </div>

      <div className="bg-purple-900/20 rounded-xl p-6 border border-purple-500/30">
        <h3 className="text-purple-400 font-bold mb-4">🟣 CyberDefenders</h3>
        <p className="text-gray-400 text-sm mb-3">تحديات DFIR و SOC:</p>
        <ul className="text-gray-300 text-sm space-y-1">
          <li>• PCAP analysis challenges</li>
          <li>• Memory forensics</li>
          <li>• Log analysis challenges</li>
        </ul>
      </div>
    </div>
  </div>
);

// === CV & LinkedIn Section ===
export const ProjectsCVSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>💼</span>تكامل CV و LinkedIn</h1>
    <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">📄 CV - قسم Projects</h2>
      <CodeBlock
        title="نموذج قسم Projects في الـ CV"
        code={`PROJECTS
Junior SOC Analyst Portfolio | github.com/yourname

• Built 10+ hands-on cybersecurity projects in home lab environment
• Conducted full investigations using Wireshark, Sysmon, and SIEM tools
• Created custom detection rules using Sigma and KQL
• Documented incidents following NIST IR Lifecycle

Featured Projects:
• Wazuh SIEM Deployment - End-to-end SIEM with 8 custom detections
• PsExec Lateral Movement Detection - Full attack chain investigation
• SSH Brute Force Investigation - Bash & Python automation tools`}
      />
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">💬 LinkedIn Posts</h2>
      <Alert type="info">
        اكتب post عند نشر كل مشروع لبناء تواجد احترافي
      </Alert>

      <CodeBlock
        title="نموذج LinkedIn Post"
        code={`🚀 Just completed my latest cybersecurity project!

🔍 Project: Detecting Lateral Movement using PsExec

In this lab investigation, I:
✅ Simulated a real-world attack scenario
✅ Analyzed Windows Security Events (4624, 7045)
✅ Mapped findings to MITRE ATT&CK (T1021.002)
✅ Created Sigma detection rule
✅ Documented full investigation report

Key takeaway: Service installation events (7045) with PSEXESVC
are strong indicators of PsExec lateral movement.

📁 Full project on GitHub: [link]

#cybersecurity #blueteam #SOC #detection #MITREATTACK`}
      />
    </section>
  </div>
);

// === Rubric Section ===
export const ProjectsRubricSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>📊</span>Rubric للتقييم الذاتي</h1>
    <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-800">
            <th className="px-4 py-3 text-right text-cyan-400">المعيار</th>
            <th className="px-4 py-3 text-center text-red-400">ضعيف (1)</th>
            <th className="px-4 py-3 text-center text-yellow-400">مقبول (3)</th>
            <th className="px-4 py-3 text-center text-green-400">ممتاز (5)</th>
          </tr>
        </thead>
        <tbody>
          {[
            { criteria: 'عدد المشاريع', weak: '< 3', ok: '3-5', great: '6+' },
            { criteria: 'جودة README', weak: 'فارغ', ok: 'أساسي', great: 'محترف' },
            { criteria: 'التنوع', weak: 'نوع واحد', ok: '2-3 أنواع', great: 'شامل' },
            { criteria: 'التوثيق', weak: 'سطحي', ok: 'متوسط', great: 'تفصيلي' },
            { criteria: 'Screenshots', weak: 'مفقودة', ok: 'بعضها', great: 'شامل وواضح' },
            { criteria: 'Scripts', weak: 'لا يوجد', ok: 'بسيطة', great: 'احترافية' },
            { criteria: 'MITRE Mapping', weak: 'لا يوجد', ok: 'جزئي', great: 'كامل' },
            { criteria: 'تواتر التحديث', weak: 'غير منتظم', ok: 'شهرياً', great: 'أسبوعياً' },
            { criteria: 'الإنجليزية', weak: 'ضعيفة', ok: 'مفهومة', great: 'احترافية' },
            { criteria: 'النتائج', weak: 'غير واضحة', ok: 'معقولة', great: 'قابلة للقياس' },
          ].map((row, i) => (
            <tr key={i} className="border-b border-gray-800">
              <td className="px-4 py-3 text-white font-bold">{row.criteria}</td>
              <td className="px-4 py-3 text-center text-red-400">{row.weak}</td>
              <td className="px-4 py-3 text-center text-yellow-400">{row.ok}</td>
              <td className="px-4 py-3 text-center text-green-400">{row.great}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <Alert type="golden" title="الهدف">
      حاول تحقيق <strong>4+ في كل معيار</strong> قبل التقديم للوظائف.
    </Alert>
  </div>
);

// === Final Checklist Section ===
export const ProjectsChecklistSection = () => {
  const sections = [
    { title: 'GitHub Profile', items: ['اسم احترافي', 'Profile picture', 'Bio واضح', 'Links (LinkedIn, Email)', 'Profile README'] },
    { title: 'Repository الرئيسي', items: ['هيكل واضح ومنظم', 'README احترافي', 'LICENSE', '.gitignore'] },
    { title: 'المشاريع', items: ['6+ مشاريع كاملة', 'كل مشروع له README', 'Screenshots واضحة', 'Scripts مع تعليقات', 'تقارير محترفة', 'MITRE mapping في كل مشروع'] },
    { title: 'التنوع', items: ['Network analysis', 'Linux investigation', 'Windows investigation', 'SOC work (playbooks, IR)', 'SIEM/Detection', 'Threat hunting أو Phishing'] },
    { title: 'التحديثات', items: ['Commits منتظمة (أسبوعياً)', 'آخر commit أقل من 30 يوم'] },
    { title: 'التكامل', items: ['LinkedIn محدّث', 'CV يذكر Portfolio', 'Posts على LinkedIn عن المشاريع'] },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>✅</span>Checklist النهائية</h1>
      <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

      <Alert type="warning" title="قبل التقديم للوظائف">
        تأكد من إتمام جميع هذه النقاط!
      </Alert>

      {sections.map((section, sIdx) => (
        <div key={sIdx} className="space-y-2">
          <h2 className="text-xl font-bold text-white">{section.title}</h2>
          {section.items.map((item, iIdx) => (
            <ChecklistItem key={iIdx} text={item} id={`proj-${sIdx}-${iIdx}`} />
          ))}
        </div>
      ))}

      <div className="bg-gradient-to-l from-cyan-900/30 to-transparent rounded-xl p-8 border border-cyan-500/30">
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">⭐ القاعدة الذهبية الأخيرة</h2>
        <blockquote className="text-xl text-white font-bold border-r-4 border-cyan-500 pr-4 mb-6">
          "GitHub repo قوي بـ 6 مشاريع جيدة أفضل من 30 مشروع سطحي."
        </blockquote>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-green-400 font-bold mb-3">✅ ركّز على:</h3>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>✅ الجودة قبل الكمية</li>
              <li>✅ التوثيق التفصيلي</li>
              <li>✅ المخرجات الواضحة</li>
              <li>✅ التحديث المنتظم</li>
              <li>✅ الكتابة الاحترافية</li>
            </ul>
          </div>
          <div>
            <h3 className="text-yellow-400 font-bold mb-3">💡 تذكّر:</h3>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• المُوظِف يبحث عن <strong>شخص جاهز</strong></li>
              <li>• البورتفوليو يفتح لك الأبواب</li>
              <li>• المقابلة تأكد ما في البورتفوليو</li>
              <li>• <strong>ابدأ التقديم بعد 5 مشاريع</strong></li>
              <li>• لا تنتظر الكمال!</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-green-900/20 rounded-xl p-8 border border-green-500/30 text-center">
        <h2 className="text-2xl font-bold text-green-400 mb-4">🎉 أنت قاب قوسين أو أدنى من التوظيف!</h2>
        <p className="text-xl text-white">استمر! 💪</p>
      </div>
    </div>
  );
};
