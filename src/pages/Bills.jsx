import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import useForm from "../hooks/useForm";
import CustomButton from "../components/CustomButton";

const Bills = () => {
  const [bills, setBills] = useLocalStorage("bills", []);

  const initialValue = {
    date: "",
    distributor: "",
    amount: 0,
    paid: "",
  };
  const { form, setForm, handleChange } = useForm(initialValue);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validateFields(form);
    if (err === null) {
      setBills([...bills, form]);
      setForm(initialValue);
      setErrors({});
    } else {
      setErrors(err);
    }
  };

  const handleClickCancel = () => {
    setForm(initialValue);
    setErrors({});
  };

  const validateFields = (value) => {
    let errors = {};
    let isError = false;

    if (value.date.length <= 0) {
      errors.date = "✍🏼 Complete el campo";
      isError = true;
    }
    if (value.distributor.length <= 0) {
      errors.distributor = "✍🏼 Complete el campo";
      isError = true;
    }
    if (value.amount === 0) {
      errors.amount = "✍🏼 Complete el campo";
      isError = true;
    }
    if (value.paid.length <= 0) {
      errors.paid = "✍🏼 Complete el campo";
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
                <th>Forma de pago</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {bills?.map((e, i) => (
                <tr key={i}>
                  <td>{e.date}</td>
                  <td>{e.distributor}</td>
                  <td>{e.paid}</td>
                  <td><b>$ {e.amount}</b></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Aún no hay gastos registrados</p>
        )}
      </section>
      <section className="section-form">
        <h2 className="header-form">Nuevo gasto</h2>
        <form
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
              value={form.date}
              autoComplete="off"
            />
          </div>
          <div className="error-message">
            {errors.date && <p>{errors.date}</p>}
          </div>
          <div className="form-content">
            <label htmlFor="distributor">Proveedor</label>
            <input
              onChange={handleChange}
              id="distributor"
              name="distributor"
              type="text"
              value={
                form.distributor.slice(0, 1).toUpperCase() +
                form.distributor.substring(1).toLowerCase()
              }
              autoComplete="off"
            />
          </div>
          <div className="error-message">
            {errors.distributor && <p>{errors.distributor}</p>}
          </div>
          <div className="form-content">
            <label htmlFor="amount">Monto</label>
            <input
              onChange={handleChange}
              id="amount"
              name="amount"
              type="number"
              value={form.amount}
              min={0}
              autoComplete="off"
            />
          </div>
          <div className="error-message">
            {errors.amount && <p>{errors.amount}</p>}
          </div>
          <div className="form-content">
            <label htmlFor="paid">Medio de pago</label>
             <input
              onChange={handleChange}
              id="paid"
              name="paid"
              type="text"
              value={
                form.paid.slice(0, 1).toUpperCase() +
                form.paid.substring(1).toLowerCase()
              }
              autoComplete="on"
            />
          </div>
          <div className="error-message">
            {errors.paid && <p>{errors.paid}</p>}
          </div>
          <div className="buttons-container">
            <CustomButton
              nameType={"button"}
              selector={"btn-gray"}
              click={handleClickCancel}
              text={"Cancelar"}
            />
            <CustomButton
              nameType={"submit"}
              selector={"btn-green"}
              text={"Añadir"}
            />
          </div>
        </form>
      </section>
    </main>
  );
};

export default Bills;
