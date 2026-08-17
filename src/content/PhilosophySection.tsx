
import Alert from '../components/Alert';

const PhilosophySection: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
        <span>🎯</span>
        الشبكات للمحلل الأمني SOC – النسخة الكاملة
      </h1>

      <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

      <h2 className="text-2xl font-bold text-white mt-8">الفلسفة قبل ما نبدأ</h2>

      <Alert type="golden" title="نقطة مهمة جداً">
        <p>أنت <strong>مو مهندس شبكات</strong>. أنت محلل أمني.</p>
      </Alert>

      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-bold text-white mb-4">فرقك عن مهندس الشبكات:</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-700/50 rounded-lg p-4 border-r-4 border-blue-500">
            <p className="text-blue-400 font-bold mb-2">👷 مهندس الشبكات يهتم:</p>
            <p className="text-gray-300">"كيف أخلي الشبكة تشتغل؟"</p>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-4 border-r-4 border-red-500">
            <p className="text-red-400 font-bold mb-2">🔍 أنت تهتم:</p>
            <p className="text-white font-bold">"هل هذا الترافيك طبيعي ولا مشبوه؟"</p>
          </div>
        </div>
      </div>

      <Alert type="info">
        <p className="text-lg">
          كل ما تتعلمه في هذا القسم، اسأل نفسك:
        </p>
        <blockquote className="mt-3 pr-4 border-r-4 border-cyan-500 text-cyan-300 font-bold text-xl">
          "كيف يساعدني هذا في كشف هجوم أو تحقيق في حادثة؟"
        </blockquote>
      </Alert>

      <div className="mt-8 p-6 bg-gradient-to-l from-cyan-900/30 to-transparent rounded-xl border border-cyan-500/30">
        <h3 className="text-xl font-bold text-cyan-400 mb-4">📋 تقييم صفحة Networking</h3>
        
        <div className="mb-6">
          <h4 className="text-green-400 font-bold mb-2">✅ الجيد فيها:</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
            <li>التركيز على "فهم القصة من الـ packet" بدل حفظ OSI – ممتاز</li>
            <li>الترتيب: DNS → TCP → TLS → HTTP منطقي جداً</li>
            <li>Cheat sheet لفلاتر Wireshark موجود</li>
            <li>فيه Labs عملية</li>
          </ul>
        </div>

        <div>
          <h4 className="text-red-400 font-bold mb-2">❌ النواقص الحرجة (مكملة هنا):</h4>
          <ol className="list-decimal list-inside space-y-1 text-gray-300 text-sm">
            <li>المحتوى مختصر جداً – عناوين أكثر من شرح فعلي</li>
            <li>ناقص: ARP, ICMP, DHCP (مهمة في SOC)</li>
            <li>ناقص: Ports & Protocols الشائعة (SMB, RDP, LDAP, Kerberos...)</li>
            <li>ناقص: HTTP/TLS Troubleshooting بعمق</li>
            <li>ناقص: Retransmissions, RST, Resets</li>
            <li>ناقص: تحليل PCAP خطوة بخطوة</li>
            <li>ناقص: Indicators of Compromise في الشبكة</li>
            <li>ناقص: Beaconing, C2 traffic basics</li>
            <li>ناقص: Suspicious DNS patterns (DGA, DNS tunneling)</li>
            <li>ناقص: مقارنة بين HTTP/HTTPS من ناحية SOC visibility</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default PhilosophySection;
