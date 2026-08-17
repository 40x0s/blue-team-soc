import ChecklistItem from '../../components/ChecklistItem';
import Alert from '../../components/Alert';
import CodeBlock from '../../components/CodeBlock';

const LinuxChecklistSection = () => {
  const checklistItems = [
    'أعرف بنية نظام الملفات في Linux والمجلدات المهمة',
    'أقرأ /etc/passwd وأكتشف المستخدمين المشبوهين',
    'أفهم نظام الصلاحيات وأكتشف ملفات SUID خطيرة',
    'أحلل auth.log وأستخرج محاولات brute force',
    'أستخدم journalctl باحتراف مع الفلاتر الزمنية',
    'أتقن grep و awk و sed مع regex',
    'أفحص العمليات بـ ps و top وأكتشف المشبوهة',
    'أحلل الاتصالات الشبكية بـ ss و netstat',
    'أفحص cron jobs وأماكن persistence',
    'أقرأ bash history وأستخرج الأوامر المشبوهة',
    'أعرف auditd وكيف أضع قواعد للمراقبة',
    'أشدد إعدادات SSH بطريقة آمنة',
    'أستخدم UFW لإدارة الجدار الناري',
    'أتعرف على علامات الاختراق على Linux',
    'كتبت سكريبت Bash لتلخيص auth.log',
    'كتبت سكريبت Python لاستخراج IOCs',
    'أكتب تقرير تحقيق Linux كامل',
    'رفعت 3 تطبيقات على GitHub',
  ];

  const deliverables = [
    'lab1-linux-bruteforce.md مع نسخة من auth.log',
    'auth-summary.sh مع لقطة شاشة للنتيجة',
    'extract-iocs.py مع لقطة شاشة للنتيجة',
    'lab4-linux-investigation.md تحقيق شامل',
    'linux-commands-cheatsheet.md نسختك الشخصية',
    'linux-investigation-guide.md ملخصك الشخصي',
  ];

  const clearAllChecks = () => {
    checklistItems.forEach((_, index) => {
      localStorage.removeItem(`checklist-linux-item-${index}`);
    });
    deliverables.forEach((_, index) => {
      localStorage.removeItem(`checklist-linux-deliverable-${index}`);
    });
    window.location.reload();
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
        <span>✅</span>
        Checklist للجاهزية في Linux
      </h1>

      <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

      <Alert type="warning" title="قبل ما تنتقل لـ Windows">
        تأكد أنك تقدر تسوي كل هذه النقاط. علّم عليها وأنت تتقدم!
      </Alert>

      {/* قائمة المهارات */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">📋 قائمة المهارات</h2>
          <button
            onClick={clearAllChecks}
            className="text-sm text-gray-400 hover:text-red-400 transition-colors"
          >
            مسح الكل
          </button>
        </div>

        <div className="space-y-2">
          {checklistItems.map((item, index) => (
            <ChecklistItem key={index} text={item} id={`linux-item-${index}`} />
          ))}
        </div>
      </section>

      {/* المخرجات المطلوبة */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">📁 المخرجات المطلوبة</h2>
        <p className="text-gray-400">ارفع على GitHub:</p>

        <div className="space-y-2">
          {deliverables.map((item, index) => (
            <ChecklistItem key={index} text={item} id={`linux-deliverable-${index}`} />
          ))}
        </div>
      </section>

      {/* قالب التقرير */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">📝 قالب تقرير تحقيق Linux</h2>

        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 font-mono text-xs overflow-x-auto">
          <pre className="text-gray-300 whitespace-pre-wrap" dir="ltr">
{`# Linux Investigation Report

**Case ID:** LIN-2025-001
**Analyst:** [اسمك]
**Date:** [التاريخ]
**System:** [اسم السيرفر]
**Severity:** Low / Medium / High / Critical

## 1. Summary
[سطرين عن الحادثة]

## 2. Timeline
| Time | Event | Source |
|------|-------|--------|
| | | |

## 3. Evidence

### Suspicious Processes
| PID | User | Command | Notes |
|-----|------|---------|-------|
| | | | |

### Network Connections
| Local | Remote | State | Process |
|-------|--------|-------|---------|
| | | | |

### Suspicious Files
| Path | Modified | Permissions |
|------|----------|-------------|
| | | |

## 4. Analysis
[شرح ماذا حدث]

## 5. MITRE ATT&CK
- Tactic:
- Technique: T____

## 6. Assessment
- [ ] True Positive
- [ ] False Positive

## 7. Recommendations
1.
2.
3.`}
          </pre>
        </div>
      </section>

      {/* أسئلة المقابلات */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-white">💼 أسئلة المقابلات الشائعة</h2>

        <div className="space-y-4">
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h3 className="text-cyan-400 font-bold mb-3">كيف تكتشف SSH brute force؟</h3>
            <CodeBlock code={`grep "Failed password" /var/log/auth.log | awk '{print $11}' | sort | uniq -c | sort -rn`} />
          </div>

          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h3 className="text-cyan-400 font-bold mb-3">أين تجد السجلات في Linux؟</h3>
            <p className="text-gray-300 text-sm">/var/log/auth.log, /var/log/syslog, journalctl</p>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h3 className="text-cyan-400 font-bold mb-3">كيف تكتشف persistence؟</h3>
            <p className="text-gray-300 text-sm">crontab, systemd, /etc/init.d, ~/.bashrc, authorized_keys</p>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <h3 className="text-cyan-400 font-bold mb-3">أوامر يجب أن تعرفها</h3>
            <p className="text-gray-300 text-sm">ps, top, ss, ip, systemctl, journalctl, grep, awk, sed, find, lsof</p>
          </div>
        </div>
      </section>

      {/* القاعدة الذهبية */}
      <Alert type="golden" title="القاعدة الذهبية">
        <p className="text-xl font-bold">
          لا تنتقل لقسم Windows قبل ما تخلص 4 تطبيقات على الأقل وترفعها على GitHub!
        </p>
      </Alert>
    </div>
  );
};

export default LinuxChecklistSection;
