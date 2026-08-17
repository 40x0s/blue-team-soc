import Alert from '../../components/Alert';
import Table from '../../components/Table';

const WindowsLogonTypesSection = () => (
  <div className="space-y-10">
    <h1 className="flex items-center gap-3 text-3xl font-bold text-cyan-400"><span>🔐</span>Logon Types: آلية دخول لا حكم أمني</h1>
    <Alert type="golden">LogonType يصف نوع session في event، لا البروتوكول أو الشخص أو النية وحده. اقرأ Target/Subject، AuthenticationPackage، source، process، LogonId والtarget role.</Alert>

    <section className="space-y-4">
      <Table headers={['Type', 'الاسم', 'معنى عملي شائع', 'أسئلة التحقيق']} rows={[
        ['2', 'Interactive', 'دخول محلي/console', 'هل user/host/time متوقع؟ service account interactive؟'],
        ['3', 'Network', 'وصول شبكة مثل SMB وخدمات متعددة', 'أي protocol/share/service/source؟ نجاح access لاحق؟'],
        ['4', 'Batch', 'batch process مثل scheduled task', 'task/action/owner/change وexecution evidence؟'],
        ['5', 'Service', 'بدء service تحت account', 'service path/config/installation/expected account؟'],
        ['7', 'Unlock', 'فك قفل workstation', 'session الأصلية/device/user والتوقيت؟'],
        ['8', 'NetworkCleartext', 'credentials قُدمت بصيغة تسمح للpackage بالوصول للنص؛ لا يعني نقلها plaintext على الشبكة بالضرورة', 'package/app/TLS/config/necessity؟'],
        ['9', 'NewCredentials', 'token محلي مع alternate outbound credentials؛ runas /netonly مثال', 'process/target credentials/destinations/authorization؟'],
        ['10', 'RemoteInteractive', 'remote interactive مثل RDP/Terminal Services', 'source/gateway/VPN/session events/outcome؟'],
        ['11', 'CachedInteractive', 'domain user دخل اعتمادًا على cached credentials', 'هل DC unavailable؟ device/travel/baseline؟'],
        ['12', 'CachedRemoteInteractive', 'cached remote-interactive context حيث يظهر', 'دعم OS/provider والsession correlation؟'],
        ['13', 'CachedUnlock', 'unlock باستخدام cached credentials حيث يظهر', 'قارن OS/version/session الأصلية.'],
      ]} />
      <Alert type="info">ليست كل الأنواع شائعة في كل إصدار أو flow. Type 8 كثيرًا ما يُساء فهمه: الاسم لا يثبت أن password عبر الشبكة غير مشفر.</Alert>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">ثلاث فرضيات شائعة</h2>
      <Table headers={['Candidate', 'يرفع الفرضية', 'ما يمنع القفز للحكم']} rows={[
        ['RDP guessing', '4625 Type 10 بكثافة موزعة + source/user/reasons', 'gateway/NAT/user error/scanner؛ ابحث عن 4624 وsession/outcome.'],
        ['PsExec-like remote service', 'Type 3 + SMB + 7045/4697 + service/process على الهدف', 'deployment/admin tools تفعل ذلك؛ الاسم أو Type 3 وحده لا يكفي.'],
        ['Alternate credentials', '4648/Type 9 + process + destinations غير معتادة', 'runas/admin workflow مشروع؛ تحقق من owner/ticket ونتيجة target.'],
      ]} />
    </section>

    <section className="space-y-3">
      <h2 className="text-2xl font-bold text-white">تمرين إتقان</h2>
      <p className="text-sm leading-7 text-gray-300">اختر خمسة أحداث 4624 من fixture. لكل حدث اكتب: أين وُلد، TargetUserSid، type، source، package، LogonId، فرضية حميدة وضارة، والدليل المكمل. المرور: لا تستخدم type وحده في classification.</p>
    </section>
  </div>
);

export default WindowsLogonTypesSection;
