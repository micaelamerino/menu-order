import { useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import useForm from "../hooks/useForm";
import CustomButton from "../components/CustomButton";
import CustomSelectionSection from "../components/CustomSelectionSection";
import BillsTable from "../components/bills-content/BillsTable";
import BillsFormInputs from "../components/bills-content/BillsFormInputs";

const Bills = () => {
  const [bills, setBills] = useLocalStorage("bills", []);
  const [firstInstance, setFirstInstance] = useState(false);
  const initialValue = {
    date: "",
    distributor: "",
    amount: 0,
    paid: "",
  };
  const { form, setForm, handleChange } = useForm(initialValue);
  const [errors, setErrors] = useState({});
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setFirstInstance(true);
  }, []);

  const handleClickAddBill = () => {
    setFirstInstance(false);
    setForm(initialValue);
    setEdit(false);
  };

  const handleClickReset = () => {
    setBills([]);
    setEdit(false);
    setForm(initialValue);
  };

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
    setFirstInstance(true);
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
    if (value.amount <= 0) {
      errors.amount = "✍🏼 Complete el campo";
      isError = true;
    }
    if (value.paid.length <= 0) {
      errors.paid = "✍🏼 Complete el campo";
      isError = true;
    }
    return isError ? errors : null;
  };

  const handleClickEditItem = (e) => {
    setEdit(true);
    setFirstInstance(false);
    setErrors({});
    setForm({
      date: e.date,
      distributor: e.distributor,
      amount: e.amount,
      paid: e.paid,
    });
  };

  const handleClickUpdate = (e) => {
    e.preventDefault();
    const err = validateFields(form);
    if (err === null) {
      const edit = bills.map((item) =>
        item.distributor === form.distributor
          ? {
              date: form.date,
              distributor: form.distributor,
              amount: form.amount,
              paid: form.paid,
            }
          : item
      );
      setBills(edit);
      setEdit(false);
      setFirstInstance(true);
    } else {
      setErrors(err);
    }
  };

  const handleDeleteBill = () => {
    const searchItem = bills.find(
      (item) => item.distributor === form.distributor
    );
    const newArray = bills.filter((item) => item !== searchItem);

    setBills(newArray);
    setFirstInstance(true);
  };

  return (
    <main className="bills-section">
      <section className="list-section">
        <div className="bills-header">
          <h2>GASTOS</h2>
          <div className="buttons-container">
            {bills.length > 0 && (
              <CustomButton
                nameType={"button"}
                selector={"btn-gray"}
                click={handleClickReset}
                text={"Reiniciar"}
              />
            )}
            <CustomButton
              nameType={"button"}
              selector={"btn-green"}
              click={handleClickAddBill}
              text={"Nuevo gasto"}
            />
          </div>
        </div>

        {bills.length > 0 ? (
          <BillsTable bills={bills} handleClickEditItem={handleClickEditItem} />
        ) : (
          <p>Aún no hay gastos registrados</p>
        )}
      </section>
      {!firstInstance ? (
        <section className="section-form">
          <h2 className="header-form">Nuevo gasto</h2>
          <form onSubmit={handleSubmit} className="form-container">
            <BillsFormInputs
              form={form}
              errors={errors}
              handleChange={handleChange}
            />
            <div className="buttons-container">
              <CustomButton
                nameType={"button"}
                selector={"btn-red"}
                click={handleDeleteBill}
                text={"Eliminar registro"}
              />
              <CustomButton
                nameType={"button"}
                selector={"btn-gray"}
                click={handleClickCancel}
                text={"Cancelar"}
              />
              {edit ? (
                <CustomButton
                  nameType={"submit"}
                  selector={"btn-green"}
                  click={handleClickUpdate}
                  text={"Actualizar"}
                />
              ) : (
                <CustomButton
                  nameType={"submit"}
                  selector={"btn-green"}
                  text={"Añadir gasto"}
                />
              )}
            </div>
          </form>
        </section>
      ) : (
        <CustomSelectionSection text={"⬅ Seleccione un ítem"} />
      )}
    </main>
  );
};

export default Bills;
