import { useContext, useEffect, useRef, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { TablesContext } from "../context/TablesContext";
import CustomButton from "../components/CustomButton";

const Order = () => {
  const [firstInstance, setFirstInstance] = useState(null);
  const { products } = useContext(ProductContext);
  const { tablesOpen, setTablesOpen, sales, setSales } =
    useContext(TablesContext);
  const tables = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [search, setSearch] = useState("");
  const [filterProducts, setFilterProducts] = useState([]);
  const [orderClient, setOrderClient] = useState([]);
  const [numberTable, setNumberTable] = useState("");
  const [addProducts, setAddProducts] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [peopleQuantity, setPeopleQuantity] = useState(0);
  const [paidMode, setPaidMode] = useState("");
  const form = useRef();
  const formFinish = useRef();

  useEffect(() => {
    setFirstInstance(true);
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
    setAddProducts(true);
  };

  useEffect(() => {
    if (search != "") {
      const searchCode = products.filter((p) => p.code == search);
      const searchName = products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
      if (searchName.length > 0) {
        setFilterProducts(searchName);
      } else if (searchCode.length > 0) {
        setFilterProducts(searchCode);
      }
    } else {
      setFilterProducts([]);
    }
  }, [search, products]);

  const handleClickAddProduct = (e) => {
    setOrderClient([...orderClient, e]);
    setSearch("");
    form.current.reset();
  };

  const handleClickDeleteProduct = (e) => {
    const searchTable = tablesOpen.find((table) => table.code === numberTable);
    const searchOrder = orderClient.find((order) => order.code === e.code);
    const newOrder = orderClient.filter((order) => order != searchOrder);

    const total = newOrder.reduce((acc, el) => acc + parseFloat(el.price), 0);

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

  const handleClickTable = (e) => {
    setFirstInstance(false);
    const searchTable = tablesOpen.find((table) => table.code === e);

    if (!searchTable) {
      setNumberTable(e);
      setOrderClient([]);
      setTotalAmount(null);
    } else {
      setNumberTable(searchTable.code);
      setOrderClient(searchTable.order);
      setTotalAmount(searchTable.total);
    }
  };

  const handleClickSave = () => {
    const date = new Date();
    const today = date.toLocaleString();

    const searchTable = tablesOpen.find((table) => table.code === numberTable);

    const total = orderClient.reduce(
      (acc, el) => acc + parseFloat(el.price),
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
          people: 0,
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

  const handleClickCancel = () => {
    const searchTable = tablesOpen.find((table) => table.code === numberTable);
    setOrderClient(searchTable.order);
    setAddProducts(false);
  };

  const handleClickCloseTable = () => {
    formFinish.current.className = "visible";
  };

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
    <main className="order-section">
      <section className="tables-section">
        {tables.map((table) =>
          tablesOpen.find((e) => e.code === table) ? (
            <button
              onClick={() => handleClickTable(table)}
              key={table}
              className="table"
              style={{ backgroundColor: "#fd9800" }}
            >
              {table}
            </button>
          ) : (
            <button
              onClick={() => handleClickTable(table)}
              key={table}
              className="table"
              style={{ backgroundColor: "#24b624" }}
            >
              {table}
            </button>
          )
        )}
      </section>

      <>
        {!firstInstance ? (
          <>
            <section className="form-section">
              <h2 className="header-form">Mesa {numberTable}</h2>
              <form ref={form} className="form-search">
                <label htmlFor="search">Nombre o código del producto</label>
                <input
                  id="search"
                  onChange={handleChange}
                  type="text"
                  placeholder="Buscar..."
                  autoComplete="off"
                />
                <section className="products-list">
                  {filterProducts.length > 0 &&
                    filterProducts?.map((e) => (
                      <div
                        onClick={() => handleClickAddProduct(e)}
                        key={e.code}
                        className="container-products-list"
                      >
                        <p>
                          <b>{e.code}</b>
                        </p>
                        <p>{e.name}</p>
                      </div>
                    ))}
                </section>
              </form>

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
                          <button
                            onClick={() => handleClickDeleteProduct(e)}
                            className="btn-delete"
                          >
                            Eliminar
                          </button>
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
                      value={paidMode}
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
            </section>
          </>
        ) : (
          <div className="form-section selected-table">
            <p>⬅ Seleccione una mesa</p>
          </div>
        )}
      </>
    </main>
  );
};

export default Order;
