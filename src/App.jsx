import HomePage from "./pages/Home/Page";
import { Route, Routes } from "react-router-dom";
import Shop from "./pages/Products/Shop";
import ShopDetails from "./pages/Products/ShopDetails";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<ShopDetails />} />
      </Routes>
      {/* </BrowserRouter> */}
    </>
  );
}

export default App;
