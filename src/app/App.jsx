import { useState } from "react";
import "../styles/App.css";
import LandingPage from "../pages/LandingPage";
import NavBar1 from "../components/layout/NavBar1";
import AdminPage1 from "../pages/admin-panel/AdminPage1";
import CategoryAdd from "../pages/admin-panel/CategoryAdd";
import CategoryPage from "../pages/admin-panel/CategoryPage";
import ProductPage from "../pages/admin-panel/ProductPage";
import ProductAdd from "../pages/admin-panel/ProductAdd";
import OrderPage from "../pages/admin-panel/OrderPage"
import SalesPage from "../pages/admin-panel/Sales";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Bill from "../pages/admin-panel/Bill";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
     
      <BrowserRouter>
        <Routes>
          {/* Dashboard */}
          {/* <Route path="/" element={<NavBar1 />} /> */}

          <Route path="/" element={<AdminPage1 />} />
          <Route path="/l" element={<LandingPage />} />


          {/* Category */}
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/category/add" element={<CategoryAdd />} />

          {/* Products */}
          <Route path="/products" element={<ProductPage />} />
          <Route path="/products/add" element={<ProductAdd />} />

          {/* Kitchen / Orders */}
          <Route path="/orders" element={<OrderPage />} />

          {/* Sales */}
          <Route path="/sales" element={<SalesPage />} />

          <Route path="/bill" element={<Bill />} />


          {/* <Route path="/settings" element={<SettingsPage />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
