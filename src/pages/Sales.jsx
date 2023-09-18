import { useContext, useEffect, useState } from "react";
import { TablesContext } from "../context/TablesContext";
import CustomSelectionSection from "../components/CustomSelectionSection";

const Sales = () => {
  const { sales } = useContext(TablesContext);
  const [firstInstance, setFirstInstance] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalPeople, setTotalPeople] = useState(0);
  const [averagePerson, setAveragePerson] = useState(0);
  const [averageSale, setAverageSale] = useState(0);

  useEffect(() => {
    setFirstInstance(true);
    
    const totalAmount = sales.reduce((acc, el) => acc + el.total, 0);
    setTotalAmount(totalAmount);

    const totalPeople = sales.reduce((acc, el) => acc + parseInt(el.people), 0);
    setTotalPeople(totalPeople);

    setAveragePerson(parseInt(totalAmount / totalPeople));

    setAverageSale(parseInt(totalAmount / sales.length));
  }, [sales]);

  return (
    <main className="sales-section">
      <section className="list-section">
        <h2>VENTAS</h2>

        {sales.length > 0 ? (
          <>
            <div className="container-data-sales">
              <p>
                Personas: <b>{totalPeople}</b>
              </p>
              <p>
                Promedio por persona: <b>$ {averagePerson}</b>
              </p>
              <p>
                Promedio por venta: <b>$ {averageSale}</b>
              </p>
              <p>
                Total: <b>$ {totalAmount}</b>{" "}
              </p>
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
                    <td>
                      <b>$ {sale.total}</b>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <p>Aún no hay ventas registradas</p>
        )}
      </section>
      {!firstInstance ? (
        <section className="section-form">
          <h2 className="header-form">Editar venta</h2>
          <form></form>
        </section>
      ) : (
        <CustomSelectionSection text={"⬅ Seleccione un ítem"} />
      )}
    </main>
  );
};

export default Sales;
