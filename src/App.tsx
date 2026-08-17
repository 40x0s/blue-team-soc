import { useState } from 'react';
import { foundationSections, networkSections, linuxSections, windowsSections, socSections, projectsSections, quizSections, careerSections } from './data/sections';
import StartHereSection from './content/StartHereSection';
import LabSetupSection from './content/LabSetupSection';

// Network Content
import PhilosophySection from './content/PhilosophySection';
import BasicsSection from './content/BasicsSection';
import PortsSection from './content/PortsSection';
import DNSSection from './content/DNSSection';
import TCPSection from './content/TCPSection';
import TLSSection from './content/TLSSection';
import HTTPSection from './content/HTTPSection';
import WindowsProtocolsSection from './content/WindowsSection';
import IOCsSection from './content/IOCsSection';
import WiresharkSection from './content/WiresharkSection';
import ChecklistSection from './content/ChecklistSection';
import LabPage from './content/LabPage';

// Linux Content
import LinuxIntroSection from './content/linux/LinuxIntroSection';
import LinuxFilesystemSection from './content/linux/LinuxFilesystemSection';
import LinuxUsersSection from './content/linux/LinuxUsersSection';
import LinuxLogsSection from './content/linux/LinuxLogsSection';
import LinuxCLISection from './content/linux/LinuxCLISection';
import LinuxProcessesSection from './content/linux/LinuxProcessesSection';
import LinuxNetworkSection from './content/linux/LinuxNetworkSection';
import LinuxPersistenceSection from './content/linux/LinuxPersistenceSection';
import LinuxHistorySection from './content/linux/LinuxHistorySection';
import LinuxAuditdSection from './content/linux/LinuxAuditdSection';
import LinuxHardeningSection from './content/linux/LinuxHardeningSection';
import LinuxMalwareSection from './content/linux/LinuxMalwareSection';
import LinuxChecklistSection from './content/linux/LinuxChecklistSection';
import LinuxLabPage from './content/linux/LinuxLabPage';

// Windows Content
import WindowsIntroSection from './content/windows/WindowsIntroSection';
import WindowsLogsSection from './content/windows/WindowsLogsSection';
import WindowsEventIDsSection from './content/windows/WindowsEventIDsSection';
import WindowsLogonTypesSection from './content/windows/WindowsLogonTypesSection';
import WindowsEventViewerSection from './content/windows/WindowsEventViewerSection';
import WindowsAuditingSection from './content/windows/WindowsAuditingSection';
import WindowsPowerShellSection from './content/windows/WindowsPowerShellSection';
import WindowsGetWinEventSection from './content/windows/WindowsGetWinEventSection';
import WindowsSysmonSection from './content/windows/WindowsSysmonSection';
import WindowsADSection from './content/windows/WindowsADSection';
import WindowsInvestigationsSection from './content/windows/WindowsInvestigationsSection';
import WindowsLOLBinsSection from './content/windows/WindowsLOLBinsSection';
import WindowsChecklistSection from './content/windows/WindowsChecklistSection';
import WindowsLabPage from './content/windows/WindowsLabPage';

// SOC Content
import SocIntroSection from './content/soc/SocIntroSection';
import SocTermsSection from './content/soc/SocTermsSection';
import { SocStructureSection, SocAlertLifecycleSection, SocTriageSection, SocEscalationSection, SocKillChainSection, SocMitreSection, SocPyramidSection, SocDiamondSection, SocThreatIntelSection, SocSIEMSection, SocAlertsSection, SocNISTSection, SocPhishingSection, SocEDRSection, SocChecklistSection } from './content/soc/SocAllSections';
import { SocQueryingSection, SocCaseworkSection, SocIdentityCloudSection, SocDetectionReasoningSection } from './content/soc/SocOperationsSections';
import SocLabPage from './content/soc/SocLabPage';

// Projects Content
import ProjectsIntroSection from './content/projects/ProjectsIntroSection';
import { ProjectsEmployerSection, ProjectsGitHubSection, ProjectsStructureSection, ProjectsReadmeSection, ProjectsWriteupsSection, ProjectsCVSection, ProjectsRubricSection, ProjectsChecklistSection } from './content/projects/ProjectsAllSections';
import ProjectsDetailedSection from './content/projects/ProjectsDetailedSection';

// Quiz Content
import QuizPage from './content/quiz/QuizPage';
import ScenariosPage from './content/quiz/ScenariosPage';
import { networkingQuiz, linuxQuiz, windowsQuiz, socQuiz } from './data/quizData';
import { labs } from './data/labs';
import { linuxLabs } from './data/linuxLabs';
import { windowsLabs } from './data/windowsLabs';
import { socLabs } from './data/socLabs';

// Career Content
import { CareerCVSection, CareerCVTemplateSection, CareerMistakesSection, CareerCoverLetterSection, CareerSaudiSection, CareerChecklistSection } from './content/career/CareerAllSections';
import { CareerLinkedInSection, CareerLinkedInContentSection, CareerLinkedInNetworkSection, CareerLinkedInChecklistSection } from './content/career/LinkedInSections';
import CareerExecutionSection from './content/career/CareerExecutionSection';

type CourseType = 'foundation' | 'networking' | 'linux' | 'windows' | 'soc' | 'projects' | 'quizzes' | 'career';

function App() {
  const [activeSection, setActiveSection] = useState('start-here');
  const [showLabs, setShowLabs] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeCourse, setActiveCourse] = useState<CourseType>('foundation');

  const sectionMap: Record<CourseType, typeof networkSections> = {
    foundation: foundationSections, networking: networkSections, linux: linuxSections, windows: windowsSections,
    soc: socSections, projects: projectsSections, quizzes: quizSections, career: careerSections
  };
  const currentSections = sectionMap[activeCourse];
  const allLabs = [...labs, ...linuxLabs, ...windowsLabs, ...socLabs];

  const labMap: Record<CourseType, string[]> = {
    foundation: [],
    networking: ['lab1','lab2','lab3','lab4','lab5'],
    linux: ['linux-lab1','linux-lab2','linux-lab3','linux-lab4','linux-lab5'],
    windows: ['windows-lab1','windows-lab2','windows-lab3','windows-lab4','windows-lab5'],
    soc: ['soc-lab1','soc-lab2','soc-lab3','soc-lab4','soc-lab5','soc-lab6'],
    projects: [], quizzes: [], career: [],
  };

  const firstSection: Record<CourseType, string> = {
    foundation: 'start-here', networking: 'philosophy', linux: 'linux-intro', windows: 'windows-intro',
    soc: 'soc-intro', projects: 'proj-intro', quizzes: 'quiz-networking', career: 'career-plan'
  };

  const courseColors: Record<CourseType, string> = {
    foundation: '#0e7490', networking: '#0891b2', linux: '#ea580c', windows: '#2563eb', soc: '#059669',
    projects: '#7c3aed', quizzes: '#dc2626', career: '#d97706'
  };

  const renderContent = () => {
    // Labs
    if (activeCourse === 'networking' && activeSection.startsWith('lab') && !activeSection.startsWith('linux') && !activeSection.startsWith('windows') && !activeSection.startsWith('soc')) return <LabPage labId={activeSection} />;
    if (activeCourse === 'linux' && activeSection.startsWith('linux-lab')) return <LinuxLabPage labId={activeSection} />;
    if (activeCourse === 'windows' && activeSection.startsWith('windows-lab')) return <WindowsLabPage labId={activeSection} />;
    if (activeCourse === 'soc' && activeSection.startsWith('soc-lab')) return <SocLabPage labId={activeSection} />;

    // Orientation
    if (activeCourse === 'foundation') {
      if (activeSection === 'lab-setup') return <LabSetupSection />;
      return <StartHereSection />;
    }

    // Networking
    const netMap: Record<string, React.ReactNode> = {
      philosophy: <PhilosophySection />, basics: <BasicsSection />, ports: <PortsSection />,
      dns: <DNSSection />, tcp: <TCPSection />, tls: <TLSSection />, http: <HTTPSection />,
      windows: <WindowsProtocolsSection />, iocs: <IOCsSection />, wireshark: <WiresharkSection />,
      checklist: <ChecklistSection />,
    };
    if (activeCourse === 'networking' && netMap[activeSection]) return netMap[activeSection];

    // Linux
    const linuxMap: Record<string, React.ReactNode> = {
      'linux-intro': <LinuxIntroSection />, 'linux-filesystem': <LinuxFilesystemSection />,
      'linux-users': <LinuxUsersSection />, 'linux-logs': <LinuxLogsSection />,
      'linux-cli': <LinuxCLISection />, 'linux-processes': <LinuxProcessesSection />,
      'linux-network': <LinuxNetworkSection />, 'linux-persistence': <LinuxPersistenceSection />,
      'linux-history': <LinuxHistorySection />, 'linux-auditd': <LinuxAuditdSection />,
      'linux-hardening': <LinuxHardeningSection />, 'linux-malware': <LinuxMalwareSection />,
      'linux-checklist': <LinuxChecklistSection />,
    };
    if (activeCourse === 'linux' && linuxMap[activeSection]) return linuxMap[activeSection];

    // Windows
    const winMap: Record<string, React.ReactNode> = {
      'windows-intro': <WindowsIntroSection />, 'windows-logs': <WindowsLogsSection />,
      'windows-eventids': <WindowsEventIDsSection />, 'windows-logontypes': <WindowsLogonTypesSection />,
      'windows-eventviewer': <WindowsEventViewerSection />, 'windows-auditing': <WindowsAuditingSection />,
      'windows-powershell': <WindowsPowerShellSection />, 'windows-getwinevt': <WindowsGetWinEventSection />,
      'windows-sysmon': <WindowsSysmonSection />, 'windows-ad': <WindowsADSection />,
      'windows-investigations': <WindowsInvestigationsSection />, 'windows-lolbins': <WindowsLOLBinsSection />,
      'windows-checklist': <WindowsChecklistSection />,
    };
    if (activeCourse === 'windows' && winMap[activeSection]) return winMap[activeSection];

    // SOC
    const socMap: Record<string, React.ReactNode> = {
      'soc-intro': <SocIntroSection />, 'soc-terms': <SocTermsSection />,
      'soc-structure': <SocStructureSection />, 'soc-alertlifecycle': <SocAlertLifecycleSection />,
      'soc-triage': <SocTriageSection />, 'soc-escalation': <SocEscalationSection />,
      'soc-killchain': <SocKillChainSection />, 'soc-mitre': <SocMitreSection />,
      'soc-pyramid': <SocPyramidSection />, 'soc-diamond': <SocDiamondSection />,
      'soc-threatintel': <SocThreatIntelSection />, 'soc-siem': <SocSIEMSection />,
      'soc-querying': <SocQueryingSection />, 'soc-casework': <SocCaseworkSection />,
      'soc-identity': <SocIdentityCloudSection />, 'soc-detection': <SocDetectionReasoningSection />,
      'soc-alerts': <SocAlertsSection />, 'soc-nist': <SocNISTSection />,
      'soc-phishing': <SocPhishingSection />, 'soc-edr': <SocEDRSection />,
      'soc-checklist': <SocChecklistSection />,
    };
    if (activeCourse === 'soc' && socMap[activeSection]) return socMap[activeSection];

    // Projects
    const projMap: Record<string, React.ReactNode> = {
      'proj-intro': <ProjectsIntroSection />,
      'proj-employer': <ProjectsEmployerSection />,
      'proj-github': <ProjectsGitHubSection />,
      'proj-structure': <ProjectsStructureSection />,
      'proj-readme': <ProjectsReadmeSection />,
      'proj-projects': <ProjectsDetailedSection />,
      'proj-writeups': <ProjectsWriteupsSection />,
      'proj-cv': <ProjectsCVSection />,
      'proj-rubric': <ProjectsRubricSection />,
      'proj-checklist': <ProjectsChecklistSection />,
    };
    if (activeCourse === 'projects' && projMap[activeSection]) return projMap[activeSection];

    // Quizzes
    const quizMap: Record<string, React.ReactNode> = {
      'quiz-networking': <QuizPage title="Quiz: Networking (25 Questions)" icon="🌐" questions={networkingQuiz} />,
      'quiz-linux': <QuizPage title="Quiz: Linux (25 Questions)" icon="🐧" questions={linuxQuiz} />,
      'quiz-windows': <QuizPage title="Quiz: Windows (25 Questions)" icon="🪟" questions={windowsQuiz} />,
      'quiz-soc': <QuizPage title="Quiz: SOC (25 Questions)" icon="🛡️" questions={socQuiz} />,
      'quiz-scenarios': <ScenariosPage />,
    };
    if (activeCourse === 'quizzes' && quizMap[activeSection]) return quizMap[activeSection];

    // Career
    const careerMap: Record<string, React.ReactNode> = {
      'career-plan': <CareerExecutionSection />,
      'career-cv': <CareerCVSection />,
      'career-cvtemplate': <CareerCVTemplateSection />,
      'career-mistakes': <CareerMistakesSection />,
      'career-coverletter': <CareerCoverLetterSection />,
      'career-saudi': <CareerSaudiSection />,
      'career-checklist': <CareerChecklistSection />,
      'career-linkedin': <CareerLinkedInSection />,
      'career-linkedin-content': <CareerLinkedInContentSection />,
      'career-linkedin-network': <CareerLinkedInNetworkSection />,
      'career-linkedin-checklist': <CareerLinkedInChecklistSection />,
    };
    if (activeCourse === 'career' && careerMap[activeSection]) return careerMap[activeSection];

    return <StartHereSection />;
  };

  const scrollToCourseTop = () => window.scrollTo({ top: 0, behavior: 'auto' });

  const selectSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setMobileNavOpen(false);
    scrollToCourseTop();
  };

  const handleCourseChange = (course: CourseType) => {
    setActiveCourse(course);
    setShowLabs(false);
    setActiveSection(firstSection[course]);
    setMobileNavOpen(false);
    scrollToCourseTop();
  };

  const showContentTab = () => {
    setShowLabs(false);
    if (labMap[activeCourse].includes(activeSection)) {
      setActiveSection(firstSection[activeCourse]);
      scrollToCourseTop();
    }
  };

  const showLabsTab = () => {
    const firstLab = labMap[activeCourse][0];
    if (!firstLab) return;
    setShowLabs(true);
    if (!labMap[activeCourse].includes(activeSection)) {
      setActiveSection(firstLab);
      scrollToCourseTop();
    }
  };

  const activeLab = allLabs.find(lab => lab.id === activeSection);
  const activeTitle = currentSections.find(section => section.id === activeSection)?.title
    ?? activeLab?.title
    ?? '';

  const courseLabels: Record<CourseType, { icon: string; label: string }> = {
    foundation: { icon: '🚀', label: 'ابدأ' },
    networking: { icon: '🌐', label: 'Network' },
    linux: { icon: '🐧', label: 'Linux' },
    windows: { icon: '🪟', label: 'Windows' },
    soc: { icon: '🛡️', label: 'SOC' },
    projects: { icon: '📂', label: 'Projects' },
    quizzes: { icon: '📝', label: 'Quizzes' },
    career: { icon: '💼', label: 'Career' },
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white" style={{ fontFamily: 'Tajawal, sans-serif' }}>
      {mobileNavOpen && <button type="button" aria-label="إغلاق القائمة" onClick={() => setMobileNavOpen(false)} className="fixed inset-0 z-20 bg-black/70 lg:hidden" />}
      {/* Sidebar */}
      <aside aria-label="التنقل في المنهج" className={`w-72 bg-gray-900 text-white h-screen fixed right-0 top-0 z-30 overflow-y-auto border-l border-cyan-500/30 transition-transform lg:translate-x-0 ${mobileNavOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-5 border-b border-cyan-500/30 bg-gradient-to-l from-cyan-900/50 to-transparent">
          <h1 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
            <span className="text-2xl">🛡️</span>SOC Training
          </h1>
          <p className="text-gray-400 text-sm mt-1">دليل المحلل الأمني الشامل</p>
        </div>

        {/* Course Selector */}
        <div className="p-3 border-b border-gray-700">
          <div className="grid grid-cols-4 gap-1">
            {(Object.keys(courseLabels) as CourseType[]).map((course) => (
              <button type="button" key={course} onClick={() => handleCourseChange(course)} aria-pressed={activeCourse === course}
                className={`py-2 px-1 rounded-lg text-xs font-medium transition-all ${activeCourse === course ? 'text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
                style={activeCourse === course ? { backgroundColor: courseColors[course] } : {}}>
                {courseLabels[course].icon} {courseLabels[course].label}
              </button>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700">
          <button type="button" onClick={showContentTab} aria-pressed={!showLabs}
            className={`flex-1 py-3 text-sm font-medium transition-all ${!showLabs ? 'text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
            style={!showLabs ? { backgroundColor: courseColors[activeCourse] } : {}}>
            📚 المحتوى
          </button>
          {labMap[activeCourse].length > 0 && (
            <button type="button" onClick={showLabsTab} aria-pressed={showLabs}
              className={`flex-1 py-3 text-sm font-medium transition-all ${showLabs ? 'bg-green-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>
              🧪 Labs
            </button>
          )}
        </div>

        {/* Nav */}
        {!showLabs ? (
          <nav className="p-4 pb-20">
            <ul className="space-y-1">
              {currentSections.map((section) => (
                <li key={section.id}>
                  <button type="button" onClick={() => selectSection(section.id)} aria-current={activeSection === section.id ? 'page' : undefined}
                    className={`w-full text-right px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${activeSection === section.id ? 'text-white shadow-lg' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}
                    style={activeSection === section.id ? { backgroundColor: courseColors[activeCourse] } : {}}>
                    <span className="text-lg">{section.icon}</span>
                    <span className="text-sm">{section.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        ) : (
          <nav className="p-4 pb-20">
            <div className="mb-4 p-3 bg-green-900/30 rounded-lg border border-green-500/30">
              <p className="text-green-400 text-xs">💡 طبق هذه Labs عملياً في بيئة آمنة (VMs)</p>
            </div>
            <ul className="space-y-2">
              {labMap[activeCourse].map((labId, index) => {
                const labTitle = allLabs.find(lab => lab.id === labId)?.title ?? `Lab ${index + 1}`;
                return (
                  <li key={labId}>
                    <button type="button" onClick={() => selectSection(labId)} aria-current={activeSection === labId ? 'page' : undefined}
                      className={`w-full rounded-lg px-4 py-3 text-right transition-all ${activeSection === labId ? 'bg-green-600 text-white shadow-lg shadow-green-500/30' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}>
                      <span className="text-sm leading-6">{labTitle}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700 bg-gray-900">
          <div className="text-center text-gray-500 text-xs"><p>بالتوفيق يا بطل 💪</p></div>
        </div>
      </aside>

      {/* Main */}
      <main className="min-h-screen lg:mr-72">
        <div className="sticky top-0 z-10 bg-gray-950/95 backdrop-blur border-b border-gray-800 px-4 py-4 sm:px-8">
          <div className="flex items-center gap-3 sm:gap-4">
            <button type="button" onClick={() => setMobileNavOpen(true)} className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white lg:hidden" aria-label="فتح قائمة المنهج">☰</button>
            <span className="px-3 py-1 rounded-full text-sm text-white" style={{ backgroundColor: courseColors[activeCourse] }}>
              {courseLabels[activeCourse].icon} {courseLabels[activeCourse].label}
            </span>
            {showLabs && <span className="px-3 py-1 bg-green-600 rounded-full text-sm">Labs</span>}
            <span className="text-gray-400">|</span>
            <span className="text-sm text-gray-300">{activeTitle}</span>
          </div>
        </div>

        <div className="max-w-5xl p-4 sm:p-8">{renderContent()}</div>

        <footer className="border-t border-gray-800 p-8 mt-12">
          <div className="max-w-5xl mx-auto text-center text-gray-500 text-sm">
            <p>SOC Training Guide | دليل تدريب المحلل الأمني</p>
            <p className="mt-2">💪 بالتوفيق يا بطل!</p>
          </div>
        </footer>
      </main>

    </div>
  );
}

export default App;
