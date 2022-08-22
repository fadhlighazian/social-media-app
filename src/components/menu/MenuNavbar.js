import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../logo.svg';

const MenuNavbar = () => {
  return (
    <Navbar bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand href='/'>
          <img
            alt=''
            src={logo}
            width='30'
            height='30'
            className='d-inline-block align-top'
          />
          Social Media Dashboard App
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default MenuNavbar;
