import { useState } from 'react';
import styles from '../styles/home.module.css';
import toast from 'react-hot-toast';
// import { useAuth } from '../hooks';
// import { createPost } from '../api';
import { usePosts } from '../hooks';

export const CreatePost = (props) => {
  // const auth = useAuth();
  const posts = usePosts();
  const [post, setPost] = useState('');
  const [adding, setAdding] = useState(false);

  const addPost = async () => {
    if (!post) return toast.error('Cant Create Empty Post');
    setAdding(true);

    const response = await posts.addPostToState(post);
    if (response.success) {
      setPost(''); // to clear the text area after post is created Successfully
      //   props.updatePosts(response.data.post);
      toast.success('Post created Successfully');
    } else {
      toast.error('Cant Create Post please try again');
    }

    setAdding(false);
  };

  // if (!auth.user) return;

  return (
    <div className={styles.createPost}>
      <textarea
        className={styles.addPost}
        placeholder="Write Post..."
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />
      <div>
        <button
          className={styles.addPostBtn}
          disabled={adding}
          onClick={addPost}
        >
          {adding ? 'Creating...' : 'Create Post'}
        </button>
      </div>
    </div>
  );
};
