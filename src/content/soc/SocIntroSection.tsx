import Alert from '../../components/Alert';

const SocIntroSection = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
        <span>🛡️</span>
        SOC / Blue Team - النسخة الكاملة للمحلل Tier 1
      </h1>
      <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4">📋 تقييم الصفحة الأصلية</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-900/20 rounded-lg p-4 border border-green-500/30">
            <h3 className="text-green-400 font-bold mb-3">✅ الجيد فيها:</h3>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li>• التركيز على Workflow بدل الأدوات ممتاز</li>
              <li>• ذكر Triage Playbook ومتى تصعّد</li>
              <li>• شرح NIST Lifecycle مختصر ومفيد</li>
              <li>• ذكر MITRE ATT&CK والربط بالأدلة</li>
              <li>• تطبيق Wazuh العملي</li>
              <li>• ذكر Phishing Triage</li>
            </ul>
          </div>
          <div className="bg-red-900/20 rounded-lg p-4 border border-red-500/30">
            <h3 className="text-red-400 font-bold mb-3">❌ النواقص الحرجة:</h3>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li>• مفاهيم SOC مختصرة (Tier 1 vs 2 vs 3)</li>
              <li>• غياب Alert Lifecycle الكامل</li>
              <li>• غياب SLA و KPIs</li>
              <li>• MITRE ATT&CK مختصر جداً</li>
              <li>• غياب Pyramid of Pain و Kill Chain</li>
              <li>• غياب Diamond Model</li>
              <li>• غياب أمثلة Alerts كاملة</li>
              <li>• غياب EDR/XDR concepts</li>
              <li>• غياب True/False/Benign Positive</li>
              <li>• غياب المصطلحات الإنجليزية للحفظ</li>
            </ul>
          </div>
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">الفلسفة قبل البداية</h2>
        <Alert type="golden" title="أنت كمحلل SOC Tier 1 لست خبير اختراق">
          أنت <strong>بوابة الدفاع الأولى</strong>. مهمتك الأساسية:
        </Alert>
        <div className="grid md:grid-cols-5 gap-3">
          {[
            { icon: '📥', title: 'استقبال Alerts', desc: 'بسرعة' },
            { icon: '🔀', title: 'فرز Triage', desc: 'صحيح ودقيق' },
            { icon: '🔍', title: 'تحقيق أولي', desc: 'Investigation سريع' },
            { icon: '📝', title: 'توثيق', desc: 'Documentation محترف' },
            { icon: '⬆️', title: 'تصعيد', desc: 'للفريق المناسب' },
          ].map((item, i) => (
            <div key={i} className="bg-gray-800/50 rounded-lg p-4 text-center border border-gray-700">
              <div className="text-3xl mb-2">{item.icon}</div>
              <p className="text-cyan-400 font-bold text-sm">{item.title}</p>
              <p className="text-gray-400 text-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">📊 نجاحك يُقاس بـ:</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-cyan-900/20 rounded-lg p-4 border border-cyan-500/30">
            <h3 className="text-cyan-400 font-bold">MTTD</h3>
            <p className="text-gray-300 text-sm">Mean Time To Detect - سرعة الاكتشاف</p>
          </div>
          <div className="bg-cyan-900/20 rounded-lg p-4 border border-cyan-500/30">
            <h3 className="text-cyan-400 font-bold">Triage Accuracy</h3>
            <p className="text-gray-300 text-sm">دقة الفرز</p>
          </div>
          <div className="bg-cyan-900/20 rounded-lg p-4 border border-cyan-500/30">
            <h3 className="text-cyan-400 font-bold">Report Quality</h3>
            <p className="text-gray-300 text-sm">جودة التوثيق</p>
          </div>
          <div className="bg-red-900/20 rounded-lg p-4 border border-red-500/30">
            <h3 className="text-red-400 font-bold">قلة False Negatives</h3>
            <p className="text-gray-300 text-sm">تنبيهات حقيقية فاتت = الأخطر!</p>
          </div>
        </div>
      </section>
    </div>
  );
};
export default SocIntroSection;
