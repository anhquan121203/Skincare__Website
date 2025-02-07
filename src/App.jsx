import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerLayout from "./Layout/CustomerLayout";
import HomePage from "./Pages/CustormerPages/HomePage/HomePage";
import BlogPage from "./Pages/Blogger/BlogPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*Student route*/}
        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<HomePage />}></Route>
          <Route path="/blogger" index element={<BlogPage />}></Route>
        </Route>
        {/****************************************************************************/}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
