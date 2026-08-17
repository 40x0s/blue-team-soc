

interface TableProps {
  headers: string[];
  rows: string[][];
  highlight?: number[];
}

const Table: React.FC<TableProps> = ({ headers, rows, highlight = [] }) => {
  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-gray-700">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-800">
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-4 py-3 text-right text-cyan-400 font-semibold border-b border-gray-700"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`border-b border-gray-800 hover:bg-gray-800/50 transition-colors ${
                highlight.includes(rowIndex) ? 'bg-yellow-900/20' : ''
              }`}
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`px-4 py-3 ${
                    cellIndex === 0 ? 'font-mono text-cyan-300' : 'text-gray-300'
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
