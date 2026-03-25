import { useContext, useMemo } from "react";
import { OrdersContext } from "../../hooks/UseContext";
import clsx from "clsx";
import NumberDisplay from "../../hooks/NumberDisplay";
import { billStatus } from "../../constants/data";

const MobileDataTable = ({ columns, rows, loading, notFound }) => {
  if (loading) return <div className="text-center py-8">جاري التحميل...</div>;
  if (!rows?.length) return <p className="text-center py-8">{notFound}</p>;

  const columnsWithRender = columns.map(col => ({
    ...col,
    renderCell: col.renderCell || ((params) => params.value || '-')
  }));

  return (
    <div className="w-full overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full table-auto text-xs min-w-[800px]">
        <thead>
          <tr className="bg-gray-50">
            {columnsWithRender.map((col, idx) => (
              <th key={col.field || idx} className="px-2 py-2 text-right font-semibold text-gray-700 border-b">
                {col.headerName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr key={row.id || rowIdx} className="border-b hover:bg-gray-50">
              {columnsWithRender.map((col, colIdx) => {
                let cellContent = col.renderCell({ row, value: row[col.field] });
                if (col.field === 'status') {
                  cellContent = billStatus.find(s => s.en === row[col.field])?.ar || row[col.field];
                } else if (col.field === 'amount') {
                  cellContent = NumberDisplay(parseInt(row[col.field] || 0)) + ' L.S';
                }
                return (
                  <td key={col.field || colIdx} className="px-2 py-2 text-right min-w-[60px] max-w-[120px] truncate">
                    {cellContent}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MobileDataTable;

