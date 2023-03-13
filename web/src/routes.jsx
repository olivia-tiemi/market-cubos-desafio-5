import { Route, Routes } from 'react-router-dom';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import Home from './pages/Home';
import Login from './pages/Login';
import ManageProducts from './pages/ManageProducts';
import ProductInfo from './pages/ProductInfo';
import Register from './pages/Register';

export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/productinfo" element={<ProductInfo />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/manage" element={<ManageProducts />} />
      <Route path="/addproduct" element={<AddProduct />} />
      <Route path="/editproduct" element={<EditProduct />} />
    </Routes>
  );
}
