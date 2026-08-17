import Alert from '../../components/Alert';
import CodeBlock from '../../components/CodeBlock';
import ChecklistItem from '../../components/ChecklistItem';

// === SOC Structure Section ===
export const SocStructureSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>🏢</span>هيكل SOC ومستوياته</h1>
    <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

    <div className="grid md:grid-cols-2 gap-4">
      {[
        { tier: 'Tier 1 - Analyst (أنت هنا)', color: 'green', duties: ['مراقبة Alerts باستمرار', 'فرز أولي Initial Triage', 'التحقيق السريع', 'توثيق Incident Notes', 'التصعيد للـ Tier 2'], skills: ['أساسيات الشبكات', 'قراءة logs', 'استخدام SIEM', 'اتباع Playbooks'], sla: 'استجابة خلال 15 دقيقة | إغلاق 70% بدون تصعيد' },
        { tier: 'Tier 2 - Incident Responder', color: 'yellow', duties: ['تحقيق عميق في الحوادث المصعدة', 'تحليل البرمجيات الخبيثة الأساسي', 'تنسيق الاستجابة', 'بناء Detection Rules', 'مراجعة عمل Tier 1'], skills: ['تحليل البرمجيات الخبيثة', 'Forensics', 'بناء SIEM rules', 'Threat hunting'], sla: '' },
        { tier: 'Tier 3 - Senior / Threat Hunter', color: 'red', duties: ['Threat Hunting استباقي', 'تحليل APT', 'Reverse engineering', 'بناء detection capabilities', 'تطوير threat intelligence'], skills: [], sla: '' },
        { tier: 'SOC Manager', color: 'purple', duties: ['إدارة الفريق', 'تطوير العمليات', 'التواصل مع الإدارة', 'إدارة الميزانية'], skills: [], sla: '' },
      ].map((t, i) => (
        <div key={i} className={`bg-${t.color}-900/20 rounded-xl p-6 border border-${t.color}-500/30`}>
          <h3 className={`text-lg font-bold text-${t.color}-400 mb-4`}>{t.tier}</h3>
          <div className="mb-3">
            <p className="text-gray-400 text-xs font-bold mb-1">المسؤوليات:</p>
            <ul className="text-gray-300 text-sm space-y-1">{t.duties.map((d, j) => <li key={j}>• {d}</li>)}</ul>
          </div>
          {t.skills.length > 0 && <div className="mb-3"><p className="text-gray-400 text-xs font-bold mb-1">المهارات:</p><ul className="text-gray-300 text-sm space-y-1">{t.skills.map((s, j) => <li key={j}>• {s}</li>)}</ul></div>}
          {t.sla && <div className="bg-gray-800/50 rounded p-2 mt-3"><p className="text-cyan-400 text-xs">SLA: {t.sla}</p></div>}
        </div>
      ))}
    </div>

    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
      <h3 className="text-lg font-bold text-white mb-4">⏰ ساعات عمل SOC</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { name: '24/7 SOC', desc: '3 shifts على مدار الساعة' },
          { name: 'Follow-the-Sun', desc: 'فرق في مناطق زمنية مختلفة' },
          { name: 'Business Hours', desc: 'ساعات العمل فقط' },
          { name: 'On-Call', desc: 'متاح عند الحاجة خارج الدوام' },
        ].map((s, i) => (
          <div key={i} className="bg-gray-700/50 rounded-lg p-3 text-center">
            <p className="text-cyan-400 font-bold text-sm">{s.name}</p>
            <p className="text-gray-400 text-xs">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// === Alert Lifecycle Section ===
export const SocAlertLifecycleSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>🔄</span>Alert Lifecycle</h1>
    <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

    <div className="space-y-4">
      {[
        { num: 1, name: 'Detection (الكشف)', desc: 'التنبيه يأتي من: SIEM rule, EDR, IDS/IPS, Firewall, DLP, بلاغ مستخدم, Threat Intel', color: 'blue' },
        { num: 2, name: 'Triage (الفرز)', desc: '5-15 دقيقة: ما نوعه؟ ما خطورته؟ هل معروف ومتكرر؟ ما الأجهزة المتأثرة؟ هل يستحق تحقيق؟', color: 'yellow' },
        { num: 3, name: 'Investigation (التحقيق)', desc: 'جمع الأدلة من: Logs, Network traffic, Endpoint data, User activity, Threat intel', color: 'purple' },
        { num: 4, name: 'Classification (التصنيف)', desc: 'True Positive | False Positive | Benign Positive | يحتاج مزيد من التحقيق', color: 'orange' },
        { num: 5, name: 'Response (الاستجابة)', desc: 'احتواء التهديد → إزالته → إعادة الخدمة', color: 'red' },
        { num: 6, name: 'Documentation (التوثيق)', desc: 'كتابة Incident Report → تحديث Playbook → مشاركة Lessons Learned', color: 'green' },
        { num: 7, name: 'Closure (الإغلاق)', desc: 'إقفال ticket → إخطار الأطراف → أرشفة الأدلة', color: 'cyan' },
      ].map((stage) => (
        <div key={stage.num} className={`bg-${stage.color}-900/20 rounded-xl p-5 border border-${stage.color}-500/30 flex items-start gap-4`}>
          <div className={`w-12 h-12 rounded-full bg-${stage.color}-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0`}>{stage.num}</div>
          <div>
            <h3 className={`text-lg font-bold text-${stage.color}-400`}>{stage.name}</h3>
            <p className="text-gray-300 text-sm mt-1">{stage.desc}</p>
          </div>
        </div>
      ))}
    </div>

    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
      <h3 className="text-lg font-bold text-white mb-4">📊 True/False/Benign Positive</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-green-900/20 rounded-lg p-4 border border-green-500/30 text-center">
          <h4 className="text-green-400 font-bold">True Positive</h4>
          <p className="text-gray-400 text-xs mt-2">تنبيه صحيح لتهديد حقيقي</p>
          <p className="text-green-400 text-xs mt-1">✅ تصرّف فوراً</p>
        </div>
        <div className="bg-red-900/20 rounded-lg p-4 border border-red-500/30 text-center">
          <h4 className="text-red-400 font-bold">False Positive</h4>
          <p className="text-gray-400 text-xs mt-2">تنبيه خاطئ - ليس تهديد</p>
          <p className="text-yellow-400 text-xs mt-1">⚠️ حسّن القاعدة</p>
        </div>
        <div className="bg-yellow-900/20 rounded-lg p-4 border border-yellow-500/30 text-center">
          <h4 className="text-yellow-400 font-bold">Benign Positive</h4>
          <p className="text-gray-400 text-xs mt-2">تنبيه صحيح لنشاط مشروع</p>
          <p className="text-gray-400 text-xs mt-1">📝 وثّق واستثني</p>
        </div>
        <div className="bg-red-900/30 rounded-lg p-4 border border-red-600/50 text-center">
          <h4 className="text-red-500 font-bold">False Negative 🚨</h4>
          <p className="text-gray-400 text-xs mt-2">تهديد حقيقي بدون تنبيه</p>
          <p className="text-red-400 text-xs mt-1">الأخطر! لم يُكتشف</p>
        </div>
      </div>
    </div>
  </div>
);

// === Triage Playbook Section ===
export const SocTriageSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>📋</span>Triage Playbook التفصيلي</h1>
    <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

    <div className="space-y-4">
      {[
        { step: 1, title: 'اقرأ التنبيه كاملاً', details: ['اسم التنبيه (Alert Name)', 'الوصف والمصدر', 'الجهاز المتأثر والمستخدم', 'الوقت و Severity'] },
        { step: 2, title: 'حدد السياق Context', details: ['هل المستخدم في دوامه؟', 'هل الجهاز معروف؟', 'هل النشاط معتاد لهذا المستخدم/الجهاز؟', 'هل هناك تنبيهات مشابهة سابقاً؟'] },
        { step: 3, title: 'جمع الأدلة الأساسية', details: ['Windows: Event logs, Process creation (4688), Network (Sysmon 3), PowerShell (4104)', 'Linux: auth.log, syslog, bash history, ps, netstat', 'الشبكة: Firewall logs, Proxy logs, DNS queries, PCAP'] },
        { step: 4, title: 'تحقق من المؤشرات', details: ['IPs: ابحث في threat intel', 'Domains: WHOIS و reputation', 'Hashes: VirusTotal', 'URLs: URLhaus'] },
        { step: 5, title: 'قرار سريع', details: ['A. False Positive واضح → وثّق وأغلق', 'B. True Positive واضح → صعّد وابدأ الاحتواء', 'C. غير واضح → اجمع أدلة أكثر أو استشر Tier 2'] },
        { step: 6, title: 'التوثيق', details: ['اكتب: ما حدث، الأدلة، التحليل، القرار، الإجراءات'] },
      ].map((s) => (
        <div key={s.step} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-cyan-600 flex items-center justify-center text-white font-bold">{s.step}</div>
            <h3 className="text-lg font-bold text-white">{s.title}</h3>
          </div>
          <ul className="space-y-1 text-gray-300 text-sm mr-14">
            {s.details.map((d, i) => <li key={i}>• {d}</li>)}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

// === Escalation Section ===
export const SocEscalationSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>⬆️</span>متى تُصعّد؟ (Escalation)</h1>
    <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-red-900/20 rounded-xl p-6 border border-red-500/30">
        <h3 className="text-red-400 font-bold mb-4">🚨 صعّد فوراً إذا:</h3>
        <ol className="text-gray-300 text-sm space-y-2">
          {['حساب Privileged (Admin, Service Account)', 'Event 1102 (Security log cleared)', 'سلوك يدل على Lateral Movement', 'اتصال بـ IP/Domain معروف خبيث', 'كشف برمجية خبيثة معروفة', 'تسريب بيانات محتمل', 'Ransomware indicators', 'نشاط من خارج البلد المعتاد', 'أكثر من جهاز متأثر', 'أداة هجوم (Cobalt Strike, Mimikatz)'].map((item, i) => (
            <li key={i}>{i + 1}. {item}</li>
          ))}
        </ol>
      </div>

      <div className="bg-yellow-900/20 rounded-xl p-6 border border-yellow-500/30">
        <h3 className="text-yellow-400 font-bold mb-4">⚠️ صعّد إذا:</h3>
        <ul className="text-gray-300 text-sm space-y-2">
          <li>• لست متأكد لكن الأثر محتمل كبير</li>
          <li>• المستخدم أبلغ عن سلوك غريب</li>
          <li>• تنبيهات متعددة من نفس المصدر</li>
          <li>• نشاط في وقت غير معتاد</li>
          <li>• استخدام أدوات نادرة</li>
        </ul>
      </div>
    </div>

    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
      <h3 className="text-cyan-400 font-bold mb-4">📧 قالب رسالة تصعيد</h3>
      <CodeBlock
        title="Escalation Template"
        code={`[ESCALATION] - [Severity] - Brief Description

Summary: [وصف مختصر في سطرين]

Affected Assets:
- Host: ___
- User: ___
- IP: ___

Timeline:
- First seen: ___
- Last activity: ___

Evidence:
- Alert IDs: ___
- Log sources: ___
- Key indicators: ___

Initial Assessment: [تقييمك الأولي]
Actions Taken: [ما فعلته حتى الآن]
Recommended Next Steps: [ما تقترحه]`}
      />
    </div>
  </div>
);

// === Kill Chain Section ===
export const SocKillChainSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>⚔️</span>Cyber Kill Chain</h1>
    <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>
    <Alert type="info">النموذج الشهير من Lockheed Martin يوضح مراحل الهجوم السبعة</Alert>

    <div className="space-y-3">
      {[
        { num: 1, name: 'Reconnaissance (الاستطلاع)', what: 'المهاجم يجمع معلومات: OSINT, DNS enumeration, Port scanning', see: 'Port scans, DNS queries غير معتادة, Web crawlers مشبوهة' },
        { num: 2, name: 'Weaponization (التسليح)', what: 'بناء الـ payload: Malware, Exploit, Phishing email', see: 'لا شيء عادة (تحدث على جانب المهاجم)' },
        { num: 3, name: 'Delivery (التوصيل)', what: 'إيصال الـ payload: Phishing email, Malicious website, USB', see: 'Suspicious emails, Connections لـ URLs مشبوهة' },
        { num: 4, name: 'Exploitation (الاستغلال)', what: 'استغلال ثغرة: Browser exploit, Document macro', see: 'Browser crashes, Office spawning suspicious processes' },
        { num: 5, name: 'Installation (التثبيت)', what: 'تثبيت backdoor: Malware drop, Persistence', see: 'Event 4697/7045 (service), 4698 (task), Registry changes' },
        { num: 6, name: 'Command & Control (C2)', what: 'اتصال بسيرفر المهاجم: HTTP/HTTPS beaconing, DNS tunneling', see: 'Beaconing patterns, DNS مشبوه, Encrypted traffic لـ IPs غريبة' },
        { num: 7, name: 'Actions on Objectives', what: 'الهدف النهائي: Data exfiltration, Ransomware, Lateral movement', see: 'Large data uploads, File encryption, Privileged account abuse' },
      ].map((stage) => (
        <div key={stage.num} className="bg-gray-800/50 rounded-xl p-5 border border-gray-700">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center text-white font-bold">{stage.num}</div>
            <h3 className="text-lg font-bold text-white">{stage.name}</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mr-14">
            <div><p className="text-gray-400 text-xs font-bold mb-1">ما يحدث:</p><p className="text-gray-300 text-sm">{stage.what}</p></div>
            <div><p className="text-cyan-400 text-xs font-bold mb-1">ما تراه كمحلل:</p><p className="text-cyan-300 text-sm">{stage.see}</p></div>
          </div>
        </div>
      ))}
    </div>

    <Alert type="golden" title="القيمة العملية">
      كلما اكتشفت الهجوم مبكراً، كلما كان أسهل وأرخص. حدد: في أي مرحلة المهاجم؟ ما المرحلة التالية؟ كيف نوقفه؟
    </Alert>
  </div>
);

// === MITRE ATT&CK Section ===
export const SocMitreSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>🎯</span>MITRE ATT&CK بعمق</h1>
    <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

    <Alert type="info">قاعدة معرفية عالمية للتكتيكات والتقنيات المستخدمة من المهاجمين. <strong>ATT&CK</strong>: Adversarial Tactics, Techniques, and Common Knowledge</Alert>

    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
      <h3 className="text-lg font-bold text-white mb-4">14 تكتيك في Enterprise:</h3>
      <div className="grid md:grid-cols-2 gap-2">
        {[
          { id: 'TA0043', name: 'Reconnaissance', ar: 'جمع معلومات' },
          { id: 'TA0042', name: 'Resource Development', ar: 'تطوير الموارد' },
          { id: 'TA0001', name: 'Initial Access', ar: 'الوصول الأولي' },
          { id: 'TA0002', name: 'Execution', ar: 'التنفيذ' },
          { id: 'TA0003', name: 'Persistence', ar: 'البقاء' },
          { id: 'TA0004', name: 'Privilege Escalation', ar: 'تصعيد الصلاحيات' },
          { id: 'TA0005', name: 'Defense Evasion', ar: 'التهرب من الدفاعات' },
          { id: 'TA0006', name: 'Credential Access', ar: 'الوصول لبيانات الاعتماد' },
          { id: 'TA0007', name: 'Discovery', ar: 'الاستكشاف' },
          { id: 'TA0008', name: 'Lateral Movement', ar: 'الحركة الجانبية' },
          { id: 'TA0009', name: 'Collection', ar: 'الجمع' },
          { id: 'TA0011', name: 'Command and Control', ar: 'القيادة والتحكم' },
          { id: 'TA0010', name: 'Exfiltration', ar: 'التسريب' },
          { id: 'TA0040', name: 'Impact', ar: 'التأثير' },
        ].map((t, i) => (
          <div key={i} className="flex items-center gap-3 p-2 bg-gray-700/50 rounded-lg">
            <span className="text-xs text-gray-500 font-mono min-w-[60px]">{t.id}</span>
            <span className="text-cyan-400 font-bold text-sm min-w-[160px]">{t.name}</span>
            <span className="text-gray-400 text-sm">{t.ar}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
      <h3 className="text-lg font-bold text-white mb-4">⭐ أهم Techniques يجب أن تعرفها</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {[
          { category: 'Initial Access', items: ['T1566 - Phishing (001: Attachment, 002: Link)', 'T1190 - Exploit Public-Facing App', 'T1078 - Valid Accounts'] },
          { category: 'Execution', items: ['T1059.001 - PowerShell', 'T1059.003 - Windows Command Shell', 'T1053 - Scheduled Task/Job', 'T1204 - User Execution'] },
          { category: 'Persistence', items: ['T1547.001 - Registry Run Keys / Startup', 'T1053 - Scheduled Task/Job', 'T1543.003 - Windows Service', 'T1136 - Create Account'] },
          { category: 'Credential Access', items: ['T1003.001 - LSASS Memory (Mimikatz)', 'T1110 - Brute Force', 'T1558.003 - Kerberoasting'] },
          { category: 'Lateral Movement', items: ['T1021.001 - RDP', 'T1021.002 - SMB Admin Shares', 'T1550.002 - Pass the Hash'] },
          { category: 'Defense Evasion', items: ['T1070.001 - Clear Event Logs', 'T1027 - Obfuscated Files', 'T1218 - LOLBins (Rundll32, Regsvr32, Mshta)'] },
        ].map((cat, i) => (
          <div key={i} className="bg-gray-700/30 rounded-lg p-4">
            <h4 className="text-purple-400 font-bold text-sm mb-2">{cat.category}</h4>
            <ul className="text-gray-300 text-xs space-y-1">{cat.items.map((item, j) => <li key={j} className="font-mono">• {item}</li>)}</ul>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
      <h3 className="text-lg font-bold text-white mb-4">💡 كيف تستخدم MITRE في عملك اليومي</h3>
      <ol className="space-y-2 text-gray-300 text-sm">
        <li>1. <strong>حدد السلوك:</strong> ماذا فعل المهاجم؟</li>
        <li>2. <strong>ارجع للموقع:</strong> attack.mitre.org</li>
        <li>3. <strong>ابحث عن التقنية:</strong> مثل "PowerShell" → T1059.001</li>
        <li>4. <strong>اقرأ:</strong> Description, Mitigations, Detection</li>
        <li>5. <strong>اكتب في تقريرك:</strong></li>
      </ol>
      <CodeBlock code={`MITRE ATT&CK Mapping:\n- Tactic: Execution (TA0002)\n- Technique: T1059.001 - PowerShell\n- Sub-technique: Used to execute encoded commands`} />
    </div>
  </div>
);

// === Pyramid of Pain Section ===
export const SocPyramidSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>🔺</span>Pyramid of Pain</h1>
    <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>
    <Alert type="info">النموذج المهم من David Bianco - يصنف IOCs حسب صعوبة تغييرها على المهاجم</Alert>

    <div className="flex flex-col items-center space-y-2">
      {[
        { level: 'TTPs', pain: 'الأصعب', value: 'عالية جداً', width: 'w-48', color: 'bg-red-600', desc: 'تغيير منهجية كاملة' },
        { level: 'Tools', pain: 'صعب', value: 'عالية', width: 'w-64', color: 'bg-orange-600', desc: 'تطوير أداة جديدة' },
        { level: 'Network/Host Artifacts', pain: 'متوسط', value: 'متوسطة-عالية', width: 'w-80', color: 'bg-yellow-600', desc: 'User-Agent, registry keys, paths' },
        { level: 'Domain Names', pain: 'أصعب قليلاً', value: 'متوسطة', width: 'w-96', color: 'bg-green-600', desc: 'تسجيل domain جديد' },
        { level: 'IP Addresses', pain: 'سهل', value: 'قليلة', width: 'w-[28rem]', color: 'bg-blue-600', desc: 'استخدام proxy أو IP جديد' },
        { level: 'Hash Values', pain: 'سهل جداً', value: 'قليلة', width: 'w-[32rem]', color: 'bg-gray-600', desc: 'تغيير bit واحد = hash جديد' },
      ].map((item, i) => (
        <div key={i} className={`${item.width} ${item.color} rounded-lg p-3 text-center text-white`}>
          <p className="font-bold">{item.level}</p>
          <p className="text-xs opacity-80">صعوبة التغيير: {item.pain} | القيمة: {item.value}</p>
          <p className="text-xs opacity-60">{item.desc}</p>
        </div>
      ))}
    </div>

    <Alert type="golden" title="الدرس العملي">
      ركز على كشف <strong>TTPs و Tools</strong> بدل مطاردة IPs و Hashes. كشف TTP يقتل مجموعة هجوم كاملة!
    </Alert>
  </div>
);

// === Diamond Model Section ===
export const SocDiamondSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>💎</span>Diamond Model</h1>
    <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>
    <Alert type="info">نموذج الماس يربط أربعة عناصر في كل هجوم</Alert>

    <div className="flex justify-center">
      <div className="grid grid-cols-3 gap-4 max-w-lg">
        <div></div>
        <div className="bg-red-900/20 rounded-xl p-6 border border-red-500/30 text-center">
          <div className="text-3xl mb-2">👤</div>
          <h3 className="text-red-400 font-bold">Adversary</h3>
          <p className="text-gray-400 text-xs mt-1">من؟ مجموعة معروفة؟ الدوافع؟</p>
        </div>
        <div></div>
        <div className="bg-purple-900/20 rounded-xl p-6 border border-purple-500/30 text-center">
          <div className="text-3xl mb-2">⚙️</div>
          <h3 className="text-purple-400 font-bold">Capability</h3>
          <p className="text-gray-400 text-xs mt-1">الأدوات والتقنيات</p>
        </div>
        <div className="flex items-center justify-center"><span className="text-4xl">💎</span></div>
        <div className="bg-cyan-900/20 rounded-xl p-6 border border-cyan-500/30 text-center">
          <div className="text-3xl mb-2">🌐</div>
          <h3 className="text-cyan-400 font-bold">Infrastructure</h3>
          <p className="text-gray-400 text-xs mt-1">C2 servers, Domains, IPs</p>
        </div>
        <div></div>
        <div className="bg-green-900/20 rounded-xl p-6 border border-green-500/30 text-center">
          <div className="text-3xl mb-2">🎯</div>
          <h3 className="text-green-400 font-bold">Victim</h3>
          <p className="text-gray-400 text-xs mt-1">الأنظمة والمستخدمين المستهدفين</p>
        </div>
        <div></div>
      </div>
    </div>

    <Alert type="success" title="استخدامه في التحقيق">
      كل دليل تجده يُصنف تحت أحد العناصر الأربعة. يساعدك على ربط الأحداث وفهم الصورة الكاملة.
    </Alert>
  </div>
);

// === Threat Intel Section ===
export const SocThreatIntelSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>🧠</span>Threat Intelligence بعمق</h1>
    <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

    <div className="grid md:grid-cols-4 gap-4">
      {[
        { type: 'Strategic', who: 'للقيادة العليا', what: 'اتجاهات تهديدات عالية المستوى', color: 'purple' },
        { type: 'Tactical', who: 'للمحللين', what: 'TTPs ومنهجيات الهجوم', color: 'blue' },
        { type: 'Operational', who: 'عن حملات محددة', what: 'حملات هجوم قيد التنفيذ', color: 'orange' },
        { type: 'Technical', who: 'IOCs محددة', what: 'IPs, domains, hashes', color: 'green' },
      ].map((t, i) => (
        <div key={i} className={`bg-${t.color}-900/20 rounded-xl p-4 border border-${t.color}-500/30`}>
          <h3 className={`text-${t.color}-400 font-bold mb-2`}>{t.type}</h3>
          <p className="text-gray-400 text-xs mb-1">{t.who}</p>
          <p className="text-gray-300 text-sm">{t.what}</p>
        </div>
      ))}
    </div>

    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
      <h3 className="text-lg font-bold text-white mb-4">🚦 TLP (Traffic Light Protocol)</h3>
      <div className="grid md:grid-cols-5 gap-2">
        {[
          { name: 'TLP:RED', desc: 'لا تشارك خارج المحادثة', bg: 'bg-red-700' },
          { name: 'TLP:AMBER+STRICT', desc: 'داخل فريق محدد فقط', bg: 'bg-amber-700' },
          { name: 'TLP:AMBER', desc: 'داخل المنظمة فقط', bg: 'bg-amber-600' },
          { name: 'TLP:GREEN', desc: 'مع الزملاء والشركاء', bg: 'bg-green-700' },
          { name: 'TLP:CLEAR', desc: 'معلومات عامة', bg: 'bg-gray-600' },
        ].map((tlp, i) => (
          <div key={i} className={`${tlp.bg} rounded-lg p-3 text-center text-white`}>
            <p className="font-bold text-sm">{tlp.name}</p>
            <p className="text-xs opacity-80 mt-1">{tlp.desc}</p>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
      <h3 className="text-lg font-bold text-white mb-4">🔗 مصادر Threat Intel مجانية</h3>
      <div className="grid md:grid-cols-3 gap-3">
        {[
          { name: 'AlienVault OTX', type: 'Threat Feed' },
          { name: 'Abuse.ch (URLhaus, MalwareBazaar)', type: 'Threat Feed' },
          { name: 'VirusTotal', type: 'Analysis Platform' },
          { name: 'MISP', type: 'Sharing Platform' },
          { name: 'Mandiant Reports', type: 'Vendor Report' },
          { name: 'CISA (US)', type: 'Government' },
        ].map((s, i) => (
          <div key={i} className="bg-gray-700/50 rounded-lg p-3">
            <p className="text-cyan-400 font-bold text-sm">{s.name}</p>
            <p className="text-gray-400 text-xs">{s.type}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// === SIEM Section ===
export const SocSIEMSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>📊</span>SIEM للمحلل</h1>
    <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

    <Alert type="info">نظام يجمع logs من مصادر متعددة ويحللها للكشف عن تهديدات</Alert>

    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <h3 className="text-cyan-400 font-bold mb-4">💰 المدفوعة</h3>
        <ul className="text-gray-300 text-sm space-y-2">
          {['Splunk Enterprise Security (الأشهر)', 'IBM QRadar', 'Microsoft Sentinel', 'ArcSight', 'LogRhythm', 'Exabeam'].map((s, i) => <li key={i}>• {s}</li>)}
        </ul>
      </div>
      <div className="bg-green-900/20 rounded-xl p-6 border border-green-500/30">
        <h3 className="text-green-400 font-bold mb-4">🆓 المجانية / Open Source</h3>
        <ul className="text-gray-300 text-sm space-y-2">
          {['Wazuh (الأفضل مجاناً)', 'Elastic Security (ELK)', 'Security Onion', 'Graylog'].map((s, i) => <li key={i}>• {s}</li>)}
        </ul>
      </div>
    </div>

    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
      <h3 className="text-lg font-bold text-white mb-4">أمثلة Queries</h3>
      <CodeBlock title="Splunk - Failed logons" code={`index=windows EventCode=4625 ComputerName="WORKSTATION01"\n| stats count by Account_Name, Source_Network_Address\n| sort -count`} />
      <CodeBlock title="KQL (Sentinel) - Failed logons" code={`SecurityEvent\n| where EventID == 4625\n| summarize count() by Account, IpAddress\n| sort by count_ desc`} />
      <CodeBlock title="KQL - Lateral Movement" code={`SecurityEvent\n| where EventID == 4624 and LogonType == 3\n| summarize count() by Account, Computer, IpAddress\n| where count_ > 5`} />
    </div>
  </div>
);

// === Common Alerts Investigation ===
export const SocAlertsSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>🚨</span>تحقيق Alerts الشائعة</h1>
    <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

    {[
      { name: 'Multiple Failed Logons', icon: '🔓', indicators: 'Event 4625 متكرر | نفس المستخدم أو IP', steps: ['كم محاولة وفي أي مدة؟', 'من نفس IP أم متعدد؟', 'هل نجحت أي محاولة بعدها؟', 'هل IP من بلد معتاد؟'], decision: 'نجحت بعد الفشل = TP حرج | كلها فاشلة من IP خارجي = TP حظر | المستخدم نسي = BP' },
      { name: 'Suspicious PowerShell', icon: '💻', indicators: 'Event 4104 بـ encoded | Sysmon Event 1 بـ command غريب', steps: ['فك encoded command', 'ما هو parent process؟', 'ما هو user context؟', 'هل اتصل بالإنترنت؟'], decision: 'DownloadString/IEX = TP صعّد | Admin Script شرعي = FP' },
      { name: 'Suspicious Outbound', icon: '🌐', indicators: 'اتصال لـ IP في threat feed | domain مشبوه | منفذ غير معتاد', steps: ['ما العملية المرتبطة؟', 'حجم البيانات المنقولة؟', 'تكرار الاتصال (beaconing)؟', 'تحقق من سمعة IP/Domain'], decision: 'IP خبيث مؤكد = TP حرج | Beaconing = TP صعّد | عادي = FP' },
      { name: 'New Account Created', icon: '👤', indicators: 'Event 4720', steps: ['من أنشأ الحساب؟', 'هل المنشئ admin شرعي؟', 'متى تم الإنشاء (وقت دوام؟)', 'ما صلاحيات الحساب الجديد؟'], decision: 'admin شرعي في دوام = BP | حساب مخترق = TP حرج' },
      { name: 'Service Installation', icon: '⚙️', indicators: 'Event 7045/4697', steps: ['اسم الخدمة', 'مسار الملف التنفيذي', 'هل معروفة؟', 'هل الملف موقّع؟'], decision: 'PSEXESVC = PsExec! | اسم عشوائي = مشبوه | من /tmp = حرج' },
      { name: 'Security Log Cleared', icon: '🗑️', indicators: 'Event 1102', steps: ['من مسح؟', 'متى؟', 'ما النشاط قبل المسح؟'], decision: 'دائماً TP حرج! صعّد فوراً' },
    ].map((alert, i) => (
      <div key={i} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-bold text-white mb-4">{alert.icon} Alert {i + 1}: {alert.name}</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gray-700/30 rounded p-3">
            <p className="text-yellow-400 text-xs font-bold mb-2">المؤشرات:</p>
            <p className="text-gray-300 text-sm">{alert.indicators}</p>
          </div>
          <div className="bg-gray-700/30 rounded p-3">
            <p className="text-cyan-400 text-xs font-bold mb-2">خطوات التحقيق:</p>
            <ul className="text-gray-300 text-xs space-y-1">{alert.steps.map((s, j) => <li key={j}>{j + 1}. {s}</li>)}</ul>
          </div>
          <div className="bg-gray-700/30 rounded p-3">
            <p className="text-green-400 text-xs font-bold mb-2">القرار:</p>
            <p className="text-gray-300 text-sm">{alert.decision}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
);

// === NIST IR Lifecycle ===
export const SocNISTSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>📜</span>NIST Incident Response Lifecycle</h1>
    <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>
    <Alert type="info">المرجع: NIST SP 800-61 Rev 2</Alert>

    <div className="space-y-4">
      {[
        { num: 1, name: 'Preparation (التحضير)', items: ['بناء فريق IR', 'إعداد الأدوات', 'بناء Playbooks', 'التدريب', 'إنشاء Communication channels'] },
        { num: 2, name: 'Detection & Analysis (الكشف والتحليل)', items: ['مراقبة alerts', 'جمع المعلومات', 'تحديد ما إذا كانت حادثة فعلية', 'تحديد scope ابتدائي', 'تحديد severity'] },
        { num: 3, name: 'Containment (الاحتواء)', items: ['Short-term: عزل الأجهزة، حظر IPs، تعطيل حسابات', 'Long-term: إعداد بيئة نظيفة، تطبيق patches', 'توثيق كل خطوة'] },
        { num: 4, name: 'Eradication (الإزالة)', items: ['إزالة البرمجية الخبيثة', 'إزالة persistence', 'إزالة الحسابات الوهمية', 'معالجة الثغرات'] },
        { num: 5, name: 'Recovery (الاستعادة)', items: ['إعادة الأنظمة للعمل', 'مراقبة مكثفة', 'التحقق من السلامة', 'استعادة من backups إذا لزم'] },
        { num: 6, name: 'Post-Incident (الدروس المستفادة)', items: ['اجتماع post-mortem', 'توثيق الدروس', 'تحديث Playbooks', 'تحسين الكشف', 'تقرير نهائي'] },
      ].map((phase) => (
        <div key={phase.num} className="bg-gray-800/50 rounded-xl p-5 border border-gray-700 flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">{phase.num}</div>
          <div>
            <h3 className="text-lg font-bold text-white">{phase.name}</h3>
            <ul className="text-gray-300 text-sm mt-2 space-y-1">{phase.items.map((item, i) => <li key={i}>• {item}</li>)}</ul>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// === Phishing Investigation ===
export const SocPhishingSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>🎣</span>Phishing Investigation</h1>
    <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

    <div className="grid md:grid-cols-4 gap-3">
      {[
        { name: 'Spear Phishing', desc: 'موجه لشخص محدد' },
        { name: 'Whaling', desc: 'موجه لمسؤولين كبار' },
        { name: 'Clone Phishing', desc: 'نسخ إيميل شرعي وتعديله' },
        { name: 'BEC', desc: 'انتحال هوية مدير' },
      ].map((t, i) => (
        <div key={i} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 text-center">
          <p className="text-cyan-400 font-bold text-sm">{t.name}</p>
          <p className="text-gray-400 text-xs mt-1">{t.desc}</p>
        </div>
      ))}
    </div>

    <div className="space-y-4">
      {[
        { step: 1, title: 'لا تفتح المرفقات!', desc: 'استخدم Sandbox (any.run, hybrid-analysis) أو VM معزولة' },
        { step: 2, title: 'تحقق من Headers', desc: 'Return-Path, From vs Reply-To, SPF/DKIM/DMARC results. مختلفين = مشبوه' },
        { step: 3, title: 'تحليل Sender', desc: 'Domain مسجل حديثاً؟ Typosquatting؟ معروف من قبل؟' },
        { step: 4, title: 'تحليل المحتوى', desc: 'إلحاح شديد، تهديد، إغراء، أخطاء إملائية، ترجمة سيئة، تحية عامة' },
        { step: 5, title: 'تحليل الروابط', desc: 'لا تنقر! مرر الماوس. استخدم VirusTotal, URLscan.io. ابحث عن typosquatting' },
        { step: 6, title: 'تحليل المرفقات', desc: 'احسب hash → VirusTotal. فكّ ZIPs في sandbox. انتبه لـ macros و امتدادات مزدوجة (.pdf.exe)' },
        { step: 7, title: 'ابحث عن إيميلات مماثلة', desc: 'نفس Sender/Subject/Hash/URLs. كم مستخدم استلم؟ كم نقر؟' },
        { step: 8, title: 'الإجراءات', desc: 'حذف من inboxes. حظر Sender/URLs. إضافة hashes لـ blocklist. إعادة تعيين كلمات مرور' },
      ].map((s) => (
        <div key={s.step} className="bg-gray-800/50 rounded-xl p-5 border border-gray-700 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold flex-shrink-0">{s.step}</div>
          <div>
            <h3 className="text-white font-bold">{s.title}</h3>
            <p className="text-gray-300 text-sm mt-1">{s.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// === EDR/XDR Section ===
export const SocEDRSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>🔬</span>EDR و XDR للمحلل</h1>
    <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-blue-900/20 rounded-xl p-6 border border-blue-500/30">
        <h3 className="text-blue-400 font-bold mb-4">🖥️ EDR (Endpoint Detection & Response)</h3>
        <p className="text-gray-300 text-sm mb-4">أداة على كل جهاز تجمع: Process executions, File operations, Network connections, Registry changes, Memory operations</p>
        <h4 className="text-cyan-400 font-bold text-sm mb-2">أشهر EDRs:</h4>
        <ul className="text-gray-300 text-xs space-y-1">
          {['CrowdStrike Falcon', 'Microsoft Defender for Endpoint', 'SentinelOne', 'Carbon Black (VMware)', 'Cortex XDR (Palo Alto)', 'Cybereason'].map((e, i) => <li key={i}>• {e}</li>)}
        </ul>
      </div>
      <div className="bg-purple-900/20 rounded-xl p-6 border border-purple-500/30">
        <h3 className="text-purple-400 font-bold mb-4">🌐 XDR (Extended Detection & Response)</h3>
        <p className="text-gray-300 text-sm mb-4">يجمع EDR + Email + Network + Cloud + Identity. رؤية شاملة عبر طبقات متعددة.</p>
        <h4 className="text-cyan-400 font-bold text-sm mb-2">مهارات EDR للمحلل:</h4>
        <ul className="text-gray-300 text-xs space-y-1">
          {['قراءة Process Tree (Parent→Children)', 'Timeline Analysis', 'Threat Hunting Queries', 'Containment (عزل، إنهاء عمليات)', 'Forensic Collection (memory dump)'].map((s, i) => <li key={i}>• {s}</li>)}
        </ul>
      </div>
    </div>
  </div>
);

// === SOC Checklist Section ===
export const SocChecklistSection = () => {
  const items = [
    'أعرف 50+ مصطلح SOC بالإنجليزية', 'أفهم مستويات Tier 1, 2, 3', 'أعرف Alert Lifecycle كاملاً',
    'أفهم True/False/Benign Positive', 'أعرف SLA و KPIs الأساسية', 'أفهم Cyber Kill Chain وأطبقه',
    'أعرف Pyramid of Pain', 'أعرف Diamond Model', 'أتقن MITRE ATT&CK (10+ techniques)',
    'أعرف NIST IR Lifecycle', 'أعمل Triage في أقل من 15 دقيقة', 'أحدد متى أصعّد',
    'أكتب Incident Report محترف', 'أحلل Phishing email كامل', 'أتعامل مع IOCs بشكل صحيح',
    'أستخدم Wazuh بشكل أساسي', 'أكتب queries بـ KQL أو SPL', 'أستخدم VirusTotal و OTX',
    'أبني MITRE mapping لأي سيناريو', 'أحقق في Brute Force', 'أحقق في Suspicious PowerShell',
    'أحقق في Lateral Movement', 'أحقق في Phishing', 'رفعت 6+ تطبيقات على GitHub',
  ];

  const deliverables = [
    'triage-exercise-01.md', 'investigation-report-01.md', 'mitre-mapping-exercise.md',
    'wazuh-deployment.md مع screenshots', 'phishing-analysis-01.md', 'ioc-hunt-01.md',
    'soc-terminology-cheatsheet.md', 'incident-report-template.md', 'escalation-template.md',
  ];

  const interviewQA = [
    { q: 'ما الفرق بين IDS و IPS؟', a: 'IDS يكشف ويُنبّه. IPS يكشف ويحظر تلقائياً.' },
    { q: 'ما الفرق بين SIEM و SOAR؟', a: 'SIEM يجمع ويحلل logs. SOAR يضيف automation و orchestration.' },
    { q: 'ما الفرق بين EDR و XDR؟', a: 'EDR على endpoints فقط. XDR يشمل endpoints + network + email + cloud.' },
    { q: 'كيف تكشف Lateral Movement؟', a: 'Event 4624 Type 3 بين أجهزة، Event 4648، Event 7045 (PSEXESVC)' },
    { q: 'ما هي أهمية Pyramid of Pain؟', a: 'ركز على TTPs و Tools بدل مطاردة IPs و Hashes' },
    { q: 'ما هي علامات Ransomware؟', a: 'ملفات بامتدادات غريبة، ransom notes، Volume Shadow Copy deletion' },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>✅</span>Checklist SOC النهائية</h1>
      <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">📋 قائمة المهارات</h2>
        <div className="space-y-2">{items.map((item, i) => <ChecklistItem key={i} text={item} id={`soc-item-${i}`} />)}</div>
      </section>

      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">📁 المخرجات المطلوبة</h2>
        <div className="space-y-2">{deliverables.map((item, i) => <ChecklistItem key={i} text={item} id={`soc-del-${i}`} />)}</div>
      </section>

      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">💼 أسئلة المقابلات</h2>
        <div className="space-y-3">{interviewQA.map((qa, i) => (
          <div key={i} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <h3 className="text-cyan-400 font-bold text-sm mb-2">{qa.q}</h3>
            <p className="text-gray-300 text-sm">{qa.a}</p>
          </div>
        ))}</div>
      </section>

      <Alert type="golden" title="القاعدة الذهبية">
        <p className="text-xl font-bold">كمحلل SOC أنت: Detective 🔍 + Communicator 📢 + Decision Maker ⚡ + Documenter 📝</p>
        <p className="mt-2">النجاح ليس عن كم تعرف، بل عن: كم سريع تتفاعل، كم دقيق تحلل، كم واضح توثّق!</p>
      </Alert>
    </div>
  );
};
