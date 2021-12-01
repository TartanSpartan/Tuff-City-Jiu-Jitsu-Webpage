import React from "react";
// import { NavLink } from "react-router-dom";
import "../App.scss";
import { Navbar, Nav, Container } from "react-bootstrap";
// import { NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

function NavBar(props) {
  const { currentUser, onSignOut } = props;
  const handleSignOutClick = (event) => {
    event.preventDefault();
    if (typeof onSignOut === "function") {
      onSignOut();
    }

    console.log(props);
  };

  return (
    <Navbar id="navbar" className="navbar">
      <Container id="nav-container" className="nav-container">
        <Navbar.Brand className="gettingAround" id="gettingAround" href="/">
          Getting Around
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link className="nav-link" href="/">
            Home
          </Nav.Link>
          {/* <Nav.Link href="/posts">Blog</Nav.Link> */}
          <Nav.Link className="nav-link" href="/whatisjitsu">
            What Is Jiu Jitsu?
          </Nav.Link>
          <Nav.Link className="nav-link" href="/profiles">
            Who Are We?
          </Nav.Link>
          {currentUser ? (
            <>
              <Nav.Link className="nav-link" href="/syllabus">
                Syllabus
              </Nav.Link>
              {currentUser.is_admin ? (
                <Nav.Link
                  className="nav-link"
                  className="nav-link"
                  href="/technique/new"
                >
                  Add Techniques To Syllabus
                </Nav.Link>
              ) : (
                <></>
              )}
              <Nav.Link href="/syllabus/mindmap">Mindmap For Syllabus</Nav.Link>
              {/* <Nav.Link href="/events">Events</Nav.Link> */}
              <Nav.Link className="nav-link" href="/" onClick={onSignOut}>
                Sign Out
              </Nav.Link>
              <Nav.Link
                className="nav-link"
                className="item"
                style={{ color: "green" }}
              >
                Welcome {currentUser.full_name}
              </Nav.Link>
            </>
          ) : (
            <React.Fragment>
              <Nav.Link className="nav-link" href="/sign_in">
                Sign In
              </Nav.Link>
              <Nav.Link className="nav-link" href="/sign_up">
                Sign Up
              </Nav.Link>
            </React.Fragment>
          )}
          {/* {currentUser.is_admin ? (
      <>
      <Nav.Link href="/admin">Admin Page</Nav.Link>
      </>
      ) : (
        <div></div>
      )} */}
        </Nav>
      </Container>
    </Navbar>
  );
}
export default NavBar;
