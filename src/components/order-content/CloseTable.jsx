import { useContext, useState } from "react";
import { TablesContext } from "../../context/TablesContext";
import CustomButton from "../CustomButton";

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
  const [paidMode, setPaidMode] = useState("");

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
        <div className="form-content">
          <label htmlFor="people">Total personas:</label>
          <input
            onChange={handleChangePeople}
            value={peopleQuantity}
            type="number"
            min={0}
            id="people"
            name="people"
            autoComplete="off"
          />
        </div>
        <div className="form-content">
          <label htmlFor="paid">Forma de pago</label>
          <input
            onChange={handleChangePaid}
            value={
              paidMode.slice(0, 1).toUpperCase() +
              paidMode.substring(1).toLowerCase()
            }
            type="text"
            id="paid"
            name="paid"
            autoComplete="on"
          />
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
