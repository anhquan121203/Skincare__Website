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

// Staff************************************************************************************
import StaffLayout from "./Layout/StaffLayout";
import ManagerReview from "./Pages/StaffPages/ManagerReviewPage/ManagerReview";
import ManagerOrder from "./Pages/StaffPages/ManagerOrderPage/ManagerOrder";

// Manager*******************************************************************************
import ManagerLayout from "./Layout/ManagerLayout";
import DashboardManager from "./Pages/ManagerPages/DashboardPage/Dashboard";
import ManagerProduct from "./Pages/ManagerPages/ManagerProductPage/ManagerProduct";
import ManagerCategory from "./Pages/ManagerPages/ManagerCategory/ManagerCategory";
import ManagerSkinType from "./Pages/ManagerPages/ManagerSkinType/ManageSkinType";
import ManagerProfile from "./Pages/ManagerPages/ManagerProfile/ManagerProfile.jsx";

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
          {/* Đúng tên */}
        </Route>

        {/* Staff router */}
        <Route path="/staff" element={<StaffLayout />}>
          <Route index element={<DashboardManager />}></Route>
          <Route path="manage-order" element={<ManagerOrder />}></Route>
          <Route path="manage-review" element={<ManagerReview />}></Route>
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
