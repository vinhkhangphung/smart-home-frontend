import React from "react";
import logo from "../assets/react.svg"; // Import your logo file
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="logo">
          <img src={logo} alt="Logo" className="h-10" />
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to={"home"} className="hover:text-gray-400">
                Home
              </Link>
            </li>
            <li>
              <Link to={"about"} className="hover:text-gray-400">
                About
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
