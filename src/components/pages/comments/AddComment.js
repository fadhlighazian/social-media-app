import { Form, Button, Card } from 'react-bootstrap';

const AddComment = (props) => {
  // onSubmitCommentHandler
  const onSubmitCommentHandler = (event) => {
    event.preventDefault();
    props.onAddComment(
      props.length + 1,
      event.target.name.value,
      event.target.email.value,
      event.target.comment.value
    );
    event.target.name.value = '';
    event.target.email.value = '';
    event.target.comment.value = '';
  };

  return (
    <Card>
      <Card.Body>
        <Form onSubmit={onSubmitCommentHandler}>
          <Form.Group className='mb-3'>
            <Form.Label>
              <strong>Name</strong>
            </Form.Label>
            <Form.Control
              type='text'
              name='name'
              id='name'
              placeholder='Input your name...'
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>
              <strong>Email address</strong>
            </Form.Label>
            <Form.Control
              type='email'
              name='email'
              id='email'
              placeholder='Input your email address...'
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>
              <strong>Comments</strong>
            </Form.Label>
            <Form.Control
              name='comment'
              id='comment'
              as='textarea'
              rows={3}
              placeholder='Type your comment here...'
            />
          </Form.Group>
          <Button
            type='submit'
            variant='success'
            onSubmit={onSubmitCommentHandler}
          >
            Reply Post
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddComment;
