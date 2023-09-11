import { useContext, useEffect, useState } from "react";
import { TablesContext } from "../context/TablesContext";

const Sales = () => {
  const { tablesOpen } = useContext(TablesContext);
  const [sales, setSales] = useState([]);

  useEffect(() => {
    setSales([...tablesOpen]);
  }, [tablesOpen]);

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
                  <td>{}</td>
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
