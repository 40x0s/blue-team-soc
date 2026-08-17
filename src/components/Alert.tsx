

interface AlertProps {
  type: 'info' | 'warning' | 'success' | 'danger' | 'golden';
  title?: string;
  children: React.ReactNode;
}

const Alert: React.FC<AlertProps> = ({ type, title, children }) => {
  const styles = {
    info: 'bg-blue-900/30 border-blue-500 text-blue-300',
    warning: 'bg-yellow-900/30 border-yellow-500 text-yellow-300',
    success: 'bg-green-900/30 border-green-500 text-green-300',
    danger: 'bg-red-900/30 border-red-500 text-red-300',
    golden: 'bg-amber-900/30 border-amber-500 text-amber-300',
  };

  const icons = {
    info: 'ℹ️',
    warning: '⚠️',
    success: '✅',
    danger: '🚨',
    golden: '⭐',
  };

  return (
    <div className={`my-4 p-4 rounded-lg border-r-4 ${styles[type]}`}>
      {title && (
        <div className="flex items-center gap-2 font-bold mb-2">
          <span>{icons[type]}</span>
          <span>{title}</span>
        </div>
      )}
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
};

export default Alert;
