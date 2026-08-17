import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

const copyText = async (text: string) => {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand('copy');
  textarea.remove();
  if (!copied) throw new Error('Copy failed');
};

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'bash', title }) => {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle');

  const copyToClipboard = async () => {
    try {
      await copyText(code);
      setCopyState('copied');
    } catch {
      setCopyState('error');
    }
    window.setTimeout(() => setCopyState('idle'), 2500);
  };

  const copyLabel = copyState === 'copied' ? '✓ نُسخ' : copyState === 'error' ? 'تعذّر النسخ' : '📋 نسخ';

  return (
    <div className="my-4 rounded-lg overflow-hidden bg-gray-900 border border-gray-700">
      {title && (
        <div className="px-4 py-2 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
          <span className="text-cyan-400 text-sm font-mono">{title}</span>
          <span className="text-gray-400 text-xs">{language}</span>
        </div>
      )}
      <div className="relative">
        <pre className="p-4 pt-12 sm:pt-4 overflow-x-auto text-sm" dir="ltr">
          <code className="text-green-400 font-mono">{code}</code>
        </pre>
        <button
          type="button"
          onClick={copyToClipboard}
          aria-label="نسخ الكود إلى الحافظة"
          className={`absolute top-2 left-2 px-3 py-1 rounded text-xs transition-colors ${
            copyState === 'error'
              ? 'bg-red-700 text-white'
              : copyState === 'copied'
                ? 'bg-green-700 text-white'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
          }`}
        >
          {copyLabel}
        </button>
      </div>
    </div>
  );
};

export default CodeBlock;
