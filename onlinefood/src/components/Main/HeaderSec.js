import React, { useState } from "react";
// import { Route, Routes } from 'react-router-dom'
// import Login from '../Login/Login'
// import Signup from '../Login/Signup'
// import Sidi from '../Login/sidi';
// import Logout from '../Login/Logout';
import Carts from "../Carts/Carts";
import Header from "../Layout/Header";

const HeaderSec = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleOpen = () => {
    setShow(true);
  };

  return (
    <>
      <Header handleOpen={handleOpen} />
      <Carts handleClose={handleClose} show={show} />
    </>
  );
};

export default HeaderSec;
