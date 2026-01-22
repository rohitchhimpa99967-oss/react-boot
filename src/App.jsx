import { useState } from "react";
import "../src/styles/app.css";
import AppRouter from "./Router";

import AdminPage1 from "./pages/admin-panel/AdminPage1";
import LandingPage from "./pages/LandingPage";
import CategoryPage from "./pages/admin-panel/CategoryPage";
import CategoryAdd from "./pages/admin-panel/CategoryAdd";
import ProductPage from "./pages/admin-panel/ProductPage";
import ProductAdd from "./pages/admin-panel/ProductAdd";
import OrderPage from "./pages/admin-panel/OrderPage";
import SalesPage from "./pages/admin-panel/Sales";
import Bill from "./pages/admin-panel/Bill";
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
  

  return (
    <>
      
    <AppRouter/>
    </>
  );
}

export default App;
