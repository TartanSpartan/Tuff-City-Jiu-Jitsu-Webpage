import React from "react";
// import { NavLink } from "react-router-dom";
import "../App.scss";
import { Navbar, Nav, Container } from 'react-bootstrap';
// import { NavItem, NavDropdown, MenuItem } from 'react-bootstrap';



function NavBar(props) {
    const { currentUser, adminUser, onSignOut } = props;
    const handleSignOutClick = event => {
        event.preventDefault();
    if (typeof onSignOut === "function") {
        onSignOut();
    }

    console.log(props);

};
return (
    <Navbar id="navbar">
    <Container id="nav-container" class="container">
    <Navbar.Brand href="/">Getting around</Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link href="/">Home</Nav.Link>
      {/* <Nav.Link href="/posts">Blog</Nav.Link> */}
      <Nav.Link href="/whatisjitsu">What Is Jiu Jitsu?</Nav.Link>
      <Nav.Link href="/profiles">Who Are We?</Nav.Link>
      {currentUser ? (
        <>
        <Nav.Link href="/syllabus">Syllabus</Nav.Link>
        <Nav.Link href="/technique/new">Add Techniques To Syllabus</Nav.Link>
        {/* <Nav.Link href="/syllabus/mindmap">Mindmap For Syllabus</Nav.Link> */}
        {/* <Nav.Link href="/events">Events</Nav.Link> */}
        <Nav.Link href="/" onClick={onSignOut}>Sign Out</Nav.Link>
        <Nav.Link className="item" style={{ color: "green" }}>
          Welcome {currentUser.full_name}
        </Nav.Link>
      </>
      ) : (
        <React.Fragment>
        <Nav.Link href="/sign_in">Sign In</Nav.Link>
        <Nav.Link href="/sign_up">Sign Up</Nav.Link>
        </React.Fragment>
      )}
      {/* {adminUser ? (
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