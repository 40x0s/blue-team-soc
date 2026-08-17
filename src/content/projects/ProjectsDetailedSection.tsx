import Alert from '../../components/Alert';
import CodeBlock from '../../components/CodeBlock';
import { useState } from 'react';

type PortfolioProject = {
  num: number;
  title: string;
  goal: string;
  estimated: string;
  safety: string;
  requirements: string[];
  steps: { title: string; code: string }[];
  reportTemplate: string;
  deliverables: string[];
  acceptanceCriteria: string[];
};

export const projects: PortfolioProject[] = [
  {
    num: 1,
    title: 'Network Evidence Pack — DNS, TCP, TLS',
    goal: 'إنتاج baseline قابل لإعادة الاختبار يشرح ما تثبته الحزم وما لا تكشفه TLS/ECH بدل تقرير بلقطات فقط.',
    estimated: '4–6 ساعات بعد إكمال Network Lab 1',
    safety: 'التقط VM المختبر فقط، استخدم example.com، حدّد حجم/مدة PCAP، ولا ترفع الالتقاط الخام علنًا.',
    requirements: ['Wireshark/tshark', 'curl وdig', 'Linux VM', 'Git repository خاص أثناء العمل'],
    steps: [
      { title: 'اجمع evidence حقيقيًا ومحدودًا', code: `# استبدل INTERFACE فقط وسجل baseline في notes.txt
ip -br address | tee notes.txt
ip route | tee -a notes.txt
cat /etc/resolv.conf | tee -a notes.txt
date -u +%FT%TZ | tee -a notes.txt

sudo tshark -i INTERFACE -a duration:45 -a filesize:10240 \\
  -w https-baseline.pcapng
# في terminal آخر أثناء الالتقاط:
dig example.com A +tries=1 +time=3
curl --http1.1 --connect-timeout 5 --max-time 15 -sS -o /dev/null \\
  -w 'ip=%{remote_ip} code=%{http_code} tls=%{ssl_version} total=%{time_total}\\n' \\
  https://example.com/ | tee curl-result.txt
sha256sum https-baseline.pcapng | tee evidence.sha256` },
      { title: 'صدّر حقولًا قابلة للمراجعة', code: `mkdir -p exports
tshark -r https-baseline.pcapng -Y 'dns.qry.name=="example.com"' \\
  -T fields -E header=y -E separator=, \\
  -e frame.number -e frame.time_relative -e ip.src -e ip.dst \\
  -e dns.flags.response -e dns.a > exports/dns.csv

tshark -r https-baseline.pcapng -Y 'tcp.flags.syn==1' \\
  -T fields -E header=y -E separator=, \\
  -e frame.number -e frame.time_relative -e tcp.stream -e ip.src -e ip.dst \\
  -e tcp.srcport -e tcp.dstport -e tcp.flags.ack > exports/tcp.csv

tshark -r https-baseline.pcapng -Y 'tls.handshake.type==1 or tls.handshake.type==2' \\
  -T fields -E header=y -E separator=, \\
  -e frame.number -e frame.time_relative -e tcp.stream -e ip.src -e ip.dst \\
  -e tls.handshake.type -e tls.handshake.extensions_server_name > exports/tls.csv` },
      { title: 'ابنِ README دون اختلاق قيم', code: `# الهيكل المقترح
project-01-network-baseline/
├── README.md                 # summary + scope + limitations
├── evidence.sha256
├── curl-result.txt
├── notes.txt                 # interface/IP/resolver/time/tool versions
├── exports/                  # CSV من PCAP
└── private-evidence/         # PCAP؛ لا تنشره تلقائياً

# أضف إصدارات الأدوات
curl --version >> notes.txt
tshark --version | head -1 >> notes.txt` },
    ],
    reportTemplate: `# DNS–TCP–TLS Evidence Report

## Scope and provenance
- Capture host/interface/time window: ___
- Client/resolver/server IPs: ___
- Tool versions: ___
- PCAP SHA-256: ___

## Reproducible timeline
| Frame | Relative time | Layer | Source → destination | Observation |
|---:|---:|---|---|---|
| | | DNS | | |
| | | TCP | | |
| | | TLS | | |

## Measurements
- DNS response: ___ ms
- SYN→SYN-ACK / full TCP handshake: ___ / ___ ms
- curl total: ___ s (not equivalent to one handshake)

## Visibility limits
- SNI observed? ___; ECH/cache implications: ___
- Certificate messages observed? ___; TLS 1.3 implications: ___
- HTTP path/body visible? ___
- Claims not supported by this evidence: ___

## Reproduction
Exact commands, substitutions, and expected variance: ___`,
    deliverables: ['README عربي/إنجليزي مختصر', 'PCAP hash وprivate evidence policy', '3 CSV exports', 'Timeline محسوب', 'قسم limitations'],
    acceptanceCriteria: ['كل قيمة في التقرير مأخوذة من evidence لا من المثال', 'يمكن لشخص آخر إعادة الأوامر', 'لا توجد بيانات شخصية أو PCAP خام في public repo', 'تشرح ECH/TLS 1.3 وcache بلا أحكام قطعية'],
  },
  {
    num: 2,
    title: 'SSH Authentication Case — Parser + Triage',
    goal: 'إثبات القدرة على جمع auth telemetry وتحليل source/user/success ضمن نافذة قضية مع parser متين نسبيًا.',
    estimated: '6–8 ساعات بعد Linux Lab 1',
    safety: 'جهازان Host-only تملكهما، حساب labuser، خمس محاولات فقط. لا تختبر IP عامًا ولا حسابًا حقيقيًا ولا تنفذ block خارج playbook.',
    requirements: ['Ubuntu lab target', 'Linux source VM', 'OpenSSH', 'Python 3'],
    steps: [
      { title: 'نفّذ simulation محدودة واجمع window', code: `# على الهدف قبل الاختبار
mkdir -p case-ssh/evidence
START=$(date -u +%FT%TZ)
printf '%s\\n' "$START" | tee case-ssh/evidence/start-utc.txt

# على المصدر بعد التحقق من TARGET_IP Host-only:
for i in $(seq 1 5); do
  sshpass -p "SOC-LAB-WRONG-$i" ssh \\
    -o PreferredAuthentications=password -o PubkeyAuthentication=no \\
    -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null \\
    -o ConnectTimeout=5 labuser@TARGET_IP exit
done

# على الهدف: استخدم اسم service الصحيح ssh أو sshd
sudo journalctl -u ssh --since "$START" --no-pager -o short-iso \\
  > case-ssh/evidence/ssh-window.log
sha256sum case-ssh/evidence/ssh-window.log > case-ssh/evidence/SHA256SUMS` },
      { title: 'اكتب parser لا يعتمد على رقم حقل ثابت', code: `cat > case-ssh/analyze_ssh.py <<'PY'
#!/usr/bin/env python3
import collections, ipaddress, json, re, sys
from pathlib import Path
failed = re.compile(r'Failed password for (?:(?:invalid user) )?(?P<user>\\S+) from (?P<ip>\\S+) port (?P<port>\\d+)')
accepted = re.compile(r'Accepted \\S+ for (?P<user>\\S+) from (?P<ip>\\S+) port (?P<port>\\d+)')
rows=[]
for number,line in enumerate(Path(sys.argv[1]).read_text(errors='replace').splitlines(),1):
    kind='failed' if 'Failed password' in line else 'accepted' if 'Accepted ' in line else None
    match=(failed if kind=='failed' else accepted).search(line) if kind else None
    if not match: continue
    data=match.groupdict()
    try: ipaddress.ip_address(data['ip'])
    except ValueError: continue
    rows.append({'line':number,'result':kind,**data})
summary={
  'failed':sum(r['result']=='failed' for r in rows),
  'accepted':sum(r['result']=='accepted' for r in rows),
  'failed_by_ip':collections.Counter(r['ip'] for r in rows if r['result']=='failed'),
  'failed_by_user':collections.Counter(r['user'] for r in rows if r['result']=='failed'),
  'events':rows,
}
summary['failed_by_ip']=dict(summary['failed_by_ip'])
summary['failed_by_user']=dict(summary['failed_by_user'])
print(json.dumps(summary,indent=2))
PY
python3 case-ssh/analyze_ssh.py case-ssh/evidence/ssh-window.log \\
  | tee case-ssh/analysis.json` },
      { title: 'اختبر parser بfixture ولا تخفِ gaps', code: `cat > /tmp/ssh-fixture.log <<'EOF'
2026-08-17 host sshd[100]: Failed password for labuser from 192.0.2.10 port 40001 ssh2
2026-08-17 host sshd[101]: Failed password for invalid user admin from 192.0.2.10 port 40002 ssh2
2026-08-17 host sshd[102]: Accepted publickey for maint from 192.0.2.20 port 40003 ssh2
malformed Failed password event
EOF
python3 case-ssh/analyze_ssh.py /tmp/ssh-fixture.log
# expected: failed=2, accepted=1; malformed line ignored and documented` },
    ],
    reportTemplate: `# SSH Authentication Investigation

## Scope and evidence
- Authorization/source/target/window: ___
- Log source/timezone/SHA-256: ___

## Results
- Failed / accepted / unsupported lines: ___ / ___ / ___
- Source and user distribution: ___
- Related success correlation: ___

## Competing explanations
Controlled test / user or service error / external guessing: supporting and refuting evidence ___

## Decision
Classification: Benign Positive. T1110.001 describes the simulated behavior; it does not prove compromise.
Production escalation and authorized containment would be: ___

## Parser limits
Formats tested, IPv4/IPv6, rotation, timezone, and malformed handling: ___`,
    deliverables: ['Scoped log + hash', 'Python parser', 'Synthetic fixture', 'analysis.json', 'Case report'],
    acceptanceCriteria: ['لا positional awk للـIP/user', 'خمس محاولات Host-only فقط', 'يفحص successes', 'يوثق unsupported lines', 'لا يدعي block/remediation لم تحدث'],
  },
  {
    num: 3,
    title: 'Phishing Investigation — Synthetic .eml',
    goal: 'تحليل headers وURLs وattachments offline من بريد مصطنع، مع حفظ الأصل وحدود DMARC.',
    estimated: '6–8 ساعات بعد SOC Lab 4',
    safety: 'استخدم ملف SOC Lab 4 الذي يحتوي .invalid و192.0.2.44. لا تنقر ولا ترفع بريدًا أو attachment إلى خدمة عامة.',
    requirements: ['Python 3 standard library', 'Synthetic .eml', 'Text editor'],
    steps: [
      { title: 'احفظ الأصل واعمل على نسخة', code: `mkdir -p phishing-case/{evidence,working,output}
cp synthetic-message.eml phishing-case/evidence/original.eml
sha256sum phishing-case/evidence/original.eml | tee phishing-case/evidence/SHA256SUMS
cp phishing-case/evidence/original.eml phishing-case/working/message.eml
chmod a-w phishing-case/evidence/original.eml` },
      { title: 'استخرج artifacts بلا تنفيذ', code: `cat > phishing-case/analyze_eml.py <<'PY'
from email import policy
from email.parser import BytesParser
from pathlib import Path
import hashlib,json,re,sys
raw=Path(sys.argv[1]).read_bytes(); msg=BytesParser(policy=policy.default).parsebytes(raw)
texts=[]; attachments=[]
for part in msg.walk():
    if part.get_content_disposition()=='attachment':
        data=part.get_payload(decode=True) or b''
        attachments.append({'name':part.get_filename(),'size':len(data),'sha256':hashlib.sha256(data).hexdigest()})
    elif part.get_content_type() in ('text/plain','text/html'):
        try: texts.append(part.get_content())
        except Exception: pass
urls=sorted(set(re.findall(r"https?://[^\\s<>\\"']+",'\\n'.join(texts))))
out={'sha256':hashlib.sha256(raw).hexdigest(),'from':str(msg.get('From','')),
'reply_to':str(msg.get('Reply-To','')),'return_path':str(msg.get('Return-Path','')),
'subject':str(msg.get('Subject','')),'received':msg.get_all('Received',[]),
'authentication_results':msg.get_all('Authentication-Results',[]),
'urls':urls,'attachments':attachments}
print(json.dumps(out,ensure_ascii=False,indent=2))
PY
python3 phishing-case/analyze_eml.py phishing-case/working/message.eml \\
  | tee phishing-case/output/artifacts.json` },
      { title: 'حلل الثقة والنطاق', code: `# أجب بأدلة:
# - From/Reply-To/Return-Path alignment؛ عدم الاتساق قرينة لا verdict.
# - Received من الأسفل للأعلى وحدد trust boundary.
# - Authentication-Results نتيجة مُعلنة؛ هل أضافها MTA موثوق؟
# - hash لا يثبت maliciousness.
# - ابحث في gateway/identity/endpoint عن delivery, click, credential entry,
#   process execution, mailbox rules وOAuth؛ لا تساوِ click بالتنفيذ.` },
    ],
    reportTemplate: `# Synthetic Phishing Case

## Evidence handling
Original/working SHA-256 and synthetic indicators: ___

## Header analysis
From/Reply-To/Return-Path: ___
Received chain and trust boundary: ___
SPF/DKIM/DMARC claimed result: ___
Why this is not independent cryptographic verification: ___

## Artifacts
| Type | Value/hash | Context | Confidence | Safe next query |
|---|---|---|---|---|
| | | | | |

## Scope and decision
Recipients/delivery/click/credential/endpoint evidence: ___
Verdict, confidence, gaps, and authorized actions: ___`,
    deliverables: ['Synthetic original + hash', 'Offline parser', 'artifacts.json', 'Header timeline', 'Case report'],
    acceptanceCriteria: ['لا public upload أو live click', 'الأصل read-only والعمل على نسخة', 'لا ادعاء DKIM verification من header فقط', 'click ≠ execution', 'لا بيانات حقيقية'],
  },
  {
    num: 4,
    title: 'Wazuh 4.14 End-to-End Validation',
    goal: 'إعادة تنفيذ عقد المختبر الموحد: agent→localfile→JSON decoder→rule 100100→alert→search بثلاث قياسات وnegative test.',
    estimated: '8–12 ساعة',
    safety: 'VMs معزولة وJSON marker حميد. ثبّت agent من Dashboard المطابق؛ لا تنسخ package URL قديمًا ولا تنشر enrollment secrets.',
    requirements: ['Wazuh 4.14 all-in-one موثق الإصدار', 'Linux agent VM', 'Snapshot', 'Time sync'],
    steps: [
      { title: 'ثبت version وagent health', code: `# manager
sudo /var/ossec/bin/wazuh-control info
sudo /var/ossec/bin/agent_control -lc
# سجل Active + latest keepalive + UTC time؛ لا تعرض registration key.` },
      { title: 'أضف عقد localfile نفسه على agent', code: `# داخل <ossec_config> في /var/ossec/etc/ossec.conf
<localfile>
  <location>/var/log/soc-lab.json</location>
  <log_format>json</log_format>
</localfile>

sudo install -m 640 /dev/null /var/log/soc-lab.json
sudo systemctl restart wazuh-agent
sudo systemctl status wazuh-agent --no-pager` },
      { title: 'اختبر rule 100100 بالعقد الموحد', code: `# manager: /var/ossec/etc/rules/local_rules.xml
<group name="soc_lab,">
  <rule id="100100" level="5">
    <decoded_as>json</decoded_as>
    <field name="lab_event">PIPELINE_TEST</field>
    <description>SOC lab synthetic pipeline marker</description>
  </rule>
</group>

sudo /var/ossec/bin/wazuh-logtest
# Positive:
# {"lab_event":"PIPELINE_TEST","test_id":"WAZUH-E2E-001","user":"lab-user"}
# Negative: lab_event=PIPELINE_TEST_TYPO؛ يجب ألا يطابق 100100.
# اختبر XML/rule أولًا ثم restart manager لتوليد live alerts.` },
      { title: 'قس ingestion ثلاث مرات وشخّص بالطبقات', code: `# manager بعد نجاح logtest
sudo systemctl restart wazuh-manager
sudo systemctl status wazuh-manager --no-pager

# agent
for n in 1 2 3; do
  ts=$(date -u +%FT%TZ)
  printf '{"event_time":"%s","lab_event":"PIPELINE_TEST","test_id":"WAZUH-E2E-001","run":"%s","user":"lab-user"}\\n' "$ts" "$n" \\
    | sudo tee -a /var/log/soc-lab.json
  sleep 5
done
# Dashboard: rule.id:100100 AND data.test_id:WAZUH-E2E-001
# اعرض data.run/data.event_time ثم احسب alert timestamp - event_time.

# troubleshooting على manager
sudo tail -n 100 /var/ossec/logs/ossec.log
sudo grep 'WAZUH-E2E-001' /var/ossec/logs/alerts/alerts.json | tail` },
    ],
    reportTemplate: `# Wazuh E2E Validation

## Environment
Manager/agent/OS versions, agent status, keepalive, time sync: ___

## Data contract
| Field | Expected | Observed |
|---|---|---|
| rule.id | 100100 | |
| data.test_id | WAZUH-E2E-001 | |
| data.lab_event | PIPELINE_TEST | |
| data.run | 1/2/3 | |

## Chain evidence
| Layer | Evidence | Result |
|---|---|---|
| source/localfile | exact JSON + path | |
| agent/manager | health/log evidence | |
| decoder/rule | logtest phases 2–3 | |
| alert/index | alerts.json + Dashboard | |

## Latency
| Run | event_time UTC | Alert UTC | Delay | One alert? |
|---:|---|---|---:|---|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |
Median/max: ___ / ___

Negative input: PIPELINE_TEST_TYPO
Collected? ___ Rule 100100 alert? ___ Explanation: ___
Proves: synthetic pipeline and tested rule. Does not prove: real-attack coverage, production capacity, HA, or universal SLA.`,
    deliverables: ['Version/agent evidence', 'Sanitized localfile/rule configs', 'Positive/negative logtest', '3 latency measurements', 'Troubleshooting tree'],
    acceptanceCriteria: ['Contract matches SOC Lab 6 exactly', 'Version actually observed', 'Dashboard-generated agent command', 'Rule 100100 no conflict', '3/3 measurements + time sync', 'Negative test', 'No secrets in Git'],
  },
  {
    num: 5,
    title: 'Detection Engineering — Three Tested Sigma Rules',
    goal: 'ثلاث قواعد جيدة مع fixtures وnegative tests وtuning، بدل 10 قواعد غير مختبرة.',
    estimated: '10–14 ساعة',
    safety: 'استخدم events مصطنعة/حميدة. لا تنفذ credential dumping أو evasion لتوليد logs، ولا تسمِّ القواعد production-ready.',
    requirements: ['YAML', 'Sigma validator/CLI موثق الإصدار', 'Windows fixtures', 'Git'],
    steps: [
      { title: 'اكتب قاعدة EncodedCommand سليمة', code: `title: PowerShell Encoded Command Argument
id: 7f43d7b6-4abc-4bd2-8b37-b95fd68fe742
status: test
description: Detects an encoded-command argument and requires contextual triage.
author: Your Name
logsource:
  product: windows
  category: process_creation
detection:
  selection_image:
    Image|endswith:
      - '\\powershell.exe'
      - '\\pwsh.exe'
  selection_argument:
    CommandLine|contains:
      - ' -EncodedCommand '
      - ' -enc '
  condition: selection_image and selection_argument
falsepositives:
  - Authorized administration, packaging, or security tooling
level: medium
tags:
  - attack.execution
  - attack.t1059.001` },
      { title: 'ابنِ test matrix يمنع substring traps', code: `case_id,Image,CommandLine,expected,reason
P1,C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe,"powershell.exe -NoProfile -EncodedCommand UwBPAEMA",match,encoded argument
N1,C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe,"powershell.exe Get-Process",no_match,no encoded argument
N2,C:\\Tools\\encoder.exe,"encoder.exe -enc file",no_match,wrong image
N3,C:\\Program Files\\PowerShell\\7\\pwsh.exe,"pwsh.exe -EncryptionAlgorithm AES",no_match,substring trap

# لكل rule: positive + ≥2 negative + known benign test.` },
      { title: 'أكمل task/service rules واختبر backends', code: `# Rule 2: scheduled-task registration من 4698/TaskContent أو process telemetry.
# Rule 3: service installation من 7045/4697 وImagePath.
# لا تكتشف كل task/service؛ استخدم behavior مثل user-writable paths/interpreters.
# وثق required fields, null behavior, escaping, case sensitivity, FP owner/expiry.

sigma version
sigma check rules/
sigma convert -t splunk rules/ > output/splunk.txt
sigma convert -t lucene rules/ > output/lucene.txt
# راجع field mappings والأداء يدويًا؛ نجاح التحويل لا يثبت جودة الكشف.` },
    ],
    reportTemplate: `# Detection Pack Notes

Sigma/validator/backends and versions: ___
Source schemas and required fields: ___

| Rule | Behavior | Positive | Negative | Known FP | Backend checked |
|---|---|---:|---:|---|---|
| | | | | | |

Per rule: logic, ATT&CK behavior mapping, blind spots, tuning owner/expiry, performance test: ___
Status: draft/test/lab-validated only. Production validation requires representative data, peer review, rollout, and monitoring.`,
    deliverables: ['3 Sigma YAML', '≥12 fixtures', 'Test results', '2 backend outputs', 'Changelog/engineering notes'],
    acceptanceCriteria: ['Validator passes YAML/escaping', 'Positive+negative+benign tests', 'No unjustified high severity', 'Behavior-only ATT&CK mapping', 'Schema/backend assumptions', 'No production-ready claim'],
  },
  {
    num: 6,
    title: 'Threat Hunt — Periodicity with Benign Control',
    goal: 'تحليل intervals على dataset حتمي وإثبات أن الانتظام مؤشر فرز لا verdict C2.',
    estimated: '8–12 ساعة',
    safety: 'لا تنشئ C2؛ كل البيانات محلية بعناوين TEST-NET. لا تنسب النتائج لمؤسسة حقيقية.',
    requirements: ['Python 3 standard library', 'CSV', 'KQL basics', 'Statistical reasoning'],
    steps: [
      { title: 'ولّد ثلاثة patterns', code: `cat > generate_hunt_data.py <<'PY'
import csv,datetime,random
random.seed(42); base=datetime.datetime(2026,8,17,8,tzinfo=datetime.timezone.utc); rows=[]
def add(host,proc,ip,offsets,context):
 for sec in offsets: rows.append({'timestamp':(base+datetime.timedelta(seconds=sec)).isoformat(),'host':host,'process':proc,'remote_ip':ip,'port':443,'context':context})
add('LAB-01','unknown.exe','192.0.2.44',[i*60+random.choice([-2,-1,0,1,2]) for i in range(30)],'unexplained')
add('LAB-02','updater.exe','198.51.100.10',[i*900 for i in range(12)],'approved updater')
t=0; browser=[]
for _ in range(25): t+=random.randint(5,240); browser.append(t)
add('LAB-03','browser.exe','203.0.113.20',browser,'interactive')
rows.sort(key=lambda r:r['timestamp'])
with open('network_events.csv','w',newline='') as f:
 w=csv.DictWriter(f,fieldnames=rows[0]); w.writeheader(); w.writerows(rows)
PY
python3 generate_hunt_data.py; sha256sum network_events.csv` },
      { title: 'احسب CV بلا is_beacon', code: `cat > analyze_periodicity.py <<'PY'
import csv,collections,datetime,statistics
g=collections.defaultdict(list)
for r in csv.DictReader(open('network_events.csv')): g[(r['host'],r['process'],r['remote_ip'],r['port'])].append(datetime.datetime.fromisoformat(r['timestamp']))
print('host,process,ip,port,count,mean_s,std_s,cv')
for key,times in sorted(g.items()):
 times.sort(); gaps=[(b-a).total_seconds() for a,b in zip(times,times[1:])]
 mean=statistics.mean(gaps); std=statistics.pstdev(gaps)
 print(*key,len(times),f'{mean:.2f}',f'{std:.2f}',f'{std/mean:.4f}',sep=',')
PY
python3 analyze_periodicity.py | tee results.csv
# updater قد يكون CV=0 لكنه benign؛ unknown.exe مرشح enrichment فقط.` },
      { title: 'اكتب hunt query وvalidation plan', code: `DeviceNetworkEvents
| where Timestamp > ago(24h) and ActionType == "ConnectionSuccess"
| project Timestamp, DeviceName, InitiatingProcessFileName,
          InitiatingProcessSHA1, RemoteIP, RemotePort
| sort by DeviceName asc, InitiatingProcessFileName asc, RemoteIP asc, Timestamp asc
// احسب interval داخل كل series بعناية أو export للتحليل.
// Enrich: signer/hash prevalence, parent tree, user/session, DNS/SNI,
// destination owner, proxy allowlist, bytes, fleet prevalence, persistence.
// Falsify with approved updater inventory and same pattern across fleet.` },
    ],
    reportTemplate: `# Periodic Connections Hunt

Hypothesis/data contract/dataset SHA-256: ___

| Series | Count | Mean | Std | CV | Context | Disposition |
|---|---:|---:|---:|---:|---|---|
| | | | | | | |

Why updater control matters: ___
Enrichment and falsification: ___
Query/statistical limits: ___
Outcome must be benign/escalated/unresolved with evidence—not automatic C2.`,
    deliverables: ['Generator + seed', 'CSV/hash', 'Python analyzer', 'KQL artifact', 'Hunt report'],
    acceptanceCriteria: ['Deterministic result', 'No numpy dependency', 'No is_beacon verdict from CV', 'Benign updater control', 'Enrichment/falsification', 'Limitations documented'],
  },
  {
    num: 7,
    title: 'Identity Incident — Sessions, MFA, OAuth, Mail',
    goal: 'التحقيق في sign-ins مصطنعة وتجاوز فكرة أن password reset وحده استجابة كافية.',
    estimated: '8–10 ساعات',
    safety: 'JSONL مصطنع بعناوين TEST-NET. لا revoke/reset على tenant حقيقي دون playbook وتفويض.',
    requirements: ['Python 3', 'KQL', 'Identity incident workflow'],
    steps: [
      { title: 'أنشئ evidence مصطنعًا', code: `cat > identity-events.jsonl <<'EOF'
{"time":"2026-08-17T08:00:00Z","user":"student@example.invalid","ip":"192.0.2.10","country":"YE","app":"OfficeHome","result":"success","mfa":"satisfied","session":"S1","risk":"none"}
{"time":"2026-08-17T08:07:00Z","user":"student@example.invalid","ip":"198.51.100.22","country":"SA","app":"OfficeHome","result":"success","mfa":"previously_satisfied","session":"S2","risk":"medium"}
{"time":"2026-08-17T08:09:00Z","user":"student@example.invalid","ip":"198.51.100.22","country":"SA","app":"AzurePortal","result":"failure","mfa":"challenge_failed","session":"S2","risk":"high"}
{"time":"2026-08-17T08:20:00Z","user":"student@example.invalid","action":"mailbox_rule_created","rule":"Archive invoices","session":"S2"}
{"time":"2026-08-17T08:25:00Z","user":"student@example.invalid","action":"oauth_consent","app":"Synthetic Reader","session":"S2"}
EOF
sha256sum identity-events.jsonl` },
      { title: 'ابنِ timeline حسب session', code: `python3 - <<'PY' | tee identity-timeline.txt
import collections,json
rows=sorted((json.loads(x) for x in open('identity-events.jsonl') if x.strip()),key=lambda r:r['time'])
g=collections.defaultdict(list)
for r in rows:g[r.get('session','NO_SESSION')].append(r)
for session,events in g.items():
 print('\\nSESSION',session)
 for e in events:print(e['time'],e.get('ip','-'),e.get('result',e.get('action','-')),e.get('mfa','-'))
PY` },
      { title: 'تحقق قبل الاستجابة', code: `# KQL sources: SigninLogs + AuditLogs + non-interactive/service principal
# + risk logs + mailbox audit حسب التراخيص والربط.
# Geo anomaly ليست إثبات impossible travel: اختبر VPN/travel/geo error.
# previously_satisfied ليست MFA prompt جديدًا.
# Scope by session/correlation IDs, not time alone.
# Authorized actions may include: block sign-in, revoke sessions/refresh tokens,
# reset credentials, review MFA methods, OAuth grants, mailbox rules/delegation,
# peer users/apps/IPs, preserve evidence, validate with user out-of-band.` },
    ],
    reportTemplate: `# Identity Incident

Evidence source/timezone/hash and user/session IDs: ___

| Time | Session | IP/location | App/action | Auth | Interpretation |
|---|---|---|---|---|---|
| | | | | | |

Hypotheses: VPN/travel/geo error vs token misuse vs managed/shared source; evidence/falsification ___
Scope: sign-ins, sessions, MFA methods, OAuth, mailbox, peers ___
Authorized response: owner/time/action/evidence/rollback ___
Gaps that could change decision: ___`,
    deliverables: ['Synthetic JSONL/hash', 'Timeline', 'KQL plan', 'Decision log', 'Identity report'],
    acceptanceCriteria: ['No geo-only verdict', 'previously_satisfied explained', 'Sessions+MFA+OAuth+mail scope', 'Correlation IDs', 'Planned vs completed actions separated'],
  },
  {
    num: 8,
    title: 'Ransomware Tabletop — NIST SP 800-61 Rev. 3',
    goal: 'تدريب القرار والتواصل والتعافي دون malware أو certainty زائفة.',
    estimated: '6–10 ساعات مع زميل إن أمكن',
    safety: 'تمرين ورقي فقط. لا simulator ولا encryption script؛ العزل الواقعي يحتاج incident commander وتفويضًا.',
    requirements: ['NIST Rev.3 concepts', 'Decision log', 'Business/asset context'],
    steps: [
      { title: 'حدد الأدوار والسلطة', code: `Roles: Incident Commander, SOC, IT Ops, Legal/Privacy,
Communications, Business Owner, Backup Owner.
Define escalation, authority matrix, evidence custodian,
out-of-band channel, update cadence, and stop conditions.
Govern/Identify/Protect support preparation; Detect/Respond/Recover handle incident activity.` },
      { title: 'اعمل عبر أربعة injects', code: `T+00: EDR alert on FIN-WS-01; 12 files renamed. Sensor online.
T+20: same user accessed FIN-SHARE-01 over SMB; backup status unknown.
T+40: note claims data theft; proxy has a 25-minute visibility gap.
T+70: owner asks to reconnect share; last restore test was 90 days ago.

For each: facts | assumptions | missing data | options/risks |
decision+owner | revisit trigger | next update.` },
      { title: 'ضع recovery gate', code: `Require clean rebuild/restore source, credential/session decision,
segmentation, validated restore test, monitoring, business acceptance,
rollback plan, evidence retention, and elevated-watch period.
Do not claim contained until scope/control effectiveness are verified.
Do not claim exfiltration from a ransom note alone.` },
    ],
    reportTemplate: `# Tabletop Record

Roles/authority/channel/evidence custodian: ___

| Time | Facts | Missing | Options/risks | Decision+owner | Revisit trigger |
|---|---|---|---|---|---|
| | | | | | |

Scope/impact/data-theft evidence gaps: ___
Executive updates: confirmed / unconfirmed / impact / actions / next decision ___
Recovery criteria and test evidence: ___
After-action owner/date/success metric: ___`,
    deliverables: ['Authority matrix', '4-inject decision log', '3 updates', 'Recovery gate', 'After-action'],
    acceptanceCriteria: ['Rev.3 current reference', 'Confirmed vs unconfirmed', 'No note-only exfil verdict', 'Business+backup owners', 'Action owner/trigger', 'No malware execution'],
  },
  {
    num: 9,
    title: 'ATT&CK Coverage — Evidence Matrix',
    goal: 'تقييم telemetry→analytic→test→triage لعشرة سلوكيات، لا heatmap رأي.',
    estimated: '8–12 ساعة',
    safety: 'اختبارات حميدة فقط؛ لا credential dumping/evasion لتلوين خانة.',
    requirements: ['ATT&CK', 'CSV/Sheets', 'Lab evidence', 'Detection tests'],
    steps: [
      { title: 'أنشئ data contract', code: `cat > coverage.csv <<'EOF'
behavior,attack_id,source,source_health,required_fields,analytic,positive_test,negative_test,last_test_utc,playbook,owner,gap,confidence
PowerShell encoded argument,T1059.001,Windows 4688,unknown,Image;CommandLine,SIGMA-001,not_run,not_run,,PB-PS,student,command-line audit unknown,low
Scheduled task registration,T1053.005,Security 4698,unknown,TaskName;TaskContent,SIGMA-002,not_run,not_run,,PB-TASK,student,audit policy unknown,low
EOF
# أكمل 10 behaviors تدربت عليها فعلاً؛ لا تضع covered=true بلا evidence.` },
      { title: 'استخدم maturity قابلة للتدقيق', code: `0 no relevant telemetry
1 configured; ingestion health unproven
2 source and required fields observed with health evidence
3 analytic has positive and negative lab tests
4 triage playbook exercised and tuning measured on representative data

A home lab normally cannot claim level 4 production representativeness.
Prevention and visibility are not detection.` },
      { title: 'رتب top gaps', code: `# لكل row اربط source-health, sanitized field sample, analytic,
# positive/negative test, and triage notes. Record ATT&CK version/access date.
# Rank top 3 by business relevance, exposure, feasibility, analyst capacity.
# Give each owner, prerequisite, date, success evidence, and residual risk.` },
    ],
    reportTemplate: `# ATT&CK Evidence Assessment

ATT&CK version/date, environment, and selection rationale: ___

| Behavior/ID | Source health | Fields | Analytic | Tests | Playbook | Level/confidence |
|---|---|---|---|---|---|---|
| | | | | | | |

Top 3 gaps: risk / dependency / owner-date / success evidence ___
Limits: visibility vs detection vs prevention; lab vs production; unsupported mappings ___`,
    deliverables: ['10-row matrix', 'Evidence links', 'Maturity rubric', 'Top-3 gap plan', 'Versioned report'],
    acceptanceCriteria: ['No covered without source+fields+analytic+tests', 'Visibility/detection/prevention separate', 'Safe tests', 'Owner+evidence for gaps', 'ATT&CK version/date', 'Limits explicit'],
  },
  {
    num: 10,
    title: 'SOC Lab Operational Handoff + Public Release',
    goal: 'Architecture وrunbooks وvalidation وrestore drill ونسخة Portfolio منزوعة الأسرار.',
    estimated: '12–16 ساعة على أسبوعين',
    safety: 'لا IPs عامة أو keys/tokens أو client data أو real PCAP. اختبر restore على Snapshot ولا تعتبر وجود backup إثباتًا.',
    requirements: ['Hypervisor', 'Diagram tool', 'Wazuh lab', 'Git', 'Snapshots'],
    steps: [
      { title: 'وثق architecture والـtrust boundaries', code: `Diagram: manager/dashboard, Windows/Linux agents, analyst,
Host-only data path, temporary NAT update path, management interfaces,
log direction/ports, DNS/NTP dependencies, trust boundaries.
Inventory: OS/version, vCPU/RAM/disk, IP role, data source, owner, snapshot.
Never include credentials or enrollment secrets.` },
      { title: 'أنشئ validation matrix فعلية', code: `cat > validation-matrix.csv <<'EOF'
check,method,expected,actual,evidence,date_utc,result
Time sync,NTP check,acceptable lab offset,,,,
Agent health,agent_control -l,Active recent keepalive,,,,
Windows 4688,benign marker,CommandLine observed,,,,
Linux auth,5 controlled failures,scoped events,,,,
Wazuh rule,positive+negative,100100 positive only,,,,
Dashboard,case query,one per sequence,,,,
Snapshot restore,restore drill,post-checks pass,,,,
EOF
# املأ actual من التشغيل؛ expected ليست result.` },
      { title: 'نفذ restore drill وقس RTO', code: `# Record VM/snapshot IDs and critical hashes.
# Create harmless post-snapshot marker.
# Restore selected snapshot.
# Verify marker absence, isolation, NTP, agent identity/status,
# ingestion, rules, and one E2E positive/negative test.
# Record observed RTO and data lost since snapshot.` },
      { title: 'راجع public release', code: `# Tree: README, redacted diagram, start-stop/troubleshooting runbooks,
# redacted validation, sanitized evidence hashes/samples, threat-model, changelog.
git grep -nEi '(password|secret|token|api[_-]?key|private key)'
git status --short
# راجع Git history أيضًا؛ حذف secret من آخر commit لا يزيله من التاريخ.
# README يجب أن يقول training lab، not production SOC.` },
    ],
    reportTemplate: `# SOC Lab Operational Handoff

Purpose/non-goals: training environment, explicit limits ___
Architecture/data flows/trust boundaries/dependencies: ___
Start-stop, health, storage, snapshots, rollback, troubleshooting: ___
Validation: matrix, 3 ingestion latencies, positive/negative, restore RTO ___
Threat model and residual risks: ___
Public release redactions, secret/history review, reviewer/date, claims not made: ___`,
    deliverables: ['Architecture diagram', 'VM inventory', 'Runbooks', 'Completed matrix', 'Measured restore drill', 'Redacted public release'],
    acceptanceCriteria: ['Trust boundaries shown', 'Actual linked to evidence', 'Restore tested/measured', 'Positive+negative E2E', 'No secrets/client data/real PCAP', 'Training—not production—claim'],
  },
];

const ProjectsDetailedSection = () => {
  const [openProject, setOpenProject] = useState<number | null>(null);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
        <span>🏗️</span>
        المشاريع الـ 10 - التفاصيل الكاملة
      </h1>
      <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

      <Alert type="golden">
        المشروع لا يكتمل بالنسخ أو الصور. نفّذ داخل المختبر، استبدل القيم بالأدلة الفعلية، اختبر الفرضيات السلبية، وراجع معايير القبول قبل نشر نسخة منزوعة الأسرار.
      </Alert>

      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.num} className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
            {/* Header - Always visible */}
            <button
              onClick={() => setOpenProject(openProject === project.num ? null : project.num)}
              className="w-full p-6 flex items-center gap-4 hover:bg-gray-700/30 transition-colors text-right"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                {project.num}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white">{project.title}</h3>
                <p className="text-gray-400 text-sm">{project.goal}</p>
              </div>
              <span className="text-cyan-400 text-2xl">{openProject === project.num ? '−' : '+'}</span>
            </button>

            {/* Expanded content */}
            {openProject === project.num && (
              <div className="p-6 pt-0 space-y-6 border-t border-gray-700">
                <div className="grid md:grid-cols-2 gap-3 pt-6">
                  <div className="rounded-lg border border-blue-500/30 bg-blue-950/20 p-4">
                    <h4 className="font-bold text-blue-300 mb-1">⏱️ الزمن التقريبي</h4>
                    <p className="text-gray-300 text-sm">{project.estimated}</p>
                  </div>
                  <div className="rounded-lg border border-amber-500/30 bg-amber-950/20 p-4">
                    <h4 className="font-bold text-amber-300 mb-1">🛡️ حدود السلامة</h4>
                    <p className="text-gray-300 text-sm leading-7">{project.safety}</p>
                  </div>
                </div>

                {/* المتطلبات */}
                <div>
                  <h4 className="text-cyan-400 font-bold mb-3">🛠️ المتطلبات:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.requirements.map((req, i) => (
                      <span key={i} className="px-3 py-1 bg-cyan-900/30 border border-cyan-500/30 rounded-full text-cyan-400 text-sm">{req}</span>
                    ))}
                  </div>
                </div>

                {/* الخطوات */}
                <div className="space-y-4">
                  <h4 className="text-green-400 font-bold">📋 الخطوات:</h4>
                  {project.steps.map((step, i) => (
                    <div key={i}>
                      <h5 className="text-white font-bold mb-2">الخطوة {i + 1}: {step.title}</h5>
                      <CodeBlock code={step.code} />
                    </div>
                  ))}
                </div>

                {/* قالب التقرير */}
                <div>
                  <h4 className="text-purple-400 font-bold mb-3">📝 قالب التقرير:</h4>
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto max-h-96 overflow-y-auto">
                    <pre className="text-gray-300 text-sm whitespace-pre-wrap font-mono" dir="ltr">
                      {project.reportTemplate}
                    </pre>
                  </div>
                  <button
                    onClick={() => navigator.clipboard.writeText(project.reportTemplate)}
                    className="mt-3 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white text-sm transition-colors"
                  >
                    📋 نسخ القالب
                  </button>
                </div>

                {/* المخرجات */}
                <div>
                  <h4 className="text-yellow-400 font-bold mb-3">📦 المخرجات المطلوبة:</h4>
                  <ul className="space-y-1">
                    {project.deliverables.map((d, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                        <span className="text-gray-500">☐</span> {d}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-green-500/30 bg-green-950/20 p-5">
                  <h4 className="text-green-300 font-bold mb-3">✅ معايير القبول قبل وضعه في Portfolio</h4>
                  <ul className="space-y-2">
                    {project.acceptanceCriteria.map((criterion, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-300 text-sm leading-6">
                        <span className="text-green-400 mt-0.5">□</span>
                        <span>{criterion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsDetailedSection;
