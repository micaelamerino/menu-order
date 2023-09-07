import DataProducts from "./context/ProductContext";
import TablesData from "./context/TablesContext";
import Routing from "./routes/Routing";

function App() {
  return (
    <>
      <DataProducts>
        <TablesData>
          <Routing />
        </TablesData>
      </DataProducts>
    </>
  );
}

export default App;
