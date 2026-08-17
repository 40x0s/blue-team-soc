import { useState } from 'react';

const categories = [
  { name: 'أساسيات SOC', terms: [
    { en: 'SOC', ar: 'مركز عمليات الأمن السيبراني' },
    { en: 'Alert', ar: 'تنبيه أمني من نظام أو أداة' },
    { en: 'Event', ar: 'حدث مفرد في النظام (لا يعني خطر)' },
    { en: 'Incident', ar: 'حادثة أمنية مؤكدة' },
    { en: 'IOC (Indicator of Compromise)', ar: 'مؤشر اختراق - IP, hash, domain' },
    { en: 'IOA (Indicator of Attack)', ar: 'مؤشر هجوم - سلوك يدل على هجوم' },
    { en: 'TTPs', ar: 'تكتيكات وتقنيات وإجراءات المهاجمين' },
    { en: 'Threat Actor', ar: 'الجهة المهاجمة' },
    { en: 'APT', ar: 'تهديد متقدم مستمر' },
    { en: 'Triage', ar: 'الفرز الأولي للتنبيهات' },
    { en: 'Investigation', ar: 'التحقيق في التنبيه' },
    { en: 'Escalation', ar: 'التصعيد لمستوى أعلى' },
    { en: 'Playbook', ar: 'دليل خطوات لنوع معين من الحوادث' },
    { en: 'Runbook', ar: 'دليل تشغيل تفصيلي' },
  ]},
  { name: 'الاستجابة للحوادث', terms: [
    { en: 'Containment', ar: 'احتواء الحادثة' },
    { en: 'Eradication', ar: 'إزالة التهديد' },
    { en: 'Recovery', ar: 'استعادة العمليات' },
    { en: 'Lessons Learned', ar: 'الدروس المستفادة' },
    { en: 'IR (Incident Response)', ar: 'الاستجابة للحوادث' },
    { en: 'CSIRT', ar: 'فريق الاستجابة لحوادث أمن الحاسب' },
    { en: 'Dwell Time', ar: 'مدة بقاء المهاجم قبل الاكتشاف' },
    { en: 'MTTD', ar: 'متوسط وقت الاكتشاف' },
    { en: 'MTTR', ar: 'متوسط وقت الاستجابة' },
    { en: 'SLA', ar: 'اتفاقية مستوى الخدمة' },
    { en: 'SOP', ar: 'إجراء التشغيل القياسي' },
  ]},
  { name: 'الأدوات', terms: [
    { en: 'SIEM', ar: 'نظام إدارة معلومات وأحداث الأمن' },
    { en: 'SOAR', ar: 'نظام التنسيق والأتمتة والاستجابة' },
    { en: 'EDR', ar: 'كشف واستجابة على الأجهزة الطرفية' },
    { en: 'XDR', ar: 'كشف موسع عبر طبقات متعددة' },
    { en: 'MDR', ar: 'خدمة مُدارة للكشف والاستجابة' },
    { en: 'NDR', ar: 'كشف على مستوى الشبكة' },
    { en: 'IDS', ar: 'نظام كشف التسلل' },
    { en: 'IPS', ar: 'نظام منع التسلل' },
    { en: 'WAF', ar: 'جدار حماية تطبيقات الويب' },
    { en: 'DLP', ar: 'منع تسريب البيانات' },
    { en: 'CASB', ar: 'وسيط أمن الوصول السحابي' },
    { en: 'Sandbox', ar: 'بيئة معزولة لتحليل الملفات' },
  ]},
  { name: 'التصنيفات', terms: [
    { en: 'True Positive (TP)', ar: 'تنبيه صحيح لتهديد حقيقي' },
    { en: 'False Positive (FP)', ar: 'تنبيه خاطئ - ليس تهديد فعلي' },
    { en: 'True Negative (TN)', ar: 'عدم تنبيه عند عدم وجود تهديد' },
    { en: 'False Negative (FN)', ar: 'عدم تنبيه عند وجود تهديد (الأخطر)' },
    { en: 'Benign Positive (BP)', ar: 'تنبيه صحيح لكنه نشاط مشروع' },
    { en: 'Severity', ar: 'مستوى الخطورة' },
    { en: 'Priority', ar: 'الأولوية في المعالجة' },
    { en: 'Scope', ar: 'نطاق التأثير' },
  ]},
  { name: 'الهجمات', terms: [
    { en: 'Lateral Movement', ar: 'الحركة الجانبية بين الأجهزة' },
    { en: 'Privilege Escalation', ar: 'تصعيد الصلاحيات' },
    { en: 'Persistence', ar: 'البقاء في النظام' },
    { en: 'Exfiltration', ar: 'تسريب البيانات' },
    { en: 'C2', ar: 'خادم القيادة والتحكم' },
    { en: 'Beacon / Beaconing', ar: 'اتصال دوري بـ C2' },
    { en: 'Payload', ar: 'الحمولة الخبيثة' },
    { en: 'RAT', ar: 'حصان طروادة للوصول عن بعد' },
    { en: 'Ransomware', ar: 'برمجية الفدية' },
    { en: 'Phishing', ar: 'التصيد الاحتيالي' },
    { en: 'Spear Phishing', ar: 'تصيد موجه لشخص معين' },
    { en: 'Password Spraying', ar: 'تجريب كلمة مرور واحدة على حسابات كثيرة' },
    { en: 'Credential Stuffing', ar: 'تجريب كلمات مرور مسربة' },
    { en: 'Zero-Day', ar: 'ثغرة غير معروفة سابقاً' },
    { en: 'Rootkit', ar: 'أداة إخفاء بصلاحيات عالية' },
  ]},
  { name: 'Threat Intel', terms: [
    { en: 'Threat Hunting', ar: 'البحث الاستباقي عن التهديدات' },
    { en: 'OSINT', ar: 'معلومات من مصادر مفتوحة' },
    { en: 'CTI', ar: 'معلومات التهديدات السيبرانية' },
    { en: 'TLP', ar: 'بروتوكول تصنيف المعلومات' },
    { en: 'CVE', ar: 'رقم تعريف الثغرة' },
    { en: 'CVSS', ar: 'نظام تقييم الثغرات' },
    { en: 'Baseline', ar: 'خط الأساس للسلوك الطبيعي' },
    { en: 'Anomaly', ar: 'شذوذ عن السلوك الطبيعي' },
  ]},
  { name: 'الهوية والوصول', terms: [
    { en: 'IAM', ar: 'إدارة الهوية والوصول' },
    { en: 'PAM', ar: 'إدارة الوصول المميز' },
    { en: 'MFA', ar: 'المصادقة متعددة العوامل' },
    { en: 'SSO', ar: 'الدخول الموحد' },
    { en: 'Allowlist', ar: 'قائمة المسموح' },
    { en: 'Blocklist', ar: 'قائمة الممنوع' },
    { en: 'DMZ', ar: 'المنطقة المنزوعة السلاح في الشبكة' },
  ]},
  { name: 'الامتثال', terms: [
    { en: 'PII', ar: 'معلومات التعريف الشخصية' },
    { en: 'GDPR', ar: 'لائحة حماية البيانات الأوروبية' },
    { en: 'HIPAA', ar: 'قانون حماية البيانات الصحية الأمريكي' },
    { en: 'PCI-DSS', ar: 'معيار أمان بيانات بطاقات الدفع' },
    { en: 'ISO 27001', ar: 'معيار أمن المعلومات' },
    { en: 'NIST', ar: 'المعهد الوطني الأمريكي للمعايير' },
    { en: 'Hardening', ar: 'تشديد الإعدادات الأمنية' },
    { en: 'Patch', ar: 'ترقيع/تحديث أمني' },
    { en: 'Quarantine', ar: 'عزل ملف مشبوه' },
  ]},
];

const SocTermsSection = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [search, setSearch] = useState('');

  const allTerms = categories.flatMap(c => c.terms);
  const filteredTerms = search
    ? allTerms.filter(t => t.en.toLowerCase().includes(search.toLowerCase()) || t.ar.includes(search))
    : categories[activeCategory].terms;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
        <span>📖</span>
        المصطلحات الأساسية (للحفظ)
      </h1>
      <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

      <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
        <input
          type="text"
          placeholder="🔍 ابحث عن مصطلح..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
          dir="auto"
        />
      </div>

      {!search && (
        <div className="flex flex-wrap gap-2">
          {categories.map((cat, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(index)}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                activeCategory === index
                  ? 'bg-cyan-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {cat.name} ({cat.terms.length})
            </button>
          ))}
        </div>
      )}

      <div className="bg-gray-800/50 rounded-xl p-2 border border-gray-700">
        <p className="text-gray-400 text-sm p-3">
          {search ? `${filteredTerms.length} نتيجة` : `${categories[activeCategory].name} - ${filteredTerms.length} مصطلح`}
        </p>
        <div className="grid gap-1">
          {filteredTerms.map((term, index) => (
            <div key={index} className="flex items-center gap-4 p-3 hover:bg-gray-700/50 rounded-lg transition-colors">
              <span className="font-mono text-cyan-400 font-bold text-sm min-w-[250px]" dir="ltr">{term.en}</span>
              <span className="text-gray-300 text-sm">{term.ar}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 text-center">
        <p className="text-gray-400 text-sm">
          إجمالي المصطلحات: <strong className="text-cyan-400">{allTerms.length}</strong> مصطلح
        </p>
      </div>
    </div>
  );
};
export default SocTermsSection;
