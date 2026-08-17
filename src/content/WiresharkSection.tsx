
import CodeBlock from '../components/CodeBlock';

const WiresharkSection: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
        <span>🦈</span>
        الجزء 9: Wireshark – Cheat Sheet كامل
      </h1>

      <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

      {/* Basic Filters */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Display Filters الأساسية</h2>

        {/* By Protocol */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-bold text-cyan-400 mb-4">حسب البروتوكول</h3>
          <CodeBlock
            code={`http
dns
tls
arp
icmp
smb
kerberos`}
          />
        </div>

        {/* By IP */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-bold text-cyan-400 mb-4">حسب الـ IP</h3>
          <CodeBlock
            code={`ip.addr == 192.168.1.10
ip.src == 192.168.1.10
ip.dst == 192.168.1.10
ip.addr == 192.168.1.0/24`}
          />
        </div>

        {/* By Port */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-bold text-cyan-400 mb-4">حسب الـ Port</h3>
          <CodeBlock
            code={`tcp.port == 443
udp.port == 53
tcp.dstport == 3389`}
          />
        </div>

        {/* Combining */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-bold text-cyan-400 mb-4">الجمع</h3>
          <CodeBlock
            code={`ip.src == 192.168.1.10 and tcp.port == 443
dns or tls
http and not ip.src == 192.168.1.10`}
          />
        </div>
      </section>

      {/* TCP Flags */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">TCP Flags</h2>
        <CodeBlock
          code={`tcp.flags.syn == 1
tcp.flags.reset == 1
tcp.flags.syn == 1 and tcp.flags.ack == 0    # SYN فقط
tcp.flags.syn == 1 and tcp.flags.ack == 1    # SYN-ACK`}
        />
      </section>

      {/* HTTP Filters */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">HTTP</h2>
        <CodeBlock
          code={`http.request.method == "GET"
http.request.method == "POST"
http.response.code == 404
http.host contains "google"
http.user_agent contains "curl"`}
        />
      </section>

      {/* DNS Filters */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">DNS</h2>
        <CodeBlock
          code={`dns.qry.name contains "evil"
dns.flags.rcode == 3                         # NXDOMAIN
dns.qry.type == 16                           # TXT records`}
        />
      </section>

      {/* TLS Filters */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">TLS</h2>
        <CodeBlock
          code={`tls.handshake.type == 1                      # ClientHello
tls.handshake.extensions_server_name contains "google"    # SNI`}
        />
      </section>

      {/* Statistics Menu */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">📊 Statistics المفيدة في Wireshark</h2>
        <p className="text-gray-400">من القائمة <code className="bg-gray-700 px-2 py-1 rounded">Statistics</code>:</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'Conversations', desc: 'أهم اتصالات', icon: '💬' },
            { name: 'Endpoints', desc: 'أهم أجهزة', icon: '📍' },
            { name: 'Protocol Hierarchy', desc: 'توزيع البروتوكولات', icon: '📊' },
            { name: 'I/O Graphs', desc: 'رسم بياني للترافيك', icon: '📈' },
            { name: 'Flow Graph', desc: 'تسلسل الاتصال', icon: '🔀' },
            { name: 'HTTP > Requests', desc: 'كل HTTP requests', icon: '🌐' },
          ].map((item, index) => (
            <div key={index} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="font-bold text-cyan-400">{item.name}</p>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Reference Card */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">🎯 Quick Reference Card</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-red-900/20 rounded-xl p-6 border border-red-500/30">
            <h3 className="text-lg font-bold text-red-400 mb-4">🚨 كشف Port Scan</h3>
            <CodeBlock
              code={`tcp.flags.syn == 1 and tcp.flags.ack == 0`}
            />
          </div>

          <div className="bg-orange-900/20 rounded-xl p-6 border border-orange-500/30">
            <h3 className="text-lg font-bold text-orange-400 mb-4">🔍 كشف DGA</h3>
            <CodeBlock
              code={`dns.flags.rcode == 3`}
            />
          </div>

          <div className="bg-yellow-900/20 rounded-xl p-6 border border-yellow-500/30">
            <h3 className="text-lg font-bold text-yellow-400 mb-4">🔐 كشف TLS Issues</h3>
            <CodeBlock
              code={`tls.alert_message`}
            />
          </div>

          <div className="bg-purple-900/20 rounded-xl p-6 border border-purple-500/30">
            <h3 className="text-lg font-bold text-purple-400 mb-4">📡 كشف Brute Force</h3>
            <CodeBlock
              code={`http.response.code == 401`}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default WiresharkSection;
