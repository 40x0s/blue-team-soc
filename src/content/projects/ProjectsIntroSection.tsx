import Alert from '../../components/Alert';

const ProjectsIntroSection = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
        <span>🎯</span>
        Projects / Portfolio - النسخة الكاملة
      </h1>
      <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

      {/* تقييم */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4">📋 تقييم الصفحة الأصلية</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-900/20 rounded-lg p-4 border border-green-500/30">
            <h3 className="text-green-400 font-bold mb-3">✅ الجيد فيها:</h3>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li>• التركيز على "هذا الذي يوظفك" ممتاز</li>
              <li>• هيكل Repo مقترح فكرة ممتازة</li>
              <li>• Rubric للتقييم الذاتي مفيد</li>
              <li>• التشجيع على الكتابة بالعربي مع مصطلحات إنجليزية</li>
            </ul>
          </div>
          <div className="bg-red-900/20 rounded-lg p-4 border border-red-500/30">
            <h3 className="text-red-400 font-bold mb-3">❌ النواقص الحرجة:</h3>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li>• عدد المشاريع قليل جداً (4 فقط)</li>
              <li>• المشاريع سطحية ولا تكفي للتوظيف</li>
              <li>• غياب مشاريع Threat Hunting</li>
              <li>• غياب مشاريع Detection Engineering</li>
              <li>• غياب مشاريع IR كاملة</li>
              <li>• غياب شرح README احترافي</li>
              <li>• غياب CV / LinkedIn integration</li>
              <li>• غياب write-ups من المنصات</li>
            </ul>
          </div>
        </div>
      </div>

      {/* الفلسفة */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">الفلسفة قبل البداية</h2>

        <Alert type="golden" title="سر التوظيف">
          المُوظِف يحتاج <strong>30 ثانية</strong> يقرر فيها يكمل قراءة CV أو يرميه. في هذه الـ 30 ثانية، <strong>Portfolio قوي على GitHub</strong> يفرق بينك وبين 1000 متقدم آخر.
        </Alert>

        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <blockquote className="text-xl text-cyan-400 font-bold border-r-4 border-cyan-500 pr-4">
            أي شخص خلص دورة. لكن قليلون من يثبتون أنهم يستطيعون <strong>التطبيق فعلياً</strong>.
          </blockquote>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          {[
            { icon: '🧠', text: '"أنا فهمت"' },
            { icon: '⚙️', text: '"أنا طبّقت"' },
            { icon: '📝', text: '"أنا وثّقت"' },
            { icon: '✅', text: '"أنا جاهز للعمل"' },
          ].map((item, i) => (
            <div key={i} className="bg-gradient-to-b from-cyan-900/30 to-transparent rounded-xl p-6 border border-cyan-500/30 text-center">
              <div className="text-4xl mb-3">{item.icon}</div>
              <p className="text-white font-bold">{item.text}</p>
            </div>
          ))}
        </div>

        <Alert type="info" title='السؤال الذي يطرحه المُوظِف'>
          <p className="text-lg">"إذا وظفت هذا الشخص يوم الإثنين، هل يستطيع يبدأ Triage يوم الثلاثاء؟"</p>
          <p className="mt-2">البورتفوليو يجيب على هذا السؤال <strong>قبل المقابلة</strong>.</p>
        </Alert>
      </section>
    </div>
  );
};
export default ProjectsIntroSection;
