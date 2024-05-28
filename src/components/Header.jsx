import logo from "../assets/logo-app.png";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";



export default function Header(props) {
  const { user, login, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogOut = () => {
    navigate("/landing");
    logout();
  };

  return (
    <div className="navbar bg-blue-600/[.8] text-neutral-content px-4 h-[12vh]">
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
              className="text-2xl text-gray-200 visited:text-gray-200 hover:text-white focus:text-text-gray-200 focus:bg-transparent active:bg-transparent"
              to={"home"}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="text-2xl text-gray-200 visited:text-gray-200 hover:text-white focus:text-text-gray-200 focus:bg-transparent"
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
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              const response = await axios.post(`http://localhost:3000/auth/login`, {
                idToken: credentialResponse.credential,
              });

              const token = response.data.payload.token;

              const myProfileResponse = await axios.get(`http://localhost:3000/me`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });

              localStorage.setItem('token', token);
              login(myProfileResponse.data.payload)

              navigate('/')
            }}
            onError={() => {
              console.log('Login Failed');
            }}
            useOneTap
          />
        )}
      </div>
    </div>
  );
}
