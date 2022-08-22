import { Link } from 'react-router-dom';
import styles from './Album.module.css';

const Album = (props) => {
  return (
    <div className={styles.sectionAlbum}>
      <Link to={`/users/${props.id}/photos`}>
        <img
          src='https://cms-assets.tutsplus.com/cdn-cgi/image/width=1700/uploads/users/2092/posts/33466/image/type_6.jpg'
          alt='profile'
        ></img>
        <p>{props.title}</p>
      </Link>
    </div>
  );
};

export default Album;
