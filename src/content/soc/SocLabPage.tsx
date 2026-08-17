import LabViewer from '../../components/LabViewer';
import { socLabs } from '../../data/socLabs';

const SocLabPage: React.FC<{ labId: string }> = ({ labId }) => (
  <LabViewer
    key={labId}
    lab={socLabs.find(lab => lab.id === labId)}
    theme={{
      icon: '🛡️', name: 'SOC', text: 'text-emerald-300', border: 'border-emerald-500/40',
      softBackground: 'bg-emerald-900/20', solidBackground: 'bg-emerald-600', gradient: 'from-emerald-900/40',
    }}
  />
);

export default SocLabPage;
