import Alert from '../../components/Alert';
import CodeBlock from '../../components/CodeBlock';

const WindowsInvestigationsSection = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
        <span>🕵️</span>
        تحقيقات شائعة على Windows
      </h1>

      <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

      {/* تحقيق 1: RDP Brute Force */}
      <section className="space-y-4">
        <div className="bg-red-900/20 rounded-xl p-6 border border-red-500/30">
          <h2 className="text-2xl font-bold text-red-400 mb-4">🔓 تحقيق 1: Brute Force على RDP</h2>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-800/50 rounded p-4">
              <h3 className="text-cyan-400 font-bold mb-2">المؤشرات</h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Event 4625 بكثرة</li>
                <li>• Logon Type 10</li>
                <li>• من نفس IP</li>
              </ul>
            </div>
            <div className="bg-gray-800/50 rounded p-4">
              <h3 className="text-cyan-400 font-bold mb-2">الإجراءات</h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>1. حظر IP في الجدار الناري</li>
                <li>2. تفعيل NLA</li>
                <li>3. تغيير منفذ RDP</li>
                <li>4. تفعيل Account Lockout</li>
              </ul>
            </div>
          </div>

          <CodeBlock
            title="الاستعلام"
            code={`Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4625} |
  Where-Object { $_.Properties[10].Value -eq 10 } |
  Group-Object { $_.Properties[19].Value } |
  Sort-Object Count -Descending`}
          />
        </div>
      </section>

      {/* تحقيق 2: PsExec */}
      <section className="space-y-4">
        <div className="bg-yellow-900/20 rounded-xl p-6 border border-yellow-500/30">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">🔀 تحقيق 2: Lateral Movement بـ PsExec</h2>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-800/50 rounded p-4">
              <h3 className="text-cyan-400 font-bold mb-2">المؤشرات</h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Event 7045 (خدمة PSEXESVC)</li>
                <li>• Event 4624 Logon Type 3</li>
                <li>• Event 4688 لـ psexec.exe</li>
              </ul>
            </div>
            <div className="bg-gray-800/50 rounded p-4">
              <h3 className="text-cyan-400 font-bold mb-2">الإجراءات</h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>1. تحديد المصدر والوجهة</li>
                <li>2. عزل الجهازين</li>
                <li>3. فحص الحساب المستخدم</li>
                <li>4. البحث على أجهزة أخرى</li>
              </ul>
            </div>
          </div>

          <CodeBlock
            title="الاستعلام"
            code={`# على الجهاز الهدف
Get-WinEvent -FilterHashtable @{LogName='System'; Id=7045} |
  Where-Object { $_.Message -match "PSEXESVC" }`}
          />
        </div>
      </section>

      {/* تحقيق 3: PowerShell Attack */}
      <section className="space-y-4">
        <div className="bg-purple-900/20 rounded-xl p-6 border border-purple-500/30">
          <h2 className="text-2xl font-bold text-purple-400 mb-4">💻 تحقيق 3: PowerShell Empire / Cobalt Strike</h2>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-800/50 rounded p-4">
              <h3 className="text-cyan-400 font-bold mb-2">المؤشرات</h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Event 4104 مع base64</li>
                <li>• Event 4688 مع encoded command</li>
                <li>• Sysmon Event 3 من powershell</li>
              </ul>
            </div>
            <div className="bg-gray-800/50 rounded p-4">
              <h3 className="text-cyan-400 font-bold mb-2">الإجراءات</h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>1. عزل الجهاز</li>
                <li>2. سحب memory dump</li>
                <li>3. تحليل الـ command المشفر</li>
                <li>4. البحث عن C2 servers</li>
              </ul>
            </div>
          </div>

          <CodeBlock
            title="الاستعلام"
            code={`Get-WinEvent -FilterHashtable @{
  LogName='Microsoft-Windows-PowerShell/Operational'
  Id=4104
} | Where-Object {
  $_.Message -match "FromBase64String|EncodedCommand|IEX|DownloadString"
}`}
          />
        </div>
      </section>

      {/* تحقيق 4: Credential Dumping */}
      <section className="space-y-4">
        <div className="bg-red-900/20 rounded-xl p-6 border border-red-500/30">
          <h2 className="text-2xl font-bold text-red-400 mb-4">🔑 تحقيق 4: Credential Dumping (Mimikatz)</h2>

          <Alert type="danger">
            هذا من أخطر الهجمات - يستخرج كلمات المرور من الذاكرة!
          </Alert>

          <div className="grid md:grid-cols-2 gap-4 mb-4 mt-4">
            <div className="bg-gray-800/50 rounded p-4">
              <h3 className="text-cyan-400 font-bold mb-2">المؤشرات</h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Sysmon Event 10: ProcessAccess على lsass.exe</li>
                <li>• Granted Access: 0x1010, 0x1410, 0x1438</li>
              </ul>
            </div>
            <div className="bg-gray-800/50 rounded p-4">
              <h3 className="text-cyan-400 font-bold mb-2">الإجراءات</h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>1. عزل الجهاز فوراً!</li>
                <li>2. تغيير كل كلمات المرور</li>
                <li>3. تفعيل Credential Guard</li>
                <li>4. فحص Lateral Movement</li>
              </ul>
            </div>
          </div>

          <CodeBlock
            title="الاستعلام"
            code={`Get-WinEvent -FilterHashtable @{
  LogName='Microsoft-Windows-Sysmon/Operational'
  Id=10
} | Where-Object { $_.Message -match "TargetImage:.*lsass\\.exe" }`}
          />
        </div>
      </section>

      {/* تحقيق 5: Persistence */}
      <section className="space-y-4">
        <div className="bg-orange-900/20 rounded-xl p-6 border border-orange-500/30">
          <h2 className="text-2xl font-bold text-orange-400 mb-4">📅 تحقيق 5: Persistence عبر Scheduled Task</h2>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-800/50 rounded p-4">
              <h3 className="text-cyan-400 font-bold mb-2">المؤشرات</h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Event 4698 لإنشاء مهمة</li>
                <li>• TaskScheduler Event 106</li>
                <li>• Sysmon Event 1 لـ schtasks.exe</li>
              </ul>
            </div>
            <div className="bg-gray-800/50 rounded p-4">
              <h3 className="text-cyan-400 font-bold mb-2">الإجراءات</h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>1. فحص محتوى المهمة</li>
                <li>2. إذا مشبوهة → حذفها</li>
                <li>3. البحث على أجهزة أخرى</li>
              </ul>
            </div>
          </div>

          <CodeBlock
            title="الاستعلام"
            code={`Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4698}`}
          />
        </div>
      </section>

      {/* تحقيق 6: Log Clearing */}
      <section className="space-y-4">
        <div className="bg-red-900/20 rounded-xl p-6 border border-red-500/30">
          <h2 className="text-2xl font-bold text-red-400 mb-4">🗑️ تحقيق 6: مسح Security Log</h2>

          <Alert type="danger">
            هذا دائماً مشبوه! المهاجم يحاول إخفاء آثاره.
          </Alert>

          <div className="mt-4">
            <CodeBlock
              title="الاستعلام"
              code={`Get-WinEvent -FilterHashtable @{LogName='Security'; Id=1102}`}
            />
          </div>

          <div className="bg-gray-800/50 rounded p-4 mt-4">
            <h3 className="text-cyan-400 font-bold mb-2">الإجراءات</h3>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>1. تحديد المستخدم الذي مسح السجل</li>
              <li>2. عزل الجهاز</li>
              <li>3. فحص Lateral Movement</li>
              <li>4. جمع السجلات من أجهزة أخرى</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WindowsInvestigationsSection;
