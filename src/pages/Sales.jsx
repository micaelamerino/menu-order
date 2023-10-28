import { useContext, useEffect, useState } from "react";
import { TablesContext } from "../context/TablesContext";
import CustomSelectionSection from "../components/CustomSelectionSection";
import CustomButton from "../components/CustomButton";
import useForm from "../hooks/useForm";
import SalesTable from "../components/sales-content/SalesTable";
import SalesFormInputs from "../components/sales-content/SalesFormInputs";
import SalesMetrics from "../components/sales-content/SalesMetrics";

const Sales = () => {
  const { sales, setSales } = useContext(TablesContext);
  const [firstInstance, setFirstInstance] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalPerson, setTotalPerson] = useState(0);
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
    const totalA = sales.reduce((acc, el) => acc + el.total, 0);
    setTotalAmount(totalA);

    const totalP = sales.reduce((acc, el) => acc + parseInt(el.people), 0);
    setTotalPerson(totalP);

    const averageP = parseInt(totalA / totalP);
    setAveragePerson(averageP);

    const averageS = parseInt(totalA / sales.length);
    setAverageSale(averageS);
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
    setEdit(true);
    setFirstInstance(false);
    setErrors({});
    setForm({
      code: sale.code,
      people: sale.people,
      startDate: sale.startDate,
      finishDate: sale.finishDate,
      paid: sale.paid,
      total: sale.total,
      id: sale.id,
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
              total: form.total,
            }
          : item
      );
      setSales(edit);
      setEdit(false);
      setFirstInstance(true);
    } else {
      setErrors(err);
    }
  };

  const handleDeleteSale = () => {
    const searchItem = sales.find((item) => item.id === form.id);
    const newArray = sales.filter((item) => item !== searchItem);

    setSales(newArray);
    setFirstInstance(true);
  };
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
            <SalesMetrics
              totalAmount={totalAmount}
              totalPeople={totalPerson}
              averagePerson={averagePerson}
              averageSale={averageSale}
            />
            <SalesTable sales={sales} handleClickEdit={handleClickEdit} />
          </>
        ) : (
          <div>
            <p>Aún no hay ventas registradas</p>
          </div>
        )}
      </section>
      {!firstInstance ? (
        <section className="section-form">
          <h2 className="header-form">Editar venta</h2>
          <form className="form-container">
            <SalesFormInputs
              form={form}
              errors={errors}
              handleChange={handleChange}
            />
            {edit && (
              <div className="buttons-container">
                <CustomButton
                  nameType={"button"}
                  selector={"btn-red"}
                  click={handleDeleteSale}
                  text={"Eliminar registro"}
                />
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
