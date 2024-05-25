import { Routes, Route } from "react-router-dom";
import AboutPage from "../../pages/AboutPage";
import HomePage from "../../pages/HomePage";
import ControlPage from "../../pages/ControlPage";
import AccountPage from "../../pages/AccountPage";
import LandingPage from "../../pages/LandingPage";
import LoginPage from "../../pages/LoginPage";

export default function HomeRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="home" element={<HomePage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="control" element={<ControlPage />} />
      <Route path="account" element={<AccountPage />} />
      <Route path="landing" element={<LandingPage/>} />
      <Route path="login" element={<LoginPage/>} />
    </Routes>
  );
}
