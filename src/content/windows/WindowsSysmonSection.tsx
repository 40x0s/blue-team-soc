import Alert from '../../components/Alert';
import CodeBlock from '../../components/CodeBlock';

const WindowsSysmonSection = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
        <span>🔬</span>
        Sysmon بعمق
      </h1>

      <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

      <Alert type="golden" title="ما هو Sysmon؟">
        System Monitor من Sysinternals (Microsoft) يضيف تفاصيل عميقة جداً عن العمليات والشبكة والملفات.
        يعطيك قدرة شبه EDR مجانية!
      </Alert>

      {/* التثبيت */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">تثبيت Sysmon</h2>

        <CodeBlock
          title="التحميل"
          code={`# من Microsoft
https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon`}
        />

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-yellow-900/20 rounded-xl p-4 border border-yellow-500/30">
            <h3 className="text-yellow-400 font-bold mb-3">❌ تثبيت افتراضي (غير مستحسن)</h3>
            <CodeBlock code={`sysmon -i -accepteula`} />
          </div>

          <div className="bg-green-900/20 rounded-xl p-4 border border-green-500/30">
            <h3 className="text-green-400 font-bold mb-3">✅ تثبيت بإعدادات احترافية</h3>
            <CodeBlock code={`# استخدم إعدادات SwiftOnSecurity
sysmon -i sysmonconfig-export.xml -accepteula`} />
          </div>
        </div>

        <Alert type="info">
          إعدادات موصى بها:
          <br />• <strong>SwiftOnSecurity:</strong> github.com/SwiftOnSecurity/sysmon-config
          <br />• <strong>Olaf Hartong (الأشمل):</strong> github.com/olafhartong/sysmon-modular
        </Alert>
      </section>

      {/* Event IDs */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">🔢 Sysmon Event IDs الكاملة</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-800">
                <th className="px-4 py-2 text-right text-cyan-400">ID</th>
                <th className="px-4 py-2 text-right text-cyan-400">الحدث</th>
                <th className="px-4 py-2 text-right text-cyan-400">الأهمية</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: '1', name: 'Process Create', imp: '⭐⭐⭐', note: 'الأهم - كل عملية جديدة' },
                { id: '2', name: 'File creation time changed', imp: '⭐', note: 'Timestomping' },
                { id: '3', name: 'Network connection', imp: '⭐⭐⭐', note: 'كل اتصال شبكي' },
                { id: '4', name: 'Sysmon service state changed', imp: '⭐⭐', note: 'محاولة إيقاف Sysmon' },
                { id: '5', name: 'Process terminated', imp: '⭐', note: '' },
                { id: '6', name: 'Driver loaded', imp: '⭐⭐', note: 'Rootkits' },
                { id: '7', name: 'Image loaded (DLL)', imp: '⭐⭐', note: 'DLL injection' },
                { id: '8', name: 'CreateRemoteThread', imp: '⭐⭐⭐', note: 'Process injection' },
                { id: '10', name: 'ProcessAccess', imp: '⭐⭐⭐', note: 'Credential dumping (Mimikatz)' },
                { id: '11', name: 'FileCreate', imp: '⭐⭐', note: 'إنشاء ملفات' },
                { id: '12-14', name: 'Registry Events', imp: '⭐⭐', note: 'Persistence' },
                { id: '17-18', name: 'Pipe Events', imp: '⭐', note: 'Named pipes' },
                { id: '19-21', name: 'WMI Events', imp: '⭐⭐', note: 'WMI persistence' },
                { id: '22', name: 'DNSEvent', imp: '⭐⭐⭐', note: 'DNS queries - C2 detection' },
                { id: '23', name: 'FileDelete', imp: '⭐', note: '' },
              ].map((event, index) => (
                <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/50">
                  <td className="px-4 py-2 font-mono text-green-400 font-bold">{event.id}</td>
                  <td className="px-4 py-2 text-white">{event.name}</td>
                  <td className="px-4 py-2">
                    <span className="text-yellow-400">{event.imp}</span>
                    <span className="text-gray-400 text-xs mr-2">{event.note}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* استعلامات مهمة */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">🔍 استعلامات Sysmon المهمة</h2>

        <CodeBlock
          title="كل العمليات الجديدة"
          code={`Get-WinEvent -FilterHashtable @{
  LogName='Microsoft-Windows-Sysmon/Operational'
  Id=1
} -MaxEvents 100`}
        />

        <CodeBlock
          title="اتصالات شبكية لـ powershell.exe"
          code={`Get-WinEvent -FilterHashtable @{
  LogName='Microsoft-Windows-Sysmon/Operational'
  Id=3
} | Where-Object { $_.Message -match "powershell" }`}
        />

        <CodeBlock
          title="عمليات من Office (Macro malware)"
          code={`Get-WinEvent -FilterHashtable @{
  LogName='Microsoft-Windows-Sysmon/Operational'
  Id=1
} | Where-Object {
  $_.Message -match "ParentImage:.*\\\\(WINWORD|EXCEL|POWERPNT|OUTLOOK)\\.EXE"
}`}
        />

        <CodeBlock
          title="استعلامات DNS"
          code={`Get-WinEvent -FilterHashtable @{
  LogName='Microsoft-Windows-Sysmon/Operational'
  Id=22
} | Select-Object TimeCreated, @{
  Name='Query'
  Expression={ if ($_.Message -match "QueryName: (.+)") { $matches[1] } }
}`}
        />

        <CodeBlock
          title="ProcessAccess على lsass (Credential Dumping)"
          code={`Get-WinEvent -FilterHashtable @{
  LogName='Microsoft-Windows-Sysmon/Operational'
  Id=10
} | Where-Object { $_.Message -match "TargetImage:.*lsass\\.exe" }`}
        />
      </section>
    </div>
  );
};

export default WindowsSysmonSection;
