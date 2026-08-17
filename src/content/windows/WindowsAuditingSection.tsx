import Alert from '../../components/Alert';
import CodeBlock from '../../components/CodeBlock';

const WindowsAuditingSection = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
        <span>⚙️</span>
        تفعيل Auditing
      </h1>

      <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

      <Alert type="danger" title="بدون Auditing لن ترى شيء!">
        الإعداد الافتراضي في Windows لا يسجل كل شيء. لازم تفعّل سياسات التدقيق Audit Policy.
      </Alert>

      {/* طرق التفعيل */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">طرق التفعيل</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-purple-900/20 rounded-xl p-6 border border-purple-500/30">
            <h3 className="text-purple-400 font-bold mb-4">🏢 في بيئة Domain (GPO)</h3>
            <code className="text-xs text-cyan-400 bg-gray-800 px-2 py-1 rounded block whitespace-pre-wrap">
{`Computer Configuration
→ Windows Settings
→ Security Settings
→ Advanced Audit Policy Configuration
→ System Audit Policies`}
            </code>
          </div>

          <div className="bg-blue-900/20 rounded-xl p-6 border border-blue-500/30">
            <h3 className="text-blue-400 font-bold mb-4">💻 في جهاز واحد</h3>
            <CodeBlock code="secpol.msc" />
            <p className="text-gray-400 text-sm mt-2">Local Security Policy</p>
          </div>
        </div>
      </section>

      {/* الإعدادات المهمة */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">📋 الإعدادات المهمة التي يجب تفعيلها</h2>

        <div className="space-y-4">
          {/* Account Logon */}
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h3 className="text-cyan-400 font-bold mb-4">🔐 Account Logon</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>✓ Audit Credential Validation: <span className="text-green-400">Success and Failure</span></li>
              <li>✓ Audit Kerberos Authentication Service: <span className="text-green-400">Success and Failure</span></li>
              <li>✓ Audit Kerberos Service Ticket Operations: <span className="text-green-400">Success and Failure</span></li>
            </ul>
          </div>

          {/* Account Management */}
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h3 className="text-cyan-400 font-bold mb-4">👤 Account Management</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>✓ Audit User Account Management: <span className="text-green-400">Success and Failure</span></li>
              <li>✓ Audit Security Group Management: <span className="text-green-400">Success and Failure</span></li>
              <li>✓ Audit Computer Account Management: <span className="text-green-400">Success</span></li>
            </ul>
          </div>

          {/* Detailed Tracking */}
          <div className="bg-red-900/20 rounded-xl p-6 border border-red-500/30">
            <h3 className="text-red-400 font-bold mb-4">⚙️ Detailed Tracking (مهم جداً)</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>✓ Audit Process Creation: <span className="text-green-400">Success</span> ⭐</li>
              <li>✓ Audit Process Termination: <span className="text-yellow-400">Success (اختياري)</span></li>
              <li>✓ Audit DPAPI Activity: <span className="text-green-400">Success</span></li>
              <li>✓ Audit RPC Events: <span className="text-green-400">Success</span></li>
            </ul>
          </div>

          {/* Logon/Logoff */}
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h3 className="text-cyan-400 font-bold mb-4">🔑 Logon/Logoff</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>✓ Audit Logon: <span className="text-green-400">Success and Failure</span></li>
              <li>✓ Audit Logoff: <span className="text-green-400">Success</span></li>
              <li>✓ Audit Account Lockout: <span className="text-green-400">Success</span></li>
              <li>✓ Audit Special Logon: <span className="text-green-400">Success</span></li>
            </ul>
          </div>

          {/* Policy Change */}
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h3 className="text-cyan-400 font-bold mb-4">📜 Policy Change</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>✓ Audit Audit Policy Change: <span className="text-green-400">Success and Failure</span></li>
              <li>✓ Audit Authentication Policy Change: <span className="text-green-400">Success</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* تفعيل Command Line */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">⭐ تفعيل Command Line في Event 4688</h2>

        <Alert type="golden" title="مهم جداً!">
          هذه الخطوة لا تأتي افتراضياً ولكنها ضرورية.
        </Alert>

        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-cyan-400 font-bold mb-4">الخطوات</h3>
          <CodeBlock
            title="عبر Group Policy"
            code={`gpedit.msc

Computer Configuration
→ Administrative Templates
→ System
→ Audit Process Creation
→ "Include command line in process creation events" : Enabled`}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="bg-red-900/20 rounded-xl p-4 border border-red-500/30">
            <h4 className="text-red-400 font-bold mb-2">❌ بدون التفعيل</h4>
            <code className="text-gray-400 text-sm">powershell.exe</code>
          </div>
          <div className="bg-green-900/20 rounded-xl p-4 border border-green-500/30">
            <h4 className="text-green-400 font-bold mb-2">✅ مع التفعيل</h4>
            <code className="text-green-400 text-sm">powershell.exe -ExecutionPolicy Bypass -EncodedCommand SQBFAFgA...</code>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WindowsAuditingSection;
