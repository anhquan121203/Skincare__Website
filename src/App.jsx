import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerLayout from "./Layout/CustomerLayout";
import HomePage from "./Pages/CustormerPages/HomePage/HomePage";
import LoginPage from "./Pages/LoginRegister/LoginPage/Login";
import BlogPage from "./Pages/CustormerPages/Blogger/BlogPage";
import Register from "./Pages/LoginRegister/RegisterPage/Register";

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
          {/* Đúng tên */}
        </Route>
        {/****************************************************************************/}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
