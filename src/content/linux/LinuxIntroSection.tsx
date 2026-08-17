import Alert from '../../components/Alert';
import Table from '../../components/Table';

const LinuxIntroSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400">🐧 Linux للمحلل SOC L1</h1>
    <Alert type="golden" title="النتيجة المطلوبة">
      عند نهاية المسار تستطيع جمع أدلة Linux محدودة وآمنة، ربط identity → session → process → file → network → persistence، وكتابة قرار بدرجة ثقة وحدود واضحة.
    </Alert>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">ابدأ بالنموذج لا بالأوامر</h2>
      <Table headers={['طبقة', 'مصادر نموذجية', 'السؤال']} rows={[
        ['Asset/context', 'CMDB، hostname، role، owner، clock', 'ما المتوقع ولماذا يهم؟'],
        ['Identity/session', 'NSS، PAM/SSH، sudo، utmp/wtmp', 'من صودق؟ هل توجد session؟'],
        ['Process', 'ps، /proc، audit/EDR', 'ما الذي يعمل؟ parent/user/start/outcome؟'],
        ['File/config', 'stat/hash/package/ACL/xattrs', 'ما artifact وprovenance؟'],
        ['Network', 'ss/lsof + DNS/flow/proxy/PCAP', 'ما endpoint والسياق والتاريخ؟'],
        ['Persistence', 'cron/timers/units/keys/startup', 'ما trigger/action/execution؟'],
        ['Telemetry health', 'journal/audit/agent/retention', 'هل الغياب evidence أم blind spot؟'],
      ]} />
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">منهج كل تحقيق</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          ['1 — ثبّت النطاق', 'Case ID، authority، host/namespace، UTC window، سؤال التحقيق.'],
          ['2 — اجمع volatile', 'وقت، sessions، processes، sockets قبل actions عالية الأثر.'],
          ['3 — احفظ provenance', 'Source/path/tool/version/hash وraw مقابل transformed.'],
          ['4 — اربط الأدلة', 'لا port أو path أو count منفرد؛ استخدم مصادر مستقلة.'],
          ['5 — اختبر بدائل', 'Admin/update/backup/container/error مقابل unauthorized activity.'],
          ['6 — قرر واتصل', 'Facts، scope، confidence، gaps، action مشروط، rollback/verification.'],
        ].map(([title, body]) => <article key={title} className="rounded-xl border border-gray-700 bg-gray-800/50 p-5"><h3 className="font-bold text-cyan-300">{title}</h3><p className="mt-2 text-sm leading-7 text-gray-300">{body}</p></article>)}
      </div>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">ترتيب الدراسة</h2>
      <ol className="space-y-2 leading-8 text-gray-300">
        <li><strong className="text-white">الأساس:</strong> filesystem → identity/permissions → logs → CLI.</li>
        <li><strong className="text-white">Volatile triage:</strong> processes → network.</li>
        <li><strong className="text-white">Correlation:</strong> persistence → history → audit.</li>
        <li><strong className="text-white">Decision:</strong> host/malware triage → hardening change workflow.</li>
        <li><strong className="text-white">Evidence:</strong> نفذ المختبرات ثم capstone وretest.</li>
      </ol>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">قواعد المختبر</h2>
      <div className="grid md:grid-cols-2 gap-4 text-sm leading-7 text-gray-300">
        <div className="rounded-xl border border-green-500/30 bg-green-900/10 p-5"><strong className="text-green-300">افعل:</strong> VM مملوكة، Host-only، Snapshot، marker فريد، أقل صلاحية، baseline، exact cleanup، fixtures مولدة.</div>
        <div className="rounded-xl border border-red-500/30 bg-red-900/10 p-5"><strong className="text-red-300">لا تفعل:</strong> public target، production change، root sweep أعمى، sample execution، public upload، kill/delete/block دون تفويض.</div>
      </div>
    </section>

    <Alert type="info" title="مصطلح مهم">
      <strong>Benign Positive</strong> يعني أن detection التقط السلوك المقصود لكن السبب مصرح/حميد. <strong>False Positive</strong> يعني أن منطق detection نفسه طابق ما لا يحقق شرطه. لا تستخدم المصطلحين بالتبادل.
    </Alert>

    <Alert type="golden" title="بوابة الإتقان">
      لا يكفي إنهاء الصفحات: 4 مختبرات موثقة، capstone، tests، cleanup، شرح شفهي 5 دقائق، وretest لا يقل عن 80%.
    </Alert>
  </div>
);

export default LinuxIntroSection;
