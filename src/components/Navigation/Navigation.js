import React, { useRef, useState } from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout, resetNotifications } from "../../slices/userSlice";
import { BiLogOut } from "react-icons/bi";
import { FaBell, FaHome, FaShoppingCart } from "react-icons/fa";
import {
  MdDashboard,
  MdOutlineCreate,
  MdReorder,
  MdShoppingCart,
} from "react-icons/md";
import Rlogo from "./Rlogo";
import "./navigation.css";
import api from "../../utils/api";
function Navigation() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const bellRef = useRef(null);
  const notificationRef = useRef(null);
  const [bellPos, setBellPos] = useState({});
  //logout function
  const handleLogout = () => {
    dispatch(logout());
  };
  const unreadNotifications = user?.notifications?.reduce((acc, current) => {
    if (current.status === "unread") return acc + 1;
    return acc;
  }, 0);

  function handleToggleNotifications() {
    const userToken = user.token;
    const position = bellRef.current.getBoundingClientRect();
    setBellPos(position);
    notificationRef.current.style.display =
      notificationRef.current.style.display === "block" ? "none" : "block";
    dispatch(resetNotifications());
    if (unreadNotifications > 0)
      api.post(`/user/${user._id}/updateNotifications`, {
        headers: {
          Authorization: "Bearer " + userToken,
        },
      });
  }

  return (
    <>
      <Navbar bg="light" expand="lg" fixed="top">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <Rlogo />
              <span
                style={{
                  letterSpacing: "0.5px",
                  marginLeft: "10px",
                }}
              >
                Refurbished.Store
              </span>
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {!user && (
                <LinkContainer
                  to="/login"
                  className="btn btn-outline-secondary "
                  style={{
                    letterSpacing: "1px",
                    border: "none",
                    fontWeight: "bolder",
                    marginTop: "0.25rem",
                  }}
                >
                  <Nav.Link>LOGIN</Nav.Link>
                </LinkContainer>
              )}
              {user && (
                <>
                  {!user.isAdmin ? (
                    <LinkContainer to="/cart">
                      <Nav.Link>
                        <FaShoppingCart size={20} />
                        {user?.cart.count > 0 && (
                          <span className="badge badge-warning" id="cartCount">
                            {user.cart.count}
                          </span>
                        )}
                      </Nav.Link>
                    </LinkContainer>
                  ) : (
                    <LinkContainer to="/dashboard">
                      <Nav.Link>
                        <MdDashboard size={20} />
                      </Nav.Link>
                    </LinkContainer>
                  )}
                </>
              )}
              {user && (
                <>
                  <Nav.Link
                    style={{ position: "relative" }}
                    onClick={handleToggleNotifications}
                  >
                    <FaBell />
                    <i
                      className="fas fa-bell"
                      ref={bellRef}
                      data-count={unreadNotifications || null}
                    ></i>
                  </Nav.Link>
                  <NavDropdown title={`${user.email}`} id="basic-nav-dropdown">
                    {user.isAdmin && (
                      <>
                        <LinkContainer to="/dashboard">
                          <NavDropdown.Item>
                            <MdDashboard style={{ marginBottom: "2px" }} />{" "}
                            Dashboard
                          </NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/createProduct">
                          <NavDropdown.Item>
                            <MdOutlineCreate style={{ marginBottom: "2px" }} />{" "}
                            Create Product
                          </NavDropdown.Item>
                        </LinkContainer>
                      </>
                    )}
                    {!user.isAdmin && (
                      <>
                        <LinkContainer
                          to="/cart"
                          style={{ letterSpacing: "1px" }}
                        >
                          <NavDropdown.Item>
                            <MdShoppingCart style={{ marginBottom: "2px" }} />{" "}
                            Cart
                          </NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/orders">
                          <NavDropdown.Item>
                            <MdReorder style={{ marginBottom: "2px" }} /> My
                            Orders
                          </NavDropdown.Item>
                        </LinkContainer>
                      </>
                    )}
                    <NavDropdown.Divider />
                    <NavDropdown.Item className="text-center">
                      <Button variant="danger" onClick={handleLogout}>
                        <BiLogOut style={{ marginBottom: "2px" }} /> Logout
                      </Button>
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
              <LinkContainer to="/">
                <Nav.Link>
                  <FaHome size={20} />
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container style={{ height: "4rem" }} />
      {/* notifications */}
      <div
        className="notifications-container shadow"
        ref={notificationRef}
        style={{
          position: "absolute",
          top: bellPos.top + 40,
          left: bellPos.left - 10,
          display: "none",
        }}
      >
        {user?.notifications.length > 0 ? (
          user?.notifications.map((notification) => (
            <p className={`notification-${notification.status}`}>
              {notification.message}
              <br />
              <span>
                {notification.time.split("T")[0] +
                  " " +
                  notification.time.split("T")[1].split(".")[0]}
              </span>
            </p>
          ))
        ) : (
          <p>No notifcations yet</p>
        )}
      </div>
    </>
  );
}

export default Navigation;
