/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import "./Header.css";

const header = (props) => {
  const navigate = useNavigate();

  const [user, setUser] = useState([]);
  const [login, setLogin] = useState(false);

  const userData = async () => {
    try {
      const res = await fetch("/sidi", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credential: "include",
      });
      const data = await res.json();
      setUser(data);
      // console.log(data.userorderdata)
      setLogin(true);
    } catch (e) {
      console.log(e);
    }
  };

  const userLogout = () => {
    fetch('/logout', {
      method : "GET",
      headers : {
        Accept: "application/json",
        "Content-Type" : "application/json"
      },
      credential : "include"
    })
    .then((res) => {
         navigate("/login")
         if(res.status !== 200){
          const err = new Error(res.error);
          throw err;
         }
    }).catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    userData();
  }, []);

  const FoodLists = useSelector((state) => state.counter.FoodList);

  return (
    <header className="header container-fluid">
      <Link to="/" className="title-section">
        <button className="btn title-name">
          <h1 className="">Food Meals</h1>
        </button>
      </Link>
      
      <div className="button-place">
        {login ? <div className="userName">
        <p className="client-username">{user.username.slice(0,10)}</p>
        </div> : ""}
    
       <Link className="/carts">
       <button className="btn cart-btn" onClick={props.handleOpen}>
          Cart
          <span> {FoodLists.length}</span>
        </button>
       </Link>
        {login ? (
          <button className="btn login-btn" onClick={userLogout}>Logout</button>
        ) : (
          <Link to="/signup">
            <button className="btn login-btn">SignUp</button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default header;
