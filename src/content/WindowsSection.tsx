
import Alert from '../components/Alert';
import CodeBlock from '../components/CodeBlock';

const WindowsSection: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
        <span>🪟</span>
        الجزء 7: SMB, RDP, Kerberos
      </h1>
      <p className="text-gray-400">مهمين جداً للمحلل</p>

      <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

      {/* SMB Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="text-cyan-500">7.1</span>
          SMB (Server Message Block) – Port 445
        </h2>

        <div className="bg-red-900/20 rounded-xl p-6 border border-red-500/30">
          <h3 className="text-lg font-bold text-red-400 mb-4">🚨 ليش مهم؟</h3>
          <ul className="space-y-2 text-gray-300">
            <li>• مشاركة الملفات في Windows</li>
            <li>• <strong>Lateral Movement</strong> الرئيسي للمهاجمين</li>
            <li>• <strong>EternalBlue (WannaCry)</strong> كان عبر SMB</li>
          </ul>
        </div>

        <Alert type="danger" title="علامات مشبوهة في SMB">
          <ul className="space-y-2">
            <li>• SMB connections بين أجهزة مستخدمين (workstation to workstation)</li>
            <li>• SMB لمشاركات إدارية: <code className="bg-gray-700 px-2 py-1 rounded text-red-400">C$</code>, <code className="bg-gray-700 px-2 py-1 rounded text-red-400">ADMIN$</code>, <code className="bg-gray-700 px-2 py-1 rounded text-red-400">IPC$</code></li>
            <li>• استخدام SMBv1 (قديم وخطير)</li>
          </ul>
        </Alert>

        <CodeBlock
          title="Wireshark filters للـ SMB"
          code={`smb
smb2`}
        />
      </section>

      {/* RDP Section */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="text-cyan-500">7.2</span>
          RDP (Remote Desktop) – Port 3389
        </h2>

        <div className="bg-orange-900/20 rounded-xl p-6 border border-orange-500/30">
          <h3 className="text-lg font-bold text-orange-400 mb-4">⚠️ ليش مهم؟</h3>
          <ul className="space-y-2 text-gray-300">
            <li>• <strong>أكثر vector للهجوم على الشركات</strong></li>
            <li>• Brute force دائم</li>
            <li>• Ransomware groups يدخلون عبر RDP</li>
          </ul>
        </div>

        <Alert type="danger" title="علامات مشبوهة في RDP">
          <ul className="space-y-2">
            <li>• RDP من <strong>IPs خارجية</strong> غريبة</li>
            <li>• محاولات brute force (كثير اتصالات فاشلة)</li>
            <li>• RDP في <strong>أوقات غير عمل</strong></li>
            <li>• RDP من <strong>بلدان غير معتادة</strong></li>
          </ul>
        </Alert>

        <CodeBlock
          title="Wireshark filter للـ RDP"
          code={`tcp.port == 3389`}
        />
      </section>

      {/* Kerberos Section */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="text-cyan-500">7.3</span>
          Kerberos – Ports 88, 464
        </h2>

        <div className="bg-purple-900/20 rounded-xl p-6 border border-purple-500/30">
          <h3 className="text-lg font-bold text-purple-400 mb-4">🔐 ليش مهم؟</h3>
          <ul className="space-y-2 text-gray-300">
            <li>• نظام المصادقة في Active Directory</li>
            <li className="mt-4"><strong>هجمات شهيرة:</strong></li>
            <ul className="mr-4 space-y-1">
              <li>- <strong>Kerberoasting</strong> (سرقة service tickets)</li>
              <li>- <strong>Golden Ticket</strong> (تزوير TGT)</li>
              <li>- <strong>Silver Ticket</strong> (تزوير service tickets)</li>
              <li>- <strong>AS-REP Roasting</strong></li>
            </ul>
          </ul>
        </div>

        <Alert type="warning" title="علامات مشبوهة في Kerberos">
          <ul className="space-y-2">
            <li>• كثرة طلبات tickets من جهاز واحد</li>
            <li>• Tickets بمدة صلاحية غير طبيعية</li>
            <li>• Encryption ضعيف (RC4 بدل AES)</li>
          </ul>
        </Alert>

        <CodeBlock
          title="Wireshark filter للـ Kerberos"
          code={`kerberos`}
        />
      </section>

      {/* Visual Summary */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-white mb-6">📊 ملخص مرئي</h2>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-b from-red-900/30 to-transparent rounded-xl p-6 border border-red-500/30 text-center">
            <div className="text-4xl mb-4">📁</div>
            <h3 className="text-xl font-bold text-red-400 mb-2">SMB</h3>
            <p className="text-2xl font-mono text-white mb-2">445</p>
            <p className="text-gray-400 text-sm">ملفات + Lateral Movement</p>
            <div className="mt-4 p-2 bg-red-900/50 rounded text-xs text-red-300">
              C$, ADMIN$, IPC$
            </div>
          </div>

          <div className="bg-gradient-to-b from-orange-900/30 to-transparent rounded-xl p-6 border border-orange-500/30 text-center">
            <div className="text-4xl mb-4">🖥️</div>
            <h3 className="text-xl font-bold text-orange-400 mb-2">RDP</h3>
            <p className="text-2xl font-mono text-white mb-2">3389</p>
            <p className="text-gray-400 text-sm">Remote Desktop</p>
            <div className="mt-4 p-2 bg-orange-900/50 rounded text-xs text-orange-300">
              Brute Force Target #1
            </div>
          </div>

          <div className="bg-gradient-to-b from-purple-900/30 to-transparent rounded-xl p-6 border border-purple-500/30 text-center">
            <div className="text-4xl mb-4">🎟️</div>
            <h3 className="text-xl font-bold text-purple-400 mb-2">Kerberos</h3>
            <p className="text-2xl font-mono text-white mb-2">88</p>
            <p className="text-gray-400 text-sm">AD Authentication</p>
            <div className="mt-4 p-2 bg-purple-900/50 rounded text-xs text-purple-300">
              Golden/Silver Tickets
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WindowsSection;
