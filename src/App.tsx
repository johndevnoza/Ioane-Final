import { Routes, Route } from "react-router-dom";
import { Products } from "./pages/products/Products";
import Home from "./pages/Home";
import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/Footer";
import Product from "./pages/products/Product";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<Product />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
