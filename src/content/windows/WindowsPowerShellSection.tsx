import Alert from '../../components/Alert';
import CodeBlock from '../../components/CodeBlock';

const WindowsPowerShellSection = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
        <span>💻</span>
        PowerShell Logging بعمق
      </h1>

      <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

      <Alert type="danger" title="أهمية PowerShell Logging">
        PowerShell هو السلاح الأول للمهاجمين الحديثين لأنه:
        <ul className="mt-2 space-y-1">
          <li>• مثبت افتراضياً</li>
          <li>• موثوق من النظام</li>
          <li>• لا يحتاج تنزيل أدوات</li>
          <li>• يستطيع تنفيذ كل شيء</li>
        </ul>
      </Alert>

      {/* أنواع Logging */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">الأنواع الثلاثة لـ PowerShell Logging</h2>

        <div className="space-y-4">
          {/* Module Logging */}
          <div className="bg-blue-900/20 rounded-xl p-6 border border-blue-500/30">
            <h3 className="text-blue-400 font-bold mb-4">1. Module Logging</h3>
            <p className="text-gray-300 text-sm mb-4">يسجل استدعاءات الموديولات (cmdlets المستخدمة)</p>
            <CodeBlock
              title="التفعيل عبر GPO"
              code={`Computer Configuration
→ Administrative Templates
→ Windows Components
→ Windows PowerShell
→ Turn on Module Logging: Enabled`}
            />
            <p className="text-cyan-400 text-sm mt-2">يفعّل: Event ID 4103</p>
          </div>

          {/* Script Block Logging */}
          <div className="bg-red-900/20 rounded-xl p-6 border border-red-500/30">
            <h3 className="text-red-400 font-bold mb-4">2. Script Block Logging ⭐ (الأهم)</h3>
            <p className="text-gray-300 text-sm mb-4">يسجل محتوى السكربت الكامل حتى لو كان مشفر!</p>
            <CodeBlock
              title="التفعيل"
              code={`Computer Configuration
→ Administrative Templates
→ Windows Components
→ Windows PowerShell
→ Turn on PowerShell Script Block Logging: Enabled`}
            />
            <p className="text-cyan-400 text-sm mt-2">يفعّل: Event ID 4104</p>
          </div>

          {/* Transcription */}
          <div className="bg-purple-900/20 rounded-xl p-6 border border-purple-500/30">
            <h3 className="text-purple-400 font-bold mb-4">3. Transcription</h3>
            <p className="text-gray-300 text-sm mb-4">يسجل كل ما يحدث في PowerShell session كاملاً</p>
            <CodeBlock
              title="التفعيل"
              code={`Computer Configuration
→ Administrative Templates
→ Windows Components
→ Windows PowerShell
→ Turn on PowerShell Transcription: Enabled`}
            />
          </div>
        </div>
      </section>

      {/* مكان السجلات */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">📍 مكان سجلات PowerShell</h2>

        <CodeBlock
          code={`Event Viewer
→ Applications and Services Logs
→ Microsoft
→ Windows
→ PowerShell
→ Operational`}
        />
      </section>

      {/* علامات مشبوهة */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">🚨 علامات مشبوهة (ماذا تبحث عنه)</h2>

        <div className="grid md:grid-cols-2 gap-4">
          {/* EncodedCommand */}
          <div className="bg-red-900/20 rounded-xl p-6 border border-red-500/30">
            <h3 className="text-red-400 font-bold mb-3">1. أوامر مشفرة EncodedCommand</h3>
            <CodeBlock code={`powershell -EncodedCommand <base64>`} />
            <p className="text-red-300 text-sm mt-2">🚨 كل EncodedCommand مشبوه!</p>
          </div>

          {/* Bypass */}
          <div className="bg-red-900/20 rounded-xl p-6 border border-red-500/30">
            <h3 className="text-red-400 font-bold mb-3">2. Execution Policy Bypass</h3>
            <CodeBlock code={`powershell -ExecutionPolicy Bypass
powershell -ep Bypass
powershell -nop -ep Bypass`} />
          </div>

          {/* Hidden */}
          <div className="bg-yellow-900/20 rounded-xl p-6 border border-yellow-500/30">
            <h3 className="text-yellow-400 font-bold mb-3">3. Hidden Window</h3>
            <CodeBlock code={`powershell -WindowStyle Hidden
powershell -w hidden`} />
          </div>

          {/* Download */}
          <div className="bg-red-900/20 rounded-xl p-6 border border-red-500/30">
            <h3 className="text-red-400 font-bold mb-3">4. تنزيل وتنفيذ مباشر</h3>
            <CodeBlock code={`IEX (New-Object Net.WebClient).DownloadString('http://...')
Invoke-Expression (Invoke-WebRequest ...)
iex (iwr ...)`} />
          </div>

          {/* Mimikatz */}
          <div className="bg-red-900/20 rounded-xl p-6 border border-red-500/30">
            <h3 className="text-red-400 font-bold mb-3">5. Mimikatz</h3>
            <p className="text-gray-300 text-sm">أي ذكر لـ Mimikatz أو Invoke-Mimikatz</p>
            <p className="text-red-300 text-sm mt-2">🚨 إنذار حرج!</p>
          </div>

          {/* AMSI Bypass */}
          <div className="bg-red-900/20 rounded-xl p-6 border border-red-500/30">
            <h3 className="text-red-400 font-bold mb-3">6. AMSI Bypass</h3>
            <CodeBlock code={`[Ref].Assembly.GetType('System.Management.Automation.AmsiUtils')`} />
          </div>

          {/* Reflection */}
          <div className="bg-yellow-900/20 rounded-xl p-6 border border-yellow-500/30">
            <h3 className="text-yellow-400 font-bold mb-3">7. Reflection و Assembly</h3>
            <CodeBlock code={`[System.Reflection.Assembly]::Load`} />
          </div>

          {/* WMI */}
          <div className="bg-yellow-900/20 rounded-xl p-6 border border-yellow-500/30">
            <h3 className="text-yellow-400 font-bold mb-3">8. WMI للهجوم</h3>
            <CodeBlock code={`Invoke-WmiMethod
Get-WmiObject Win32_Process`} />
          </div>
        </div>
      </section>

      {/* استعلام البحث */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">🔍 استعلام للبحث عن المشبوه</h2>

        <CodeBlock
          title="PowerShell Query"
          code={`Get-WinEvent -FilterHashtable @{
  LogName='Microsoft-Windows-PowerShell/Operational'
  Id=4104
} | Where-Object {
  $_.Message -match 'DownloadString|FromBase64String|IEX|Invoke-Expression|EncodedCommand|Mimikatz|AmsiUtils'
} | Select-Object TimeCreated, Message`}
        />
      </section>
    </div>
  );
};

export default WindowsPowerShellSection;
