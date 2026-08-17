import ChecklistItem from '../../components/ChecklistItem';
import Alert from '../../components/Alert';
import CodeBlock from '../../components/CodeBlock';
import Table from '../../components/Table';

const LinuxChecklistSection = () => {
  const skills = [
    'أفسر Linux paths والownership/permissions وSUID دون الحكم من path وحده',
    'أجمع process snapshot وأربط PID/start/parent/executable/hash/sockets',
    'أفرق بين listening socket وsession وhistorical network telemetry',
    'أبني نافذة UTC وأتحقق من journal/rotation/forwarder/visibility gaps',
    'أحلل SSH failures/successes كأحداث مصادقة لا verdict اختراق',
    'أستخدم grep/awk/sort بأمان وأعرف متى أحتاج parser structured',
    'أجمع history كأثر ناقص وأحمي secrets وأربطه بأدلة مستقلة',
    'أعمل inventory لـcron/systemd/timers/SSH keys بلا حذف أو تغيير',
    'أقرأ audit event كاملًا وأفرق auid/uid/euid وsuccess/exit',
    'أتحقق من package provenance/hash/baseline وحدود scanners',
    'أكتب facts/context/scope/hypotheses/confidence/action مشروطًا بالتفويض',
    'أعيد المختبر من الصفر وأشرح قراري شفهيًا خلال خمس دقائق',
  ];

  const deliverables = [
    'linux-auth-triage: fixture مولدة + parser tests + README + limitations',
    'linux-process-network-case.md: evidence table وtimeline وcompeting hypotheses',
    'linux-persistence-inventory.md: baseline/diff وrollback موثق داخل VM',
    'linux-audit-event.md: raw event منقح + record mapping + health/loss check',
    'linux-capstone-report.md: executive summary وscope وdecision وrecommendations',
  ];

  const reset = () => {
    try {
      [...skills, ...deliverables].forEach((_, index) => localStorage.removeItem(`checklist-linux-${index < skills.length ? `skill-${index}` : `deliverable-${index - skills.length}`}`));
    } catch {
      // قد يمنع المتصفح التخزين؛ إعادة التحميل تصفّر حالة الواجهة لهذه الجلسة.
    }
    window.location.reload();
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-cyan-400">✅ بوابة إتقان Linux للمحلل</h1>
      <Alert type="warning" title="Checkbox ليس دليل مهارة">
        علّم العنصر فقط بعد artifact قابل للإعادة، نتيجة متوقعة، تفسير للحدود، وretest دون نسخ. لا تؤخر Windows طلبًا للكمال؛ أصلح الفجوات بالتوازي.
      </Alert>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-bold text-white">مهارات قابلة للملاحظة</h2>
          <button type="button" onClick={reset} className="rounded-lg border border-gray-700 px-3 py-2 text-sm text-gray-400 hover:border-red-500 hover:text-red-300">مسح تقدم Linux</button>
        </div>
        <div className="space-y-2">{skills.map((item, index) => <ChecklistItem key={item} text={item} id={`linux-skill-${index}`} />)}</div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Portfolio deliverables</h2>
        <div className="space-y-2">{deliverables.map((item, index) => <ChecklistItem key={item} text={item} id={`linux-deliverable-${index}`} />)}</div>
        <Alert type="danger" title="سياسة النشر">
          انشر fixtures مولدة وscreenshots منقحة فقط. لا ترفع auth/audit/history حقيقية أو usernames/IPs/tokens/keys أو عينات إلى GitHub. افحص commit history أيضًا؛ حذف السر لاحقًا لا يمحوه منه.
        </Alert>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">قالب التقرير المقبول</h2>
        <CodeBlock language="markdown" code={`# Linux Investigation — CASE-LIN-001
## Executive summary
Decision + confidence + impact in plain language
## Scope and authority
Hosts/users/window (UTC), included/excluded, authorization
## Evidence handling
Source, acquisition time/tool, original SHA-256, storage/redaction
## Timeline
UTC | Fact | Source/event identifier | Interpretation
## Analysis
Facts → context → competing hypotheses → corroboration → gaps
## Assessment
Decision, confidence, affected/not-yet-searched scope
## Recommendations
Owner | priority | authorized action | risk | rollback | verification
## Appendix
Commands/versions, parser tests, ATT&CK mapping with evidence`} />
        <Table headers={['Gate', 'Pass']} rows={[
          ['Technical', 'Commands safe، outputs صحيحة، timestamps/IDs محفوظة'],
          ['Analytical', 'لا verdict من port/path/count؛ alternatives وgaps واضحة'],
          ['Reproducible', 'زميل يشغل fixture/tests ويحصل على expected output'],
          ['Communication', 'ملخص تنفيذي + شرح شفهي 5 دقائق + أسئلة follow-up'],
          ['Publication', 'Secret scan وتنقيح وبيانات مولدة وترخيص واضح'],
        ]} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">أسئلة مقابلة ذات إجابة مهنية</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            ['كيف تحقق SSH guessing؟', 'أحدد window/source/users/rate/outcomes ثم أربط success/session/process، وأذكر coverage.'],
            ['Process من /tmp: malware؟', 'Hypothesis فقط؛ أجمع hash/parent/user/package/change/sockets/prevalence.'],
            ['وجدت port 4444؟', 'أحدد protocol/state/PID/executable/remote context؛ رقم المنفذ ليس verdict.'],
            ['متى تقتل process؟', 'بعد تفويض وتقييم أثر وحفظ volatile evidence وخطة rollback/verification؛ لا أبدأ بـSIGKILL.'],
          ].map(([q, a]) => <article key={q} className="rounded-xl border border-gray-700 bg-gray-800/50 p-5"><h3 className="font-bold text-cyan-300">{q}</h3><p className="mt-2 text-sm leading-7 text-gray-300">{a}</p></article>)}
        </div>
      </section>

      <Alert type="golden">بوابة النجاح: 4 من 5 deliverables، capstone كامل، retest ≥ 80%، وشرح حي. عندها ابدأ Windows مع استمرار تحسين نقطة Linux الأضعف.</Alert>
    </div>
  );
};

export default LinuxChecklistSection;
