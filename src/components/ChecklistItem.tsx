import { useState } from 'react';

interface ChecklistItemProps {
  text: string;
  id: string;
}

const storageKey = (id: string) => `checklist-${id}`;

const readStoredState = (id: string): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(storageKey(id)) === 'true';
  } catch {
    return false;
  }
};

const ChecklistItem: React.FC<ChecklistItemProps> = ({ text, id }) => {
  const [checked, setChecked] = useState(() => readStoredState(id));
  const [storageUnavailable, setStorageUnavailable] = useState(false);

  const toggle = () => {
    const newValue = !checked;
    setChecked(newValue);
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(storageKey(id), String(newValue));
      setStorageUnavailable(false);
    } catch {
      setStorageUnavailable(true);
    }
  };

  return (
    <div>
      <label
        className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-all ${
          checked
            ? 'border-green-500/50 bg-green-900/30'
            : 'border-gray-700 bg-gray-800/50 hover:border-cyan-500/50'
        }`}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={toggle}
          className="h-5 w-5 rounded accent-green-500"
        />
        <span className={`text-sm ${checked ? 'text-green-400 line-through' : 'text-gray-300'}`}>{text}</span>
        {checked && <span className="mr-auto text-green-500" aria-hidden="true">✓</span>}
      </label>
      {storageUnavailable && <p className="mt-1 text-xs text-yellow-400" role="status">تم التغيير لهذه الجلسة، لكن المتصفح منع حفظ التقدم محليًا.</p>}
    </div>
  );
};

export default ChecklistItem;
