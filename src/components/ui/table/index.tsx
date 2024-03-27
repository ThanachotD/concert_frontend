import React from 'react';

interface TableProps {
  columns: string[];
  data: Array<{ [key: string]: string }>;
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.values(row).map((value, valueIndex) => (
                <td key={valueIndex}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
