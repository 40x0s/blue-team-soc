import Alert from '../../components/Alert';
import CodeBlock from '../../components/CodeBlock';
import Table from '../../components/Table';

const WindowsEventViewerSection = () => (
  <div className="space-y-10">
    <h1 className="flex items-center gap-3 text-3xl font-bold text-cyan-400"><span>🔎</span>Event Viewer وWEVTUTIL: فحص دون إتلاف</h1>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">GUI workflow</h2>
      <ol className="space-y-2 text-sm leading-7 text-gray-300">
        <li>1. سجّل host/timezone/case/window قبل فتح السجل.</li>
        <li>2. انتقل إلى Windows Logs أو Applications and Services Logs واختر channel الصحيح.</li>
        <li>3. Filter Current Log بالوقت/provider/IDs/keywords؛ Event Level ليس «درجة خطورة SOC».</li>
        <li>4. افتح Details → XML View وافحص System/EventData بالأسماء.</li>
        <li>5. Save Filtered Log File كـEVTX عند التفويض، hash الأصل، واعمل على نسخة.</li>
      </ol>
      <Alert type="warning">Attach Task to This Event ليس automation production آمنًا: حدث مفرد قد يكون noisy ويمكنه تشغيل إجراء دون dedup/rate limit/approval/rollback. استخدم SIEM/SOAR governance واختبر detection أولًا.</Alert>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Custom View XML</h2>
      <CodeBlock language="xml" code={`<QueryList>
  <Query Id="0" Path="Security">
    <Select Path="Security">
      *[System[(EventID=4624 or EventID=4625) and TimeCreated[timediff(@SystemTime) &lt;= 3600000]]]
    </Select>
  </Query>
</QueryList>`} />
      <p className="text-sm text-gray-400">Window ساعة نسبةً لوقت التشغيل. لا تفترض أن filter يساوي كل evidence: قد يكون log overwritten أو policy غير مفعلة أو event على جهاز آخر.</p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">CLI صالح للتكرار</h2>
      <CodeBlock language="powershell" code={`# Metadata أولًا
wevtutil gli Security
wevtutil gl Security

# آخر 20 حدثًا (العرض reverse)
wevtutil qe Security /c:20 /rd:true /f:RenderedXml

# Query محددة؛ الاقتباس قد يختلف بين shells
wevtutil qe Security /q:"*[System[(EventID=4624 or EventID=4625)]]" /c:50 /rd:true /f:xml

# Export غير تدميري
wevtutil epl Security C:\\SOC-Lab\\Security.evtx /ow:true
Get-FileHash C:\\SOC-Lab\\Security.evtx -Algorithm SHA256`} />
      <Alert type="danger">لا تستخدم <code>wevtutil cl</code> أو Clear Log في مختبر مشترك/بيئة عمل. التصدير لا يمنحك حق نسخ بيانات حساسة إلى جهاز شخصي.</Alert>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">قراءة XML</h2>
      <Table headers={['Element', 'استخدامه']} rows={[
        ['System/Provider + EventID + Version', 'اختيار schema الصحيح.'],
        ['TimeCreated SystemTime', 'UTC عادة في XML؛ وحّد timeline ولا تخلط display local time.'],
        ['Computer + Channel + EventRecordID', 'provenance وترتيب داخل channel، لا global unique ID.'],
        ['Execution ProcessID/ThreadID', 'provider execution metadata؛ ليس دائمًا process المتهم.'],
        ['EventData/Data Name', 'fields الدلالية؛ افحص null/“-” وschema version.'],
        ['Correlation/ActivityID', 'ربط provider workflow عندما يملؤه؛ ليس متاحًا دائمًا.'],
      ]} />
    </section>
  </div>
);

export default WindowsEventViewerSection;
