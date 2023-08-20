import React, { useState, useEffect } from "react";
import { TextField, Button, InputAdornment } from "@mui/material";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import HeaderSec from "../Main/HeaderSec";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const navigate = useNavigate();

  const [showloginpassword, setShowLoginPassword] = useState(false);

  const handleShowPassword = () => {
    setShowLoginPassword((show) => !show);
  };

  const [userLoginData, setUserLoginData] = useState({
    useremail: "",
    userpassword: "",
  });

  let name, value;
  const handleLoginData = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUserLoginData({ ...userLoginData, [name]: value });
  };

  useEffect( () => {
    onkeydown = (event) => {
      if(event.key === "Enter") { 
        event.preventDefault(event);
        onSubmit(event);
      }
     }
  } , [])

  const onSubmit = async (e) => {
    e.preventDefault();

    const { useremail, userpassword } = userLoginData;

    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        useremail,
        userpassword,
      }),
    });
    const data = res.json();
    if (res.status === 400 || !data) {
      alert("invalid Credential");
      console.log("wrong data");
    } else {
      alert("Login Successfully");
      navigate("/");
    }
    setUserLoginData({
      useremail: "",
      userpassword: " ",
    });
  };

  return (
    <>
      <HeaderSec />
      <div>
        <section className="sign-in container">
          <div className=" container mt-5">
            <div className="sign-in-content row">
              <div className=" col-md-6">
                <h1>Helllo</h1>
              </div>

              <div className="signin-form col-md-6">
                <form>
                  <div className="email-textarea">
                    <TextField
                      className="email-input"
                      id="outlined-basic"
                      label="Email"
                      name="useremail"
                      value={userLoginData.useremail}
                      variant="outlined"
                      autoComplete="off"
                      onChange={handleLoginData}
                      // onKeyDown={onkeydown}
                    />
                  </div>
                  <div className="password-textarea">
                    <TextField
                      className="password-input"
                      id="outlined-basic"
                      label="Password"
                      name="userpassword"
                      type={showloginpassword ? "text" : "password"}
                      autoComplete="off"
                      value={userLoginData.password}
                      variant="outlined"
                      onChange={handleLoginData}
                      // onKeyDown={onkeydown}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment>
                            <IconButton onClick={handleShowPassword}>
                              {showloginpassword ? (
                                <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>

                  <div className="Userlogin-btn">
                    <Button
                      variant="contained"
                      onClick={onSubmit}
                    >
                      Submit
                    </Button>
                  </div>
                  {/* <button className="hide">
                    sidit
                  </button> */}
                </form>
                <br></br>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Login;
