import LabViewer from '../../components/LabViewer';
import { linuxLabs } from '../../data/linuxLabs';

const LinuxLabPage: React.FC<{ labId: string }> = ({ labId }) => (
  <LabViewer
    key={labId}
    lab={linuxLabs.find(lab => lab.id === labId)}
    theme={{
      icon: '🐧', name: 'Linux', text: 'text-orange-300', border: 'border-orange-500/40',
      softBackground: 'bg-orange-900/20', solidBackground: 'bg-orange-600', gradient: 'from-orange-900/40',
    }}
  />
);

export default LinuxLabPage;
