import LabViewer from '../../components/LabViewer';
import { windowsLabs } from '../../data/windowsLabs';

const WindowsLabPage: React.FC<{ labId: string }> = ({ labId }) => (
  <LabViewer
    key={labId}
    lab={windowsLabs.find(lab => lab.id === labId)}
    theme={{
      icon: '🪟', name: 'Windows', text: 'text-blue-300', border: 'border-blue-500/40',
      softBackground: 'bg-blue-900/20', solidBackground: 'bg-blue-600', gradient: 'from-blue-900/40',
    }}
  />
);

export default WindowsLabPage;
