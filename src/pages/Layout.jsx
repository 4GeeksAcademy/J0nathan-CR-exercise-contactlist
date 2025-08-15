import { Outlet } from "react-router-dom/dist";
import ScrollToTop from "../components/ScrollToTop";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import DeleteModal from "../components/DeleteModal";

export const Layout = () => {
  return (
    <ScrollToTop>
      <Navbar />
      <Outlet />
      <Footer />
      <DeleteModal /> 
    </ScrollToTop>
  );
};