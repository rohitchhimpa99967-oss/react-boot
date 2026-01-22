

import { Route, Routes ,Navigate, Outlet } from "react-router-dom";
import Password from "./pages/auth/Password";
import AdminPage1 from "./pages/admin-panel/AdminPage1";
import LandingPage from "./pages/LandingPage";
import CategoryPage from "./pages/admin-panel/CategoryPage";
import CategoryAdd from "./pages/admin-panel/CategoryAdd";
import ProductPage from "./pages/admin-panel/ProductPage";
import ProductAdd from "./pages/admin-panel/ProductAdd";
import SalesPage from "./pages/admin-panel/Sales";
import Bill from "./pages/admin-panel/Bill";
import OrderPage from './pages/admin-panel/OrderPage'
import Forgotpass from "./pages/auth/Forgotpass";


const AuthGuard = () => {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to={"/"} />;
};

const AppRouter = () => {


  return (

      <Routes>
        <Route>
          <Route path="/" element={<Password/>} />
          <Route path="/forgetpassword" element={<Forgotpass/>} />

        </Route>
        <Route  element={<AuthGuard />}>
        {/* Dashboard */}
        {/* <Route path="/" element={<NavBar1 />} /> */}

        <Route path="/admin" element={<AdminPage1 />} />
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
        </Route>
      </Routes>
  );
};
export default AppRouter;
