import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/home/home"
import Signup from "./pages/signup/signup"
import Login from "./pages/login/login"
import HomeAdmin from "./pages-admin/home-admin/home-admin"
import AddItem from "./pages-admin/add-card/add-card"
import "./app.css"
import Main from './pages/main/main'
import ProductPage from './pages/product/product'
import EditProductPage from './pages/edit-product/edit-product'
import DeleteProductPage from './pages/delete-product/delete-product'
import Success from './pages/success/success'

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/purchased-successfully" element={<Success />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/edit-products/:id" element={<EditProductPage />} />
          <Route path="/delete-products/:id" element={<DeleteProductPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home-admin" element={<HomeAdmin />} />
          <Route path="/add-card" element={<AddItem />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
