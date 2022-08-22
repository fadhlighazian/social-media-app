import { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Card, Button } from 'react-bootstrap';
import Comment from '../comments/Comment';
import AddComment from '../comments/AddComment';
import styles from './Post.module.css';

const Post = (props) => {
  const [comments, setComments] = useState([]);
  const [isEditPost, setIsEditPost] = useState(false);

  // useEffect
  useEffect(() => {
    fetchCommentsData();
  }, []);

  // fetchCommentsData
  const fetchCommentsData = () => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${props.id}/comments`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // onAddComment
  const onAddComment = (id, name, email, comment) => {
    axios
      .post(`https://jsonplaceholder.typicode.com/comments/`, {
        id: id,
        name: name,
        email: email,
        body: comment,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .then((response) => {
        if (response.status !== 201) {
          return;
        } else {
          setComments((comments) => [...comments, response.data]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // onEditComment
  const onEditComment = (id, postId, name, email, newBody) => {
    axios
      .put(`https://jsonplaceholder.typicode.com/comments/${id}`, {
        id: id,
        postId: postId,
        name: name,
        email: email,
        body: newBody,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .then((response) => {
        if (response.status !== 200) {
          return;
        } else {
          const updatedComments = comments.map((comment) => {
            if (comment.id === id) {
              comment.body = newBody;
            }
            return comment; // yg di return 1 comment yg diedit aja
          });
          setComments(updatedComments);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // editPostHandler
  const editPostHandler = () => {
    setIsEditPost(!isEditPost);
  };

  // onEditPostSubmitHandler
  const onEditPostSubmitHandler = (event) => {
    event.preventDefault();
    props.onEditPost(
      props.id,
      event.target.title.value,
      event.target.body.value
    );
    setIsEditPost(!isEditPost);
  };

  // deletePostHandler
  const deletePostHandler = () => {
    props.onDeletePost(props.id);
  };

  // onDeleteComment
  const onDeleteComment = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/comments/${id}`)
      .then((response) => {
        if (response.status !== 200) {
          return;
        } else {
          setComments(
            comments.filter((comment) => {
              return comment.id !== id;
            })
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Card className={styles.cardPost} border='light'>
      <Card.Body>
        {isEditPost ? (
          <Form onSubmit={onEditPostSubmitHandler}>
            <Form.Group className='mb-3'>
              <Form.Label>
                <strong>Title</strong>
              </Form.Label>
              <Form.Control
                name='title'
                id='title'
                type='text'
                defaultValue={props.title}
                placeholder='Type your title Post here...'
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>
                <strong>Post</strong>
              </Form.Label>
              <Form.Control
                name='body'
                id='body'
                as='textarea'
                defaultValue={props.body}
                rows={3}
                placeholder='Type your Post here...'
              />
            </Form.Group>
            <Button
              type='submit'
              variant='success'
              onSubmit={onEditPostSubmitHandler}
            >
              Save Post
            </Button>
          </Form>
        ) : (
          <div className={styles.top}>
            <img src={props.picture} alt='' />
            <div className={styles.title}>
              <h2>{props.title}</h2>
              <p>{props.body}</p>
              <div className={styles.btnGroup}>
                <Button variant='outline-primary' onClick={editPostHandler}>
                  Edit Post
                </Button>
                <Button variant='outline-danger' onClick={deletePostHandler}>
                  Delete Post
                </Button>
              </div>
            </div>
          </div>
        )}

        <div>
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              id={comment.id}
              postId={comment.postId}
              name={comment.name}
              email={comment.email}
              body={comment.body}
              onEditComment={onEditComment}
              onDeleteComment={onDeleteComment}
            />
          ))}
          <AddComment onAddComment={onAddComment} length={comments.size} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default Post;
