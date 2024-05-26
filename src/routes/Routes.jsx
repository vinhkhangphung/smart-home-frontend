import { Route, Routes } from "react-router-dom";
import HomeRouter from "./home/HomeRouter";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import LandingPage from "../pages/LandingPage";
import AboutPage from "../pages/AboutPage";
import LoginPage from "../pages/LoginPage";
import { useState } from 'react';
import { useCallback } from 'react';

export default function AppRoute() {
  const { user } = useAuth();
  const [ loggedIn, setLoggedIn ] = useState(false);

  const setTrue = useCallback(val => {
    setLoggedIn(true);
  }, [setLoggedIn]);

  const setFalse = useCallback(val => {
    setLoggedIn(false);
  }, [setLoggedIn]);

  // useEffect(() => {
  //   // Fetch the user email and token from local storage
  //   const user = JSON.parse(localStorage.getItem('user'))
  
  //   // If the token/email does not exist, mark the user as logged out
  //   if (!user || !user.token) {
  //     setLoggedIn(false)
  //     return
  //   }
  
  //   // If the token exists, verify it with the auth server to see if it is valid
  //   fetch('http://localhost:3080/verify', {
  //     method: 'POST',
  //     headers: {
  //       'jwt-token': user.token,
  //     },
  //   })
  //     .then((r) => r.json())
  //     .then((r) => {
  //       setLoggedIn('success' === r.message)
  //       setEmail(user.email || '')
  //     })
  // }, [])


  return (
    <>
      <Header />

      <Routes>
        {loggedIn ? (
          <Route path="/*" element={<HomeRouter />} />
        ) : (
          <>
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage setLoggedIn={setTrue} setLoggedOut={setFalse}/>} />
            <Route path="/*" element={<LandingPage />} />
          </>
        )}
      </Routes>

      <Footer />
    </>
  );
}
