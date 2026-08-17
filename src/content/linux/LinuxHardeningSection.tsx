import Alert from '../../components/Alert';
import CodeBlock from '../../components/CodeBlock';
import Table from '../../components/Table';

const LinuxHardeningSection = () => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-cyan-400">🛡️ Linux Hardening كعملية Change</h1>
    <Alert type="danger" title="Hardening غير المختبر قد يصنع incident availability">
      لا تنسخ checklist إلى production. ابدأ asset role وthreat model وvendor baseline، اختبر في staging، خذ approval/backup/console access وحدد rollback وowner ونافذة تغيير وverification.
    </Alert>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">1. Workflow قابل للعكس</h2>
      <CodeBlock language="text" code={`Scope → current effective state → desired control → dependencies
→ test plan → backup/snapshot → approved change → syntax validation
→ reload/canary → verify security + availability + telemetry → rollback if needed
→ evidence/change record`} />
      <Table headers={['Control', 'الفائدة', 'خطر يجب اختباره']} rows={[
        ['SSH key-only/MFA', 'يقلل password exposure', 'Lockout، key lifecycle، break-glass'],
        ['Disable direct root login', 'Accountability وprivilege path', 'Automation/recovery dependency'],
        ['Host firewall allowlist', 'يقلل exposure', 'قطع الإدارة/cluster/monitoring'],
        ['Patch management', 'إغلاق vulnerabilities', 'Reboot/compatibility/config merge'],
        ['Service minimization', 'خفض attack surface', 'Hidden application dependency'],
        ['Audit/log forwarding', 'Detection/forensics', 'Volume/privacy/loss/storage'],
      ]} />
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">2. SSH: effective config قبل التعديل</h2>
      <CodeBlock language="bash" code={`# Inventory؛ اسم الخدمة قد يكون ssh أو sshd.
sudo sshd -T | grep -Ei '^(port|permitrootlogin|passwordauthentication|pubkeyauthentication|maxauthtries|allowusers|allowgroups) '
sudo sshd -T -C user=analyst,host=server.example,addr=192.0.2.10 | head
sudo grep -RInE '^(Include|Match|Port|PermitRootLogin|PasswordAuthentication|PubkeyAuthentication|AllowUsers|AllowGroups)' /etc/ssh/sshd_config /etc/ssh/sshd_config.d 2>/dev/null

# بعد تعديل approved في staging:
sudo sshd -t
sudo systemctl reload sshd 2>/dev/null || sudo systemctl reload ssh`} />
      <Alert type="warning" title="منع lockout">
        تحقق من key login في session ثانية واترك session الحالية مفتوحة، واختبر sudo وconsole/break-glass. لا تعطّل password قبل نجاح البديل. استخدم reload بعد syntax test بدل restart غير الضروري.
      </Alert>
      <p className="leading-8 text-gray-300">تغيير port يقلل scanning noise فقط ولا يعوّض authentication/firewall/patching. قد يحتاج تعديل firewall وSELinux labeling وmonitoring/load balancer.</p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">3. Firewall: افهم طبقات enforcement</h2>
      <CodeBlock language="bash" code={`# Read-only inventory أولًا.
sudo ufw status verbose 2>/dev/null || true
sudo firewall-cmd --state 2>/dev/null || true
sudo firewall-cmd --list-all 2>/dev/null || true
sudo nft list ruleset 2>/dev/null
sudo ss -lntup`} />
      <p className="leading-8 text-gray-300">Host firewall ليس كل exposure: راجع cloud security groups/NACL، network firewall، NAT/load balancer، IPv4/IPv6 وcontainer rules. قبل enable/default-deny أضف واختبر management path وdependencies ثم جهز rollback عبر console.</p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">4. Patching وservice reduction</h2>
      <CodeBlock language="bash" code={`# Inventory فقط؛ لا تثبيت تلقائي.
systemctl list-units --type=service --state=running
systemctl list-unit-files --type=service --state=enabled
ss -lntup

# Debian-family preview حسب بيئة lab/change plan.
apt list --upgradable 2>/dev/null
sudo apt-get -s upgrade

# RHEL-family check فقط.
sudo dnf check-update || test $? -eq 100`} />
      <p className="leading-8 text-gray-300">لا تستخدم upgrade -y أو stop/disable باسم خدمة مفترض على production. اعرف owner/dependencies/SLA، اختبر update وreboot requirement، راقب health، وامتلك rollback مدعومًا.</p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">5. Verification evidence</h2>
      <CodeBlock language="text" code={`Change ID / approver / asset / maintenance window
Before: config hash + effective values + exposure + health
Change: exact diff (no secrets)
Validation: syntax + canary auth + app/service + monitoring/log flow
Security result: expected control demonstrated
Availability result: SLO/health checks
Rollback trigger/path/result
Residual risk and owner/review date`} />
      <Alert type="golden">مشروع Portfolio الأفضل: harden VM role واحدة، طبّق change واحدًا كل مرة، وأظهر before/after tests وrollback rehearsal. لا تدّعِ CIS compliance من script أو scanner score وحده.</Alert>
    </section>
  </div>
);

export default LinuxHardeningSection;
