import styles from '../styles/home.module.css';
// import PropTypes from 'prop-types';
import { Post, Loader, FriendsList, CreatePost } from '../components';
// import { useState, useEffect } from 'react';
// import { getPosts } from '../api';
// import { Link } from 'react-router-dom';
import { useAuth, usePosts } from '../hooks';
// import { useState } from 'react';

const Home = () => {
  const auth = useAuth();
  const posts = usePosts();
  // const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const response = await getPosts();
  //     if (response.success) {
  //       setPosts(response.data.posts);
  //     }
  //     setLoading(false);
  //   };
  //   fetchPosts();
  // }, []);

  // function updatePosts(post) {
  //   setPosts([post, ...posts]);
  // }

  // const [comment, setComment] = useState('');
  // const addComment = async () => {
  //   const response = await auth.addComment(comment, post._id);
  // };

  if (posts.loading) return <Loader />;

  return (
    <div className={styles.home}>
      <div className={styles.postsList}>
        {auth.user && <CreatePost />}

        {posts.posts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </div>

      {auth.user && <FriendsList />}
    </div>
  );
};

// Home.propTypes = {
//   posts: PropTypes.array.isRequired,
// };

export default Home;
