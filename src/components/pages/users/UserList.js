import { useState, useEffect } from 'react';
import axios from 'axios';
import User from './User';
import styles from './User.module.css';
import { Spinner } from 'react-bootstrap';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect
  useEffect(() => {
    fetchUsersData();
  }, []);

  // fetchUsersData
  const fetchUsersData = () => {
    setIsLoading(true);
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        setUsers(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {isLoading ? (
        <div style={{ textAlign: 'center' }}>
          <Spinner animation='border' variant='primary' className='mt-5' />
        </div>
      ) : (
        <div className={styles['user-group']}>
          {users.map((user) => (
            <User
              key={user.id}
              id={user.id}
              name={user.name}
              address={user.address}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;
