import React, { useState } from "react";
import "./Signup.css";
import image from "../Image/registion_image.jpg";
import { Link, useNavigate } from "react-router-dom";
import { IconButton, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import HeaderSec from "../Main/HeaderSec";
import VisibilityIcon from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Signup = () => {
  const navigate = useNavigate();
  const [showpassword, setShowPassword] = useState(false);
  const [showconfirmpassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((show) => !show);
  };

  onkeydown = (event) => {
    if(event.key === "Enter"){
      event.preventDefault(event);
      onSubmit(event);
    }
  }

  const [userdata, setUserdata] = useState({
    username: "",
    useremail: "",
    usernumber: "",
    userpassword: "",
    userconfirmpassword: "",
  });

  let value, name;

  const handlerInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUserdata({ ...userdata, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const {
        username,
        useremail,
        usernumber,
        userpassword,
        userconfirmpassword,
      } = userdata;
      if (
        !username ||
        !useremail ||
        !usernumber ||
        !userpassword ||
        !userconfirmpassword
      ) {
        alert("Please Provide All Data Correctly !!! ");
      } else if (userconfirmpassword !== userpassword) {
        alert("Both Password does not match");
      } else {
        const res = await fetch("/registation", {
          method: "POST",
          headers: {
            "Content-Type": " application/json",
          },
          body: JSON.stringify({
            username,
            useremail,
            usernumber,
            userpassword,
            userconfirmpassword,
          }),
        });
        const data = await res.json();
        if (res.status === 422 || !data) {
          alert("invalid Registation");
          console.log("invalid Registation");
        } else {
          alert("Successful Registation");
          console.log("Successful Registation");
          navigate("/login");
        }
      }
    } catch (e) {
      console.log(e);
    }
    setUserdata({
      username: "",
      useremail: "",
      usernumber: "",
      userpassword: "",
      userconfirmpassword: "",
    });
  };

  return (
    <div>
      <HeaderSec />
      <section>
        <div className="signup-container container mt-5">
          <div className="signup-content container">
            <div className="form-title">
              <br></br>
              <h2 className="sign-up"> Sign Up</h2>
            </div>
            <div className="signup-form row">
              <div className="col-md col-sm">
                <form className="register-form" id="registion" method="POST">
                  <div className="form-group">
                    <TextField
                      fullWidth
                      label="Name"
                      type="name"
                      name="username"
                      id="username"
                      className="form-control"
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      value={userdata.username}
                      onChange={handlerInputs}
                      variant="standard"
                      required={true}
                    />
                  </div>
                  <div className="form-group">
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      name="useremail"
                      id="useremail"
                      className="form-control"
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      value={userdata.useremail}
                      onChange={handlerInputs}
                      variant="standard"
                      required={true}
                    />
                  </div>
                  <div className="form-group">
                    <TextField
                      fullWidth
                      label="Number"
                      type="number"
                      name="usernumber"
                      id="usernumber"
                      className="form-control"
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      value={userdata.usernumber}
                      onChange={handlerInputs}
                      variant="standard"
                      required={true}
                    />
                  </div>
                  <div className="form-group">
                    <div className="input-password-show">
                      <TextField
                        fullWidth
                        label="Password"
                        type={showpassword ? "userpassword" : "password"}
                        name="userpassword"
                        id="userpassword"
                        className="form-control"
                        autoComplete="off"
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        value={userdata.userpassword}
                        onChange={handlerInputs}
                        variant="standard"
                        required={true}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end"style={{marginRight:"10px"}}>
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                // onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showpassword ? (
                                  <VisibilityOffIcon />
                                ) : (
                                  <VisibilityIcon />
                                )}
                                {/* <VisibilityIcon/> */}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <TextField
                      fullWidth
                      label="Confirm Password"
                      type={showconfirmpassword ? "userconfirmpassword" : "password"}
                      name="userconfirmpassword"
                      id="userconfirmpassword"
                      className="form-control"
                      aria-label="Default"
                      variant="standard"
                      autoComplete="off"
                      aria-describedby="inputGroup-sizing-default"
                      value={userdata.userconfirmpassword}
                      onChange={handlerInputs}
                      required={true}
                      style={{ border: "none" }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end" style={{marginRight:"10px"}}>
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowConfirmPassword}
                              // onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showconfirmpassword ? (
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
                  <div className="  form-group">
                    <LoadingButton
                      loadingPosition="start"
                      startIcon={<SaveIcon />}
                      variant="outlined"
                      onClick={onSubmit}
                      required={true}
                    >
                      Submit
                    </LoadingButton>
                  </div>
                  <br></br>
                </form>
              </div>
              <div className="image-section col-md col-sm">
                <img src={image} alt="rigistion_image" />
                <div className="already-login">
                  <p>
                    If You are Already Registor than
                    <Link to="/login" className="signIn">
                      Sign In !!
                    </Link>
                  </p>
                </div>
              </div>
            </div>
            <br></br>
          </div>
        </div>
      </section>
      <br></br>
    </div>
  );
};

export default Signup;
