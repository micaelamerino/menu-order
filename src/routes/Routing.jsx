import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Order from "../pages/Order";
import Sales from "../pages/Sales";
import Bills from "../pages/Bills";
import Products from "../pages/Products";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar/>}>
          <Route index element={<Order/>}/>
          <Route path="/pedidos" element={<Order/>}/>
          <Route path="/ventas" element={<Sales/>}/>
          <Route path="/gastos" element={<Bills/>}/>
          <Route path="/productos" element={<Products/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
