import { Routes, Route } from "react-router-dom";
import AboutPage from "../../pages/AboutPage";
import HomePage from "../../pages/HomePage";
import ControlPage from "../../pages/ControlPage";
import AccountPage from "../../pages/AccountPage";

export default function HomeRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="home" element={<HomePage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="control" element={<ControlPage />} />
      <Route path="account" element={<AccountPage />} />
    </Routes>
  );
}
