const SalesTable = ({ sales, handleClickEdit }) => {
  const SALES = sales;
  return (
    <table>
      <thead>
        <tr>
          <th>Mesa</th>
          <th>Personas</th>
          <th>Apertura</th>
          <th>Cierre</th>
          <th>Forma de pago</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {SALES?.map((sale, index) => (
          <tr key={index} onClick={() => handleClickEdit(sale)}>
            <td>{sale.code}</td>
            <td>{sale.people}</td>
            <td>{sale.startDate}</td>
            <td>{sale.finishDate}</td>
            <td>{sale.paid}</td>
            <td>
              <b>$ {sale.total}</b>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SalesTable;
