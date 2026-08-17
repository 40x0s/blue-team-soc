
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
          علامات تدل على وجود نشاط خبيث في الشبكة
        </Alert>
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
              <li>• IPs في feeds التهديدات (مثل AlienVault OTX)</li>
            </ul>
          </div>

          {/* Domain-based */}
          <div className="bg-orange-900/20 rounded-xl p-6 border border-orange-500/30">
            <h3 className="text-lg font-bold text-orange-400 mb-4 flex items-center gap-2">
              <span>🔗</span>
              2. Domain-based IOCs
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• Domains معروفة كخبيثة</li>
              <li>• Newly registered domains</li>
              <li>• DGA domains</li>
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
              4. Behavioral IOCs
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• Beaconing patterns</li>
              <li>• Data exfiltration (نقل بيانات كبير لخارج الشبكة)</li>
              <li>• Unusual ports</li>
              <li>• Connections في أوقات غريبة</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Threat Intel Sources */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">مصادر Threat Intel مجانية</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'AlienVault OTX', url: 'otx.alienvault.com', desc: 'IOCs متنوعة', color: 'cyan' },
            { name: 'AbuseIPDB', url: 'abuseipdb.com', desc: 'IPs خبيثة', color: 'red' },
            { name: 'VirusTotal', url: 'virustotal.com', desc: 'IPs, Domains, Files', color: 'blue' },
            { name: 'URLhaus', url: 'urlhaus.abuse.ch', desc: 'URLs خبيثة', color: 'orange' },
            { name: 'MalwareBazaar', url: 'bazaar.abuse.ch', desc: 'Malware samples', color: 'purple' },
            { name: 'ThreatFox', url: 'threatfox.abuse.ch', desc: 'IOCs شاملة', color: 'green' },
          ].map((source, index) => (
            <a
              key={index}
              href={`https://${source.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`bg-${source.color}-900/20 rounded-xl p-4 border border-${source.color}-500/30 hover:border-${source.color}-400 transition-all group`}
            >
              <h3 className={`text-lg font-bold text-${source.color}-400 mb-2 group-hover:underline`}>
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
