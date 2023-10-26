import { useContext, useState } from "react";
import { TablesContext } from "../../context/TablesContext";
import CustomButton from "../CustomButton";
import { v4 as uuidv4 } from "uuid";

const CloseTable = () => {
  const {
    formFinish,
    peopleQuantity,
    setPeopleQuantity,
    tablesOpen,
    numberTable,
    setSales,
    sales,
    setTablesOpen,
    setOrderClient,
  } = useContext(TablesContext);

  const [paidMode, setPaidMode] = useState("Efectivo");

  const handleChangePeople = (e) => {
    setPeopleQuantity(e.target.value);
  };

  const handleChangePaid = (e) => {
    setPaidMode(e.target.value);
  };

  const handleClickFinish = (e) => {
    e.preventDefault();
    const date = new Date();
    const today = date.toLocaleString();

    const searchTable = tablesOpen.find((table) => table.code === numberTable);

    if (searchTable) {
      tablesOpen.map((table) => {
        if (table.code === numberTable) {
          table.finishDate = today;
          table.people = peopleQuantity;
          table.paid = paidMode;
          table.id =  uuidv4()
        }
      });

      setSales([...sales, searchTable]);
      const filterTable = tablesOpen.filter((tables) => tables !== searchTable);

      setTablesOpen(filterTable);
      setOrderClient([]);
    }
    setPeopleQuantity(0);
    setPaidMode("");
    formFinish.current.className = "no-visible";
  };

  const handleClickCancelFinish = () => {
    setPeopleQuantity(0);
    setPaidMode("");
    formFinish.current.className = "no-visible";
  };

  return (
    <section ref={formFinish} className="no-visible">
      <div className="form-finish-header">
        <h2>Confirmación</h2>
      </div>
      <form className="form-container">
        <div className="confirmation-form">
          <label htmlFor="people">Total personas:</label>
          <input
            onChange={handleChangePeople}
            value={peopleQuantity}
            type="number"
            min={0}
            id="people"
            name="people"
            autoComplete="on"
            autoFocus
          />
        </div>
        <div className="confirmation-form">
          <label htmlFor="paid">Forma de pago:</label>
          <select name="paid" id="paid" onChange={handleChangePaid}>
            <option value={paidMode}>Efectivo</option>
            <option value="Transferencia">Transferencia</option>
          </select>
        </div>
        <div className="buttons-container">
          <CustomButton
            nameType={"button"}
            selector={"btn-gray"}
            click={handleClickCancelFinish}
            text={"Cancelar"}
          />
          <CustomButton
            nameType={"submit"}
            selector={"btn-green"}
            click={handleClickFinish}
            text={"Finalizar"}
          />
        </div>
      </form>
    </section>
  );
};

export default CloseTable;
