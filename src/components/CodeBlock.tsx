import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'bash', title }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-4 rounded-lg overflow-hidden bg-gray-900 border border-gray-700">
      {title && (
        <div className="px-4 py-2 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
          <span className="text-cyan-400 text-sm font-mono">{title}</span>
          <span className="text-gray-500 text-xs">{language}</span>
        </div>
      )}
      <div className="relative">
        <pre className="p-4 overflow-x-auto text-sm" dir="ltr">
          <code className="text-green-400 font-mono">{code}</code>
        </pre>
        <button
          onClick={copyToClipboard}
          className="absolute top-2 left-2 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs text-gray-300 transition-all"
        >
          {copied ? '✓ نُسخ!' : '📋 نسخ'}
        </button>
      </div>
    </div>
  );
};

export default CodeBlock;
