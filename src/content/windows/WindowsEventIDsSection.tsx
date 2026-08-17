import Alert from '../../components/Alert';
import Table from '../../components/Table';

const WindowsEventIDsSection = () => (
  <div className="space-y-10">
    <h1 className="flex items-center gap-3 text-3xl font-bold text-cyan-400"><span>🔢</span>Event IDs كعقود بيانات لا قائمة حفظ</h1>
    <Alert type="warning">فسّر المفتاح المركب: Provider + Channel + EventID + Version + fields + policy. الرقم نفسه قد يختلف بين providers، وMessage مترجم/قابل للتغير؛ افحص XML وdocumentation للنسخة.</Alert>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Authentication وsession</h2>
      <Table headers={['Event', 'Observation', 'حقول/ربط', 'لا يثبت']} rows={[
        ['4624 Security', 'logon ناجح على ذلك النظام', 'TargetUserSid/Name، LogonType، LogonId، IpAddress، AuthenticationPackage', 'هوية الشخص أو أن session ضار.'],
        ['4625 Security', 'logon فشل', 'Status/SubStatus، user، source، type، process', 'brute force أو compromise منفردًا.'],
        ['4634/4647', 'session انتهت/طلب user logoff وفق الحدث', 'LogonId + host + time', 'مدة دقيقة دائمًا أو clean exit.'],
        ['4648', 'محاولة logon باستخدام explicit credentials', 'subject/target/process/server', 'credential theft أو PsExec وحده.'],
        ['4672', 'special privileges assigned to new logon', 'SubjectLogonId → 4624', 'Domain Admin interactive؛ يظهر لحسابات وخدمات.'],
        ['4740', 'domain/local account lockout حسب موضع الحدث', 'CallerComputerName/account/DC/time', 'سبب واحد دون failures/policy.'],
        ['4768/4769/4771', 'TGT/TGS/pre-auth flows على KDC', 'client/address/service/options/status/encryption', 'roasting أو login success منفردًا.'],
        ['4776', 'credential validation event', 'package/workstation/account/status', 'أن كل NTLM network flow ظاهر.'],
      ]} />
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Execution وتغيير state</h2>
      <Table headers={['Event/source', 'Observation', 'دليل مكمل']} rows={[
        ['4688 Security', 'process creation عند تفعيل policy', 'command line policy، parent IDs، LogonId، Sysmon/EDR outcome.'],
        ['4697 Security / 7045 System', 'service installation وفق provider/audit', 'ServiceName/ImagePath/account/start، file/signer/hash/change/execution.'],
        ['4698–4702 Security', 'scheduled task create/delete/enable/disable/update', 'Task XML/name/principal/action + TaskScheduler/4688 run evidence.'],
        ['1102 Security / 104 System provider-specific', 'log clear event', 'actor/LogonId/change/central copies/service/config; أولوية عالية لا maliciousness تلقائي.'],
        ['4719 Security', 'system audit policy changed', 'subcategory/change/GPO/source/resulting coverage/approval.'],
        ['4720/4722/4725/4726/4738', 'account lifecycle/change', 'subject/target/domain/attributes/change ticket/subsequent use.'],
        ['4728/4732/4756 وغيرها', 'member added بحسب group scope', 'member SID/group/actor/DC/approval؛ افحص إزالة/تعديل أيضًا.'],
        ['4103/4104 PowerShell', 'module/script-block telemetry عند التفعيل', 'MessageNumber/Total، host/runspace، 4688/Sysmon/network/file outcome.'],
      ]} />
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">طريقة قراءة أي Event</h2>
      <ol className="space-y-2 text-sm leading-7 text-gray-300">
        <li>1. أكد provider/channel/version وaudit setting.</li>
        <li>2. احتفظ بـRecordId/Computer/TimeCreated والـraw XML.</li>
        <li>3. حوّل EventData حسب Name، واحفظ null و“-” كفجوة لا كقيمة مخترعة.</li>
        <li>4. حدّد subject مقابل target وIDs القابلة للربط.</li>
        <li>5. فسّر status/options وفق الوثائق والإصدار.</li>
        <li>6. ابحث عن نتيجة مستقلة وbaseline/change ثم scope عبر fleet.</li>
      </ol>
    </section>
  </div>
);

export default WindowsEventIDsSection;
