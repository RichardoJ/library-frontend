import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Form, Link, useRouteLoaderData } from "react-router-dom";

import classes from "./MainNavigation.module.css";

function MainNavigation() {
  const token = useRouteLoaderData('root');

  return (
    <Navbar className={classes.navcolor} expand="lg">
      <Container  fluid>
        <Navbar.Brand to="/student/home">Library</Navbar.Brand>
        <Navbar.Toggle aria-controls="collapse-navbar" />
        <Navbar.Collapse id="collapse-navbar">
          <Nav className="justify-content-end flex-grow-1 align-items-center">
            <Nav.Link to="/" as={Link} id="studentHome">Home</Nav.Link>
            {token && <Nav.Link to="/paper" as={Link}>Paper</Nav.Link>}
            {token && <Nav.Link to="/author/paper" as={Link}>My paper</Nav.Link>}
            <Nav.Link to="/about" as={Link}>About us</Nav.Link>
            <Nav.Link to="/auth" as={Link}>Login</Nav.Link>
            {token && <Form action="/logout" method="post">
              <Button type="submit">Logout</Button>
            </Form>}
            {/* <Nav.Link to="/student/profile" as={Link} id="studentProfile">Profile</Nav.Link>
            <Nav.Link to="/" as={Link}><Button onClick={logoutHandler} id="btnLogout">Log Out</Button></Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavigation;
