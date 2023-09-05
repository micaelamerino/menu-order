import { useRef, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const Bills = () => {
  const initialValue = {
    date: "",
    distributor: "",
    amount: "",
    paid: "",
  };
  const [form, setForm] = useState(initialValue);
  const [bills, setBills] = useLocalStorage("bills", []);
  const [errors, setErrors] = useState({});
  const formulario = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validateFields(form);
    if (err === null) {
      setBills([...bills, form]);
      formulario.current.reset();
      setForm(initialValue);
      setErrors({})
    } else {
      setErrors(err);
    }
  };

  const handleClickCancel = () => {
    formulario.current.reset();
    setErrors({})
  };

  const validateFields = (value) => {
    let errors = {};
    let isError = false;

    if (value.date.length <= 0) {
      errors.date = "Debe completar el campo";
      isError = true;
    }
    if (value.distributor.length <= 0) {
      errors.distributor = "Debe completar el campo";
      isError = true;
    }
    if (value.amount.length <= 0) {
      errors.amount = "Debe completar el campo";
      isError = true;
    }
    if (value.paid.length <= 0) {
      errors.paid = "Debe completar el campo";
      isError = true;
    }
    return isError ? errors : null;
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
              {bills?.map((e, i) => (
                <tr key={i}>
                  <td>{e.date}</td>
                  <td>{e.distributor}</td>
                  <td>$ {e.amount}</td>
                  <td>{e.paid}</td>
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
        <form
          ref={formulario}
          onSubmit={handleSubmit}
          className="form-container"
        >
          <div className="form-content">
            <label htmlFor="date">Fecha</label>
            <input
              onChange={handleChange}
              id="date"
              name="date"
              type="date"
              autoComplete="on"
            />
          </div>
          {errors.date && <p>{errors.date}</p>}
          <div className="form-content">
            <label htmlFor="distributor">Proveedor</label>
            <input
              onChange={handleChange}
              id="distributor"
              name="distributor"
              type="text"
              autoComplete="off"
            />
          </div>
          {errors.distributor && <p>{errors.distributor}</p>}
          <div className="form-content">
            <label htmlFor="amount">Monto</label>
            <input
              onChange={handleChange}
              id="amount"
              name="amount"
              type="number"
              autoComplete="off"
            />
          </div>
          {errors.amount && <p>{errors.amount}</p>}
          <div className="form-content">
            <label htmlFor="paid">Medio de pago</label>
            <input
              onChange={handleChange}
              id="paid"
              name="paid"
              type="text"
              autoComplete="off"
            />
          </div>
          {errors.paid && <p>{errors.paid}</p>}
          <div className="buttons-container">
            <button type="button" onClick={handleClickCancel}>
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
