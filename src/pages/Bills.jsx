import { useRef, useState } from "react";

const Bills = () => {
  const [bills, setBills] = useState([]);
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const fieldsData = Object.fromEntries(new FormData(e.target));
    setBills([...bills, fieldsData]);
    form.current.reset();
  };

  const handleClick = () => {
    form.current.reset();
  };

  return (
    <main className="bills-section">
      <section className="list-section">
        <h2>GASTOS</h2>
        {bills.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Proveedor</th>
                <th>Monto</th>
                <th>Medio de pago</th>
              </tr>
            </thead>
            <tbody>
              {bills?.map((e) => (
                <tr key={e.proveedor}>
                  <td>{e.fecha}</td>
                  <td>{e.proveedor}</td>
                  <td>{e.monto}</td>
                  <td>{e.pago}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Aún no hay gastos registrados</p>
        )}
      </section>
      <section className="form-section">
        <h2 className="header-form">Nuevo gasto</h2>
        <form ref={form} onSubmit={handleSubmit} className="form-container">
          <div className="form-content">
            <label htmlFor="fecha">Fecha</label>
            <input id="fecha" name="fecha" type="date" autoComplete="on" />
          </div>
          <div className="form-content">
            <label htmlFor="proveedor">Proveedor</label>
            <input
              id="proveedor"
              name="proveedor"
              type="text"
              autoComplete="off"
            />
          </div>
          <div className="form-content">
            <label htmlFor="monto">Monto</label>
            <input id="monto" name="monto" type="number" autoComplete="off" />
          </div>
          <div className="form-content">
            <label htmlFor="pago">Medio de pago</label>
            <input id="pago" name="pago" type="text" autoComplete="off" />
          </div>
          <div className="buttons-container">
            <button type="button" onClick={handleClick}>
              Cancelar
            </button>
            <button type="submit" className="btn-add">
              Añadir
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Bills;
