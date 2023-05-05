import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

const Header = () => {
  const navigation = useNavigate();
  const signInHandler = (e) => {
    e.preventDefault();
    navigation("/login");
  };
  const [showSignInButton, setSignInButton] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      setSignInButton(false);
    }
  }, [location]);
  return (
    <div>
      <header className="topNav">
        <nav className="navbar navbar-expand-md navbar-dark">
          <div className="container-fluid">
            <a className="navbar-brand" to="/">
              <Link to="/">
                {" "}
                <img
                  className="nav__logo"
                  src="https://www.freepnglogos.com/uploads/netflix-logo-0.png"
                  alt=""
                />
              </Link>
            </a>

            <div className="navbar">
              <form className="d-flex" role="search">
                <select>
                  <option>English</option>
                  <option>Hindi</option>
                </select>
                {showSignInButton ? (
                  <button className="btn btn-danger" onClick={signInHandler}>
                    Signin
                  </button>
                ) : (
                  ""
                )}
              </form>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
