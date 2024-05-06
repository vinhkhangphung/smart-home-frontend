import { Route, Routes } from "react-router-dom";
import HomeRouter from "./home/HomeRouter";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import LandingPage from "../pages/LandingPage";
import AboutPage from "../pages/AboutPage";

export default function AppRoute() {
  const { user } = useAuth();
  return (
    <>
      <Header />

      <Routes>
        {user ? (
          <Route path="/*" element={<HomeRouter />} />
        ) : (
          <>
            <Route path="/about" element={<AboutPage />} />
            <Route path="/*" element={<LandingPage />} />
          </>
        )}
      </Routes>

      <Footer />
    </>
  );
}
