import { Routes, Route, Navigate } from "react-router-dom"
import { AdminPage } from "./pages/admin/AdminPage"
import { ShopPage } from "./pages/shop/ShopPage"
import { ProductPage } from "./pages/productPage/ProductPage"
import { CartPage } from "./pages/cart/CartPage"
import { NavBar } from "./layouts/navbar/NavBar"
import { PublicLayout } from "./layouts/PublicLayout"
import { ProductProvider } from "./context/Product/ProductProvider"
import { CartProvider } from "./context/Cart/CartProvider"
import { AdminLayout } from "./layouts/AdminLayout"
import { OrderSuccess } from "./pages/orderSuccess/OrderSuccess"


function App() {

  return(
    <ProductProvider>
      <CartProvider>
        <Routes>
          <Route element={<PublicLayout />}> 
            <Route path="/" element={<ShopPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/order-success" element={<OrderSuccess />} />
          </Route>

          <Route element={<AdminLayout />}> 
            <Route path="/admin" element={<AdminPage />} />
          </Route>
          <Route path="/*" element={ <Navigate to="/" />} />
        </Routes>
      </CartProvider>
    </ProductProvider>
  )
}

export default App



/* 
  media querya


*/