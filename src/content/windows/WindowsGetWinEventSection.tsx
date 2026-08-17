import Alert from '../../components/Alert';
import CodeBlock from '../../components/CodeBlock';

const WindowsGetWinEventSection = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
        <span>🔍</span>
        Get-WinEvent للمحلل
      </h1>

      <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

      <Alert type="info">
        <strong>Get-WinEvent</strong> أحدث وأسرع من Get-EventLog ويدعم XPath queries.
      </Alert>

      {/* الأوامر الأساسية */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">الأوامر الأساسية</h2>

        <CodeBlock
          title="عرض السجلات المتاحة"
          code={`Get-WinEvent -ListLog *`}
        />

        <CodeBlock
          title="عرض آخر 20 حدث من Security"
          code={`Get-WinEvent -LogName Security -MaxEvents 20`}
        />

        <CodeBlock
          title="تصفية بـ Event ID"
          code={`Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4625} -MaxEvents 30`}
        />

        <CodeBlock
          title="تصفية بفترة زمنية"
          code={`$start = (Get-Date).AddHours(-24)
Get-WinEvent -FilterHashtable @{
  LogName='Security'
  StartTime=$start
} -MaxEvents 200`}
        />

        <CodeBlock
          title="تصفية متعددة"
          code={`Get-WinEvent -FilterHashtable @{
  LogName='Security'
  Id=4624,4625,4672
  StartTime=(Get-Date).AddDays(-1)
}`}
        />
      </section>

      {/* استعلامات جاهزة */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">📋 استعلامات جاهزة للمحلل</h2>

        <div className="space-y-4">
          <CodeBlock
            title="1. أعلى IPs في محاولات الدخول الفاشلة"
            code={`Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4625} |
  ForEach-Object { $_.Properties[19].Value } |
  Group-Object |
  Sort-Object Count -Descending |
  Select-Object -First 10`}
          />

          <CodeBlock
            title="2. أعلى المستخدمين المستهدفين"
            code={`Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4625} |
  ForEach-Object { $_.Properties[5].Value } |
  Group-Object |
  Sort-Object Count -Descending |
  Select-Object -First 10`}
          />

          <CodeBlock
            title="3. تسجيلات الدخول الناجحة (آخر 24 ساعة)"
            code={`Get-WinEvent -FilterHashtable @{
  LogName='Security'
  Id=4624
  StartTime=(Get-Date).AddHours(-24)
} | Select-Object TimeCreated,
  @{Name='User';Expression={$_.Properties[5].Value}},
  @{Name='LogonType';Expression={$_.Properties[8].Value}},
  @{Name='SourceIP';Expression={$_.Properties[18].Value}}`}
          />

          <CodeBlock
            title="4. تنفيذ عمليات (Event 4688) مع command line"
            code={`Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4688} -MaxEvents 100 |
  Select-Object TimeCreated,
    @{Name='Process';Expression={$_.Properties[5].Value}},
    @{Name='CommandLine';Expression={$_.Properties[8].Value}}`}
          />

          <CodeBlock
            title="5. PowerShell Script Block Logs"
            code={`Get-WinEvent -FilterHashtable @{
  LogName='Microsoft-Windows-PowerShell/Operational'
  Id=4104
} -MaxEvents 50 | Select-Object TimeCreated, @{Name='Script';Expression={$_.Message}}`}
          />

          <CodeBlock
            title="6. إنشاء حسابات جديدة"
            code={`Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4720} |
  Select-Object TimeCreated,
    @{Name='NewAccount';Expression={$_.Properties[0].Value}},
    @{Name='CreatedBy';Expression={$_.Properties[4].Value}}`}
          />

          <CodeBlock
            title="7. إضافة للـ Administrators group"
            code={`Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4732} |
  Where-Object { $_.Message -match "Administrators" } |
  Select-Object TimeCreated, Message`}
          />

          <CodeBlock
            title="8. مسح Security log"
            code={`Get-WinEvent -FilterHashtable @{LogName='Security'; Id=1102}`}
          />

          <CodeBlock
            title="9. تثبيت خدمات جديدة"
            code={`Get-WinEvent -FilterHashtable @{LogName='System'; Id=7045} |
  Select-Object TimeCreated,
    @{Name='ServiceName';Expression={$_.Properties[0].Value}},
    @{Name='ServicePath';Expression={$_.Properties[1].Value}}`}
          />

          <CodeBlock
            title="10. تصدير لـ CSV للتحليل"
            code={`Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4625} |
  Select-Object TimeCreated, Id, Message |
  Export-Csv -Path "C:\\investigation\\failed-logons.csv" -NoTypeInformation`}
          />
        </div>
      </section>

      {/* نصائح */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">💡 نصائح مهمة</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <Alert type="info">
            <strong>Properties[X]</strong> - أرقام الحقول تختلف حسب Event ID. راجع الـ Event لمعرفة الترتيب.
          </Alert>
          <Alert type="warning">
            استخدم <strong>-MaxEvents</strong> لتحديد العدد وتجنب البطء في السجلات الكبيرة.
          </Alert>
        </div>
      </section>
    </div>
  );
};

export default WindowsGetWinEventSection;
