import { useState } from 'react';

interface ChecklistItemProps {
  text: string;
  id: string;
}

const ChecklistItem: React.FC<ChecklistItemProps> = ({ text, id }) => {
  const [checked, setChecked] = useState(() => {
    const saved = localStorage.getItem(`checklist-${id}`);
    return saved === 'true';
  });

  const toggle = () => {
    const newValue = !checked;
    setChecked(newValue);
    localStorage.setItem(`checklist-${id}`, String(newValue));
  };

  return (
    <label
      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
        checked
          ? 'bg-green-900/30 border border-green-500/50'
          : 'bg-gray-800/50 border border-gray-700 hover:border-cyan-500/50'
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={toggle}
        className="w-5 h-5 rounded accent-green-500"
      />
      <span
        className={`text-sm ${
          checked ? 'text-green-400 line-through' : 'text-gray-300'
        }`}
      >
        {text}
      </span>
      {checked && <span className="mr-auto text-green-500">✓</span>}
    </label>
  );
};

export default ChecklistItem;
