import React, { Fragment } from 'react'
import Logo from './logosm.jpg'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'

// Authenticated
const authenticatedOptions = userEmail => (
  <Fragment>
    <Nav.Link href="#chat">Chat</Nav.Link>
    <Nav.Link href="#profiles">Profiles</Nav.Link>
    <NavDropdown title={userEmail} id="basic-nav-dropdown">
      <NavDropdown.Item href="#profile/create">Create Profile</NavDropdown.Item>
      <NavDropdown.Item href="#change-password">Change Password</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="#sign-out">Sign Out</NavDropdown.Item>
    </NavDropdown>
  </Fragment>
)

// Unauthenticated
const unauthenticatedOptions = (
  <Fragment>
    <Nav>
      <Nav.Link href="#sign-up">Sign Up</Nav.Link>
      <Nav.Link href="#sign-in">Sign In</Nav.Link>
    </Nav>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
    <Nav.Link href="#/">Home</Nav.Link>
  </Fragment>
)

const Header = ({ user, profile }) => (
  <Navbar bg="primary" variant="dark" expand="md">
    <div className="container">
      <Navbar.Brand href="#">
        <img src={Logo}></img>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          { alwaysOptions }
          { user ? authenticatedOptions(profile ? profile.nickname : user.email) : unauthenticatedOptions }
        </Nav>
      </Navbar.Collapse>
    </div>
  </Navbar>
)

export default Header
