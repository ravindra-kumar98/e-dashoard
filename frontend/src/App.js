import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import NavComp from './components/NavComp';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import PrivateRoute from './components/PrivateRoute';
// import AddProduct from './components/AddProduct';
import AddProduct from './pages/AddProduct';
//import ProductsList from './components/ProducstList';
import Profile from './pages/Profile';
import Product from './pages/Product';
import Update from './pages/Update';
import ForgetPassword from './pages/ForgetPassword';
import EditProfile from './pages/EditProfile';

function App()
{
  return (
    <>
      <BrowserRouter>
        <NavComp />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path='/' element={<Product />} />
            <Route path='/add' element={<AddProduct />} />
            <Route path='/update' element={<Update />} />
            {/* <Route path='/logout' element={<section className='sec-height'>logout</section>} /> */}
            <Route path='/profile' element={<Profile />} />
            <Route path='/edit-profile' element={<EditProfile />} />
          </Route>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/forget-password' element={<ForgetPassword />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
