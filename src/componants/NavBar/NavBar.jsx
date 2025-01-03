import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";
import { userContext } from "../../context/user.context";

export default function NavBar() {
  let { token, logOut } = useContext(userContext);
  return (
    <>
      <nav className="">
        <Navbar expand="lg" className=" bg-info py-2">
          <Container fluid className="container-fluid">
            <Link
              to={"/"}
              className="text-black ms-5 fs-3 text-decoration-none fw-bold text-2xl d-flex gap-2 justify-content-center align-items-center"
            >
              <i className="fa-regular fa-note-sticky  fs-1"></i>
              NotesApp
            </Link>
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              className=" nav-button "
            />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto gap-4 me-5">
                <>
                  {token ? (
                    <NavLink
                      to={"/"}
                      className={({ isActive }) => {
                        return `text-decoration-none position-relative   border-secondar text-dark links-nav ${
                          isActive ? "active-link" : ""
                        } `;
                      }}
                    >
                      Home
                    </NavLink>
                  ) : (
                    ""
                  )}
                  {!token ? (
                    <>
                      <NavLink
                        to={"/singup"}
                        className={({ isActive }) => {
                          return `text-decoration-none position-relative   border-secondar text-dark links-nav ${
                            isActive ? "active-link" : ""
                          } `;
                        }}
                      >
                        SingUp
                      </NavLink>
                      <NavLink
                        to={"/login"}
                        className={({ isActive }) => {
                          return `text-decoration-none position-relative   border-secondar text-dark links-nav ${
                            isActive ? "active-link" : ""
                          } `;
                        }}
                      >
                        LogIn
                      </NavLink>
                    </>
                  ) : (
                    ""
                  )}
                  {token ? (
                    <button
                      onClick={logOut}
                      to="Home"
                      className="logout bg-transparent border-0 "
                    >
                      <i className="fa-solid fa-right-from-bracket fs-4 "></i>
                    </button>
                  ) : (
                    ""
                  )}
                </>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </nav>
    </>
  );
}
