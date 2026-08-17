import Alert from '../../components/Alert';
import CodeBlock from '../../components/CodeBlock';
import Table from '../../components/Table';

const LinuxHistorySection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400">📜 Shell History كأثر مساعد</h1>
    <Alert type="warning" title="History ليس audit log">
      لا يسجل كل process: قد تُكتب الجلسة عند الخروج، تتداخل جلسات، تُستثنى أوامر، تُستخدم shell أخرى، أو يعدل المستخدم الملف. وجود command لا يثبت نجاحه، وغيابه لا يثبت أنه لم يُنفذ.
    </Alert>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">1. افهم المصدر قبل القراءة</h2>
      <Table headers={['المصدر', 'ماذا يمثل؟', 'قيد مهم']} rows={[
        ['history builtin', 'History المحملة في الجلسة الحالية', 'تختلف عن الملف وقد تشمل أوامر لم تُكتب بعد'],
        ['~/.bash_history', 'History المحفوظة لـBash', 'HISTFILE/HISTCONTROL/HISTSIZE والجلسات تؤثر'],
        ['~/.zsh_history وغيرها', 'صيغة shell أخرى', 'لا تفترض Bash من اسم الحساب'],
        ['auditd/EDR/process accounting', 'تنفيذ processes حسب الإعداد', 'coverage/permissions/retention وقد تسجل arguments حساسة'],
      ]} />
      <CodeBlock title="Inventory read-only مع metadata" language="bash" code={`user_home=/home/labuser
sudo stat -- "$user_home/.bash_history"
sudo readlink -- "$user_home/.bash_history" || true
sudo file -- "$user_home/.bash_history"
sudo sha256sum -- "$user_home/.bash_history"
sudo tail -n 100 -- "$user_home/.bash_history"`} />
      <Alert type="danger">قد يحتوي history على passwords/tokens وURLs داخلية. لا تطبعه في terminal مشتركة ولا تنشره؛ اجمعه في case storage مصرح مع access control.</Alert>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">2. فرز patterns منزوعة السلاح</h2>
      <CodeBlock language="bash" code={`hist=/home/labuser/.bash_history
sudo grep -nEi -- \\
  'curl|wget|scp|chmod|base64|history[[:space:]]+-c|unset[[:space:]]+HISTFILE|/dev/tcp|authorized_keys|systemctl|crontab' \\
  "$hist" | head -n 100`} />
      <div className="grid md:grid-cols-2 gap-4">
        {[
          ['Transfer', 'حدد المصدر والوجهة والملف؛ download command لا يثبت نجاح النقل أو التنفيذ.'],
          ['Privilege/admin', 'sudo/su طبيعيان؛ اربط auth logs وTTY/user/command/change.'],
          ['Discovery', 'id/uname/ps قد تكون troubleshooting؛ راقب التجمع والـparent/session.'],
          ['History suppression', 'history -c أو HISTFILE gap مهم، لكنه قد يكون privacy policy أو lab.'],
          ['Persistence changes', 'authorized_keys/cron/systemd تحتاج diff وowner/timestamps وexecution evidence.'],
          ['Encoded text', 'اعرض decoding كبيانات فقط؛ لا pipe إلى shell ولا تشغل الناتج.'],
        ].map(([title, body]) => <article key={title} className="rounded-xl border border-gray-700 bg-gray-800/50 p-5"><h3 className="font-bold text-cyan-300">{title}</h3><p className="mt-2 text-sm leading-7 text-gray-300">{body}</p></article>)}
      </div>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">3. Timeline وcorroboration</h2>
      <CodeBlock title="هل يحوي Bash timestamps؟" language="bash" code={`# Bash قد يخزن السطر #<epoch> قبل command عندما فُعّل timestamping.
sudo sed -n '/^#[0-9][0-9]*$/,+1p' /home/labuser/.bash_history | tail -n 100

# قارن نافذة محددة بالمصادقة وsudo (اسم الوحدة/الملف يختلف حسب النظام).
sudo journalctl --since '2026-01-15 08:00:00' --until '2026-01-15 09:00:00' \\
  _COMM=sudo --no-pager
sudo journalctl -u ssh --since '2026-01-15 08:00:00' --until '2026-01-15 09:00:00' --no-pager`} />
      <p className="leading-8 text-gray-300">اربط command بـlogin/session/TTY، process/network/file evidence وchange ticket. إن لم توجد timestamps فلا تصنع ترتيبًا دقيقًا من ترتيب lines وحده؛ merge behavior قد يربكه.</p>
    </section>

    <Alert type="golden" title="تسليم Portfolio">
      جدول من خمسة commands: رقم السطر، النص المنقح، ما يثبته، ما لا يثبته، دليل مستقل، وconfidence. أضف visibility gaps بدل عبارة «المهاجم حذف آثاره» بلا corroboration.
    </Alert>
  </div>
);

export default LinuxHistorySection;
