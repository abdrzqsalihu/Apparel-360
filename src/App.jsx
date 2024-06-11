import HomePage from "./pages/Home/Page";
import { Route, Routes } from "react-router-dom";
import Shop from "./pages/Products/Shop";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
      {/* </BrowserRouter> */}
    </>
  );
}

export default App;
