import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Spinner } from 'react-bootstrap';
import axios from 'axios';
import Album from './Album';
import styles from './AlbumList.module.css';

const AlbumList = () => {
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();

  // useEffect
  useEffect(() => {
    fetchAlbumsData();
  }, []);

  // fetchPostsData
  const fetchAlbumsData = () => {
    setIsLoading(true);
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${params.id}/albums`)
      .then((response) => {
        setAlbums(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Card className={styles.sectionAlbumList}>
      <Card.Body>
        <h2>Album List</h2>
        {isLoading ? (
          <div style={{ textAlign: 'center' }}>
            <Spinner animation='border' variant='primary' className='mt-5' />
          </div>
        ) : (
          <div>
            <div className={styles.body}>
              {albums.map((album) => (
                <Album
                  key={album.id}
                  id={album.id}
                  userId={album.userId}
                  title={album.title}
                />
              ))}
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default AlbumList;
