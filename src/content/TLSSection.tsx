
import Alert from '../components/Alert';
import Table from '../components/Table';
import CodeBlock from '../components/CodeBlock';

const TLSSection: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
        <span>🔒</span>
        الجزء 5: TLS / HTTPS بعمق
      </h1>

      <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

      {/* Why TLS is hard */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="text-cyan-500">5.1</span>
          ليش TLS صعب على SOC؟
        </h2>

        <Alert type="warning">
          <p className="text-xl font-bold">TLS يخفي محتوى HTTP عنك.</p>
          <p className="mt-2">أنت كمحلل لا تشوف ماذا يطلب المستخدم بالضبط.</p>
        </Alert>

        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-bold text-green-400 mb-4">✅ لكن تشوف:</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-700/50 rounded-lg p-4">
              <p className="text-cyan-400 font-bold">SNI</p>
              <p className="text-gray-300 text-sm">اسم الموقع</p>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4">
              <p className="text-cyan-400 font-bold">Certificate</p>
              <p className="text-gray-300 text-sm">الشهادة</p>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4">
              <p className="text-cyan-400 font-bold">JA3 fingerprint</p>
              <p className="text-gray-300 text-sm">بصمة العميل</p>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4">
              <p className="text-cyan-400 font-bold">Sizes & timing</p>
              <p className="text-gray-300 text-sm">الأحجام والأوقات</p>
            </div>
          </div>
        </div>
      </section>

      {/* TLS Handshake */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="text-cyan-500">5.2</span>
          TLS Handshake
        </h2>

        <div className="bg-gradient-to-l from-purple-900/30 to-transparent rounded-xl p-6 border border-purple-500/30">
          <div className="space-y-4">
            {[
              { num: 1, direction: '→', text: 'ClientHello', desc: '"أنا أدعم هذه الـ ciphers، وأريد الاتصال بـ SNI=example.com"' },
              { num: 2, direction: '←', text: 'ServerHello', desc: '"اخترنا هذا الـ cipher، وهذه شهادتي"' },
              { num: 3, direction: '→', text: 'تحقق + مفتاح', desc: 'تحقق من الشهادة + يولد المفتاح' },
              { num: 4, direction: '←', text: 'Finished', desc: 'السيرفر يؤكد' },
              { num: 5, direction: '↔', text: '✅ مشفر', desc: 'القناة مشفرة' },
            ].map((step) => (
              <div key={step.num} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
                  {step.num}
                </div>
                <div className="flex-1 bg-gray-800/50 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <span className="text-purple-400">{step.direction}</span>
                    <span className="text-white font-bold">{step.text}</span>
                  </div>
                  <p className="text-gray-400 text-sm mt-1">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Table
          headers={['الحقل', 'الموقع', 'ليش مهم']}
          rows={[
            ['SNI', 'ClientHello', 'اسم الموقع الحقيقي'],
            ['JA3', 'ClientHello', 'بصمة العميل (يكشف malware)'],
            ['Cipher Suites', 'كلاهما', 'Ciphers ضعيفة = إنذار'],
            ['Certificate', 'ServerHello', 'Self-signed = مشبوه'],
            ['TLS Version', 'كلاهما', 'TLS 1.0/1.1 = قديم وضعيف'],
          ]}
          highlight={[0, 1]}
        />
      </section>

      {/* TLS Failures */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="text-cyan-500">5.3</span>
          أسباب فشل TLS (شائعة في الـ Troubleshooting)
        </h2>

        <Table
          headers={['السبب', 'الأعراض', 'الحل']}
          rows={[
            ['Certificate expired', '"Your connection is not private"', 'جدد الشهادة'],
            ['Self-signed', 'تحذير في المتصفح', 'أضف للـ trust store'],
            ['Clock skew', 'الوقت غلط', 'اضبط NTP'],
            ['TLS version mismatch', 'فشل handshake', 'حدّث'],
            ['Cipher mismatch', 'فشل handshake', 'فعّل ciphers جديدة'],
            ['SNI mismatch', 'شهادة لـ domain ثاني', 'تحقق من الـ DNS'],
          ]}
        />
      </section>

      {/* C2 over HTTPS */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="text-cyan-500">5.4</span>
          الكشف عن C2 over HTTPS
        </h2>

        <Alert type="danger">
          المهاجمين الحديثين يستخدمون HTTPS عشان يختبئون. لكن في علامات:
        </Alert>

        <div className="bg-red-900/20 rounded-xl p-6 border border-red-500/30">
          <h3 className="text-lg font-bold text-red-400 mb-4">🚨 علامات Beaconing (اتصال دوري بـ C2)</h3>
          <ul className="space-y-2 text-gray-300">
            <li>• اتصالات بنفس الـ IP/Domain <strong>كل X دقيقة بانتظام</strong></li>
            <li>• أحجام packets <strong>ثابتة</strong></li>
            <li>• في <strong>أوقات غير عمل</strong></li>
            <li>• إلى Domains <strong>مسجلة حديثاً</strong></li>
          </ul>
        </div>

        <div className="bg-purple-900/20 rounded-xl p-6 border border-purple-500/30 mt-4">
          <h3 className="text-lg font-bold text-purple-400 mb-4">🔍 JA3 Fingerprints</h3>
          <ul className="space-y-2 text-gray-300">
            <li>• بصمة TLS من Client side</li>
            <li>• كل client مكتبة TLS لها JA3 فريدة</li>
            <li>• <strong>Malware معروف له JA3 معروف</strong></li>
            <li>• مثال: Cobalt Strike له JA3 معروفة</li>
          </ul>
        </div>
      </section>

      {/* Wireshark Filters */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="text-cyan-500">5.5</span>
          Wireshark filters للـ TLS
        </h2>

        <CodeBlock
          title="TLS Wireshark Filters"
          code={`tls                                    # كل TLS
tls.handshake                          # handshakes فقط
tls.handshake.type == 1                # ClientHello
tls.handshake.type == 2                # ServerHello
tls.handshake.extensions_server_name contains "google"  # SNI
tls.alert_message                      # رسائل الأخطاء`}
        />
      </section>
    </div>
  );
};

export default TLSSection;
