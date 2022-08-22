import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import styles from './User.module.css';

const User = (props) => {
  return (
    <Card
      border='light'
      style={{ margin: '1rem' }}
      className={styles.cardContainer}
    >
      <Card.Body className={styles['card-profile']}>
        <img
          src={`https://xsgames.co/randomusers/assets/avatars/male/${props.id}.jpg`}
          alt='profile'
        />
        <div className={styles['card-desc']}>
          <h2>{props.name}</h2>
          <p>
            {props.address.street}, {props.address.city}
          </p>
          <Link to={`/users/${props.id}`} className={styles.btnLink}>
            Go to profile
          </Link>{' '}
          {/* <Link to={`/users/${props.id}/posts`}>Posts</Link>{' '} */}
          {/* <Link to={`/users/${props.id}/albums`}>Albums</Link> */}
        </div>
      </Card.Body>
    </Card>
  );
};

export default User;
