import { useContext, useEffect, useState } from "react";
import { TablesContext } from "../context/TablesContext";
import SearchForm from "../components/order-content/SearchForm";
import ClientOrder from "../components/order-content/ClientOrder";
import CloseTable from "../components/order-content/CloseTable";
import CustomSelectionSection from "../components/CustomSelectionSection";
import { ProductContext } from "../context/ProductContext";

const Order = () => {
  const tables = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [firstInstance, setFirstInstance] = useState(false);
  const {
    tablesOpen,
    setOrderClient,
    numberTable,
    setNumberTable,
    setTotalAmount,
  } = useContext(TablesContext);

  const { setFilterProducts, setSearch } = useContext(ProductContext);
  useEffect(() => {
    setFirstInstance(true);
  }, []);

  const handleClickTable = (e) => {
    setSearch("");
    setFilterProducts([]);
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
          <section className="section-form">
            <h2 className="header-form">Mesa {numberTable}</h2>
            <SearchForm />
            <ClientOrder />
            <CloseTable />
          </section>
        ) : (
          <CustomSelectionSection text={"⬅ Seleccione una mesa"} />
        )}
      </>
    </main>
  );
};

export default Order;
