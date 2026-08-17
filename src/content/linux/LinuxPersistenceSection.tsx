import Alert from '../../components/Alert';
import CodeBlock from '../../components/CodeBlock';
import Table from '../../components/Table';

const LinuxPersistenceSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400">🔄 Linux Persistence Triage</h1>
    <Alert type="warning" title="Persistence آلية، لا verdict">
      Cron وsystemd وSSH keys وstartup files تُستخدم يوميًا بصورة شرعية. اسأل: ما trigger؟ ما action؟ من المالك؟ متى تغيّر؟ هل نُفّذ؟ وهل يطابق baseline/change؟
    </Alert>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">1. نموذج التحليل</h2>
      <Table headers={['عنصر', 'مثال', 'Evidence مطلوب']} rows={[
        ['Configuration', 'cron line / unit / key', 'path، owner/mode، content hash، source'],
        ['Trigger', 'وقت، boot، login، socket/path', 'schedule/dependency/condition'],
        ['Action', 'ExecStart أو command', 'executable/hash/arguments/environment بحذر'],
        ['Execution', 'journal/audit/process/file/network', 'event ID/time/outcome'],
        ['Provenance', 'package/CM/tool/change', 'owner/ticket/baseline/signature'],
        ['Scope', 'user/system/container', 'hosts/accounts/namespaces searched'],
      ]} />
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">2. Cron وsystemd timers</h2>
      <CodeBlock language="bash" code={`# Current user ثم system-level metadata؛ read-only.
crontab -l
sudo crontab -l
sudo find /etc/cron.d /etc/cron.daily /etc/cron.hourly /etc/cron.weekly \\
  -xdev -maxdepth 1 -type f -printf '%p %u %g %m %TY-%Tm-%TdT%TH:%TM:%TS\\n' 2>/dev/null

systemctl list-timers --all --no-pager
systemctl list-unit-files --type=timer --state=enabled --no-pager

# Deep dive لعنصر محدد، لا dump أعمى لكل configs.
systemctl show example.timer -p FragmentPath -p Unit -p NextElapseUSecRealtime
systemctl cat example.timer example.service
systemctl show example.service -p FragmentPath -p DropInPaths -p User -p ExecStart`} />
      <Alert type="info">Cron يستخدم environment محدودًا، و<span dir="ltr">%</span> له معنى خاص في command. فشل job أو غياب output لا يعني أنه لم يُtrigger؛ اربط service logs وartifacts.</Alert>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">3. Services وstartup</h2>
      <CodeBlock language="bash" code={`systemctl list-unit-files --type=service --state=enabled --no-pager
sudo find /etc/systemd/system -xdev -type f \\
  -printf '%p %u %g %m %TY-%Tm-%TdT%TH:%TM:%TS\\n' 2>/dev/null

# اختَر unit من inventory ثم تحقق:
systemctl status example.service --no-pager
systemctl cat example.service
journalctl --utc -u example.service --since '2026-01-15 08:00:00 UTC' --no-pager

# Legacy paths إن كانت التوزيعة تستخدمها
sudo stat /etc/rc.local /etc/init.d/example 2>/dev/null`} />
      <p className="leading-8 text-gray-300">افحص drop-ins وgenerator/transient units، لا اسم unit فقط. <span dir="ltr">enabled</span> لا يعني running، وrunning لا يعني boot persistence.</p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">4. SSH keys وshell startup</h2>
      <CodeBlock language="bash" code={`account=analyst
home_dir=$(getent passwd "$account" | cut -d: -f6)
sudo stat -- "$home_dir/.ssh" "$home_dir/.ssh/authorized_keys" 2>/dev/null
# Fingerprints دون نشر key material.
sudo ssh-keygen -lf "$home_dir/.ssh/authorized_keys" 2>/dev/null

# Metadata/hash أولًا؛ startup content قد يحوي secrets.
sudo stat -- "$home_dir/.profile" "$home_dir/.bashrc" 2>/dev/null
sudo sha256sum -- "$home_dir/.profile" "$home_dir/.bashrc" 2>/dev/null`} />
      <p className="leading-8 text-gray-300">تحقق من <span dir="ltr">AuthorizedKeysFile/AuthorizedKeysCommand</span> في effective sshd config؛ الملف المعتاد قد لا يكون المصدر. قيود key مثل <span dir="ltr">from=</span> و<span dir="ltr">command=</span> تغير المعنى.</p>
      <Alert type="danger">لا تطبع keys أو shell files عامة في terminal مشترك أو report. قد تحوي tokens/hosts/commands. اجمعها بتفويض إلى case storage مقيد ونقّح المخرجات.</Alert>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">5. Signals إضافية حسب الفرضية</h2>
      <Table headers={['Mechanism', 'أين تبحث', 'سياق ضروري']} rows={[
        ['Package/startup hooks', 'package DB، profile.d، init paths', 'package/change provenance'],
        ['Dynamic linker', '/etc/ld.so.preload، loader config', 'high impact؛ لا تعدّل قبل IR'],
        ['Containers', 'restart policy، manifests، orchestrator', 'host vs container namespace'],
        ['Cloud/automation', 'cloud-init، config management، agents', 'control-plane logs/owner'],
        ['User desktop', 'XDG autostart/systemd --user', 'هل asset desktop؟ user session؟'],
      ]} />
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">6. Decision وcontainment</h2>
      <CodeBlock language="text" code={`Finding: mechanism/config/trigger/action
Observed execution and outcome: ...
Owner/package/change/baseline: ...
Scope and alternatives: ...
Confidence and visibility gaps: ...
Authorized action: preserve → disable/remove/isolate only per playbook
Rollback and verification: ...`} />
      <Alert type="danger">حذف cron/unit/key قبل preservation قد يقطع خدمة أو إدارة ويزيل evidence. لا تستخدم <span dir="ltr">crontab -r</span> أو disable/delete جماعيًا. احفظ state، احصل على authorization، غيّر العنصر المحدد، ثم تحقق وامتلك rollback.</Alert>
    </section>

    <Alert type="golden" title="تمرين الإتقان">
      نفّذ Lab persistence الحميد: أثبت config ثم trigger ثم execution، وقارن baseline، وبعد cleanup أثبت عودة hash/state الأصليين.
    </Alert>
  </div>
);

export default LinuxPersistenceSection;
