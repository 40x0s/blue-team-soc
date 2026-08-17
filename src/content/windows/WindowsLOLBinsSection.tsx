import Alert from '../../components/Alert';
import CodeBlock from '../../components/CodeBlock';
import Table from '../../components/Table';

const WindowsLOLBinsSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3"><span>⚠️</span>Living off the Land: السلوك لا اسم الأداة</h1>
    <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

    <Alert type="warning" title="ما معنى LOLBin؟">
      binary أو script شرعي موجود في البيئة وقد يُساء استخدامه. وجوده وتوقيعه الصحيحان لا يعنيان أنه آمن، ووجوده في alert لا يعني هجومًا. حلّل <strong>الـarguments والمصدر والوجهة والـparent والهوية والـoutcome</strong>.
    </Alert>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">1. أسئلة التحقيق حسب الأداة</h2>
      <Table headers={['أداة/فئة', 'استخدام شرعي ممكن', 'سلوك يرفع الفرضية', 'دليل outcome مطلوب']} rows={[
        ['certutil.exe', 'فحص شهادة أو hash/encoding محلي', 'URL arguments أو decode لملف من user-writable path', 'network + file creation/hash + child execution'],
        ['BITS / bitsadmin', 'نقل تحديثات في الخلفية', 'job باسم/مالك/وجهة غير معتادة أو file إلى temp', 'BITS event/job owner + destination + file/process'],
        ['mshta.exe', 'تشغيل HTA legacy في بيئات محدودة', 'remote content أو parent document/browser غير متوقع', 'content source + network + child/process changes'],
        ['rundll32/regsvr32', 'تحميل/تسجيل مكونات شرعية', 'unusual export/arguments أو remote/user-writable artifact', 'DLL/SCT hash/signature/path + loaded modules/network'],
        ['wmic/WMI/CIM', 'إدارة وجرد', 'remote process creation أو source/account غير معتاد', 'source-destination identity + WMI logs + child process'],
        ['msbuild/installutil', 'بناء/تثبيت .NET', 'تشغيل project/assembly من download/temp على workstation', 'artifact provenance + process tree + network/file effects'],
        ['schtasks/sc/PsExec', 'إدارة وتشغيل عن بعد', 'new task/service من source غير معتمد أو action مشبوه', '4698/7045 + logon/share/network + actual execution'],
        ['net/net1', 'استكشاف وإدارة حسابات/shares', 'burst discovery بعد foothold أو عبر حساب غير معتاد', 'parent/user/session + surrounding behavior؛ discovery وحده لا يثبت compromise'],
      ]} />
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">2. مثال حميد يثبت الحاجة إلى arguments</h2>
      <CodeBlock title="certutil محلي للـhash — لا شبكة" language="powershell" code={`New-Item -ItemType Directory C:/SOC-Lab -Force | Out-Null
'SOC_LAB_CERTUTIL_001' | Set-Content C:/SOC-Lab/marker.txt
certutil.exe -hashfile C:/SOC-Lab/marker.txt SHA256
Get-FileHash C:/SOC-Lab/marker.txt -Algorithm SHA256`} />
      <p className="text-gray-300 leading-8">لو كانت القاعدة <span dir="ltr" className="text-red-300">Image endswith certutil.exe</span> فستنتج false positive. القاعدة الأفضل تميّز arguments الخاصة بالسلوك المطلوب، ثم يجمع المحلل network/file/process context.</p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">3. استخراج 4688 بأسماء الحقول</h2>
      <CodeBlock language="powershell" code={`$names='certutil.exe|bitsadmin.exe|mshta.exe|rundll32.exe|regsvr32.exe|wmic.exe|msbuild.exe|installutil.exe|schtasks.exe|sc.exe'
$start=(Get-Date).AddHours(-1)
$rows=foreach($event in Get-WinEvent -FilterHashtable @{LogName='Security';Id=4688;StartTime=$start}){
  [xml]$xml=$event.ToXml(); $data=@{}
  foreach($item in $xml.Event.EventData.Data){$data[[string]$item.Name]=[string]$item.'#text'}
  [pscustomobject]@{
    Time=$event.TimeCreated; RecordId=$event.RecordId
    Image=$data.NewProcessName; CommandLine=$data.CommandLine
    Parent=$data.ParentProcessName; User=$data.SubjectUserName
    NewPID=$data.NewProcessId; ParentPID=$data.ProcessId
  }
}
$candidates=$rows | Where-Object Image -match $names
$candidates | Format-List`} />
      <Alert type="info">
        إذا كانت CommandLine فارغة فتحقق من سياسة <span dir="ltr">Include command line in process creation events</span>. لا تعوّض الحقل المفقود بتخمين. Sysmon/EDR قد يوفران fields إضافية لكن يلزم توثيق sensor/config.
      </Alert>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">4. Correlation worksheet</h2>
      <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-5 text-sm leading-8 text-gray-300">
        <p><strong className="text-cyan-300">Process:</strong> image/path/hash/signature/version/parent/child/user/integrity.</p>
        <p><strong className="text-cyan-300">Arguments:</strong> normalized command، URLs/paths، remote target، output file، quoting.</p>
        <p><strong className="text-cyan-300">Outcome:</strong> DNS/network، created file/hash، loaded module، task/service/registry، child execution.</p>
        <p><strong className="text-cyan-300">Context:</strong> asset criticality، account role، baseline/prevalence، change ticket، admin source، time.</p>
        <p><strong className="text-cyan-300">Decision:</strong> facts، بديل benign، ما يفنّده، confidence، authorized next action.</p>
      </div>
      <Alert type="danger" title="لا تنفذ أمثلة هجومية للتعلم">
        لا تحتاج remote HTA أو scriptlet أو download-and-execute لتثبت فهمك. استخدم Windows Lab 2 وmarker محلي، أو fixtures منزوعة السلاح. لا تنسخ command من alert إلى terminal.
      </Alert>
      <Alert type="golden" title="معيار الإتقان">
        خذ ثلاثة rows: certutil hash حميد، scheduled task المختبرية، وfixture transfer. اكتب rule ترشح السلوك ثم اختبر positive وnegative، واشرح الـtelemetry التي تثبت outcome.
      </Alert>
    </section>
  </div>
);

export default WindowsLOLBinsSection;
