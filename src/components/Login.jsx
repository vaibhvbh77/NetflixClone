import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebaseConfig";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const Login = () => {
  const app = initializeApp(firebaseConfig);
  const location = useLocation();
  const navigataion = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setEmailValid] = useState(true);
  const [isPasswordValid, setPasswordValid] = useState(true);
  const [isUserExist, setUserExist] = useState(false);
  const [isEmailUsed, setEmailUsed] = useState(false);
  const auth = getAuth();

  const validation = (fieldName, value) => {
    switch (fieldName) {
      case "email":
        return value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      case "password":
        return value.length >= 6;
      default:
        break;
    }
  };
  // console.log(location);
  const ctaClickHandler = (e) => {
    e.preventDefault();

    if (!validation("email", email) || !validation("password", password)) {
      setEmailValid(validation("email", email));
      setPasswordValid(validation("password", password));
      return;
    }
    if (location.pathname === "/login") {
      signInWithEmailAndPassword(auth, email, password)
        .then((auth) => {
          if (auth) {
            navigataion("/dashboard");
          }
        })
        .catch((error) => {
          setUserExist(true);
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((auth) => {
          if (auth) {
            navigataion("/dashboard");
          }
        })
        .catch((error) => setEmailUsed(true));
    }
  };
  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (email.length > 6 && password.length > 6) {
      setEmailValid(true);
      setPasswordValid(true);
    }
  }, [email, password]);
  return (
    <div>
      <div className="login">
        <div className="holder">
          <h1 className="text-white">
            {location.pathname === "/login" ? "Sign In" : "Register"}
          </h1>
          <br />
          <form>
            <input
              className="form-control"
              type="email"
              placeholder="Email"
              onChange={emailHandler}
              value={email}
            />
            {!isEmailValid && (
              <p className="text-danger">Email Id is Invalid / Blank</p>
            )}

            <input
              className="form-control"
              type="password"
              placeholder="Password"
              onChange={passwordHandler}
              value={password}
            />
            {!isPasswordValid && (
              <p className="text-danger">Password is Invalid / Blank.</p>
            )}

            <button
              className="btn btn-danger btn-block"
              onClick={ctaClickHandler}
            >
              {location.pathname === "/login" ? "Sign in" : "Sign Up"}
            </button>
            <br />
            <br />

            {location.pathname === "/login" ? (
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label
                  className="form-check-label text-white"
                  htmlFor="flexCheckDefault"
                >
                  Remember Me
                </label>
              </div>
            ) : (
              ""
            )}
          </form>
          <br />
          <br />

          <div className="login-form-other">
            {isUserExist && (
              <p className="text-danger">
                User Doest Not Exist | Go for Sign Up
              </p>
            )}
            {isEmailUsed ? (
              <p className="text-danger">
                Sorry Email Already Exist | Go To Sign In
              </p>
            ) : (
              ""
            )}
            <div className="login-signup-now">
              {location.pathname == "/login"
                ? "New to Netflix ?"
                : " Existing user? "}
              <Link
                to={location.pathname === "/login" ? "/register" : "/login"}
              >
                {location.pathname === "/login" ? " Sign Up" : "   Sign In"}
              </Link>
              .
            </div>
          </div>
        </div>
        <div className="shadow"></div>
        <img
          className="concord-img vlv-creative"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/6e32b96a-d4be-4e44-a19b-1bd2d2279b51/ee068656-14b9-4821-89b4-53b4937d9f1c/IN-en-20220516-popsignuptwoweeks-perspective_alpha_website_small.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default Login;
