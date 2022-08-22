import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Post from './Post';
import AddPost from './AddPost';
import { Spinner } from 'react-bootstrap';

const PostList = (props) => {
  const [posts, setPosts] = useState([]);
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);

  // useEffect
  useEffect(() => {
    fetchPostsData();
  }, []);

  // fetchPostsData
  const fetchPostsData = () => {
    setIsLoading(true);
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${params.id}/posts`)
      .then((response) => {
        setPosts(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // onAddPost
  const onAddPost = (id, title, post) => {
    axios
      .post(`https://jsonplaceholder.typicode.com/posts/`, {
        id: id,
        title: title,
        body: post,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .then((response) => {
        if (response.status !== 201) {
          return;
        } else {
          setPosts((posts) => [...posts, response.data]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // onEditPost
  const onEditPost = (id, title, body) => {
    axios
      .put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        id: id,
        title: title,
        body: body,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .then((response) => {
        if (response.status !== 200) {
          return;
        } else {
          const updatedPosts = posts.map((post) => {
            if (post.id === id) {
              post.title = title;
              post.body = body;
            }
            return post; // yg di return 1 post yg diedit aja
          });
          setPosts(updatedPosts);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // onDeletePost
  const onDeletePost = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => {
        if (response.status !== 200) {
          return;
        } else {
          setPosts(
            posts.filter((post) => {
              return post.id !== id;
            })
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <AddPost onAddPost={onAddPost} length={posts.size} />
      {isLoading ? (
        <Spinner animation='border' variant='primary' className='mt-5' />
      ) : (
        posts
          .sort((a, b) => (b.id > a.id ? 1 : -1))
          .map((post) => (
            <Post
              key={post.id}
              id={post.id}
              userId={post.userId}
              title={post.title}
              body={post.body}
              picture={props.picture}
              onEditPost={onEditPost}
              onDeletePost={onDeletePost}
            />
          ))
      )}
    </div>
  );
};

export default PostList;
