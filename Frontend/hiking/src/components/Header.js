import {Navbar, Nav, Form, FormControl, Button} from "react-bootstrap";

const Header = () =>{
  return(
      <Navbar bg="light" variant="light" expand="lg">
        <Navbar.Brand href="#home">Site</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      
      <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#features">Features</Nav.Link>
        <Nav.Link href="#pricing">Pricing</Nav.Link>
      </Nav> 
      </Navbar.Collapse>
  </Navbar>
    )
  }

export default Header; 