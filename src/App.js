import './App.css';
import {Route, Routes, Link, Navigate} from "react-router-dom"
import Home from "./pages/Home/Home"
import Products from "./pages/Products/Products"
import ProductPage from "./pages/ProductPage/ProductPage"
import Nav from "./components/Nav/Nav"
import React, {useContext} from "react";
import Categories from "./pages/Categories/Categories";
import CategoriePage from "./pages/CategoriePage/CategoriePage";
import NotFound from "./pages/NotFound/NotFound";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import {AuthContext} from "./context/AuthContext";
import Registratie from "./pages/Registratie/Registratie";
import Cart from "./pages/Cart/Cart"



function App()
{

    const {isAuth} = useContext(AuthContext)

    return (


      <>
          <Nav/>
          <Routes>
              <Route path="/" element={<Home/> }/>
              <Route path="products" element={<Products/> }/>
              <Route path="products/:id" element={<ProductPage/> }/>
              <Route path="categories" element={<Categories/> }/>
              <Route path="categories/:id" element={<CategoriePage/> }/>
              <Route path="*" element={<NotFound/> }/>
              <Route path="login" element={<Login/>}/>
              <Route path="profile" element={isAuth ? <Profile/> : <Navigate to="/login"></Navigate>}/>
              <Route path="registratie" element={<Registratie/>}/>
              <Route path="cart" element={<Cart/>}/>



          </Routes>

      </>

  )
}

export default App;
