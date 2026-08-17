import Alert from '../../components/Alert';
import Table from '../../components/Table';
import CodeBlock from '../../components/CodeBlock';

const WindowsADSection = () => (
  <div className="space-y-10">
    <h1 className="flex items-center gap-3 text-3xl font-bold text-cyan-400"><span>🏢</span>Active Directory للمحقق: الهوية والاعتماد والحدود</h1>
    <p className="text-lg leading-8 text-gray-300">AD DS يربط users/computers/groups/services/policy ضمن domains وforests. بالنسبة لـL1، الأساس هو فهم authoritative source ومسار authentication وprivilege graph، لا تنفيذ تغييرات إدارة.</p>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">خريطة المفاهيم</h2>
      <Table headers={['مفهوم', 'ما يعنيه للتحقيق', 'خطأ شائع']} rows={[
        ['Domain/Forest/Trust', 'حدود naming/administration وعلاقات ثقة محددة', 'اعتبار forest=company أو trust=unrestricted access.'],
        ['DC/KDC', 'يعالج LDAP/DNS/Kerberos وخدمات أخرى حسب الدور', 'القول إن DC يرى كل process أو كل logon.'],
        ['SID', 'معرّف أمني أقوى للربط من display name', 'الربط بالاسم فقط بعد rename أو بين domains.'],
        ['Group scope/nesting', 'privilege قد يأتي غير مباشر', 'فحص عضوية direct فقط أو اسم المجموعة فقط.'],
        ['GPO', 'سياسات مرتبطة sites/domains/OUs مع inheritance/filtering', 'استنتاج effective policy من GPO واحدة.'],
        ['SPN/service account', 'يربط service instance بهوية Kerberos', 'اعتبار كل 4769/RC4 Kerberoasting.'],
        ['Computer account', 'هوية جهاز تنتهي غالبًا بـ$', 'اعتبارها username غريبًا تلقائيًا.'],
      ]} />
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Kerberos baseline مبسط</h2>
      <ol className="space-y-2 text-sm leading-7 text-gray-300">
        <li>1. AS exchange يطلب TGT؛ KDC policy/pre-auth/time/account state تحدد النتيجة.</li>
        <li>2. TGS exchange يطلب service ticket لـSPN؛ الطلب طبيعي جدًا.</li>
        <li>3. العميل يقدم ticket للخدمة؛ service/endpoint logs تلزم لإثبات access/outcome.</li>
      </ol>
      <Alert type="info">4768/4769/4771 على KDC تصف مراحل، لا شخصًا أو compromise. اجمع requester/device/SPNs/count/encryption/status/account policy/endpoint outcome. NTLM قد يظهر في flows أخرى، والـcloud/Entra له telemetry منفصلة.</Alert>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Read-only triage بتفويض</h2>
      <CodeBlock language="powershell" code={`# يتطلب RSAT/ActiveDirectory وصلاحيات قراءة؛ قيد النطاق والخصائص
Get-ADUser -Identity 'alice' -Properties Enabled,LastLogonTimestamp,PasswordLastSet,MemberOf |
  Select-Object SamAccountName,SID,Enabled,LastLogonTimestamp,PasswordLastSet,MemberOf

Get-ADComputer -Identity 'WS-01' -Properties Enabled,OperatingSystem,LastLogonTimestamp |
  Select-Object Name,SID,Enabled,OperatingSystem,LastLogonTimestamp

Get-ADGroupMember -Identity 'Domain Admins' -Recursive |
  Select-Object objectClass,Name,distinguishedName`} />
      <ul className="space-y-2 text-sm leading-7 text-gray-300">
        <li>• LastLogonTimestamp replicated/approximate؛ ليس ساعة تحقيق دقيقة. افهم attribute semantics قبل الحكم.</li>
        <li>• العضوية الحالية لا تثبت العضوية وقت الحادث؛ احتج change events/audit/history.</li>
        <li>• replication latency/DC selection/time skew تفسر بعض الاختلافات.</li>
        <li>• لا تستخدم <code>-Properties *</code> أو forest-wide enumeration بلا حاجة وتفويض؛ قلل البيانات.</li>
      </ul>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Identity triage</h2>
      <Table headers={['سؤال', 'Evidence']} rows={[
        ['من actor/target؟', 'SID/UPN/domain/device/service principal وalias/rename context.'],
        ['ما التغيير؟', 'group/account/GPO/audit events + قبل/بعد + DC + change ticket.'],
        ['هل استُخدم الامتياز؟', 'subsequent logon/ticket/process/resource access على target.'],
        ['ما النطاق؟', 'نفس actor/source/target group/service عبر DCs/endpoints/window.'],
        ['ما القرار؟', 'facts + alternatives + confidence + owner؛ disable/reset فقط وفق playbook.'],
      ]} />
    </section>
  </div>
);

export default WindowsADSection;
