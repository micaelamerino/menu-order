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
                  <th>Fecha</th>
                  <th>Monto</th>
                  <th>Medio de pago</th>
                </tr>
              </thead>
              <tbody>
                {sales?.map((sale, index) => (
                  <tr key={index}>
                    <td>{sale.code}</td>
                    <td>{sale.date}</td>
                    <td>$ {}</td>
                    <td>{}</td>
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
