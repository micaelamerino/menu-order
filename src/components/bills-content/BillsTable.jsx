const BillsTable = ({ bills, handleClickEditItem }) => {
  const BILLS = bills;
  return (
    <table>
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Proveedor</th>
          <th>Forma de pago</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {BILLS?.map((e, i) => (
          <tr key={i} onClick={() => handleClickEditItem(e)}>
            <td>{e.date}</td>
            <td>{e.distributor}</td>
            <td>{e.paid}</td>
            <td>
              <b>$ {e.amount}</b>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BillsTable;
