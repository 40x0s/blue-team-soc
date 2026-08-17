import Alert from '../../components/Alert';
import Table from '../../components/Table';
import CodeBlock from '../../components/CodeBlock';

const WindowsLogsSection = () => (
  <div className="space-y-10">
    <h1 className="flex items-center gap-3 text-3xl font-bold text-cyan-400"><span>📋</span>Windows Event Logs: المصدر والصحة والاحتفاظ</h1>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">1. Channels وليست «سجلًا واحدًا»</h2>
      <Table headers={['Channel/provider', 'قيمة محتملة', 'شرط/حد']} rows={[
        ['Security', 'logon، account/group، process/audit policy حسب الإعداد', 'Advanced Audit Policy والصلاحية والretention.'],
        ['System', 'services/drivers/start/stop وبعض OS providers', 'Event ID يتفسر مع ProviderName لا الرقم وحده.'],
        ['Application', 'أحداث apps المسجلة عبر providers', 'ليست بديلًا عن app audit/IIS/SQL logs المتخصصة.'],
        ['PowerShell/Operational', '4103/4104 عند policy/version المناسب', 'script block قد يتجزأ؛ text لا يثبت success.'],
        ['Sysmon/Operational', 'process/network/file/registry/DNS وفق config', 'ليس built-in default coverage ولا EDR.'],
        ['Defender/Operational', 'configuration/detection/remediation events', 'alert/result يتطلب product health وaction status.'],
        ['TaskScheduler/Operational', 'registration/action/task lifecycle', 'channel/config/version وSecurity auditing يؤثران.'],
        ['TerminalServices channels', 'connection/auth/session events', 'اربطها بـSecurity وRD Gateway/VPN؛ IDs تختلف بالقناة.'],
      ]} />
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">2. أين يولد الحدث؟</h2>
      <ul className="space-y-2 text-sm leading-7 text-gray-300">
        <li>• 4624/4625 يُسجلان على الجهاز الذي يعالج logon؛ fields والمصدر يختلفان حسب flow.</li>
        <li>• 4768/4769/4771 أحداث KDC على Domain Controller الذي عالج طلب Kerberos، وليست نسخة مضمونة لكل 4624/4625.</li>
        <li>• 4776 يسجل credential validation على authoritative system بحسب NTLM/account context.</li>
        <li>• process/file/service evidence يوجد غالبًا على endpoint الهدف؛ DC لا يملك تلقائيًا process tree الخاص بالworkstation.</li>
        <li>• WEF/agent/SIEM نسخ مركزية لها ingestion time/parser/duplicate/retention gaps؛ قارنها بالأصل عند الحاجة.</li>
      </ul>
      <Alert type="warning">لا تربط أحداثًا فقط لأنها متقاربة زمنيًا. استخدم LogonId/SID/user/device/source/process IDs/correlation IDs، مع إدراك أن كل حقل ليس متاحًا في كل قناة.</Alert>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">3. Health قبل البحث</h2>
      <CodeBlock language="powershell" code={`# مختبر/جهاز مصرح: inventory بلا تغيير
Get-WinEvent -ListLog Security,'Microsoft-Windows-PowerShell/Operational','Microsoft-Windows-Sysmon/Operational' -ErrorAction SilentlyContinue |
  Select-Object LogName,IsEnabled,RecordCount,FileSize,MaximumSizeInBytes,LogMode,LastWriteTime

auditpol /get /category:*
wevtutil gl Security
Get-Service EventLog -ErrorAction SilentlyContinue`} />
      <p className="text-sm text-gray-400">سجّل الأخطاء أيضًا: channel غير موجود يختلف عن channel موجود فارغ. راجع oldest/latest event وforwarder/agent heartbeat وparser fields وclock offset.</p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">4. حفظ evidence</h2>
      <CodeBlock language="powershell" code={`$Case='C:/SOC-Lab/CASE-001'
New-Item -ItemType Directory -Path $Case -Force | Out-Null
wevtutil epl Security "$Case/Security.evtx" /ow:true
Get-FileHash "$Case/Security.evtx" -Algorithm SHA256
# قيّد الوصول، اعمل على نسخة، ووثق host/time/exporter/window.`} />
      <Alert type="danger">EVTX قد يحتوي usernames/IPs/commands وبيانات حساسة. لا ترفعه علنًا؛ استخدم fixture أو مقتطفًا منقحًا مصرحًا، ولا تمسح السجل بعد التصدير.</Alert>
    </section>
  </div>
);

export default WindowsLogsSection;
