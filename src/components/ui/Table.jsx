const Table = ({ headers, data, renderRow }) => {
  return (
    <table className="w-full bg-white rounded shadow">
      <thead>
        <tr className="bg-gray-200">
          {headers.map((h, i) => (
            <th key={i} className="p-2 text-left">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((item, index) => renderRow(item, index))
        ) : (
          <tr>
            <td colSpan={headers.length} className="text-center p-4">
              No Data Found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;