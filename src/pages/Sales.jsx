import { useContext } from "react";
import { TablesContext } from "../context/TablesContext";

const Sales = () => {
  const { sales } = useContext(TablesContext);
  return (
    <main className="sales-section">
      <section className="list-section">
        <h2>VENTAS</h2>

        {sales.length > 0 ? (
          <>
            <div>
              <p>Personas:</p>
              <p>Promedio por persona:</p>
              <p>Promedio por venta:</p>
              <p>Total:</p>
            </div>
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
                {sales?.map((sale, index) => (
                  <tr key={index}>
                    <td>{sale.code}</td>
                    <td>{sale.people}</td>
                    <td>{sale.startDate}</td>
                    <td>{sale.finishDate}</td>
                    <td>{sale.paid}</td>
                    <td><b>$ {sale.total}</b></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <p>Aún no hay ventas registrados</p>
        )}
      </section>
      <section className="form-section">
        <h2 className="header-form">Editar venta</h2>
        <form></form>
      </section>
    </main>
  );
};

export default Sales;
