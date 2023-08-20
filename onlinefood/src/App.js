import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import React , {useState} from "react";
import Login from './components/Login/Login';
import Signup from './components/Login/Signup';
import Main from './components/Main/Main'
import Sidi from './components/Login/sidi'
import Logout from './components/Login/Logout';
import Carts from './components/Carts/Carts';
import Addcarts from './components/Carts/Addcarts';

function App() {

  return (
    <>
    <Routes>
      <Route exact path='/' element={<Main/>  }/>
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/carts' element={<Carts/>}/>
      <Route exact path='/signup' element={<Signup/>}/>
      <Route exact path='/sidi' element={<Sidi/>}/>
      <Route exact path="/logout" element={<Logout/>}/>
      <Route exact path="/addcart" element={<Addcarts/>}/>
    </Routes>
    
    </>
  );
}


export default App;
