
import Alert from '../components/Alert';

const PortsSection: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
        <span>🔌</span>
        الجزء 2: Ports & Protocols الشائعة
      </h1>
      <p className="text-gray-400">مرجع لازم تحفظه</p>

      <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

      <Alert type="info">
        هذه قائمة بأهم الـ Ports التي ستواجهها يومياً كمحلل أمني. احفظها!
      </Alert>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-800">
              <th className="px-4 py-3 text-right text-cyan-400 font-semibold border-b border-gray-700">Port</th>
              <th className="px-4 py-3 text-right text-cyan-400 font-semibold border-b border-gray-700">Protocol</th>
              <th className="px-4 py-3 text-right text-cyan-400 font-semibold border-b border-gray-700">الاستخدام</th>
              <th className="px-4 py-3 text-right text-cyan-400 font-semibold border-b border-gray-700">علامة مشبوهة</th>
            </tr>
          </thead>
          <tbody>
            {[
              { port: '20/21', proto: 'FTP', use: 'نقل ملفات', sus: 'Cleartext credentials', color: 'yellow' },
              { port: '22', proto: 'SSH', use: 'Remote admin', sus: 'Brute force, unusual sources', color: '' },
              { port: '23', proto: 'Telnet', use: 'Remote (قديم)', sus: 'يجب ما يستخدم أبداً', color: 'red' },
              { port: '25', proto: 'SMTP', use: 'إرسال إيميل', sus: 'Spam, exfiltration', color: '' },
              { port: '53', proto: 'DNS', use: 'حل أسماء', sus: 'DNS tunneling, DGA', color: 'yellow' },
              { port: '67/68', proto: 'DHCP', use: 'توزيع IP', sus: 'Rogue DHCP', color: '' },
              { port: '80', proto: 'HTTP', use: 'ويب', sus: 'Cleartext data', color: 'yellow' },
              { port: '88', proto: 'Kerberos', use: 'AD auth', sus: 'Golden/Silver ticket', color: 'red' },
              { port: '110/143', proto: 'POP3/IMAP', use: 'استقبال إيميل', sus: 'Credentials', color: '' },
              { port: '135', proto: 'RPC', use: 'Windows RPC', sus: 'Lateral movement', color: 'yellow' },
              { port: '137-139', proto: 'NetBIOS', use: 'شبكات Windows', sus: 'قديم، مشبوه', color: 'red' },
              { port: '389', proto: 'LDAP', use: 'AD queries', sus: 'LDAP enumeration', color: '' },
              { port: '443', proto: 'HTTPS', use: 'ويب مشفر', sus: 'C2 over HTTPS', color: 'yellow' },
              { port: '445', proto: 'SMB', use: 'مشاركة ملفات Windows', sus: 'EternalBlue, Lateral movement', color: 'red' },
              { port: '464', proto: 'Kerberos password', use: 'تغيير كلمات السر', sus: '-', color: '' },
              { port: '636', proto: 'LDAPS', use: 'LDAP مشفر', sus: '-', color: '' },
              { port: '1433', proto: 'MSSQL', use: 'قواعد بيانات', sus: 'SQL injection follow-up', color: '' },
              { port: '3306', proto: 'MySQL', use: 'قواعد بيانات', sus: '-', color: '' },
              { port: '3389', proto: 'RDP', use: 'Remote Desktop', sus: 'Brute force, Lateral movement', color: 'red' },
              { port: '5985/5986', proto: 'WinRM', use: 'PowerShell remoting', sus: 'Lateral movement', color: 'yellow' },
              { port: '8080/8443', proto: 'HTTP/HTTPS Alt', use: 'Proxies', sus: 'C2', color: '' },
            ].map((row, index) => (
              <tr
                key={index}
                className={`border-b border-gray-800 hover:bg-gray-800/50 transition-colors ${
                  row.color === 'red' ? 'bg-red-900/10' :
                  row.color === 'yellow' ? 'bg-yellow-900/10' : ''
                }`}
              >
                <td className="px-4 py-3 font-mono text-cyan-300 font-bold">{row.port}</td>
                <td className="px-4 py-3 text-purple-400">{row.proto}</td>
                <td className="px-4 py-3 text-gray-300">{row.use}</td>
                <td className={`px-4 py-3 ${
                  row.color === 'red' ? 'text-red-400' :
                  row.color === 'yellow' ? 'text-yellow-400' : 'text-gray-400'
                }`}>{row.sus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Alert type="golden" title="القاعدة الذهبية للمحلل">
        أي <strong>Port غير مألوف</strong> يطلع من جهاز مستخدم عادي = <strong>يستحق التحقيق</strong>.
      </Alert>

      <div className="bg-red-900/20 rounded-xl p-6 border border-red-500/30">
        <h3 className="text-lg font-bold text-red-400 mb-4">🚨 مثال تطبيقي:</h3>
        <p className="text-gray-300">
          لاب توب موظف يفتح اتصال على Port <code className="bg-gray-700 px-2 py-1 rounded text-red-400">4444</code> (Metasploit default)
        </p>
        <p className="text-2xl mt-4">→ 🚨 <strong className="text-red-400">يستحق تحقيق فوري!</strong></p>
      </div>

      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 mt-8">
        <h3 className="text-lg font-bold text-cyan-400 mb-4">📊 Ports مقسمة حسب الخطورة</h3>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-red-900/20 rounded-lg p-4 border border-red-500/30">
            <h4 className="text-red-400 font-bold mb-3">🔴 عالية الخطورة</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• 23 (Telnet)</li>
              <li>• 445 (SMB)</li>
              <li>• 3389 (RDP)</li>
              <li>• 88 (Kerberos)</li>
              <li>• 137-139 (NetBIOS)</li>
            </ul>
          </div>
          
          <div className="bg-yellow-900/20 rounded-lg p-4 border border-yellow-500/30">
            <h4 className="text-yellow-400 font-bold mb-3">🟡 متوسطة الخطورة</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• 21 (FTP)</li>
              <li>• 53 (DNS)</li>
              <li>• 80 (HTTP)</li>
              <li>• 135 (RPC)</li>
              <li>• 5985 (WinRM)</li>
            </ul>
          </div>
          
          <div className="bg-green-900/20 rounded-lg p-4 border border-green-500/30">
            <h4 className="text-green-400 font-bold mb-3">🟢 عادية (لكن راقبها)</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• 443 (HTTPS)</li>
              <li>• 22 (SSH)</li>
              <li>• 389 (LDAP)</li>
              <li>• 636 (LDAPS)</li>
              <li>• 25 (SMTP)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortsSection;
