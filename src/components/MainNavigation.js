import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Form, Link } from "react-router-dom";

import classes from "./MainNavigation.module.css";

function MainNavigation() {
  // const logoutHandler = () => {
    
  // };

  return (
    // <header className={classes.header}>
    //   <nav>
    //     <ul className={classes.list}>
    //       <li>
    //         <NavLink
    //           to="/"
    //           className={({ isActive }) =>
    //             isActive ? classes.active : undefined
    //           }
    //           end
    //         >
    //           Home
    //         </NavLink>
    //       </li>
    //       <li>
    //         <NavLink
    //           to="/about"
    //           className={({ isActive }) =>
    //             isActive ? classes.active : undefined
    //           }
    //         >
    //           About us
    //         </NavLink>
    //       </li>
    //       <li>
    //         <NavLink
    //           to="/paper"
    //           className={({ isActive }) =>
    //             isActive ? classes.active : undefined
    //           }
    //         >
    //           Papers
    //         </NavLink>
    //       </li>
    //       <li>
    //         <NavLink
    //           to="/author/paper"
    //           className={({ isActive }) =>
    //             isActive ? classes.active : undefined
    //           }
    //         >
    //           My Paper
    //         </NavLink>
    //       </li>
    //     </ul>
    //   </nav>
    // </header>
    <Navbar className={classes.navcolor} expand="lg">
      <Container  fluid>
        <Navbar.Brand to="/student/home">Library</Navbar.Brand>
        <Navbar.Toggle aria-controls="collapse-navbar" />
        <Navbar.Collapse id="collapse-navbar">
          <Nav className="justify-content-end flex-grow-1 align-items-center">
            <Nav.Link to="/" as={Link} id="studentHome">Home</Nav.Link>
            <Nav.Link to="/paper" as={Link} id="studentGrades">Paper</Nav.Link>
            <Nav.Link to="/author/paper" as={Link} id="studentAssignments">My paper</Nav.Link>
            <Nav.Link to="/about" as={Link} id="studentCourses">About us</Nav.Link>
            <Form action="/logout" method="post">
              <Button type="submit">Logout</Button>
            </Form>
            {/* <Nav.Link to="/student/profile" as={Link} id="studentProfile">Profile</Nav.Link>
            <Nav.Link to="/" as={Link}><Button onClick={logoutHandler} id="btnLogout">Log Out</Button></Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavigation;
