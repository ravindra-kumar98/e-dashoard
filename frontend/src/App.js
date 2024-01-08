import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import NavComp from './components/NavComp';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import PrivateRoute from './components/PrivateRoute';
import AddProduct from './components/AddProduct';
import ProductsList from './components/ProducstList';

function App()
{
  return (
    <>
      <BrowserRouter>
        <NavComp />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path='/' element={<ProductsList />} />
            <Route path='/add' element={<AddProduct />} />
            <Route path='/update' element={<h1>update</h1>} />
            <Route path='/logout' element={<h1>logout</h1>} />
            <Route path='/profile' element={<h1>Profile</h1>} />
          </Route>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
