import { Section } from '../types';

interface SidebarProps {
  sections: Section[];
  activeSection: string;
  setActiveSection: (id: string) => void;
  showLabs: boolean;
  setShowLabs: (show: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  sections,
  activeSection,
  setActiveSection,
  showLabs,
  setShowLabs,
}) => {
  return (
    <aside className="w-72 bg-gray-900 text-white h-screen fixed right-0 top-0 overflow-y-auto border-l border-cyan-500/30">
      {/* Header */}
      <div className="p-6 border-b border-cyan-500/30 bg-gradient-to-l from-cyan-900/50 to-transparent">
        <h1 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
          <span className="text-2xl">🛡️</span>
          SOC Networking
        </h1>
        <p className="text-gray-400 text-sm mt-1">دليل المحلل الأمني</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-700">
        <button
          onClick={() => setShowLabs(false)}
          className={`flex-1 py-3 text-sm font-medium transition-all ${
            !showLabs
              ? 'bg-cyan-600 text-white'
              : 'text-gray-400 hover:text-white hover:bg-gray-800'
          }`}
        >
          📚 المحتوى
        </button>
        <button
          onClick={() => setShowLabs(true)}
          className={`flex-1 py-3 text-sm font-medium transition-all ${
            showLabs
              ? 'bg-green-600 text-white'
              : 'text-gray-400 hover:text-white hover:bg-gray-800'
          }`}
        >
          🧪 Labs عملية
        </button>
      </div>

      {/* Sections List */}
      {!showLabs && (
        <nav className="p-4">
          <ul className="space-y-1">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-right px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                    activeSection === section.id
                      ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/30'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <span className="text-xl">{section.icon}</span>
                  <span className="text-sm">{section.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Labs List */}
      {showLabs && (
        <nav className="p-4">
          <div className="mb-4 p-3 bg-green-900/30 rounded-lg border border-green-500/30">
            <p className="text-green-400 text-xs">
              💡 طبق هذه Labs عملياً في بيئة آمنة (VMs)
            </p>
          </div>
          <ul className="space-y-2">
            {['lab1', 'lab2', 'lab3', 'lab4', 'lab5'].map((labId, index) => (
              <li key={labId}>
                <button
                  onClick={() => setActiveSection(labId)}
                  className={`w-full text-right px-4 py-3 rounded-lg transition-all ${
                    activeSection === labId
                      ? 'bg-green-600 text-white shadow-lg shadow-green-500/30'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <span className="text-sm">Lab {index + 1}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700 bg-gray-900">
        <div className="text-center text-gray-500 text-xs">
          <p>بالتوفيق يا بطل 💪</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
