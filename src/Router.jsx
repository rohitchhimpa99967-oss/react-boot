// import { Route, Routes, Navigate, Outlet } from "react-router-dom";
// import Password from "./pages/auth/Password";
// import AdminPage1 from "./pages/admin-panel/AdminPage1";
// import LandingPage from "./pages/LandingPage";
// import CategoryPage from "./pages/admin-panel/CategoryPage";
// import CategoryAdd from "./pages/admin-panel/CategoryAdd";
// import ProductPage from "./pages/admin-panel/ProductPage";
// import ProductAdd from "./pages/admin-panel/ProductAdd";
// import SalesPage from "./pages/admin-panel/Sales";
// import Bill from "./pages/admin-panel/Bill";
// import OrderPage from "./pages/admin-panel/OrderPage";
// import Forgotpass from "./pages/auth/Forgotpass";
// import RegisterUser from "./pages/auth/RegisterUser";
// import ProfilePage from "./pages/admin-panel/Profile";
// import ResetPassword from "./pages/auth/ResetPassword";
// import Layout from "./components/layout/Layout";

// const AuthGuard = () => {
//   const token = localStorage.getItem("token");
//   return token ? <Outlet /> : <Navigate to={"/"} />;
// };

// const AppRouter = () => {
//   return (
//     <Routes>
//       <Route>
//         <Route path="/" element={<Password />} />
//         <Route path="/registeruser" element={<RegisterUser />} />
//         <Route path="/forgetpassword" element={<Forgotpass />} />
//         <Route path="/reset-password" element={<ResetPassword />} />
//       </Route>
//       <Route element={<AuthGuard />}>
//         {/* Dashboard */}
//         {/* <Route path="/" element={<NavBar1 />} /> */}

//         <Route path="/admin" element={<AdminPage1 />} />
//         <Route path="/l" element={<LandingPage />} />

//         {/* Category */}
//         <Route path="/category" element={<CategoryPage />} />
//         <Route path="/category/add" element={<CategoryAdd />} />

//         {/* Products */}
//         <Route path="/products" element={<ProductPage />} />
//         <Route path="/products/add" element={<ProductAdd />} />

//         {/* Kitchen / Orders */}
//         <Route path="/orders" element={<OrderPage />} />

//         {/* Sales */}
//         <Route path="/sales" element={<SalesPage />} />

//         <Route path="/bill" element={<Bill />} />

//         <Route path="/profile" element={<ProfilePage />} />

//         {/* <Route path="/settings" element={<SettingsPage />} /> */}
//       </Route>
//     </Routes>
//   );
// };
// export default AppRouter;

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

const AuthGuard = () => {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/" replace />;
};

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Password />} />
      <Route path="/registeruser" element={<RegisterUser />} />
      <Route path="/forgetpassword" element={<Forgotpass />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route element={<Layout1/>}>

      <Route path="/user1" element={<UserLanding/>} />
      <Route path="/user2" element={<UserHome/>} />
      <Route path="/user3" element={<UserCart/>} />
      </Route>

      <Route element={<AuthGuard />}>
        <Route element={<Layout />}>
          <Route path="/admin" element={<AdminPage1 />} />
          <Route path="/l" element={<LandingPage />} />

          <Route path="/category" element={<CategoryPage />} />
          <Route path="/category/add" element={<CategoryAdd />} />

          <Route path="/products" element={<ProductPage />} />
          <Route path="/products/add" element={<ProductAdd />} />

          <Route path="/orders" element={<OrderPage />} />

          <Route path="/sales" element={<SalesPage />} />

          <Route path="/bill" element={<Bill />} />

          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
