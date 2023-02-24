import React from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../../slices/userSlice";
import { BiLogOut } from "react-icons/bi";
import {
  MdDashboard,
  MdOutlineCreate,
  MdReorder,
  MdShoppingCart,
} from "react-icons/md";
function Navigation() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  //logout function
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Navbar bg="light" expand="lg" fixed="top">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Refurbished.Store</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {!user && (
                <LinkContainer
                  to="/login"
                  className="btn btn-primary text-white"
                  style={{ letterSpacing: "1px" }}
                >
                  <Nav.Link>LOGIN</Nav.Link>
                </LinkContainer>
              )}
              {user && (
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
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container style={{ height: "4rem" }} />
    </>
  );
}

export default Navigation;
