import { useState } from 'react';

const scenarios = [
  {
    id: 1,
    title: 'PowerShell EncodedCommand at 2 AM',
    scenario: 'Alert: PowerShell -EncodedCommand detected on a Finance department workstation at 2:00 AM. What do you do?',
    scenarioAr: 'تنبيه: PowerShell -EncodedCommand على جهاز مستخدم في قسم المالية الساعة 2 صباحاً. ماذا تفعل؟',
    answer: [
      'Check Event 4104 for script content',
      'Verify parent process - is it Office, Explorer, or something unusual?',
      'Check Sysmon Event 3 for network connections',
      'Verify if user is supposed to be working at 2 AM',
      'Decode the Base64 and read the actual command',
      'If DownloadString or IEX found → escalate immediately',
      'If escalated → isolate the device and document everything',
    ],
  },
  {
    id: 2,
    title: 'Mass Phishing Campaign',
    scenario: '50 users received the same phishing email. 3 clicked the link. 1 entered their password. What do you do?',
    scenarioAr: '50 مستخدم استلموا نفس إيميل phishing. 3 نقروا على الرابط. واحد أدخل كلمة المرور. ماذا تفعل؟',
    answer: [
      'Delete the email from all 50 inboxes',
      'Reset password for the user who submitted credentials immediately',
      'Enable MFA on their account',
      'Block sender domain and URLs',
      'Check if the compromised account was used for anything',
      'Investigate the 3 who clicked - check their devices',
      'Send awareness alert to all employees',
      'Document everything in an incident report',
    ],
  },
  {
    id: 3,
    title: 'Suspicious Service Installation at 3 AM',
    scenario: 'Event 7045 shows a new service named "UpdateService" with path C:\\Users\\admin\\AppData\\Local\\Temp\\svc.exe installed at 3 AM. Assessment?',
    scenarioAr: 'Event 7045 يظهر خدمة جديدة اسمها UpdateService مسارها في Temp تم تثبيتها الساعة 3 فجراً. ما تقييمك؟',
    answer: [
      'Red Flag 1: Time - 3 AM is unusual for legitimate service installation',
      'Red Flag 2: Path - AppData\\Local\\Temp is suspicious',
      'Red Flag 3: Filename - svc.exe is generic, mimicking system files',
      'Red Flag 4: Service name - "UpdateService" mimics legitimate Windows services',
      'Action: Immediate escalation and device isolation',
      'Action: Check hash of svc.exe in VirusTotal',
      'Action: Look for lateral movement to/from this device',
    ],
  },
];

const ScenariosPage = () => {
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [showTranslation, setShowTranslation] = useState<Record<number, boolean>>({});

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
        <span>💼</span>
        Interview Scenarios
      </h1>
      <div className="h-1 w-32 bg-gradient-to-l from-cyan-500 to-transparent rounded"></div>

      <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
        <p className="text-gray-300 text-sm">
          These are real-world scenarios commonly asked in SOC analyst interviews. Try to think of your answer before revealing the solution.
        </p>
      </div>

      <div className="space-y-6">
        {scenarios.map((s) => (
          <div key={s.id} className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between gap-3 mb-4">
                <h3 className="text-lg font-bold text-white" dir="ltr">Scenario {s.id}: {s.title}</h3>
                <button
                  onClick={() => setShowTranslation(prev => ({ ...prev, [s.id]: !prev[s.id] }))}
                  className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs text-gray-300 flex-shrink-0"
                >
                  {showTranslation[s.id] ? '🇬🇧' : '🇸🇦'}
                </button>
              </div>

              <div className="bg-yellow-900/20 rounded-lg p-4 border border-yellow-500/30 mb-4" dir="ltr">
                <p className="text-yellow-300 text-sm">{s.scenario}</p>
              </div>

              {showTranslation[s.id] && (
                <div className="bg-cyan-900/20 rounded-lg p-4 border border-cyan-500/20 mb-4">
                  <p className="text-cyan-300 text-sm">{s.scenarioAr}</p>
                </div>
              )}

              {!revealed[s.id] ? (
                <button
                  onClick={() => setRevealed(prev => ({ ...prev, [s.id]: true }))}
                  className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white font-bold transition-colors"
                >
                  💡 Reveal Model Answer
                </button>
              ) : (
                <div className="bg-green-900/20 rounded-lg p-4 border border-green-500/30">
                  <h4 className="text-green-400 font-bold mb-3">✅ Model Answer:</h4>
                  <ol className="space-y-2" dir="ltr">
                    {s.answer.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                        <span className="w-6 h-6 rounded-full bg-green-600/50 flex items-center justify-center text-green-400 text-xs font-bold flex-shrink-0">{i + 1}</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Study Tips */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-bold text-cyan-400 mb-4">📚 How to Use These Quizzes</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-white font-bold mb-2">The Right Method:</h4>
            <ol className="text-gray-300 text-sm space-y-1">
              <li>1. Solve the quiz without looking at answers</li>
              <li>2. Check your answers</li>
              <li>3. For every wrong answer, review the related content</li>
              <li>4. Retake after one week</li>
              <li>5. If score doesn't improve, you need more hands-on practice</li>
            </ol>
          </div>
          <div>
            <h4 className="text-white font-bold mb-2">Readiness Benchmark:</h4>
            <ul className="text-gray-300 text-sm space-y-2">
              <li><span className="text-red-400">Below 60%:</span> Need to review content again</li>
              <li><span className="text-yellow-400">60-75%:</span> Acceptable, need more hands-on</li>
              <li><span className="text-cyan-400">75-90%:</span> Very good, ready for interviews</li>
              <li><span className="text-green-400">Above 90%:</span> Excellent, ready for work!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenariosPage;
