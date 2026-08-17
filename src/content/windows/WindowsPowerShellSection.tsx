import Alert from '../../components/Alert';
import CodeBlock from '../../components/CodeBlock';
import Table from '../../components/Table';

const WindowsPowerShellSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>💻</span>PowerShell Telemetry والتحقيق</h1>
    <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

    <Alert type="warning" title="PowerShell أداة إدارة قبل أن تكون إشارة أمنية">
      يستخدمها مسؤولو الأنظمة وفرق النشر والحماية والمهاجمون. اسم <span dir="ltr">powershell.exe</span> أو Base64 أو ExecutionPolicy وحده لا يصنع verdict. حلّل <strong>المحتوى + parent/child + الهوية + التوقيع والمسار + الشبكة والملفات + baseline/change</strong>.
    </Alert>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">1. طبقات الرؤية: كل مصدر يجيب سؤالًا مختلفًا</h2>
      <Table headers={['المصدر', 'ماذا يعطيك؟', 'الحدود']} rows={[
        ['Security 4688 / Sysmon 1', 'process, command line, parent, user, IDs/hashes حسب المصدر', 'CommandLine تحتاج policy؛ process telemetry لا يعرض دائمًا script content'],
        ['PowerShell 4104 — Script Block', 'النص الذي عالجه PowerShell وقد يظهر بعد بعض مراحل فك الإبهام', 'قد يكون متعدد الأجزاء؛ غيابه يعني policy/retention/version gap لا سلامة'],
        ['PowerShell 4103 — Module', 'pipeline/module/cmdlet details حسب الإعداد', 'حجم كبير ومحتوى يعتمد على module logging configuration'],
        ['Transcription', 'نص input/output للجلسة في ملفات transcript', 'قد يجمع أسرارًا وبيانات شخصية؛ يحتاج ACL/retention/central collection'],
        ['AMSI/EDR', 'فحص/telemetry إضافية أثناء runtime', 'المنتج والسياسة والإصدار والتكامل تحدد الرؤية؛ ليست بديلًا عن logs'],
      ]} />
      <CodeBlock title="تحقق من policy والقنوات بلا تغييرها" language="powershell" code={`reg query "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\PowerShell\\ScriptBlockLogging"
reg query "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\PowerShell\\ModuleLogging"
reg query "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\PowerShell\\Transcription"
Get-WinEvent -ListLog 'Microsoft-Windows-PowerShell/Operational' |
  Select-Object LogName,IsEnabled,RecordCount,FileSize,MaximumSizeInBytes,LastWriteTime

auditpol /get /subcategory:"Process Creation"
reg query "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System\\Audit" /v ProcessCreationIncludeCmdLine_Enabled`} />
      <Alert type="danger" title="التسجيل نفسه يحمل مخاطر">
        Transcript و4104 قد يحتويان tokens وconnection strings ونصوصًا حساسة. لا تنشر raw logs، واضبط access/retention والنقل المركزي. لا تغيّر GPO مُدارة من محلل L1؛ وثق gap وارفع طلبًا للمالك.
      </Alert>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">2. قراءة 4104 بأسماء XML وتجميع الأجزاء</h2>
      <CodeBlock language="powershell" code={`$start=(Get-Date).AddHours(-1)
$rows=foreach($event in Get-WinEvent -FilterHashtable @{
  LogName='Microsoft-Windows-PowerShell/Operational'
  Id=4104
  StartTime=$start
}){
  [xml]$xml=$event.ToXml(); $data=@{}
  foreach($item in $xml.Event.EventData.Data){
    $data[[string]$item.Name]=[string]$item.'#text'
  }
  [pscustomobject]@{
    Time=$event.TimeCreated; RecordId=$event.RecordId
    ScriptBlockId=$data.ScriptBlockId; Path=$data.Path
    MessageNumber=$data.MessageNumber; MessageTotal=$data.MessageTotal
    Text=$data.ScriptBlockText
  }
}
$rows | Sort-Object ScriptBlockId,MessageNumber |
  Select-Object Time,RecordId,ScriptBlockId,MessageNumber,MessageTotal,Path,Text`} />
      <p className="text-gray-300 leading-8">احتفظ بالأجزاء وترتيبها وRecord IDs. لا تجمع كل 4104 في الجهاز إلى نص واحد؛ اجمع داخل <span dir="ltr" className="text-cyan-300">ScriptBlockId</span> وتحقق من MessageTotal عندما تتوفر الحقول.</p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">3. من pattern إلى فرضية</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {[
          ['EncodedCommand / FromBase64String', 'اسأل عن encoding والمحتوى والـparent والمالك. Base64 ترميز وقد تستخدمه أدوات النشر.'],
          ['Download APIs أو transfer tools', 'أثبت destination وfile write/hash ثم child execution؛ التنزيل لا يساوي التنفيذ.'],
          ['Invoke-Expression أو dynamic invocation', 'يرفع المخاطر عند تشغيل نص من مصدر غير موثوق، لكنه موجود أيضًا في code شرعي.'],
          ['Hidden/NoProfile/ExecutionPolicy', 'arguments مفيدة للفرز؛ ExecutionPolicy ليست security boundary ولا يثبت bypass اختراقًا.'],
          ['Reflection / assembly loading', 'اربط assembly source/hash/signature وmemory/network behavior.'],
          ['WMI/CIM/remote session', 'قد تكون إدارة شرعية؛ تحقق من source host، account، destination، change، وremote logon.'],
          ['Security-control tampering terms', 'صعّد confidence فقط عندما ترى التنفيذ/نجاح التغيير وأدلة مستقلة.'],
          ['Tool or malware family string', 'string قد يكون training/detection test/file path. لا تسمِّ العائلة بلا artifact/behavior corroboration.'],
        ].map(([name, meaning]) => <article key={name} className="rounded-xl border border-gray-700 bg-gray-800/50 p-5"><h3 className="font-bold text-yellow-300">{name}</h3><p className="mt-2 text-sm leading-7 text-gray-300">{meaning}</p></article>)}
      </div>
      <CodeBlock title="استعلام فرز؛ نتيجته candidates لا incidents" language="powershell" code={`$pattern='FromBase64String|EncodedCommand|Invoke-Expression|DownloadString|WindowStyle\\s+Hidden|ExecutionPolicy\\s+Bypass'
$candidates=$rows | Where-Object Text -match $pattern
$candidates | Select-Object Time,RecordId,ScriptBlockId,Path,Text
# الخطوة التالية: 4688/Sysmon parent-child، network، file writes، user/session، signer، baseline.`} />
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">4. فك EncodedCommand offline</h2>
      <CodeBlock title="استخرج payload محدود الحجم ثم اعرضه كنص فقط" language="powershell" code={`$commandLine='[الصق CommandLine بعد إزالة بيانات المؤسسة الحساسة]'
if($commandLine -match '(?i)-EncodedCommand\\s+([A-Za-z0-9+/=]+)'){
  $b64=$Matches[1]
  if($b64.Length -gt 0 -and $b64.Length -lt 65536){
    try {
      $bytes=[Convert]::FromBase64String($b64)
      $text=[Text.Encoding]::Unicode.GetString($bytes) # Windows PowerShell غالبًا UTF-16LE
      $text
    } catch { "Decode failed: $($_.Exception.Message)" }
  }
}`} />
      <Alert type="danger" title="قف عند العرض">
        لا تستخدم <span dir="ltr">Invoke-Expression</span> ولا call operator ولا تلصق الناتج في shell. إن بدا encoding مختلفًا، احتفظ بالbytes/hash وجرّب decoding كنص داخل VM. فك الترميز للتحليل ليس إذنًا للتنفيذ.
      </Alert>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">5. Workflow القرار</h2>
      <ol className="space-y-3 text-gray-300 leading-8">
        <li><strong className="text-cyan-300">1. ثبّت:</strong> host/user/time/RecordId/ScriptBlockId والنص الخام وسياسة logging.</li>
        <li><strong className="text-cyan-300">2. اربط:</strong> 4688 أو Sysmon ProcessGuid، parent/child، network، file/registry/task/service changes.</li>
        <li><strong className="text-cyan-300">3. قارن:</strong> signer/path/hash، software deployment، admin baseline، ticket والوقت المتوقع.</li>
        <li><strong className="text-cyan-300">4. اختبر البدائل:</strong> admin automation، EDR script، packaging، training، أو نشاط غير مصرح.</li>
        <li><strong className="text-cyan-300">5. قرر:</strong> benign/insufficient/escalate مع confidence؛ العزل أو الإيقاف وفق playbook والتفويض والأثر.</li>
      </ol>
      <Alert type="golden" title="اختبار الإتقان">
        نفّذ Windows Labs 2 و4. يجب أن تشرح لماذا marker المشفر Benign Positive، ولماذا 4104 يثبت وجود script content لكنه لا يثبت وحده outcome لكل command.
      </Alert>
    </section>
  </div>
);

export default WindowsPowerShellSection;
