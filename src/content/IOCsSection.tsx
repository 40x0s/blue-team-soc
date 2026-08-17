
import Alert from '../components/Alert';

const IOCsSection: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
        <span>🚨</span>
        الجزء 8: مؤشرات الاختراق في الشبكة (Network IOCs)
      </h1>

      <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

      {/* What are IOCs */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">ما هي؟</h2>
        <Alert type="info">
          الـIOC قيمة قابلة للرصد ارتبطت بنشاط محتمل مثل IP أو domain أو URL أو hash. هو <strong>قرينة وليس حكمًا</strong>: قد يُعاد استخدام IP، يتشارك عدة عملاء في CDN، أو يصبح المؤشر قديمًا. افصل بين «وجد تطابق» و«ثبت الاختراق».
        </Alert>
        <div className="grid md:grid-cols-3 gap-3 text-sm">
          {[
            ['1. Context', 'المصدر، أول/آخر رصد، نوع التهديد، confidence وTLP'],
            ['2. Corroborate', 'process/user/asset/DNS/time/baseline ومصدر مستقل عند الحاجة'],
            ['3. Decide', 'وثّق النتيجة ومدة صلاحية البحث؛ لا تحظر تلقائيًا بلا تقييم أثر'],
          ].map(([title, text]) => <div key={title} className="bg-gray-800/50 border border-gray-700 rounded-xl p-4"><h3 className="text-cyan-300 font-bold">{title}</h3><p className="text-gray-300 mt-2 leading-6">{text}</p></div>)}
        </div>
      </section>

      {/* Types of IOCs */}
      <section className="space-y-4 mt-8">
        <h2 className="text-2xl font-bold text-white">أنواعها</h2>

        <div className="grid md:grid-cols-2 gap-4">
          {/* IP-based */}
          <div className="bg-red-900/20 rounded-xl p-6 border border-red-500/30">
            <h3 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
              <span>🌐</span>
              1. IP-based IOCs
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• IPs معروفة لـ C2 servers</li>
              <li>• IPs واردة في feeds؛ سجّل المصدر والثقة والعمر بدل وصفها بالخبيثة تلقائيًا</li>
            </ul>
          </div>

          {/* Domain-based */}
          <div className="bg-orange-900/20 rounded-xl p-6 border border-orange-500/30">
            <h3 className="text-lg font-bold text-orange-400 mb-4 flex items-center gap-2">
              <span>🔗</span>
              2. Domain-based IOCs
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• Domain مرتبط بحملة مع source/confidence/time</li>
              <li>• Newly registered قد يرفع الفرضية ولا يثبت الضرر</li>
              <li>• DGA-like pattern يحتاج DNS/behavior corroboration</li>
            </ul>
          </div>

          {/* URL-based */}
          <div className="bg-yellow-900/20 rounded-xl p-6 border border-yellow-500/30">
            <h3 className="text-lg font-bold text-yellow-400 mb-4 flex items-center gap-2">
              <span>🔍</span>
              3. URL-based IOCs
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• URLs محددة لـ phishing</li>
              <li>• URLs مع patterns مشبوهة</li>
            </ul>
          </div>

          {/* Behavioral */}
          <div className="bg-purple-900/20 rounded-xl p-6 border border-purple-500/30">
            <h3 className="text-lg font-bold text-purple-400 mb-4 flex items-center gap-2">
              <span>📊</span>
              4. سلوكيات وTTPs
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• دورية مقاسة مع interval/jitter وليست snapshot</li>
              <li>• حجم/وجهة نقل منحرفان عن baseline؛ ليس كل upload تسريبًا</li>
              <li>• Protocol/process لا يطابقان المتوقع؛ port وحده لا يكفي</li>
              <li>• وقت/وجهة غير معتادين مع identity وasset context</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Threat Intel Sources */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">مصادر Threat Intel مجانية</h2>

        <Alert type="danger" title="استعلم ولا ترفع">
          البحث عن hash/IP/domain يختلف عن رفع ملف أو URL. لا ترفع عينة، بريدًا، مستندًا، رابطًا داخليًا أو بيانات عميل إلى خدمة عامة؛ قد تصبح متاحة لشركاء الخدمة وتفشي معلومات حساسة. استخدم فقط قيمًا مسموحًا بها، أو منصة خاصة معتمدة. لا تنزّل عينات MalwareBazaar إلى جهازك اليومي أو لتجربة هذا الكورس.
        </Alert>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'AlienVault OTX', url: 'otx.alienvault.com', desc: 'Community pulses وobservables متفاوتة الجودة' },
            { name: 'AbuseIPDB', url: 'abuseipdb.com', desc: 'تقارير IP community؛ تحقق من العمر والسياق' },
            { name: 'VirusTotal', url: 'virustotal.com', desc: 'Aggregated detections/metadata؛ الرفع العام ليس خاصًا' },
            { name: 'URLhaus', url: 'urlhaus.abuse.ch', desc: 'URLs مرتبطة بتوزيع malware حسب المصدر' },
            { name: 'MalwareBazaar', url: 'bazaar.abuse.ch', desc: 'Sample metadata؛ لا تنزّل للتدريب اليومي' },
            { name: 'ThreatFox', url: 'threatfox.abuse.ch', desc: 'Shared IOCs مع metadata وثقة متفاوتة' },
          ].map((source) => (
            <a
              key={source.name}
              href={`https://${source.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-gray-700 bg-gray-800/50 p-4 transition-all hover:border-cyan-400"
            >
              <h3 className="mb-2 text-lg font-bold text-cyan-300 group-hover:underline">
                {source.name}
              </h3>
              <p className="text-gray-400 text-sm mb-2">{source.desc}</p>
              <p className="text-gray-500 text-xs font-mono">{source.url}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Investigation Note Template */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">📝 قالب Network Investigation Note</h2>
        <p className="text-gray-400">استخدمه لكل تحقيق:</p>

        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 font-mono text-sm overflow-x-auto">
          <pre className="text-gray-300 whitespace-pre-wrap" dir="ltr">
{`# Network Investigation Note

**Case ID:** NET-2025-001
**Analyst:** [اسمك]
**Date/Time:** YYYY-MM-DD HH:MM
**Severity:** Low / Medium / High / Critical

---

## 1. Summary
[سطرين عن الحادثة]

## 2. Source of Detection
- [ ] SIEM alert
- [ ] User report
- [ ] Routine hunt
- [ ] Other: ___

## 3. Timeline
| Time | Event | Source |
|------|-------|--------|
| HH:MM | ... | ... |

## 4. Evidence
### Network Indicators
- Source IP:
- Destination IP:
- Domain:
- Port:
- Protocol:

### PCAP Reference
- File: capture.pcap
- Filter used:
- Packet numbers:

## 5. Analysis
[شرح ماذا حدث، خطوة بخطوة]

## 6. MITRE ATT&CK Mapping
- Tactic:
- Technique: T____

## 7. Assessment
- [ ] True Positive
- [ ] False Positive
- [ ] Benign Positive
- [ ] Needs more investigation

## 8. Recommended Actions
1.
2.
3.

## 9. References
-`}
          </pre>
        </div>
      </section>
    </div>
  );
};

export default IOCsSection;
