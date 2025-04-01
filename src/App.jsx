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
import EditProfileUser from "./Pages/CustormerPages/ProfileUser/EditProfileUser/EditProfileUser.jsx";
import WalletCustomer from "./Pages/CustormerPages/WalletCustomer/WalletCustomer.jsx";
import ProfileUser from "./Pages/CustormerPages/ProfileUser/ProfileUser.jsx";
import SuportCustomer from "./Pages/CustormerPages/SuportPage/SuportCustomer.jsx";

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
import ManagerAccount from "./Pages/ManagerPages/ManagerAccount/ManagerAccount.jsx";
import ManagerSkinQuestion from "./Pages/ManagerPages/ManagerSkinQuestion/ManagerSkinQuestion.jsx";
import ManagerSkinAnswer from "./Pages/ManagerPages/ManagerSkinAnswer/ManagerSkinAnswer.jsx";
import ManagerSkincareRoutine from "./Pages/ManagerPages/ManagerSkincareRoutines/ManagerSkincareRoutine.jsx";
import ManagerStepRoutine from "./Pages/ManagerPages/ManagerStepRoutine/ManagerStepRoutine.jsx";
import ManagerOrder from "./Pages/ManagerPages/ManagerOrder/ManagerOrder.jsx";

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
          <Route path="/editProfile-user" element={<EditProfileUser />}></Route>
          <Route path="/wallet-customer" element={<WalletCustomer />}></Route>
          <Route
            path="/order-confirmation"
            element={<OrderConfirmationPage />}
          ></Route>
          <Route path="/test-skintype" element={<TestSkinType />}></Route>
          <Route path="/skincare-routine/:id" element={<SkincareRoutine />} />
          <Route path="/history" element={<HistoryPage />}></Route>
          <Route path="/support" element={<SuportCustomer />}></Route>

          {/* Đúng tên */}
        </Route>

        {/* Staff router ******************************************************/}
        <Route path="/staff" element={<StaffLayout />}>
          <Route index element={<StaffProfile />}></Route>
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

        {/* Manager router ***************************************/}
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
          <Route path="manager-account" element={<ManagerAccount />}></Route>
          <Route
            path="manager-skinQuestion"
            element={<ManagerSkinQuestion />}
          ></Route>
          <Route
            path="manager-skinAnswer"
            element={<ManagerSkinAnswer />}
          ></Route>
          <Route
            path="manager-skinCareRoutines"
            element={<ManagerSkincareRoutine />}
          ></Route>
          <Route
            path="manager-stepRoutine"
            element={<ManagerStepRoutine />}
          ></Route>
          <Route
            path="manager-order"
            element={<ManagerOrder />}
          ></Route>
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
