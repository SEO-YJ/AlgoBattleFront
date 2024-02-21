import "./TotalNavbar.css";
import React from "react";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";

const EXPAND_BREAKPOINT = "md";
const BRANDTITLE = "AlgoBattle";

export default function TotalNavbar() {
  return (
    <Navbar
      expand={EXPAND_BREAKPOINT}
      className="mb-3 totalNavbar"
      sticky="top"
      bg="white"
    >
      <Container fluid>
        <Navbar.Brand href="/" className="totalNavbarBrand">
          <img
            src="/src/assets/imgs/sample_logo.png"
            width="50px"
            height="50px"
          />
          <div className="totalNavbarTitle">{BRANDTITLE}</div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={`Navbar-expand-${EXPAND_BREAKPOINT}`} />
        <Navbar.Offcanvas
          id={`Navbar-expand-${EXPAND_BREAKPOINT}`}
          aria-labelledby={`NavbarLabel-expend-${EXPAND_BREAKPOINT}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`NavbarLabel-expend-${EXPAND_BREAKPOINT}`}>
              <div className="totalNavbarTitle">{BRANDTITLE}</div>
            </Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body className="flex-row-reverse">
            <Nav
              className={`justify-content-around flex-row pb-4 pb-${EXPAND_BREAKPOINT}-0`}
            >
              <Nav.Link
                href="#login"
                className="flex-grow-1 text-center border-end-0"
              >
                <div className="totalNavbarBtn">로그인</div>
              </Nav.Link>
            </Nav>
            <Nav className="justify-content-start flex-grow-1 pe-3">
              <Nav.Link href="#rank">
                <div className="totalNavbarItem">Rank</div>
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
