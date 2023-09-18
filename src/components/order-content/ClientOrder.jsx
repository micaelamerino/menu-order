import { useContext } from "react";
import CustomButton from "../CustomButton";
import { TablesContext } from "../../context/TablesContext";

const ClientOrder = () => {
  const {
    orderClient,
    setOrderClient,
    numberTable,
    tablesOpen,
    setTablesOpen,
    addProducts,
    setAddProducts,
    totalAmount,
    setTotalAmount,
    peopleQuantity,
    formFinish,
  } = useContext(TablesContext);

  const handleClickDeleteProduct = (e) => {
    const searchTable = tablesOpen.find((table) => table.code === numberTable);
    const searchOrder = orderClient.find((order) => order.code === e.code);
    const newOrder = orderClient.filter((order) => order != searchOrder);

    const total = newOrder.reduce((acc, el) => acc + parseInt(el.price), 0);

    if (searchTable) {
      tablesOpen.map((table) => {
        if (table.code === numberTable) {
          table.total = total;
          table.order = newOrder;
        }
      });
    }
    setTotalAmount(total);
    setOrderClient(newOrder);

    if (newOrder.length <= 0) {
      const filterTable = tablesOpen.filter((tables) => tables !== searchTable);
      setTablesOpen(filterTable);
    }
  };

  const handleClickCancel = () => {
    const searchTable = tablesOpen.find((table) => table.code === numberTable);
    setOrderClient(searchTable.order);
    setAddProducts(false);
  };

  const handleClickSave = () => {
    const date = new Date();
    const today = date.toLocaleString();

    const searchTable = tablesOpen.find((table) => table.code === numberTable);

    const total = orderClient.reduce(
      (acc, el) => acc + parseInt(el.price),
      0
    );
    setTotalAmount(total);

    if (!searchTable) {
      setTablesOpen([
        ...tablesOpen,
        {
          code: numberTable,
          order: orderClient,
          total: total,
          startDate: today,
          finishDate: "",
          people: peopleQuantity,
          paid: "",
        },
      ]);
    } else {
      tablesOpen.map((table) => {
        if (table.code === numberTable) {
          table.order = orderClient;
          table.total = total;
        }
      });
    }
    setAddProducts(false);
  };

  const handleClickCloseTable = () => {
    formFinish.current.className = "visible";
  };

  return (
    <section className="client-order-section">
      <h3>Orden del cliente</h3>
      {orderClient.length > 0 ? (
        <div className="order-container">
          <div>
            {orderClient?.map((e, i) => (
              <article key={i} className="order-article">
                <p>{e.quantity}</p>
                <p>
                  <b>{e.name}</b>
                </p>
                <p>$ {e.price}</p>
                <CustomButton
                nameType={"button"}
                selector={"btn-delete"}
                click={() => handleClickDeleteProduct(e)}
                text={"Eliminar"}
              />
              </article>
            ))}
          </div>
          <div className="total-container">
            <p>Total: ${totalAmount}</p>
          </div>
          <div className="buttons-container">
            {!addProducts ? (
              <CustomButton
                nameType={"button"}
                selector={"btn-gray"}
                click={handleClickCloseTable}
                text={"Cerrar mesa"}
              />
            ) : (
              <>
                <CustomButton
                  nameType={"button"}
                  selector={"btn-gray"}
                  click={handleClickCancel}
                  text={"Cancelar"}
                />
                <CustomButton
                  nameType={"button"}
                  selector={"btn-green"}
                  click={handleClickSave}
                  text={"Guardar"}
                />
              </>
            )}
          </div>
        </div>
      ) : (
        <p>Aún no hay productos ingresados</p>
      )}
    </section>
  );
};

export default ClientOrder;
