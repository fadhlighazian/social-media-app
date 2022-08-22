import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import MenuNavbar from './components/menu/MenuNavbar';
import UserList from './components/pages/users/UserList';
import PostList from './components/pages/posts/PostList';
import AlbumList from './components/pages/albums/AlbumList';
import PhotoList from './components/pages/photos/PhotoList';
import Container from 'react-bootstrap/Container';
import UserDetail from './components/pages/users/UserDetail';
import Footer from './components/footer/Footer';

function App() {
  return (
    <div className='App'>
      <MenuNavbar />
      <Container>
        <Routes>
          <Route exact path='/' element={<Navigate to='/users' />} />
          <Route exact path='/users' element={<UserList />} />
          <Route exact path='/users/:id' element={<UserDetail />} />
          <Route exact path='/users/:id/posts' element={<PostList />} />
          <Route exact path='/users/:id/albums' element={<AlbumList />} />
          <Route exact path='/users/:id/photos' element={<PhotoList />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
