import { useContext, useEffect, useState } from "react";
import { TablesContext } from "../context/TablesContext";
import CustomSelectionSection from "../components/CustomSelectionSection";
import CustomButton from "../components/CustomButton";
import useForm from "../hooks/useForm";

const Sales = () => {
  const { sales, setSales } = useContext(TablesContext);
  const [firstInstance, setFirstInstance] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalPeople, setTotalPeople] = useState(0);
  const [averagePerson, setAveragePerson] = useState(0);
  const [averageSale, setAverageSale] = useState(0);
  const initialValue = {
    code: 0,
    people: "",
    startDate: 0,
    finishDate: "",
    paid: "",
    total: 0,
  };
  const { form, setForm, handleChange } = useForm(initialValue);
  const [errors, setErrors] = useState({});
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setFirstInstance(true);

    const totalAmount = sales.reduce((acc, el) => acc + el.total, 0);
    setTotalAmount(totalAmount);

    const totalPeople = sales.reduce((acc, el) => acc + parseInt(el.people), 0);
    setTotalPeople(totalPeople);

    setAveragePerson(parseInt(totalAmount / totalPeople));

    setAverageSale(parseInt(totalAmount / sales.length));
  }, [sales]);

  const handleClickReset = () => {
    setSales([]);
    setEdit(false);
    setForm(initialValue);
  };

  const validateFields = (value) => {
    let errors = {};
    let isError = false;

    if (value.code.length <= 0) {
      errors.code = "✍🏼 Complete el campo";
      isError = true;
    }
    if (value.people.length <= 0) {
      errors.people = "✍🏼 Complete el campo";
      isError = true;
    }
    if (value.startDate.length <= 0) {
      errors.startDate = "✍🏼 Complete el campo";
      isError = true;
    }
    if (value.finishDate <= 0) {
      errors.finishDate = "✍🏼 Complete el campo";
      isError = true;
    }
    if (value.paid.length <= 0) {
      errors.paid = "✍🏼 Complete el campo";
      isError = true;
    }
    if (value.total.length <= 0) {
      errors.total = "✍🏼 Complete el campo";
      isError = true;
    }
    return isError ? errors : null;
  };

  const handleClickCancel = () => {
    setFirstInstance(true);
  };

  const handleClickEdit = (sale) => {
    setErrors({})
    setEdit(true);
    setFirstInstance(false);
    setForm({
      code: sale.code,
      people: sale.people,
      startDate: sale.startDate,
      finishDate: sale.finishDate,
      paid: sale.paid,
      total: sale.total,
    });
  };

  const handleClickUpdate = (e) => {
    e.preventDefault();
    const err = validateFields(form);
    if (err === null) {
      const edit = sales.map((item) =>
        item.startDate === form.startDate
          ? {
              code: form.code,
              people: form.people,
              startDate: form.startDate,
              finishDate: form.finishDate,
              paid: form.paid,
              total: form.total
            }
          : item
      );
      setSales(edit);
      setEdit(false);
      setFirstInstance(true);
    } else {
      setErrors(err);
    }
  }

  return (
    <main className="sales-section">
      <section className="list-section">
        <div className="bills-header">
          <h2>VENTAS</h2>
          {sales.length > 0 && (
            <CustomButton
              nameType={"button"}
              selector={"btn-gray"}
              click={handleClickReset}
              text={"Reiniciar"}
            />
          )}
        </div>

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
          </>
        ) : (
          <p>Aún no hay ventas registradas</p>
        )}
      </section>
      {!firstInstance ? (
        <section className="section-form">
          <h2 className="header-form">Editar venta</h2>
          <form className="form-container">
            <div className="form-content">
              <label htmlFor="code">Código</label>
              <input
                onChange={handleChange}
                id="code"
                name="code"
                type="number"
                value={form.code}
                autoComplete="off"
              />
            </div>
            <div className="error-message">
              {errors.code && <p>{errors.code}</p>}
            </div>
            <div className="form-content">
              <label htmlFor="people">Personas</label>
              <input
                onChange={handleChange}
                id="people"
                name="people"
                type="number"
                value={form.people}
                autoComplete="off"
              />
            </div>
            <div className="error-message">
              {errors.people && <p>{errors.people}</p>}
            </div>
            <div className="form-content">
              <label htmlFor="start">Inicio</label>
              <input
                onChange={handleChange}
                id="start"
                name="start"
                type="text"
                value={form.startDate}
                autoComplete="off"
              />
            </div>
            <div className="error-message">
              {errors.startDate && <p>{errors.startDate}</p>}
            </div>
            <div className="form-content">
              <label htmlFor="finish">Cierre</label>
              <input
                onChange={handleChange}
                id="finish"
                name="finish"
                type="text"
                value={form.finishDate}
                min={0}
                autoComplete="off"
              />
            </div>
            <div className="error-message">
              {errors.finishDate && <p>{errors.finishDate}</p>}
            </div>
            <div className="form-content">
              <label htmlFor="paid">Forma de pago:</label>
              <input
                onChange={handleChange}
                type="text"
                id="paid"
                name="paid"
                value={form.paid}
                autoComplete="on"
              />
            </div>
            <div className="error-message">
              {errors.paid && <p>{errors.paid}</p>}
            </div>
            <div className="form-content">
              <label htmlFor="total">Total:</label>
              <input
                onChange={handleChange}
                type="number"
                id="total"
                name="total"
                value={form.total}
                autoComplete="off"
              />
            </div>
            <div className="error-message">
              {errors.total && <p>{errors.total}</p>}
            </div>
            {edit && (
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
                  click={handleClickUpdate}
                  text={"Actualizar"}
                />
              </div>
            )}
          </form>
        </section>
      ) : (
        <CustomSelectionSection text={"⬅ Seleccione un ítem"} />
      )}
    </main>
  );
};

export default Sales;
