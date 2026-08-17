import Alert from '../components/Alert';
import Table from '../components/Table';
import CodeBlock from '../components/CodeBlock';

const HTTPSection: React.FC = () => (
  <div className="space-y-10">
    <header>
      <h1 className="flex items-center gap-3 text-3xl font-bold text-cyan-400"><span>📡</span>HTTP للمحلل: request، response، وسلسلة الوكلاء</h1>
      <p className="mt-3 max-w-4xl text-lg leading-8 text-gray-300">اقرأ transaction كاملًا: method + authority/host + path/query + headers + body metadata + status + bytes + timing، ثم اربطه بالهوية والعملية. معظم الويب مشفر، فتتغير الرؤية حسب proxy وTLS inspection والسياسة.</p>
    </header>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">1. Methods: semantics لا verdict</h2>
      <Table headers={['Method', 'المعنى المعتاد', 'سؤال التحقيق']} rows={[
        ['GET / HEAD', 'استرجاع representation / headers', 'ما path/query/cache/status/bytes؟ GET قد يحمل بيانات في query.'],
        ['POST', 'إرسال representation لمعالجة', 'أي content type/endpoint/user/result؟ شائع جدًا شرعيًا.'],
        ['PUT / PATCH', 'إنشاء/استبدال أو تعديل resource', 'هل API يدعمه وهل principal مخول؟'],
        ['DELETE', 'طلب حذف resource', 'status وحده لا يثبت الحذف؛ راجع application audit/state.'],
        ['OPTIONS', 'إمكانات endpoint وCORS preflight', 'طبيعي للمتصفح؛ volume/paths/source تحدد enumeration hypothesis.'],
        ['CONNECT', 'إنشاء tunnel عبر proxy', 'هل destination/user/policy متوقع؟ داخل tunnel لا يرى proxy العادي المحتوى.'],
      ]} />
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">2. Status codes: نتيجة HTTP لا نتيجة أمنية</h2>
      <Table headers={['الفئة', 'تعني', 'تحذير SOC']} rows={[
        ['1xx', 'استجابة معلوماتية/interim', '101 قد يبدّل البروتوكول مثل WebSocket.'],
        ['2xx', 'الخادم عالج الطلب وفق semantics', '200 لا يثبت web shell أو نجاح exploit؛ افحص body/app audit/effect.'],
        ['3xx', 'redirect أو cache semantics', 'اتبع Location بأداة معزولة فقط؛ redirect chain قد يخفي وجهة.'],
        ['4xx', 'الطلب لم ينجح وفق client-facing semantics', '401/403/404 volume قد يدعم guessing/scanning مع source/rate/paths.'],
        ['5xx', 'الخادم/الوسيط أخفق في الطلب', 'قد يكون bug/load/dependency؛ لا يثبت exploit attempt.'],
      ]} />
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">3. Headers وحدود الثقة</h2>
      <Table headers={['Header/field', 'يفيد في', 'قيد']} rows={[
        ['Host / :authority', 'virtual host والهدف المطلوب', 'قيمة يرسلها client؛ تحقق من proxy/server routing.'],
        ['User-Agent', 'client claim وbaseline', 'قابل للتزييف؛ sqlmap/curl string لا يثبت الأداة.'],
        ['Authorization / Cookie', 'نوع auth/session context', 'أسرار؛ لا تضع القيمة الخام في ticket/Git.'],
        ['Referer / Origin', 'navigation وbrowser origin context', 'قد يغيب أو يُقيد أو يزيّف؛ spelling القياسي Referer.'],
        ['X-Forwarded-For / Forwarded', 'سلسلة IP عبر proxy موثوق', 'لا تثق بمدخل client؛ ابدأ من proxy موثوق وسياسة append.'],
        ['Content-Type / Length', 'صيغة وحجم معلنين', 'قد لا يطابق المحتوى الفعلي؛ افحص parser/result ضمن الصلاحية.'],
        ['Request/trace ID', 'ربط proxy/app/backend', 'تأكد من propagation وuniqueness/retention.'],
      ]} />
      <Alert type="danger">URLs وheaders قد تحوي tokens وPII. اعرض names/lengths أو قيمًا منقحة، واحفظ الأصل وفق access/TLP/retention.</Alert>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">4. HTTP/1.1 و2 و3 والرؤية</h2>
      <ul className="space-y-2 text-sm leading-7 text-gray-300">
        <li>• HTTP/1.1 نصي على cleartext؛ keep-alive يسمح معاملات متعددة في connection.</li>
        <li>• HTTP/2 binary ومmultiplexed streams داخل TCP/TLS؛ packet order ليس transaction order.</li>
        <li>• HTTP/3 يعمل فوق QUIC/UDP؛ TCP filters لن تراه، وغالبًا payload مشفر.</li>
        <li>• TLS inspection إن وُجد يغير trust/privacy وقد لا يغطي pinned apps؛ وثق نقطة الرؤية ولا تفترض decryption.</li>
      </ul>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">5. فحص آمن بـcurl</h2>
      <CodeBlock code={`# استخدم نطاق التوثيق فقط، وحدد الوقت وأظهر الأخطاء
curl --fail-with-body --show-error --head https://example.com/
curl --show-error --verbose --max-time 15 https://example.com/ -o /dev/null
curl --show-error --location --max-redirs 3 --max-time 15 https://example.com/ -o /dev/null

# لا تضع token حقيقيًا في history. استخدم fixture محليًا عند تدريب POST:
printf '%s\\n' 'user=lab-user&value=synthetic' > request-fixture.txt
# لا ترسل fixture إلا إلى خادم مختبر تملكه.`} />
      <CodeBlock title="ملاحظة تحقيق" language="text" code={`UTC/source log/request ID | client/proxy/backend chain | user/process/host
method + normalized host/path (query secret removed) | status | bytes | duration
TLS/protocol/version | response/app outcome | baseline/change
facts | hypotheses | scope | confidence | visibility gaps | next authorized query`} />
    </section>
  </div>
);

export default HTTPSection;
