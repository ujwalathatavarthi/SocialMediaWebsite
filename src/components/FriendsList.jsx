import { useAuth } from '../hooks';
import styles from '../styles/home.module.css';
import { Link } from 'react-router-dom';

export const FriendsList = () => {
  const auth = useAuth();
  // if (!auth.user) return;
  const { friends = [] } = auth.user;
  return (
    <div className={styles.friendsList}>
      <h2 className={styles.header}>Friends List</h2>
      <div className={styles.friendsCtn}>
      {friends.length === 0 ? (
        <div className={styles.noFriends}>No Friends Found</div>
      ) : (
        friends.map((friend) => (
          <div key={`friend-${friend.to_user._id}`}>
            <Link
              className={styles.friendsItem}
              to={`/users/${friend.to_user._id}`}
            >
              <div className={styles.friendsImg}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt=""
                />
              </div>
              <div className={styles.friendsName}>{friend.to_user.name}</div>
            </Link>
          </div>
        )) 
      )
      }
      </div>
    
    </div>
  );
};
