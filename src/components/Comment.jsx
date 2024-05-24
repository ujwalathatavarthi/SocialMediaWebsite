import PropTypes from 'prop-types';
import { toggleLike, deleteComment as removeComment } from '../api';
import { usePosts, useAuth } from '../hooks';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import styles from '../styles/home.module.css';

export const Comment = (props) => {
  const auth = useAuth();
  const posts = usePosts();
  const navigate = useNavigate();

  const { comment } = props;

  const likeComment = async () => {
    const response = await toggleLike(comment._id, 'Comment');
    if (response.success) {
      posts.toggleLikeComment(response.data.deleted, comment.post, comment._id);
    } else {
      toast.error('Please login to like comment');
      navigate('/login');
    }
  };

  const deleteComment = async () => {
    const response = await removeComment(comment._id);
    if (response.success) {
      posts.deleteComment(comment._id, comment.post);
    } else {
      toast.error('Please login to like comment');
      navigate('/login');
    }
  };

  return (
    <div className={styles.postCommentsItem}>
      <div className={styles.postCommentHeader}>
        <Link
          to={`/users/${comment.user._id}`}
          className={styles.postCommentAuthor}
        >
          {comment.user.name}
        </Link>
        <span className={styles.postCommentTime}>a minute ago</span>
        {auth.user && (
          <div className={styles.postActionsNew}>
            <div className={styles.postLike} onClick={likeComment}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/633/633759.png"
                alt="likes-icon"
              />
              <span>{comment.likes.length}</span>
            </div>
            {auth.user._id === comment.user._id && (
              <div className={styles.postLike} onClick={deleteComment}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
                  alt=""
                />
              </div>
            )}
          </div>
        )}
        {/* <span className={styles.postCommentLikes}>{comment.likes.length}</span> */}
      </div>

      <div className={styles.postCommentContent}>{comment.content}</div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};
