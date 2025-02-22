import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerLayout from "./Layout/CustomerLayout";
import HomePage from "./Pages/CustormerPages/HomePage/HomePage";
import LoginPage from "./Pages/LoginRegister/LoginPage/Login";
import BlogPage from "./Pages/CustormerPages/Blogger/BlogPage";
import Register from "./Pages/LoginRegister/RegisterPage/Register";
import ProductPage from "./Pages/CustormerPages/ProductPage/ProductPage";
import WishlistPage from "./Pages/CustormerPages/Wishlist/WishlistPage";
import AddToCardPage from "./Pages/CustormerPages/AddToCard/AddToCardPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*Student route*/}
        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/blogger" element={<BlogPage />}></Route>
          <Route path="/product" element={<ProductPage />}></Route>
          <Route path="/wishlist" element={<WishlistPage />}></Route>
          <Route path="/addtocard" element={<AddToCardPage />}></Route>
          {/* Đúng tên */}
        </Route>
        {/****************************************************************************/}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
