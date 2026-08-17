import Alert from '../../components/Alert';
import Table from '../../components/Table';

const WindowsIntroSection = () => (
  <div className="space-y-10">
    <header>
      <h1 className="flex items-center gap-3 text-3xl font-bold text-cyan-400"><span>🪟</span>Windows للمحلل: من الحدث إلى القضية</h1>
      <p className="mt-3 max-w-4xl text-lg leading-8 text-gray-300">الهدف ليس حفظ Event IDs، بل معرفة أين وُلد الحدث، لماذا قد يغيب، ما entity التي يصفها، وكيف تربطه بنتيجة قابلة للدفاع.</p>
    </header>

    <Alert type="golden">منهج كل تحقيق: alert claim → source health/schema/time → raw event → entity correlation → scope → hypotheses → authorized decision. لا تجعل اسم binary أو Event ID أو LogonType verdict.</Alert>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">الطبقات الخمس</h2>
      <Table headers={['طبقة', 'أسئلة L1', 'أمثلة evidence']} rows={[
        ['Identity', 'أي account/SID/domain/session؟ local أم domain/cloud؟', '4624/4625، Kerberos/NTLM، DC/VPN/IdP.'],
        ['Process', 'أي executable/entity/parent/user/arguments؟', '4688، Sysmon 1، PowerShell 4104، EDR.'],
        ['Object/change', 'أي file/registry/service/task/group؟ وهل change مصرح؟', '7045/4697/4698، Sysmon، audit/change ticket.'],
        ['Network', 'أي source/destination/process/result؟ proxy/NAT؟', 'Sysmon 3/22، firewall/proxy/DNS/PCAP.'],
        ['Outcome', 'هل نُفّذ/وصل/تغير state؟ وما النطاق؟', 'target telemetry، file hash، service/task run، app audit.'],
      ]} />
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">عقد الدليل قبل query</h2>
      <ul className="space-y-2 text-sm leading-7 text-gray-300">
        <li>• host role وOS/build وtimezone وclock sync.</li>
        <li>• channel/provider/EventID/version/RecordId ووقت الجمع.</li>
        <li>• audit policy وchannel enabled/retention/forwarding/sensor config.</li>
        <li>• raw EVTX/XML أو export موثوق + SHA-256، ثم working copy.</li>
        <li>• schema fields بالأسماء؛ لا تعتمد على Message locale أو Properties index عشوائي.</li>
      </ul>
      <Alert type="warning">Security وSysmon وPowerShell وEDR تتداخل ولا تتطابق. غياب event قد يكون policy/retention/permissions/filter/sensor gap؛ ووجود command لا يثبت outcome.</Alert>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">بوابة التعلّم</h2>
      <p className="text-gray-300">بعد الدروس نفّذ المختبرات الخمسة: failed logons، process creation، Sysmon، PowerShell، وpersistence. لكل واحد قدم provenance وtimeline وqueries وبديلين وقرارًا وحدودًا وcleanup، ثم اشرحه شفهيًا دون ملاحظات.</p>
    </section>
  </div>
);

export default WindowsIntroSection;
