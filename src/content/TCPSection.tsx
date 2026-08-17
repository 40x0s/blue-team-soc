
import Alert from '../components/Alert';
import Table from '../components/Table';
import CodeBlock from '../components/CodeBlock';

const TCPSection: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
        <span>🔗</span>
        الجزء 4: TCP بعمق
      </h1>

      <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

      {/* Three-Way Handshake */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="text-cyan-500">4.1</span>
          الـ Three-Way Handshake
        </h2>

        <div className="bg-gradient-to-l from-blue-900/30 to-transparent rounded-xl p-6 border border-blue-500/30">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center w-full max-w-lg justify-between">
              <div className="bg-blue-900/50 p-4 rounded-lg text-center w-24">
                <div className="text-2xl mb-2">💻</div>
                <div className="text-sm text-blue-400">Client</div>
              </div>
              <div className="flex-1 px-4 text-center">
                <div className="text-green-400 text-sm">→ SYN (أبغى أتصل) →</div>
              </div>
              <div className="bg-green-900/50 p-4 rounded-lg text-center w-24">
                <div className="text-2xl mb-2">🖥️</div>
                <div className="text-sm text-green-400">Server</div>
              </div>
            </div>
            
            <div className="flex items-center w-full max-w-lg justify-between">
              <div className="w-24"></div>
              <div className="flex-1 px-4 text-center">
                <div className="text-yellow-400 text-sm">← SYN-ACK (تمام، أنا جاهز) ←</div>
              </div>
              <div className="w-24"></div>
            </div>
            
            <div className="flex items-center w-full max-w-lg justify-between">
              <div className="w-24"></div>
              <div className="flex-1 px-4 text-center">
                <div className="text-cyan-400 text-sm">→ ACK (شكراً، بديت) →</div>
              </div>
              <div className="w-24"></div>
            </div>
          </div>
        </div>

        <Alert type="info" title="في Wireshark:">
          <ul className="space-y-2">
            <li>• <code className="bg-gray-700 px-2 py-1 rounded">tcp.flags.syn == 1 and tcp.flags.ack == 0</code> → SYN فقط</li>
            <li>• <code className="bg-gray-700 px-2 py-1 rounded">tcp.flags.syn == 1 and tcp.flags.ack == 1</code> → SYN-ACK</li>
          </ul>
        </Alert>
      </section>

      {/* TCP Flags */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="text-cyan-500">4.2</span>
          TCP Flags (لازم تفهمها)
        </h2>

        <Table
          headers={['Flag', 'المعنى', 'متى تستخدم']}
          rows={[
            ['SYN', 'بدء اتصال', 'أول packet'],
            ['ACK', 'تأكيد استلام', 'في كل packet تقريباً'],
            ['FIN', 'إنهاء طبيعي', 'نهاية اتصال'],
            ['RST', 'إنهاء مفاجئ', 'رفض/خطأ'],
            ['PSH', 'ادفع البيانات فوراً', 'في HTTP, SSH'],
            ['URG', 'عاجل (نادر)', '-'],
          ]}
        />

        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-bold text-cyan-400 mb-4">📖 القراءة السلوكية في SOC</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-700/50 rounded-lg p-4">
              <p className="text-yellow-400 font-mono text-sm mb-2">SYN بدون SYN-ACK</p>
              <p className="text-gray-300 text-sm">= Port مغلق أو Firewall blocked</p>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4">
              <p className="text-yellow-400 font-mono text-sm mb-2">SYN-ACK بدون ACK</p>
              <p className="text-gray-300 text-sm">= SYN Flood attack محتمل</p>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4">
              <p className="text-red-400 font-mono text-sm mb-2">RST مباشرة بعد SYN</p>
              <p className="text-gray-300 text-sm">= Port مغلق صراحةً</p>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4">
              <p className="text-red-400 font-mono text-sm mb-2">كثير RST من جهاز واحد</p>
              <p className="text-gray-300 text-sm">= Port scan محتمل</p>
            </div>
          </div>
        </div>
      </section>

      {/* Port Scanning */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="text-cyan-500">4.3</span>
          Port Scanning – كيف تكتشفه؟
        </h2>

        <h3 className="text-lg font-bold text-white">أنواع الـ Scans</h3>

        <Table
          headers={['النوع', 'الوصف', 'العلامة في الترافيك']}
          rows={[
            ['TCP Connect', 'يكمل الـ handshake', 'SYN → SYN-ACK → ACK → RST'],
            ['SYN Scan (Stealth)', 'يرسل SYN ولا يكمل', 'SYN → SYN-ACK → RST'],
            ['FIN Scan', 'يرسل FIN فقط', 'FIN بدون handshake'],
            ['UDP Scan', 'يفحص UDP ports', 'UDP packets كثيرة'],
          ]}
        />

        <Alert type="danger" title="العلامات الواضحة في Wireshark">
          <ul className="space-y-2">
            <li>• جهاز واحد يرسل SYN لـ <strong>عدة ports</strong> بسرعة</li>
            <li>• أو لـ <strong>عدة IPs</strong> على نفس الـ port</li>
            <li>• نسبة RST عالية</li>
          </ul>
        </Alert>

        <CodeBlock
          title="Filter للكشف عن Port Scan"
          code={`tcp.flags.syn == 1 and tcp.flags.ack == 0`}
        />
      </section>

      {/* Retransmissions */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="text-cyan-500">4.4</span>
          Retransmissions و Resets
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-yellow-900/20 rounded-xl p-6 border border-yellow-500/30">
            <h3 className="text-lg font-bold text-yellow-400 mb-4">Retransmissions</h3>
            <p className="text-gray-300 mb-4">نفس الـ packet ينعاد إرساله = مشكلة شبكة أو حصار.</p>
            <CodeBlock
              code={`tcp.analysis.retransmission`}
            />
          </div>

          <div className="bg-red-900/20 rounded-xl p-6 border border-red-500/30">
            <h3 className="text-lg font-bold text-red-400 mb-4">Resets (RST)</h3>
            <ul className="text-gray-300 space-y-2">
              <li>• <strong>طبيعي:</strong> نهاية session</li>
              <li>• <strong>مشبوه:</strong> كثير RST من جهاز واحد = scan أو هجوم</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TCPSection;
