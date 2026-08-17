import CodeBlock from '../../components/CodeBlock';

const WindowsADSection = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
        <span>🏢</span>
        Active Directory للمحلل
      </h1>

      <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

      {/* المجموعات الحساسة */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">🚨 المجموعات الحساسة (راقبها دائماً)</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'Domain Admins', desc: 'تحكم كامل في الدومين', level: 'critical' },
            { name: 'Enterprise Admins', desc: 'تحكم في كل الـ Forest', level: 'critical' },
            { name: 'Schema Admins', desc: 'تعديل بنية AD', level: 'critical' },
            { name: 'Account Operators', desc: 'إدارة حسابات', level: 'high' },
            { name: 'Backup Operators', desc: 'نسخ احتياطية (قابلة للاستغلال)', level: 'high' },
            { name: 'Print Operators', desc: 'قد تستخدم للتصعيد', level: 'medium' },
          ].map((group, index) => (
            <div key={index} className={`rounded-xl p-4 border ${
              group.level === 'critical' ? 'bg-red-900/20 border-red-500/30' :
              group.level === 'high' ? 'bg-yellow-900/20 border-yellow-500/30' :
              'bg-gray-800/50 border-gray-700'
            }`}>
              <h3 className={`font-bold mb-2 ${
                group.level === 'critical' ? 'text-red-400' :
                group.level === 'high' ? 'text-yellow-400' : 'text-gray-300'
              }`}>{group.name}</h3>
              <p className="text-gray-400 text-sm">{group.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* هجمات AD */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">⚔️ هجمات AD الشائعة</h2>

        <div className="space-y-4">
          {/* Kerberoasting */}
          <div className="bg-red-900/20 rounded-xl p-6 border border-red-500/30">
            <h3 className="text-red-400 font-bold mb-3">1. Kerberoasting</h3>
            <p className="text-gray-300 text-sm mb-3">المهاجم يطلب tickets لخدمات ثم يكسرها offline</p>
            <div className="bg-gray-800/50 rounded p-3">
              <p className="text-cyan-400 text-sm font-bold mb-2">العلامات:</p>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• Event 4769 بكثرة من حساب واحد</li>
                <li>• RC4 encryption (نوع 0x17)</li>
              </ul>
            </div>
          </div>

          {/* Golden Ticket */}
          <div className="bg-red-900/20 rounded-xl p-6 border border-red-500/30">
            <h3 className="text-red-400 font-bold mb-3">2. Golden Ticket</h3>
            <p className="text-gray-300 text-sm mb-3">تزوير TGT</p>
            <div className="bg-gray-800/50 rounded p-3">
              <p className="text-cyan-400 text-sm font-bold mb-2">العلامات:</p>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• Tickets بمدة صلاحية غير طبيعية</li>
                <li>• استخدام حسابات غير موجودة</li>
              </ul>
            </div>
          </div>

          {/* DCSync */}
          <div className="bg-red-900/20 rounded-xl p-6 border border-red-500/30">
            <h3 className="text-red-400 font-bold mb-3">3. DCSync</h3>
            <p className="text-gray-300 text-sm mb-3">محاكاة DC لسحب password hashes</p>
            <div className="bg-gray-800/50 rounded p-3">
              <p className="text-cyan-400 text-sm font-bold mb-2">العلامات:</p>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• Event 4662 مع GUID خاصة بـ replication</li>
                <li>• من جهاز ليس DC</li>
              </ul>
            </div>
          </div>

          {/* Pass-the-Hash */}
          <div className="bg-yellow-900/20 rounded-xl p-6 border border-yellow-500/30">
            <h3 className="text-yellow-400 font-bold mb-3">4. Pass-the-Hash / Pass-the-Ticket</h3>
            <p className="text-gray-300 text-sm mb-3">استخدام hash أو ticket مسروق</p>
            <div className="bg-gray-800/50 rounded p-3">
              <p className="text-cyan-400 text-sm font-bold mb-2">العلامات:</p>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• Logon Type 3 من جهاز غير معتاد</li>
                <li>• Event 4624 بدون Event 4768 سابق</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* أوامر PowerShell لـ AD */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">💻 أوامر PowerShell لـ AD</h2>

        <CodeBlock
          title="عرض كل المستخدمين"
          code={`Get-ADUser -Filter * -Properties *`}
        />

        <CodeBlock
          title="أعضاء Domain Admins"
          code={`Get-ADGroupMember -Identity "Domain Admins"`}
        />

        <CodeBlock
          title="حسابات Don't Require Preauth (AS-REP Roasting)"
          code={`Get-ADUser -Filter {DoesNotRequirePreAuth -eq $true}`}
        />

        <CodeBlock
          title="حسابات لها SPN (Kerberoasting)"
          code={`Get-ADUser -Filter {ServicePrincipalName -ne "$null"} -Properties ServicePrincipalName`}
        />

        <CodeBlock
          title="حسابات بدون انتهاء صلاحية للكلمة"
          code={`Get-ADUser -Filter {PasswordNeverExpires -eq $true}`}
        />

        <CodeBlock
          title="الحسابات المقفلة"
          code={`Search-ADAccount -LockedOut`}
        />
      </section>
    </div>
  );
};

export default WindowsADSection;
