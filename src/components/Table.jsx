import React from "react";

export default function Table({
  columns = [],
  data = [],
  actions,
  emptyText = "No records found",
}) {
  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col, i) => (
              <th
                key={i}
                className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b"
              >
                {col.header}
              </th>
            ))}

            {actions && (
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                Actions
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (actions ? 1 : 0)}
                className="text-center py-6 text-gray-500"
              >
                {emptyText}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-gray-50 transition"
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-4 py-3 border-b text-sm text-gray-700"
                  >
                    {col.render
                      ? col.render(row)
                      : row[col.accessor]}
                  </td>
                ))}

                {actions && (
                  <td className="px-4 py-3 border-b text-sm">
                    {actions(row)}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
