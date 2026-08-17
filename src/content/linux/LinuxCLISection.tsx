import Alert from '../../components/Alert';
import CodeBlock from '../../components/CodeBlock';
import Table from '../../components/Table';

const LinuxCLISection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400">⌨️ CLI للمحلل: فرز قابل للتكرار</h1>
    <Alert type="info" title="القاعدة العملية">
      لا تعدّل الأصل. اقتبس المتغيرات، استخدم <span dir="ltr">--</span> قبل paths عند دعم الأمر، وثبّت locale/timezone، واحفظ command وinput hash وoutput وerrors.
    </Alert>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">1. grep وRegex دون مبالغة</h2>
      <CodeBlock language="bash" code={`grep -nF -- 'literal text' evidence.log       # fixed string
LC_ALL=C grep -niE -- 'failed|invalid' evidence.log
# -C يضيف سياقًا؛ احذر بيانات حساسة حول المطابقة.
grep -nF -C 2 -- 'Accepted publickey' evidence.log`} />
      <Table headers={['الخيار/رمز', 'المعنى', 'خطأ شائع']} rows={[
        ['-F', 'Literal لا Regex', 'استخدام -E لنص غير موثوق'],
        ['-E', 'Extended regex', 'اعتبار المطابقة validation'],
        ['^ / $', 'بداية/نهاية line', '$ قد يسبق newline'],
        ['.*', 'أي تسلسل', 'Greedy وضوضاء عالية'],
        ['[0-9]{1,3}', '1–3 digits', 'لا يتحقق أن IPv4 octet ≤255'],
      ]} />
      <p className="leading-7 text-gray-300">Regex يستخرج candidate؛ استخدم <span dir="ltr">ipaddress</span> أو parser للبروتوكول للتحقق. URLs/email وIPv6 أصعب من الأنماط المختصرة.</p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">2. sort / uniq / cut / awk</h2>
      <CodeBlock language="bash" code={`# uniq يعد المتجاور فقط؛ لذلك sort قبله.
LC_ALL=C sort -- candidates.txt | uniq -c | sort -k1,1nr

# delimiter ثابت فقط؛ CSV المقتبس يحتاج parser CSV.
cut -d: -f1 -- /etc/passwd

# awk مناسب لحقول بسيطة، لا لرسالة تتغير فيها مواقع الكلمات.
awk -F '\\t' 'NR > 1 {count[$3]++} END {for (k in count) print count[k], k}' data.tsv`} />
      <Alert type="warning">أمثلة <span dir="ltr">awk {'{print $11}'}</span> على auth.log هشة؛ “invalid user” يغيّر موضع الحقول، وdistro/sshd version قد يغير الصيغة. Parse named patterns ثم اختبر fixtures.</Alert>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">3. Pipelines وexit status</h2>
      <CodeBlock language="bash" code={`#!/usr/bin/env bash
set -o errexit -o nounset -o pipefail
export LC_ALL=C
[ "$#" -eq 2 ] || { echo 'usage: triage.sh INPUT OUTPUT' >&2; exit 2; }
input=$1
output=$2

sha256sum -- "$input" > "$output.input.sha256"
grep -nE -- 'Failed password|Invalid user' "$input" \\
  | sort > "$output"
sha256sum -- "$output" > "$output.sha256"`} />
      <Alert type="info"><span dir="ltr">grep</span> يرجع 1 عند عدم وجود match؛ مع <span dir="ltr">errexit/pipefail</span> قد يتوقف script. قرر هل «صفر نتائج» حالة متوقعة وتعامل معها صراحةً بدل إخفاء جميع الأخطاء بـ<span dir="ltr">|| true</span>.</Alert>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">4. sed وfind بأمان</h2>
      <CodeBlock language="bash" code={`# Preview إلى ملف جديد؛ لا تستخدم -i على evidence.
sed 's/token=[^& ]*/token=[REDACTED]/g' evidence.log > evidence.redacted.log

# قيد النطاق والزمن؛ اطبع NUL لحماية المسافات/newlines.
find /var/log -xdev -type f -newermt '2026-01-15 08:00 UTC' \\
  ! -newermt '2026-01-15 09:00 UTC' -print0 > files.nul

# عرض shell-escaped للمراجعة
while IFS= read -r -d '' path; do printf '%q\\n' "$path"; done < files.nul`} />
      <p className="text-sm leading-7 text-gray-300"><span dir="ltr">mtime</span> يتغير بمحتوى الملف وليس creation time، وقد يُعدّل أو يُحفظ من archive. اربطه بـstat، package/change وtelemetry.</p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">5. Mini exercise</h2>
      <CodeBlock language="text" code={`Inputs: fixture hash + parser version
Window: start inclusive, end exclusive, UTC
Transformation: exact command/script
Outputs: total lines, parsed, unparsed, grouped results
Validation: manually verify a sample + expected test cases
Limitations: format/rotation/time source/visibility`} />
      <Alert type="golden">الاحتراف ليس pipeline أطول؛ بل نتيجة تستطيع تفسيرها واختبارها وإعادة إنتاجها دون تلويث الدليل أو تسريب بياناته.</Alert>
    </section>
  </div>
);

export default LinuxCLISection;
