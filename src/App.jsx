import { BrowserRouter, Routes, Route } from "react-router-dom";

import ScrollToTop from "./Components/CustomerComponent/ScrollPage/ScrollPage";
import { Slide, ToastContainer } from "react-toastify";

// Custormer***************************************************************************
import CustomerLayout from "./Layout/CustomerLayout";
import HomePage from "./Pages/CustormerPages/HomePage/HomePage";
import LoginPage from "./Pages/LoginRegister/LoginPage/Login";
import BlogPage from "./Pages/CustormerPages/Blogger/BlogPage";
import Register from "./Pages/LoginRegister/RegisterPage/Register";
import ProductPage from "./Pages/CustormerPages/ProductPage/ProductPage";
import WishlistPage from "./Pages/CustormerPages/Wishlist/WishlistPage";
import AddToCardPage from "./Pages/CustormerPages/AddToCard/AddToCardPage";
import ProductDetail from "./Pages/CustormerPages/ProductDetailsPage/ProductDetail";
import CheckoutPage from "./Pages/CustormerPages/Checkout/CheckoutPage";
import OrderConfirmationPage from "./Pages/CustormerPages/OrderConfirmation/OrderConfirmationPage.jsx";
import TestSkinType from "./Pages/CustormerPages/TestPage/TestSkinType/TestSkinType.jsx";
import SkincareRoutine from "./Pages/CustormerPages/TestPage/SkincareRoute/SkincareRoute.jsx";

// Staff************************************************************************************
import StaffLayout from "./Layout/StaffLayout";
import StaffProductManager from "./Pages/StaffPages/ManagerReviewPage/ManagerReview";
import StaffOrderManager from "./Pages/StaffPages/ManagerOrderPage/ManagerOrder.jsx";
import StaffProfile from "./Pages/StaffPages/StaffProfile/StaffProfile.jsx";
import StaffComment from "./Pages/StaffPages/StaffComment/StaffComment.jsx";
import HistoryPage from "./Pages/CustormerPages/HistoryPage/HistoryPage.jsx";

// Manager*******************************************************************************
import ManagerLayout from "./Layout/ManagerLayout";
import DashboardManager from "./Pages/ManagerPages/DashboardPage/Dashboard";
import ManagerProduct from "./Pages/ManagerPages/ManagerProductPage/ManagerProduct";
import ManagerCategory from "./Pages/ManagerPages/ManagerCategory/ManagerCategory";
import ManagerSkinType from "./Pages/ManagerPages/ManagerSkinType/ManageSkinType";
import ManagerProfile from "./Pages/ManagerPages/ManagerProfile/ManagerProfile.jsx";
import ProfileUser from "./Pages/CustormerPages/ProfileUser/ProfileUser.jsx";
import WalletCustomer from "./Pages/CustormerPages/WalletCustomer/WalletCustomer.jsx";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/*Student route*/}
        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/blogger" element={<BlogPage />}></Route>
          <Route path="/product" element={<ProductPage />}></Route>
          <Route
            path="/product-details/:id"
            element={<ProductDetail />}
          ></Route>
          <Route path="/wishlist" element={<WishlistPage />}></Route>
          <Route path="/addtocard" element={<AddToCardPage />}></Route>
          <Route path="/checkout" element={<CheckoutPage />}></Route>
          <Route path="/profile-user" element={<ProfileUser />}></Route>
          <Route path="/wallet-customer" element={<WalletCustomer />}></Route>
          <Route
            path="/order-confirmation"
            element={<OrderConfirmationPage />}
          ></Route>
          <Route path="/test-skintype" element={<TestSkinType />}></Route>
          <Route path="/skincare-routine/:id" element={<SkincareRoutine />} />
          <Route path="/history" element={<HistoryPage />}></Route>

          {/* Đúng tên */}
        </Route>

        {/* Staff router */}
        <Route path="/staff" element={<StaffLayout />}>
          <Route index element={<DashboardManager />}></Route>
          <Route path="Staff-manage-profile" element={<StaffProfile />}></Route>
          <Route
            path="Staff-manage-order"
            element={<StaffOrderManager />}
          ></Route>
          <Route
            path="Staff-manage-product"
            element={<StaffProductManager />}
          ></Route>
          <Route
            path="Staff-manage-feedback"
            element={<StaffComment />}
          ></Route>
        </Route>

        {/* Manager router */}
        <Route path="/manager" element={<ManagerLayout />}>
          <Route index element={<DashboardManager />}></Route>
          <Route
            path="dashboard-manager"
            element={<DashboardManager />}
          ></Route>
          <Route path="manager-product" element={<ManagerProduct />}></Route>
          <Route path="manager-category" element={<ManagerCategory />}></Route>
          <Route path="manager-skinType" element={<ManagerSkinType />}></Route>

          <Route path="manager-profile" element={<ManagerProfile />}></Route>
        </Route>

        {/****************************************************************************/}
      </Routes>
      <ToastContainer
        transition={Slide}
        autoClose={1000}
        newestOnTop={true}
        pauseOnHover={true}
        pauseOnFocusLoss={false}
        limit={5}
      />
    </BrowserRouter>
  );
}

export default App;
