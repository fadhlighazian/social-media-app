import { Form, Button, Card } from 'react-bootstrap';
import styles from './AddPost.module.css';

const AddPost = (props) => {
  // onSubmitPostHandler
  const onSubmitPostHandler = (event) => {
    event.preventDefault();
    props.onAddPost(
      props.length + 1,
      event.target.title.value,
      event.target.body.value
    );
    event.target.title.value = '';
    event.target.body.value = '';
  };

  return (
    <Card className={styles.cardAddPost} border='light'>
      <Card.Body>
        <Form onSubmit={onSubmitPostHandler}>
          <Form.Group className='mb-3'>
            <Form.Label>
              <strong>Title</strong>
            </Form.Label>
            <Form.Control
              type='text'
              name='title'
              id='title'
              placeholder='Input your title Post...'
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
              rows={3}
              placeholder='Input your body Post...'
            />
          </Form.Group>
          <Button
            type='submit'
            variant='success'
            onSubmit={onSubmitPostHandler}
          >
            Post
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddPost;
