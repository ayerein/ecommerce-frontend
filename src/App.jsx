import { Routes, Route, Navigate } from "react-router-dom"

import { AdminPage } from "./pages/admin/AdminPage"
import { ShopPage } from "./pages/shop/ShopPage"
import { ProductPage } from "./pages/productPage/ProductPage"
import { CartPage } from "./pages/cart/CartPage"
import { OrderSuccess } from "./pages/orderSuccess/OrderSuccess"
import { AuthPage } from "./pages/auth/AuthPage"
import { PublicLayout } from "./layouts/PublicLayout"
import { AdminLayout } from "./layouts/AdminLayout"

import { ProductProvider } from "./context/Product/ProductProvider"
import { CartProvider } from "./context/Cart/CartProvider"
import { UserProvider } from "./context/User/UserProvider"
import { UserPage } from "./pages/user/UserPage"
import { ProtectedRoute } from "./components/auth/ProtectedRoute"
import { Unauthorized } from "./pages/unauthorized/Unauthorized"


function App() {

  return(
    <UserProvider>
      <ProductProvider>
        <CartProvider>
          <Routes>
            <Route element={<PublicLayout />}> 
              <Route path="/" element={<ShopPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/user" element={<UserPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
              <Route element={<AdminLayout />}> 
                <Route path="/admin" element={<AdminPage />} />
              </Route>
            </Route>
            

            <Route path="/*" element={ <Navigate to="/" />} />
          </Routes>
        </CartProvider>
      </ProductProvider>
    </UserProvider>
  )
}

export default App