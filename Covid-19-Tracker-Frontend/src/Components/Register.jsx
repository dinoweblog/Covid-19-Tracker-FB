import React, { useEffect, useState } from "react";
import "./Style/Modal.css";
import { RiCloseLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import "./Style/RegisterLogin.css";

const Register = ({ setIsOpen, setIsOpen2 }) => {
  const [showPass, setShowPass] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const navigate = useNavigate();

  const userDetails = {
    name,
    email,
    mobile,
    password,
    repassword,
  };

  const getRegister = (event) => {
    event.preventDefault();

    fetch(`https://user-register-login-data.herokuapp.com/register`, {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: {
        "Content-Type": "Application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setIsOpen(false);
        setIsOpen2(true);
      })

      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className={"darkBG"} onClick={() => setIsOpen(false)} />
      <div className={"centered"}>
        <div className={"modal"}>
          <div>
            <div className={"modalHeader"}>
              <h5 className={"heading"}>Signup</h5>
              <button className={"closeBtn"} onClick={() => setIsOpen(false)}>
                <RiCloseLine style={{ fontSize: "25px" }} />
              </button>
            </div>
          </div>
          <div className="register_container">
            <form onSubmit={getRegister} className="form" action="">
              <input
                required
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
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
                autocomplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span>
                <input
                  type="checkbox"
                  onClick={() => {
                    setShowPass(!showPass);
                  }}
                />{" "}
                <span>Show Password</span>
              </span>
              <input
                required
                type={showPass ? `password` : "text"}
                placeholder="Confirm Password"
                value={repassword}
                onChange={(e) => setRepassword(e.target.value)}
              />

              <input
                className="mobile_input_feild"
                required
                type="number"
                placeholder="+91 | Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              <input type="submit" value="Signup" />

              <p className="login_redirect_link">
                Already have an account?{" "}
                <Link
                  to={""}
                  onClick={() => {
                    setIsOpen(false);
                    setIsOpen2(true);
                  }}
                >
                  Sign in
                </Link>{" "}
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
