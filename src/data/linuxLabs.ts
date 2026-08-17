import { Lab } from '../types';

export const linuxLabs: Lab[] = [
  {
    id: 'linux-lab1',
    title: 'Lab 1: توليد وتحليل SSH failures بصورة مضبوطة',
    objective: 'توليد خمس محاولات password فاشلة فقط داخل شبكة Host-only، ثم إثبات النافذة والمصدر والنتيجة دون تسميتها compromise.',
    tools: ['جهازا Linux VM', 'OpenSSH', 'sshpass', 'journalctl'],
    estimatedMinutes: 75,
    safety: 'استخدم VMين تملكهما، Host-only بلا route عام، وحساب soclab غير مميز بكلمة مرور مختبرية. تحقق من lockout policy. لا تستخدم الجامعة أو العمل أو أي IP غير مملوك لك.',
    prerequisites: ['Snapshot للهدف', 'توثيق SOURCE_IP وTARGET_IP', 'حساب soclab واختبار SSH authorized', 'NumberOfPasswordPrompts=1'],
    steps: [
      {
        step: 1,
        description: 'على الهدف، سجل الوقت والحالة واسم SSH unit الفعلي.',
        command: `date -u +%FT%TZ
systemctl list-units --type=service --all 'ssh*.service'
ss -lnt | grep -E ':(22|2222)[[:space:]]' || true`,
        expected: 'UTC start وSSH unit/listener موثقان؛ إن لم يعمل SSH أصلح المختبر قبل المتابعة.'
      },
      {
        step: 2,
        description: 'على المصدر، تحقق يدويًا أن TARGET_IP هو عنوان Host-only، ثم نفذ خمس محاولات مرفوضة، محاولة واحدة لكل اتصال.',
        command: `TARGET_IP=192.0.2.20  # استبدله بعنوان Host-only الموثق
for i in 1 2 3 4 5; do
  sshpass -p "SOC-LAB-WRONG-$i" ssh \\
    -o PreferredAuthentications=password \\
    -o PubkeyAuthentication=no \\
    -o NumberOfPasswordPrompts=1 \\
    -o StrictHostKeyChecking=no \\
    -o UserKnownHostsFile=/dev/null \\
    -o ConnectTimeout=5 \\
    "soclab@$TARGET_IP" exit || true
done
date -u +%FT%TZ`,
        expected: 'خمسة اتصالات مرفوضة ولا shell ناجحة.',
        caution: 'كلمة المرور تظهر مؤقتًا في process arguments؛ لذلك dummy credential فقط. توقف إذا تغير العنوان أو ظهر lockout.'
      },
      {
        step: 3,
        description: 'على الهدف، صدّر نافذة UTC المحددة من الـunit الصحيح واحفظ hash.',
        command: `mkdir -m 700 -p "$HOME/CASE-LIN-SSH"
sudo journalctl --utc -u ssh \\
  --since '2026-01-15 08:00:00 UTC' --until '2026-01-15 08:15:00 UTC' \\
  --no-pager -o short-iso-precise > "$HOME/CASE-LIN-SSH/ssh.log"
sha256sum "$HOME/CASE-LIN-SSH/ssh.log" > "$HOME/CASE-LIN-SSH/manifest.sha256"`,
        expected: 'ملف evidence غير فارغ وhash. استبدل الوقت وunit؛ قد يكون sshd.',
        caution: 'لا تستخدم أوقات المثال كما هي ولا توسع النافذة بلا سبب.'
      },
      {
        step: 4,
        description: 'استخرج candidates بحسب كلمات from/for بدل أرقام أعمدة ثابتة، ثم راجع الأسطر الخمسة يدويًا.',
        command: `awk '/Failed password/ {
  user=""; src=""
  for (i=1; i<=NF; i++) {
    if ($i=="from") src=$(i+1)
    if ($i=="for") {
      if ($(i+1)=="invalid" && $(i+2)=="user") user=$(i+3); else user=$(i+1)
    }
  }
  print src "\\t" user
}' "$HOME/CASE-LIN-SSH/ssh.log" | sort | uniq -c`,
        expected: 'SOURCE_IP وsoclab مع count متوقع؛ راجع الفرق إن لم يكن 5.',
        why: 'العد فرز، وليس verdict؛ retries/PAM/صيغة الرسالة قد تغير الناتج.'
      },
      {
        step: 5,
        description: 'ابحث داخل نفس النافذة عن نجاح مرتبط ثم افحص session/process evidence.',
        command: `grep -nE 'Accepted (password|publickey)' "$HOME/CASE-LIN-SSH/ssh.log" || echo 'No accepted SSH event in scoped file'
who -a
ps -eo user,pid,ppid,lstart,comm,args | grep '[s]shd:' || true`,
        expected: 'توثيق وجود/غياب success ضمن النطاق، لا ادعاء أن host كله نظيف.'
      }
    ],
    filters: ['Failed password', 'Invalid user', 'Accepted password/publickey', 'SOURCE_IP + user + UTC window'],
    evidence: ['Start/end UTC', 'Target/source addresses', 'SSH unit', 'Raw export hash', 'Five reviewed failure records', 'Success/session search'],
    cleanup: 'أوقف التوليد، تحقق من عدم lockout، احذف حساب soclab فقط إذا أنشأته للمختبر وفق baseline أو استعد Snapshot. لا تنشر raw logs.',
    deliverable: `# Controlled SSH Authentication-Failure Case

## Scope
- Source/target ownership and Host-only proof: ___
- UTC window [start, end): ___
- SSH unit/log source/retention: ___

## Facts
- Reviewed failure records: ___
- Source and account: ___
- Accepted events in the scoped source/window: ___
- Session/process correlation: ___

## Assessment
Classification: Benign Positive — authorized simulation
This proves authentication failures, not compromise and not necessarily password guessing outside lab context.

## Gaps
Rotations, other units/hosts, NAT, clock, parser-unmatched lines: ___

## Production decision
Threshold/playbook, identity context, MFA/VPN, linked success/activity, shared-IP risk, authorized response: ___`
  },
  {
    id: 'linux-lab2',
    title: 'Lab 2: Bash auth triage مع fixture واختبارات',
    objective: 'كتابة Bash parser محدود الصيغة يحفظ الأصل ويخرج TSV ويعلن الأسطر غير المحللة بدل hard-coded fields.',
    tools: ['Bash', 'awk', 'sort', 'sha256sum'],
    estimatedMinutes: 90,
    safety: 'ابدأ بfixture مولدة. لا تشغل كـroot ولا تطبع sudo commands أو raw enterprise logs في Portfolio؛ قد تحتوي arguments وأسماء وعناوين حساسة.',
    prerequisites: ['Linux VM', 'مجلد مشروع غير مشترك', 'فهم أن parser يدعم صيغة محددة فقط'],
    steps: [
      {
        step: 1,
        description: 'أنشئ fixture مع success/failure وinvalid user وسطر malformed.',
        command: `cat > auth-fixture.log <<'LOG'
Jan 15 08:00:01 lab sshd[101]: Failed password for soclab from 192.0.2.10 port 50001 ssh2
Jan 15 08:00:02 lab sshd[102]: Failed password for invalid user guest from 192.0.2.10 port 50002 ssh2
Jan 15 08:00:03 lab sshd[103]: Accepted publickey for admin from 192.0.2.20 port 50003 ssh2
Jan 15 malformed Failed password without supported fields
LOG
sha256sum auth-fixture.log`,
        expected: 'أربعة أسطر وinput SHA-256.'
      },
      {
        step: 2,
        description: 'احفظ script الموجود في deliverable باسم auth-triage.sh ثم syntax-check.',
        command: `bash -n auth-triage.sh
chmod 700 auth-triage.sh`,
        expected: 'لا syntax errors.'
      },
      {
        step: 3,
        description: 'شغّل دون sudo على fixture وافحص outputs.',
        command: `./auth-triage.sh auth-fixture.log case-output
cat case-output.events.tsv
cat case-output.summary.txt
sha256sum -c case-output.input.sha256`,
        expected: 'failure=2، accepted=1، unparsed relevant=1، والـhash صحيح.'
      },
      {
        step: 4,
        description: 'اختبر no-match وfilename يحوي مسافة، ثم راجع exit codes.',
        command: `printf '%s\\n' 'benign unrelated line' > 'empty fixture.log'
./auth-triage.sh 'empty fixture.log' empty-output
cat empty-output.summary.txt`,
        expected: 'ينتهي بنجاح ويبلغ zero events بدل crash.'
      },
      {
        step: 5,
        description: 'أضف tests متوقعة إلى README ولا تستبدل الأصل.',
        command: `grep -q $'failure\\tsoclab\\t192.0.2.10' case-output.events.tsv
grep -q '^unparsed_relevant=1$' case-output.summary.txt
echo 'tests passed'`,
        expected: 'tests passed.'
      }
    ],
    evidence: ['Input hash', 'Script hash/version', 'Fixture', 'Expected assertions', 'TSV output', 'Unparsed count'],
    cleanup: 'احذف fixtures/outputs المحلية بعد حفظ نسخة المشروع المنقحة؛ لا تضف logs حقيقية إلى Git.',
    deliverable: `#!/usr/bin/env bash
set -o errexit -o nounset -o pipefail
export LC_ALL=C

input=$1
prefix=$2
[ -f "$input" ] || { echo 'input is not a regular file' >&2; exit 2; }
sha256sum -- "$input" > "$prefix.input.sha256"

awk -v summary="$prefix.summary.txt" '
BEGIN { OFS="\\t"; print "event","user","source","line" }
/sshd.*(Failed password|Accepted (password|publickey))/ {
  event = ($0 ~ /Failed password/) ? "failure" : "accepted"
  user=""; source=""
  for (i=1; i<=NF; i++) {
    if ($i=="from" && i<NF) source=$(i+1)
    if ($i=="for" && i<NF) {
      if ($(i+1)=="invalid" && $(i+2)=="user") user=$(i+3)
      else user=$(i+1)
    }
  }
  if (user!="" && source!="") { print event,user,source,NR; count[event]++ }
  else unparsed++
}
/Failed password/ && $0 !~ /sshd.*Failed password/ { unparsed++ }
END {
  print "failure=" (count["failure"]+0) > summary
  print "accepted=" (count["accepted"]+0) >> summary
  print "unparsed_relevant=" (unparsed+0) >> summary
}' "$input" > "$prefix.events.tsv"

sha256sum -- "$prefix.events.tsv" "$prefix.summary.txt" > "$prefix.outputs.sha256"`
  },
  {
    id: 'linux-lab3',
    title: 'Lab 3: Python parser متحقق من IP واختبارات وحدود',
    objective: 'بناء parser صغير لـOpenSSH يتحقق من IPv4/IPv6، يحصي parsed/unparsed، ويخرج JSON محايدًا لا قائمة حظر.',
    tools: ['Python 3 standard library', 'unittest', 'JSON'],
    estimatedMinutes: 120,
    safety: 'استخدم fixture منقحة. عناوين source ليست «مهاجمين» تلقائيًا، ولا تُرسل إلى blocklist أو خدمة عامة. لا تحلل ملفات لا تملك تصريحها.',
    prerequisites: ['Python 3.10+', 'Lab 2 أو فهم صيغة SSH', 'مجلد مشروع مع README'],
    steps: [
      {
        step: 1,
        description: 'احفظ الكود من deliverable باسم ssh_events.py وأنشئ fixture IPv4/IPv6/malformed.',
        command: `cat > ssh-events.log <<'LOG'
Jan 15 host sshd[1]: Failed password for analyst from 192.0.2.10 port 50001 ssh2
Jan 15 host sshd[2]: Failed password for invalid user guest from 2001:db8::10 port 50002 ssh2
Jan 15 host sshd[3]: Accepted publickey for admin from 192.0.2.20 port 50003 ssh2
Jan 15 host sshd[4]: Failed password for user from 999.2.3.4 port 50004 ssh2
LOG`,
        expected: 'أربع حالات: 3 valid وواحدة invalid IP.'
      },
      {
        step: 2,
        description: 'شغّل parser واحفظ JSON وstderr summary منفصلًا.',
        command: `python3 ssh_events.py ssh-events.log > events.json 2> summary.txt
python3 -m json.tool events.json
cat summary.txt`,
        expected: '3 events JSON وparsed=3/unparsed=1.'
      },
      {
        step: 3,
        description: 'اكتب unittest لكل نوع واختبر malformed وinvalid IP.',
        command: `python3 -m unittest -v`,
        expected: 'كل الاختبارات تمر؛ الاختبارات جزء من Portfolio لا screenshot فقط.'
      },
      {
        step: 4,
        description: 'اختبر ملفًا فارغًا وUnicode username وقيّم السلوك المعلن.',
        command: `: > empty.log
python3 ssh_events.py empty.log > empty.json 2> empty.summary
cat empty.json empty.summary`,
        expected: '[] وparsed=0/unparsed=0 دون exception.'
      },
      {
        step: 5,
        description: 'وثق supported grammar والخصوصية وعدم صلاحية النتائج للحظر الآلي.',
        expected: 'README يوضح الصيغة، test matrix، time limitation، exit codes، fields، redaction.'
      }
    ],
    evidence: ['Source + SHA-256', 'Unit tests', 'Fixture license', 'JSON schema example', 'Parsed/unparsed metrics', 'README limitations'],
    cleanup: 'استخدم بيانات documentation ranges 192.0.2.0/24 و2001:db8::/32. لا تستبدلها بعناوين المؤسسة في GitHub.',
    deliverable: `#!/usr/bin/env python3
import argparse, ipaddress, json, re, sys
from pathlib import Path

PATTERN = re.compile(
    r"sshd\\[\\d+\\]: (?P<result>Failed password|Accepted (?:password|publickey)) "
    r"for (?:(?:invalid user) )?(?P<user>\\S+) from (?P<source>\\S+) "
    r"port (?P<port>\\d+)"
)

def parse_line(line: str):
    match = PATTERN.search(line)
    if not match:
        return None
    try:
        source = str(ipaddress.ip_address(match["source"]))
        port = int(match["port"])
        if not 1 <= port <= 65535:
            return None
    except ValueError:
        return None
    return {
        "result": "failure" if match["result"].startswith("Failed") else "accepted",
        "user": match["user"], "source": source, "source_port": port
    }

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("input", type=Path)
    args = parser.parse_args()
    events, relevant, unparsed = [], 0, 0
    with args.input.open(encoding="utf-8", errors="replace") as handle:
        for line in handle:
            if "sshd[" not in line or not re.search(r"Failed password|Accepted (password|publickey)", line):
                continue
            relevant += 1
            event = parse_line(line)
            if event is None: unparsed += 1
            else: events.append(event)
    json.dump(events, sys.stdout, ensure_ascii=False, indent=2)
    print()
    print(f"relevant={relevant} parsed={len(events)} unparsed={unparsed}", file=sys.stderr)

if __name__ == "__main__":
    main()`
  },
  {
    id: 'linux-lab4',
    title: 'Lab 4: تحقيق process ↔ socket بأثر حميد',
    objective: 'إنشاء HTTP listener محلي حميد، جمع volatile evidence وحفظ hashes، ثم اتخاذ قرار Benign Positive وتنظيف exact artifacts.',
    tools: ['Linux VM', 'Python 3', 'ps', 'ss', 'lsof', '/proc'],
    estimatedMinutes: 90,
    safety: 'VM تملكها فقط، bind إلى 127.0.0.1، port 18080، ولا firewall/root scan. لا توقف أي PID قبل مطابقة marker. خذ Snapshot.',
    prerequisites: ['Port 18080 غير مستخدم', 'Python 3', 'Snapshot', 'مجلد home به مساحة'],
    steps: [
      {
        step: 1,
        description: 'أنشئ artifact حميد وشغّل listener محليًا مع PID file.',
        command: `mkdir -m 700 -p "$HOME/CASE-LIN-PROC"
cat > "$HOME/CASE-LIN-PROC/index.html" <<'HTML'
SOC_LAB_PROCESS_SOCKET_001
HTML
python3 -m http.server 18080 --bind 127.0.0.1 \\
  --directory "$HOME/CASE-LIN-PROC" > "$HOME/CASE-LIN-PROC/server.log" 2>&1 &
echo $! > "$HOME/CASE-LIN-PROC/server.pid"
sleep 1
curl --fail --silent http://127.0.0.1:18080/`,
        expected: 'يرجع marker المحلي فقط.',
        caution: 'إن كان port مستخدمًا غيّره في كل الخطوات أو أوقف المختبر؛ لا تقتل process الموجودة.'
      },
      {
        step: 2,
        description: 'سجل UTC وprocess identity/start/parent/arguments.',
        command: `case_dir="$HOME/CASE-LIN-PROC"
pid=$(cat "$case_dir/server.pid")
date --iso-8601=seconds | tee "$case_dir/acquired-at.txt"
ps -p "$pid" -o user,pid,ppid,lstart,etime,stat,comm,args | tee "$case_dir/process.txt"
tr '\\0' ' ' < "/proc/$pid/cmdline" | tee "$case_dir/cmdline.txt"; echo`,
        expected: 'PID نفسه وpython http.server arguments مع bind localhost.'
      },
      {
        step: 3,
        description: 'اربط listener بالـPID ثم اجمع executable/script metadata.',
        command: `case_dir="$HOME/CASE-LIN-PROC"
pid=$(cat "$case_dir/server.pid")
ss -lntp | tee "$case_dir/sockets.txt"
lsof -nP -a -p "$pid" -i 2>/dev/null | tee "$case_dir/lsof.txt"
readlink -- "/proc/$pid/exe" | tee "$case_dir/exe-path.txt"
sha256sum -- "/proc/$pid/exe" "$case_dir/index.html" | tee "$case_dir/artifacts.sha256"
stat -- "$case_dir/index.html" | tee "$case_dir/artifact-stat.txt"`,
        expected: '127.0.0.1:18080 مرتبط بالـPID؛ hashes وmetadata محفوظة.'
      },
      {
        step: 4,
        description: 'أنشئ manifest بعد اكتمال الجمع واكتب alternatives/gaps.',
        command: `case_dir="$HOME/CASE-LIN-PROC"
find "$case_dir" -maxdepth 1 -type f ! -name manifest.sha256 -print0 \\
  | sort -z | xargs -0 sha256sum > "$case_dir/manifest.sha256"
sha256sum -c "$case_dir/manifest.sha256"`,
        expected: 'كل hashes OK؛ التقرير يفرق listener snapshot عن historical sessions.',
        why: 'Path/port/Python وحدها لا تثبت maliciousness؛ marker وscope والـparent يثبتون benign simulation.'
      },
      {
        step: 5,
        description: 'نظف بعد مطابقة PID وcmdline، باستخدام SIGTERM ثم تحقق.',
        command: `case_dir="$HOME/CASE-LIN-PROC"
pid=$(cat "$case_dir/server.pid")
if tr '\\0' ' ' < "/proc/$pid/cmdline" | grep -q 'http.server 18080'; then
  kill -TERM "$pid"
  sleep 1
else
  echo 'PID marker mismatch; refusing to signal' >&2
  exit 1
fi
! kill -0 "$pid" 2>/dev/null
! ss -lnt | grep -q ':18080 '
echo 'cleanup verified'`,
        expected: 'Process/listener غائبان. احتفظ case directory كدليل منقح أو احذفه بعد التقرير.',
        caution: 'لا تستخدم SIGKILL تلقائيًا. إن لم يتوقف، افهم السبب وتحقق PID reuse قبل أي action.'
      }
    ],
    filters: ['PID + start time', '127.0.0.1:18080', 'cmdline marker', 'executable/artifact SHA-256'],
    evidence: ['Acquisition time', 'Process tree fields', 'Socket-to-PID link', 'Artifact metadata/hashes', 'Manifest', 'Cleanup verification'],
    cleanup: 'الخطوة 5 إلزامية. بعد توثيق الدليل احذف ~/CASE-LIN-PROC فقط إن لم تعد تحتاجه؛ لا تستخدم wildcard ولا تمس process أخرى.',
    deliverable: `# Linux Process–Socket Case

## Facts
PID/start/parent/user: ___
Local endpoint/state: ___
Executable and artifact hashes: ___
Acquisition UTC and tool versions: ___

## Correlation
How socket was tied to PID and marker: ___

## Competing hypotheses
1. Authorized local lab service: evidence ___
2. Unauthorized listener: evidence for/against ___

## Decision
Benign Positive — self-generated fixture. Confidence: ___
Limits: ss is a snapshot; no claim about past connections/content.

## Cleanup
SIGTERM authorized, marker checked, process/listener absent: ___`
  },
  {
    id: 'linux-lab5',
    title: 'Lab 5: Persistence حميد مع baseline واستعادة دقيقة',
    objective: 'إضافة marker واحد إلى user cron وbashrc، ربط config بالتنفيذ، ثم استعادة الحالة الأصلية دون حذف إعدادات أخرى.',
    tools: ['Linux lab VM', 'cron', 'bash', 'stat', 'sha256sum'],
    estimatedMinutes: 75,
    safety: 'VM تملكها بعد Snapshot وبحساب غير root. لا تستخدم crontab -r إلا عندما أثبت baseline أنه لم يوجد جدول، ولا تعدّل أجهزة عمل.',
    prerequisites: ['Snapshot', 'cron service متاحة', 'وجود ~/.bashrc أو إنشاء baseline واضح', 'لا marker سابق بنفس الاسم'],
    steps: [
      {
        step: 1,
        description: 'احفظ baseline مع status يفرق no-crontab عن error.',
        command: `case_dir="$HOME/soc-lab-persistence"
mkdir -m 700 -p "$case_dir"
if crontab -l > "$case_dir/crontab.before" 2> "$case_dir/crontab.error"; then
  printf 'present\\n' > "$case_dir/crontab.state"
elif grep -qi 'no crontab' "$case_dir/crontab.error"; then
  : > "$case_dir/crontab.before"
  printf 'absent\\n' > "$case_dir/crontab.state"
else
  echo 'Cannot establish crontab baseline' >&2; exit 1
fi
[ -f "$HOME/.bashrc" ] || { echo 'No .bashrc baseline; stop and document' >&2; exit 1; }
cp -p -- "$HOME/.bashrc" "$case_dir/bashrc.before"
sha256sum "$case_dir/crontab.before" "$case_dir/bashrc.before"`,
        expected: 'baseline files + state + hashes أو توقف آمن.'
      },
      {
        step: 2,
        description: 'أضف cron marker مع إبقاء الجدول الأصلي.',
        command: `(cat "$HOME/soc-lab-persistence/crontab.before"
printf '%s\\n' '* * * * * echo "SOC_LAB_PERSISTENCE_001 $(date -u +\\%FT\\%TZ)" >> /tmp/soc-lab-persistence.log # SOC_LAB_PERSISTENCE_001') | crontab -
crontab -l | grep -n 'SOC_LAB_PERSISTENCE_001'`,
        expected: 'marker واحد وبقية الجدول محفوظة.',
        caution: 'لا تستخدم echo line | crontab - وحده لأنه يستبدل الجدول.'
      },
      {
        step: 3,
        description: 'أضف block محددًا إلى bashrc ثم شغّل shell تفاعلية واحدة.',
        command: `cat >> "$HOME/.bashrc" <<'BASHRC'
# SOC_LAB_PERSISTENCE_001_START
printf 'SOC_LAB_SHELL_START %s\\n' "$(date -u +%FT%TZ)" >> /tmp/soc-lab-shell.log
# SOC_LAB_PERSISTENCE_001_END
BASHRC
bash -ic 'exit' 2>/dev/null || true
stat -- "$HOME/.bashrc" /tmp/soc-lab-shell.log`,
        expected: 'Config marker وexecution log timestamp.'
      },
      {
        step: 4,
        description: 'اجمع config/trigger/result من مصادر متعددة.',
        command: `crontab -l
grep -n -A2 -B1 'SOC_LAB_PERSISTENCE_001' "$HOME/.bashrc"
systemctl status cron --no-pager 2>/dev/null || systemctl status crond --no-pager
tail -n 5 /tmp/soc-lab-persistence.log /tmp/soc-lab-shell.log 2>/dev/null
stat -- /tmp/soc-lab-persistence.log /tmp/soc-lab-shell.log 2>/dev/null`,
        expected: 'توثيق config وtrigger وresult، أو gap واضح إذا cron لم ينفذ.'
      },
      {
        step: 5,
        description: 'استعد بالضبط حسب state، احذف artifacts المحددة، ثم قارن hashes.',
        command: `case_dir="$HOME/soc-lab-persistence"
if grep -qx 'present' "$case_dir/crontab.state"; then
  crontab "$case_dir/crontab.before"
elif grep -qx 'absent' "$case_dir/crontab.state"; then
  crontab -r 2>/dev/null || true
else
  echo 'Unknown baseline state; refusing cleanup' >&2; exit 1
fi
cp -p -- "$case_dir/bashrc.before" "$HOME/.bashrc"
rm -f -- /tmp/soc-lab-persistence.log /tmp/soc-lab-shell.log
sha256sum "$case_dir/bashrc.before" "$HOME/.bashrc"
! crontab -l 2>/dev/null | grep -q 'SOC_LAB_PERSISTENCE_001'
! grep -q 'SOC_LAB_PERSISTENCE_001' "$HOME/.bashrc"
echo 'cleanup verified'`,
        expected: 'bashrc hash مطابق، marker غائب، crontab عاد لحالته.'
      }
    ],
    filters: ['Unique marker', 'Config path/owner/mode/mtime', 'Trigger', 'Execution evidence', 'Baseline diff'],
    evidence: ['Baseline state/hashes', 'Exact diff', 'Cron/shell logs', 'Service health', 'Restoration hashes'],
    cleanup: 'الخطوة 5 إلزامية. إن انقطعت الجلسة استخدم baseline داخل ~/soc-lab-persistence أو Snapshot؛ لا تحذف جداول أو ملفات عامة.',
    deliverable: `# Benign Persistence Case

## Baseline
Host/user/snapshot/UTC: ___
crontab state + hash: ___
bashrc hash: ___

## Evidence matrix
| Mechanism | Config | Trigger | Execution evidence | Alternative | Assessment |
|---|---|---|---|---|---|
| user cron | | | | | Benign lab |
| bashrc | | | | | Benign lab |

## Limits
History absence does not disprove action; timestamp/path alone does not prove intent: ___

## Cleanup
Original cron state restored: ___
Original bashrc hash restored: ___
Exact artifacts absent: ___`
  }
];
