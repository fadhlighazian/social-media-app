import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Photo from './Photo';
import styles from './PhotoList.module.css';
import { Card, Spinner } from 'react-bootstrap';

const PhotoList = () => {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();

  // useEffect
  useEffect(() => {
    fetchPhotosData();
  }, []);

  // fetchPostsData
  const fetchPhotosData = () => {
    setIsLoading(true);
    axios
      .get(`https://jsonplaceholder.typicode.com/albums/${params.id}/photos`)
      .then((response) => {
        setPhotos(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Card className={styles.sectionPhotoList} border='light'>
      <Card.Body>
        <h2>Photo List</h2>
        {isLoading ? (
          <div style={{ textAlign: 'center' }}>
            <Spinner animation='border' variant='primary' className='mt-5' />
          </div>
        ) : (
          <div className={styles.photoGroup}>
            {photos.map((photo) => (
              <Photo
                key={photo.id}
                id={photo.id}
                albumId={photo.albumId}
                title={photo.title}
                url={photo.url}
                thumbnailUrl={photo.thumbnailUrl}
              />
            ))}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default PhotoList;
