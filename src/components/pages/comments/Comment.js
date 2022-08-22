import { useState } from 'react';
import styles from './Comment.module.css';
import { Button, Form } from 'react-bootstrap';

const Comment = (props) => {
  const [isEdit, setIsEdit] = useState(false);

  // editCommentHandler
  const editCommentHandler = () => {
    setIsEdit(!isEdit);
  };

  // onEditCommentSubmitHandler
  const onEditCommentSubmitHandler = (event) => {
    event.preventDefault();
    props.onEditComment(
      props.id,
      props.postId,
      props.name,
      props.email,
      event.target.body.value
    );
    setIsEdit(!isEdit);
  };

  // deleteCommentHandler
  const deleteCommentHandler = () => {
    props.onDeleteComment(props.id);
  };

  return (
    <div className={styles.comment}>
      <div className={styles.content}>
        <img
          src='https://carta.fiu.edu/kopenhavercenter/wp-content/uploads/sites/17/2021/01/depositphotos_29387653-stock-photo-facebook-profile.jpg'
          alt='comment profile'
        />
        <h2>
          {props.name}
          <br />
          {props.email}
        </h2>
      </div>
      <div className={styles.detail}>
        {isEdit ? (
          <Form onSubmit={onEditCommentSubmitHandler}>
            <Form.Group className='mb-3'>
              <Form.Control
                name='body'
                id='body'
                as='textarea'
                defaultValue={props.body}
                rows={3}
                placeholder='Type your comment here...'
              />
            </Form.Group>
            <Button
              type='submit'
              variant='success'
              onSubmit={onEditCommentSubmitHandler}
            >
              Save Comment
            </Button>
          </Form>
        ) : (
          <div>
            <p>{props.body}</p>
            <div className={styles.buttonGroup}>
              <Button onClick={editCommentHandler} variant='primary'>
                Edit Comment
              </Button>
              <Button onClick={deleteCommentHandler} variant='danger'>
                Delete Comment
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
