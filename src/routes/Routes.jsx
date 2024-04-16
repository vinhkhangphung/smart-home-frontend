import { Route, Routes } from "react-router-dom";
import HomeRouter from "./home/HomeRouter";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AppRoute() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/home" element={<HomeRouter />} />
      </Routes>

      <Footer />
    </>
  );
}
