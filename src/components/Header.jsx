import React from "react";
import logo from "../assets/logo-app.png";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, login, logout } = useAuth();

  const handleLogin = () => {
    login({ username: "username", password: "password" });
  };

  const handleLogOut = () => {
    logout();
  };

  return (
    <div className="navbar bg-primary text-neutral-content px-4 h-[12vh]">
      <div className="navbar-start">
        <img src={logo} alt="logo" className="h-12 mr-2" />
        <Link to={"home"} className="text-2xl font-semibold text-white">
          SHome
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-semibold">
          <li className="mr-4">
            <Link
              className="text-xl text-gray-200 visited:text-gray-200 hover:text-white"
              to={"home"}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="text-xl text-gray-200 visited:text-gray-200 hover:text-white"
              to={"about"}
            >
              About
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <a
            className="btn text-red-600 border border-white hover:bg-red-600 hover:text-black hover:border-black w-24"
            onClick={handleLogOut}
          >
            Log Out
          </a>
        ) : (
          <a className="btn btn-primary w-20" onClick={handleLogin}>
            Log In
          </a>
        )}
      </div>
    </div>
  );
}
