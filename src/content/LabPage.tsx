import LabViewer from '../components/LabViewer';
import { labs } from '../data/labs';

const LabPage: React.FC<{ labId: string }> = ({ labId }) => (
  <LabViewer
    key={labId}
    lab={labs.find(lab => lab.id === labId)}
    theme={{
      icon: '🌐', name: 'الشبكات', text: 'text-green-300', border: 'border-green-500/40',
      softBackground: 'bg-green-900/20', solidBackground: 'bg-green-600', gradient: 'from-green-900/40',
    }}
  />
);

export default LabPage;
