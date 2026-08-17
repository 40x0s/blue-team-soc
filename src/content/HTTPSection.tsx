
import Alert from '../components/Alert';
import Table from '../components/Table';
import CodeBlock from '../components/CodeBlock';

const HTTPSection: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
        <span>📡</span>
        الجزء 6: HTTP بعمق
      </h1>

      <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

      {/* HTTP Methods */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="text-cyan-500">6.1</span>
          HTTP Methods
        </h2>

        <Table
          headers={['Method', 'الاستخدام', 'علامة مشبوهة']}
          rows={[
            ['GET', 'جلب صفحة', 'GET كبير جداً، parameters غريبة'],
            ['POST', 'إرسال بيانات', 'POST لـ endpoint غير معروف'],
            ['PUT', 'رفع ملف', 'نادر، يستحق التحقيق'],
            ['DELETE', 'حذف', 'نادر، يستحق التحقيق'],
            ['OPTIONS', 'استكشاف', 'كثرتها = enumeration'],
            ['CONNECT', 'tunnel', 'يستخدم في proxies'],
          ]}
        />
      </section>

      {/* HTTP Status Codes */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="text-cyan-500">6.2</span>
          HTTP Status Codes (مرجع كامل)
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* 1xx */}
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <h3 className="text-lg font-bold text-gray-400 mb-3">1xx – معلوماتية</h3>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>100 Continue</li>
              <li>101 Switching Protocols</li>
            </ul>
          </div>

          {/* 2xx */}
          <div className="bg-green-900/20 rounded-xl p-4 border border-green-500/30">
            <h3 className="text-lg font-bold text-green-400 mb-3">2xx – نجاح ✅</h3>
            <ul className="space-y-1 text-sm text-gray-300">
              <li><strong>200 OK</strong> ✅</li>
              <li>201 Created</li>
              <li>204 No Content</li>
            </ul>
          </div>

          {/* 3xx */}
          <div className="bg-blue-900/20 rounded-xl p-4 border border-blue-500/30">
            <h3 className="text-lg font-bold text-blue-400 mb-3">3xx – Redirect</h3>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>301 Moved Permanently</li>
              <li><strong>302 Found</strong> (redirect)</li>
              <li>304 Not Modified (cache)</li>
            </ul>
          </div>

          {/* 4xx */}
          <div className="bg-yellow-900/20 rounded-xl p-4 border border-yellow-500/30">
            <h3 className="text-lg font-bold text-yellow-400 mb-3">4xx – خطأ من العميل</h3>
            <ul className="space-y-1 text-sm text-gray-300">
              <li><strong>400</strong> Bad Request</li>
              <li><strong>401</strong> Unauthorized (يحتاج auth)</li>
              <li><strong>403</strong> Forbidden (ممنوع)</li>
              <li><strong>404</strong> Not Found</li>
              <li>405 Method Not Allowed</li>
              <li>429 Too Many Requests</li>
            </ul>
          </div>

          {/* 5xx */}
          <div className="bg-red-900/20 rounded-xl p-4 border border-red-500/30">
            <h3 className="text-lg font-bold text-red-400 mb-3">5xx – خطأ من السيرفر</h3>
            <ul className="space-y-1 text-sm text-gray-300">
              <li><strong>500</strong> Internal Server Error</li>
              <li>502 Bad Gateway</li>
              <li>503 Service Unavailable</li>
              <li>504 Gateway Timeout</li>
            </ul>
          </div>

          {/* Security Reading */}
          <div className="bg-purple-900/20 rounded-xl p-4 border border-purple-500/30">
            <h3 className="text-lg font-bold text-purple-400 mb-3">🔍 القراءة الأمنية</h3>
            <ul className="space-y-1 text-sm text-gray-300">
              <li><strong>كثير 401/403</strong> = brute force</li>
              <li><strong>كثير 404</strong> = scanning</li>
              <li><strong>كثير 500</strong> = exploit attempt</li>
              <li><strong>200 لـ endpoints غريبة</strong> = web shell</li>
            </ul>
          </div>
        </div>
      </section>

      {/* HTTP Headers */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="text-cyan-500">6.3</span>
          HTTP Headers المهمة للمحلل
        </h2>

        <Table
          headers={['Header', 'المعنى', 'استخدامه الأمني']}
          rows={[
            ['Host', 'اسم الموقع', 'تحديد target'],
            ['User-Agent', 'المتصفح/الأداة', 'كشف الأدوات (curl, python, sqlmap)'],
            ['Referer', 'من وين جاي', 'تتبع المصدر'],
            ['Cookie', 'جلسة', 'كشف session hijacking'],
            ['Authorization', 'اعتماد', 'basic auth, bearer tokens'],
            ['X-Forwarded-For', 'الـ IP الأصلي خلف proxy', 'تتبع المهاجم'],
            ['Content-Type', 'نوع البيانات', 'كشف uploads مشبوهة'],
          ]}
        />

        <Alert type="danger" title="User-Agents مشبوهة">
          <CodeBlock
            code={`sqlmap/1.x
Nikto/2.x
Mozilla/5.0 (compatible; Nmap Scripting Engine)
python-requests/2.x
curl/7.x (من جهاز مستخدم عادي مشبوه)`}
          />
        </Alert>
      </section>

      {/* curl Examples */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="text-cyan-500">6.4</span>
          تحليل HTTP بـ curl (عملي)
        </h2>

        <CodeBlock
          title="أوامر curl للتحليل"
          code={`# جلب headers فقط
curl -I https://example.com

# جلب الصفحة كاملة مع headers
curl -v https://example.com

# تحديد User-Agent
curl -A "Mozilla/5.0" https://example.com

# POST request
curl -X POST -d "user=admin&pass=123" https://example.com/login

# اتباع الـ redirects
curl -L https://example.com

# تحديد header
curl -H "Authorization: Bearer xyz" https://api.example.com`}
        />
      </section>
    </div>
  );
};

export default HTTPSection;
