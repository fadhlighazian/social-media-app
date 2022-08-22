import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './UserDetail.module.css';
import { Card, Spinner } from 'react-bootstrap';
import PostList from '../posts/PostList';
import AlbumList from '../albums/AlbumList';

const UserDetail = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const profilePicture = `https://xsgames.co/randomusers/assets/avatars/male/${user.id}.jpg`;

  // useEffect
  useEffect(() => {
    fetchUser();
  }, []);

  // fetchUser
  const fetchUser = () => {
    setIsLoading(true);
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${params.id}`)
      .then((response) => {
        setUser(response.data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className={styles.section}>
      <div className={styles.sectionLeft}>
        <Card className={styles.cardProfile} border='light'>
          <Card.Img
            variant='top'
            src='https://www.colorhexa.com/00a4a4.png'
            className={styles.banner}
          />
          <Card.Body className={styles.cardBody}>
            {isLoading ? (
              <Spinner animation='border' variant='primary' className='mt-5' />
            ) : (
              <div>
                <img
                  src={profilePicture}
                  alt='profile'
                  className={styles.imgSty}
                ></img>
                <h2>{user.name}</h2>
                <p>
                  {user.username} - {user.email}
                </p>
                <p className={styles.websiteDesc}>{user.website}</p>
                <p className={styles.phoneDesc}>{user.phone}</p>
              </div>
            )}
          </Card.Body>
        </Card>
        <AlbumList />
      </div>
      <div>
        <PostList picture={profilePicture} />
      </div>
    </div>
  );
};

export default UserDetail;
