import { Outlet } from "react-router";
import NavBar from "../NavBar/NavBar";
// import Footer from "../Footer/Footer";

export default function Layout() {
  return (
    <>
      <NavBar />
      <div className=" container-fluid layout ">
        <Outlet />
      </div>
      {/* <Footer /> */}
    </>
  );
}
