import React, { useEffect, useState } from "react";
import "./Style/Modal.css";
import { useDispatch, useSelector } from "react-redux";
import { RiCloseLine } from "react-icons/ri";


import { Link, useNavigate } from "react-router-dom";
import "./Style/RegisterLogin.css";
import {
  loginAuthenticated,
  loginError,
  loginLoading,
  loginSuccess,
} from "../Redux/Login/action";

const Login = ({ setIsOpen, setIsOpen2 }) => {
  const [showPass, setShowPass] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = {
    email,
    password,
  };

  const getLogedin = (event) => {
    event.preventDefault();
    dispatch(loginLoading());

    fetch(`https://user-register-login-data.herokuapp.com/login`, {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: {
        "Content-Type": "Application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch(
          loginSuccess({
            token: res.token,
            user: res.user,
            userId: res.user._id,
          })
        );
        dispatch(loginAuthenticated("true"));
      })
      .then((res) => {
        setIsOpen2(false);
        navigate("/");
      })
      .catch((error) => dispatch(loginError()));
  };

  return (
    <>
      <div className={"darkBG"} onClick={() => setIsOpen2(false)} />
      <div className={"centered"}>
        <div className={"modal"}>
          <div>
            <div className={"modalHeader"}>
              <h5 className={"heading"}>Login</h5>
              <button className={"closeBtn"} onClick={() => setIsOpen2(false)}>
                <RiCloseLine style={{ fontSize: "25px" }} />
              </button>
            </div>
          </div>
          <div className="register_container login_container">
            <form onSubmit={getLogedin} className="form" action="">
              <h2>Login</h2>

              <input
                required
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                required
                type={showPass ? `password` : "text"}
                placeholder="Password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <span>
                <input
                  type="checkbox"
                  onClick={() => {
                    setShowPass(!showPass);
                  }}
                />
                <span>Show Password</span>
              </span>

              <input type="submit" value="Login" />

              <p className="login_redirect_link">
                Are you a new user?{" "}
                <Link
                  to={""}
                  onClick={() => {
                    setIsOpen2(false);
                    setIsOpen(true);
                  }}
                >
                  Sign up
                </Link>{" "}
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
