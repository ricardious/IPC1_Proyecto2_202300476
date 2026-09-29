function Table({ columns, data, onView, onDelete, emptyText = "No data" }) {
  return (
    <div className="overflow-auto rounded-xl bg-themify-bg shadow-sm">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="border-b border-themify-border text-themify-textColorSoft">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="px-4 py-3 font-medium">
                {column.header}
              </th>
            ))}
            <th className="px-4 py-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="px-4 py-6 text-center text-themify-textColorSoft"
              >
                {emptyText}
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr
                key={row.key ?? index}
                className="border-b border-themify-border last:border-0 hover:bg-themify-bgSoft"
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-3">
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    {onView && (
                      <button
                        className="rounded bg-blue-500 px-3 py-1 text-xs text-white hover:bg-blue-600"
                        onClick={() => onView(row)}
                      >
                        View
                      </button>
                    )}
                    {onDelete && (
                      <button
                        className="rounded bg-red-500 px-3 py-1 text-xs text-white hover:bg-red-600"
                        onClick={() => onDelete(row)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
