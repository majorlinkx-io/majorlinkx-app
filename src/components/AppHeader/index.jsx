import React, { useState, useContext, useEffect } from "react"
import { UserContext } from "./../../App"
import { useHistory, useParams } from "react-router-dom"
import { Nav, Container, NavDropdown, Button } from "react-bootstrap"
import Navbar from "react-bootstrap/Navbar"
import { Link } from "react-router-dom"
import jwt_decode from "jwt-decode"

function AppHeader() {
  const { globalUser, setGlobalUser } = useContext(UserContext)
  const history = useHistory()
 function home() {
    if(globalUser !== null){
      const decoded = jwt_decode(globalUser)
      return decoded.stageName
    }
    return ''
  }
  
  console.log(" this is home", home())

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-custom">
      <Container>
        <Navbar.Brand>
          <Link to="/" className="menu-link">
            <strong>Majorlinkx.io</strong>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle
          className="navbar-custom"
          aria-controls="responsive-navbar-nav"
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {globalUser && (
              <Link to="/about" className="menu-link">
                About
              </Link>
            )}

            <Link to="/browse" className="menu-link">
              Explore
            </Link>
            {globalUser && (
              <Link to="/buildprofile" className="menu-link">
                Build Profile
              </Link>
            )}
          </Nav>
          <Nav className="nav_buttons">
          {globalUser && <Link
          
              className="btn btn-custom"
              variant="outline-success"
              onClick={() => {history.push(`/userprofile/${home()}`)}}
            >
              Home
            </Link>}
          {!globalUser && ( <Link
              className="btn btn-custom"
              to="/login"
              variant="outline-success"
            >
              Login
            </Link>)}
            {!globalUser &&<Link
              className="btn btn-custom"
              to="/signup"
              variant="outline-success"
            >
              Signup
            </Link>}
            {globalUser && (<Link
              className="btn btn-custom"
              to="/"
              variant="outline-success"
              onClick={() => {
                localStorage.clear()
                setGlobalUser(null)  
              }}
            >
              Logout
            </Link>)}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default AppHeader
