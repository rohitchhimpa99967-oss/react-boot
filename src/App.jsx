import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LandingPage from "./LandingPage";
import Password from "./Password";
import NavBar from "./components/NavBar";
import AdminPage1 from "./AdminPage1";
import CategoryPage from "./CategoryPage";
import CategoryAdd from "./CategoryAdd";
import ProductPage from "./ProductPage";
import ProductAdd from "./ProductAdd";
import OrderPage from "./OrderPage";
import SalesPage from "./Sales";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Bill from "./Bill";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <LandingPage/> */}
      {/* {<NavBar/>} */}
      {/* <Password/> */}
      {/* {<AdminPage1/>} */}
      {/* {<CategoryPage/>} */}
      {/* {<CategoryAdd/>} */}
      {/* {<ProductPage/>}   */}
      {/* {<ProductAdd/>} */}
      {/* {<OrderPage/>} */}
      {/* {<SalesPage/>} */}
      <BrowserRouter>
        <Routes>
          {/* Dashboard */}
          {/* <Route path="/" element={<NavBar />} /> */}

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
