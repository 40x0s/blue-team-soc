import Alert from '../../components/Alert';
import ChecklistItem from '../../components/ChecklistItem';
import Table from '../../components/Table';

const WindowsChecklistSection = () => (
  <div className="space-y-10">
    <h1 className="flex items-center gap-3 text-3xl font-bold text-cyan-400"><span>✅</span>بوابة إتقان Windows Investigation</h1>
    <p className="text-lg leading-8 text-gray-300">هذه checklist للتقييم بالأدلة، لا لإعلان الجاهزية الذاتية. ضع علامة فقط بعد artifact منقح وشرح شفهي ومراجعة peer/mentor.</p>
    <Alert type="warning">استخدم Windows VM/lab مصرحًا وsynthetic fixtures. لا تنشر EVTX أو commands أو usernames/IPs أو GPO outputs حقيقية. containment/change يحتاج playbook وتفويضًا وحفظ evidence وrollback.</Alert>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">A. Provenance وصحة المصدر</h2>
      <ChecklistItem id="win-gate-a1" text="وثّقت host role وOS/build وUTC/timezone/clock، channel/provider/version وwindow وcollection path." />
      <ChecklistItem id="win-gate-a2" text="أثبتُّ audit/channel/sensor/forwarder/retention health، وميّزت empty result عن missing telemetry." />
      <ChecklistItem id="win-gate-a3" text="صدّرت fixture EVTX مصرحًا، حسبت SHA-256، قيدت الوصول، وعملت على نسخة." />
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">B. Parsing وcorrelation</h2>
      <ChecklistItem id="win-gate-b1" text="حوّلت ثلاثة events من XML باستخدام Data Name لا Properties index فقط، وحفظت null/schema version." />
      <ChecklistItem id="win-gate-b2" text="ربطت 4624/4625 مع LogonId/SID/source وauth/DC/VPN evidence دون اعتبار LogonType verdict." />
      <ChecklistItem id="win-gate-b3" text="بنيت process tree من 4688 أو Sysmon 1 وربطت network/DNS/file outcome بـProcessGuid أو entity موثوقة." />
      <ChecklistItem id="win-gate-b4" text="أعدت تجميع 4104 متعدد الأجزاء واختبرت هل execution نجح بدل الاكتفاء بوجود النص." />
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">C. خمسة تحقيقات لازمة</h2>
      <Table headers={['Case', 'الحد الأدنى للمخرج']} rows={[
        ['Failed logons', 'rates/distinct users/sources/status + success follow-up + alternatives.'],
        ['RDP/SMB', 'connection vs authentication vs session/resource outcome + endpoint/VPN/gateway context.'],
        ['PowerShell/LOLBins', 'process ancestry/arguments/signer/destination/file outcome + approved admin alternative.'],
        ['Persistence', 'service/task/registry event + object state/file/process run + owner/change/cleanup.'],
        ['Identity/AD', 'actor/target SID/group/SPN/DC + change/ticket/subsequent privilege use + scope.'],
      ]} />
      <ChecklistItem id="win-gate-c1" text="أنتجت التحقيقات الخمسة مع timeline، facts، فرضيتين على الأقل، confidence وحدود الرؤية." />
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">D. Detection engineering وcommunication</h2>
      <ChecklistItem id="win-gate-d1" text="كتبت detection محددة schema ثم اختبرت true fixture وbenign fixture وmissing-field behavior." />
      <ChecklistItem id="win-gate-d2" text="قست event count/EPS والـfalse positives، كتبت owner وtuning rationale وrollback وtelemetry health query." />
      <ChecklistItem id="win-gate-d3" text="كتبت escalation من صفحة واحدة: claim، evidence، scope، alternatives، impact، recommendation المشروطة." />
      <ChecklistItem id="win-gate-d4" text="شرحت قضية خلال 5 دقائق وأجبت: أين وُلد الحدث؟ ماذا لا يثبت؟ ما الدليل التالي؟" />
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">معيار المرور</h2>
      <p className="text-sm leading-7 text-gray-300">تمر عندما يراجع شخص آخر artifacts فيعيد خطواتك، وتحقق ≥80% في اختبار جديد قائم على سيناريو مع عدم ارتكاب critical error: إسناد ضار من ID منفرد، أو نشر بيانات، أو تغيير/containment غير مفوض. إن فشلت، أعد المختبر المسبب لا الصفحات كلها.</p>
    </section>
  </div>
);

export default WindowsChecklistSection;
