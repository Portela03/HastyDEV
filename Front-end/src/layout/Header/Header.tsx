import * as L from "./Header.styles";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavLinks from "../../components/NavLinks/NavLinks"
import LogoLight from "../../assets/LogoLight.svg";
import LogoDark from  "../../assets/LogoDark.svg";

import Switch from 'react-switch';
import { ThemeContext } from "styled-components";
import { useContext } from "react";
import { shade } from 'polished'


interface Props {
  toggleTheme(): void;
}

const Header: React.FC<Props> = ({ toggleTheme }) => {
  const theme = useContext(ThemeContext);
  if (!theme) {

    return null;
  }

    const ImgDarkLight = (theme.title) === 'light' ? LogoLight : LogoDark
    
  return (
    <L.Container id="container1">
      <Navbar expand="lg">
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className="mr-auto">
            <img
                src={ImgDarkLight}
              alt="Logo HastyDEV modo Light"
              className="mt-2"
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarSupportedContent" />
          <Navbar.Collapse id="navbarSupportedContent" role="navigation">
            <Nav className="ml-auto topnav w-100 justify-content-between">
              <NavLinks />
              
              <div className="d-flex align-items-center gap-3">
                <Nav.Item>
                  <Link to="/login">
                    <Button variant="primary">Login</Button>
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to="/register" >
                    <Button variant="danger">Inscreva-se</Button>
                  </Link>
                </Nav.Item>
                <Nav.Item>

                  <Switch
                    onChange={toggleTheme}
                    checked={theme?.title === 'dark'}
                    checkedIcon={true}
                    uncheckedIcon={true}
                    height={20}
                    width={35}
                    handleDiameter={20}
                    offColor={theme ? shade(0.15, theme.colors.primary) : undefined}
                    onColor={theme?.colors.secondary}
                  >
                  </Switch>
                </Nav.Item>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </L.Container>
  );
};

export default Header;
