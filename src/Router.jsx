
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import Password from "./pages/auth/Password";
import AdminPage1 from "./pages/admin-panel/AdminPage1";
import LandingPage from "./pages/LandingPage";
import CategoryPage from "./pages/admin-panel/CategoryPage";
import CategoryAdd from "./pages/admin-panel/CategoryAdd";
import ProductPage from "./pages/admin-panel/ProductPage";
import ProductAdd from "./pages/admin-panel/ProductAdd";
import SalesPage from "./pages/admin-panel/Sales";
import Bill from "./pages/admin-panel/Bill";
import OrderPage from "./pages/admin-panel/OrderPage";
import Forgotpass from "./pages/auth/Forgotpass";
import RegisterUser from "./pages/auth/RegisterUser";
import ProfilePage from "./pages/admin-panel/Profile";
import ResetPassword from "./pages/auth/ResetPassword";
import Layout from "./components/layout/Layout";
import Layout1 from "./components/layout/Layout1";
import UserLanding from "./pages/user-pannel/UserLanding";
import UserHome from "./pages/user-pannel/UserHome";
import UserCart from "./pages/user-pannel/UserCart";
import TablePage from "./pages/admin-panel/Table";
import TableAdd from "./pages/admin-panel/TableAdd";
import ProductEdit from "./pages/admin-panel/ProductEdit";
import CategoryEdit from "./pages/admin-panel/CategoryEdit";
import VerifyOtp from "./pages/auth/VerifyOtp";
import CreateAdmin from "./pages/admin-panel/CreateAdmin";
import StaffPage from "./pages/admin-panel/StaffPage";

const AuthGuard = () => {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/" replace />;
};

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Password />} />
      {/* <Route path="/registeruser" element={<RegisterUser />} /> */}
      <Route path="/forgetpassword" element={<Forgotpass />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />

      <Route element={<Layout1 />}>
        <Route path="/user1" element={<UserLanding />} />
        <Route path="/home" element={<UserHome />} />
        <Route path="/cart" element={<UserCart />} />
      </Route>

      <Route element={<AuthGuard />}>
        <Route element={<Layout />}>
          <Route path="/admin" element={<AdminPage1 />} />
          <Route path="/l" element={<LandingPage />} />
          <Route path="/create-user" element={<CreateAdmin/>}/>

          <Route path="/category" element={<CategoryPage />} />
          <Route path="/category/add" element={<CategoryAdd />} />
          <Route path="/category/edit/:id" element={<CategoryEdit />} />

          <Route path="/products" element={<ProductPage />} />
          <Route path="/products/add" element={<ProductAdd />} />
          <Route path="/products/edit/:id" element={<ProductEdit />} />

          <Route path="/orders" element={<OrderPage />} />

          <Route path="/sales" element={<SalesPage />} />
          <Route path="/staff" element={<StaffPage />} />

          <Route path="/bill" element={<Bill />} />
          <Route path="/tables" element={<TablePage />} />
          <Route path="/tables/add" element={<TableAdd />} />

          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
