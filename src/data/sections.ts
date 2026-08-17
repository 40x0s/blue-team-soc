import { Section } from '../types';

export const networkSections: Section[] = [
  { id: 'philosophy', title: 'الفلسفة قبل البداية', icon: '🎯' },
  { id: 'basics', title: 'الأساسيات الناقصة', icon: '📚' },
  { id: 'ports', title: 'Ports & Protocols', icon: '🔌' },
  { id: 'dns', title: 'DNS بعمق', icon: '🌐' },
  { id: 'tcp', title: 'TCP بعمق', icon: '🔗' },
  { id: 'tls', title: 'TLS / HTTPS', icon: '🔒' },
  { id: 'http', title: 'HTTP بعمق', icon: '📡' },
  { id: 'windows', title: 'SMB, RDP, Kerberos', icon: '🪟' },
  { id: 'iocs', title: 'Network IOCs', icon: '🚨' },
  { id: 'wireshark', title: 'Wireshark Cheat Sheet', icon: '🦈' },
  { id: 'checklist', title: 'Checklist للجاهزية', icon: '✅' },
];

export const linuxSections: Section[] = [
  { id: 'linux-intro', title: 'فلسفة Linux للمحلل', icon: '🐧' },
  { id: 'linux-filesystem', title: 'بنية نظام الملفات', icon: '📁' },
  { id: 'linux-users', title: 'المستخدمون والصلاحيات', icon: '👤' },
  { id: 'linux-logs', title: 'السجلات Logs', icon: '📋' },
  { id: 'linux-cli', title: 'أوامر CLI للمحلل', icon: '⌨️' },
  { id: 'linux-processes', title: 'العمليات Processes', icon: '⚙️' },
  { id: 'linux-network', title: 'تحليل الشبكة', icon: '🌐' },
  { id: 'linux-persistence', title: 'Cron و Persistence', icon: '🔄' },
  { id: 'linux-history', title: 'Bash History', icon: '📜' },
  { id: 'linux-auditd', title: 'Auditd للمراقبة', icon: '👁️' },
  { id: 'linux-hardening', title: 'التشديد الأمني', icon: '🛡️' },
  { id: 'linux-malware', title: 'كشف البرامج الضارة', icon: '🦠' },
  { id: 'linux-checklist', title: 'Checklist Linux', icon: '✅' },
];

export const windowsSections: Section[] = [
  { id: 'windows-intro', title: 'فلسفة Windows للمحلل', icon: '🪟' },
  { id: 'windows-logs', title: 'بنية Event Logs', icon: '📋' },
  { id: 'windows-eventids', title: 'Event IDs الكاملة', icon: '🔢' },
  { id: 'windows-logontypes', title: 'Logon Types', icon: '🔐' },
  { id: 'windows-eventviewer', title: 'Event Viewer', icon: '👁️' },
  { id: 'windows-auditing', title: 'تفعيل Auditing', icon: '⚙️' },
  { id: 'windows-powershell', title: 'PowerShell Logging', icon: '💻' },
  { id: 'windows-getwinevt', title: 'Get-WinEvent', icon: '🔍' },
  { id: 'windows-sysmon', title: 'Sysmon بعمق', icon: '🔬' },
  { id: 'windows-ad', title: 'Active Directory', icon: '🏢' },
  { id: 'windows-investigations', title: 'تحقيقات شائعة', icon: '🕵️' },
  { id: 'windows-lolbins', title: 'LOLBins', icon: '⚠️' },
  { id: 'windows-checklist', title: 'Checklist Windows', icon: '✅' },
];

export const socSections: Section[] = [
  { id: 'soc-intro', title: 'فلسفة SOC للمحلل', icon: '🛡️' },
  { id: 'soc-terms', title: 'المصطلحات الأساسية', icon: '📖' },
  { id: 'soc-structure', title: 'هيكل SOC ومستوياته', icon: '🏢' },
  { id: 'soc-alertlifecycle', title: 'Alert Lifecycle', icon: '🔄' },
  { id: 'soc-triage', title: 'Triage Playbook', icon: '📋' },
  { id: 'soc-escalation', title: 'متى تُصعّد؟', icon: '⬆️' },
  { id: 'soc-killchain', title: 'Cyber Kill Chain', icon: '⚔️' },
  { id: 'soc-mitre', title: 'MITRE ATT&CK', icon: '🎯' },
  { id: 'soc-pyramid', title: 'Pyramid of Pain', icon: '🔺' },
  { id: 'soc-diamond', title: 'Diamond Model', icon: '💎' },
  { id: 'soc-threatintel', title: 'Threat Intelligence', icon: '🧠' },
  { id: 'soc-siem', title: 'SIEM للمحلل', icon: '📊' },
  { id: 'soc-alerts', title: 'تحقيق Alerts الشائعة', icon: '🚨' },
  { id: 'soc-nist', title: 'NIST IR Lifecycle', icon: '📜' },
  { id: 'soc-phishing', title: 'Phishing Investigation', icon: '🎣' },
  { id: 'soc-edr', title: 'EDR و XDR', icon: '🔬' },
  { id: 'soc-checklist', title: 'Checklist SOC', icon: '✅' },
];

export const projectsSections: Section[] = [
  { id: 'proj-intro', title: 'فلسفة Portfolio', icon: '🎯' },
  { id: 'proj-employer', title: 'ماذا يبحث المُوظِف؟', icon: '👔' },
  { id: 'proj-github', title: 'GitHub Profile احترافي', icon: '🐙' },
  { id: 'proj-structure', title: 'هيكل Repository', icon: '📁' },
  { id: 'proj-readme', title: 'كتابة README احترافي', icon: '📝' },
  { id: 'proj-projects', title: 'المشاريع الـ 10', icon: '🏗️' },
  { id: 'proj-writeups', title: 'Write-ups من المنصات', icon: '✍️' },
  { id: 'proj-cv', title: 'CV و LinkedIn', icon: '💼' },
  { id: 'proj-rubric', title: 'Rubric للتقييم الذاتي', icon: '📊' },
  { id: 'proj-checklist', title: 'Checklist النهائية', icon: '✅' },
];

export const quizSections: Section[] = [
  { id: 'quiz-networking', title: 'Quiz: Networking (25)', icon: '🌐' },
  { id: 'quiz-linux', title: 'Quiz: Linux (25)', icon: '🐧' },
  { id: 'quiz-windows', title: 'Quiz: Windows (25)', icon: '🪟' },
  { id: 'quiz-soc', title: 'Quiz: SOC (25)', icon: '🛡️' },
  { id: 'quiz-scenarios', title: 'سيناريوهات المقابلات', icon: '💼' },
];

export const careerSections: Section[] = [
  { id: 'career-cv', title: 'كتابة CV احترافي', icon: '📄' },
  { id: 'career-cvtemplate', title: 'قالب CV جاهز', icon: '📋' },
  { id: 'career-mistakes', title: 'أخطاء تقتل CV', icon: '❌' },
  { id: 'career-coverletter', title: 'Cover Letter', icon: '✉️' },
  { id: 'career-saudi', title: 'السوق السعودي', icon: '🇸🇦' },
  { id: 'career-checklist', title: 'Checklist CV', icon: '✅' },
  { id: 'career-linkedin', title: 'LinkedIn Optimization', icon: '🔗' },
  { id: 'career-linkedin-content', title: 'محتوى LinkedIn', icon: '📱' },
  { id: 'career-linkedin-network', title: 'Networking واستراتيجية', icon: '🤝' },
  { id: 'career-linkedin-checklist', title: 'Checklist LinkedIn', icon: '✅' },
];

export const sections = networkSections;
