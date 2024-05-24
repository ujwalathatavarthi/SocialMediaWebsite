import { useState } from 'react';
import { useAuth } from '../hooks';
import styles from '../styles/settings.module.css';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getUser } from '../api';
import { Loader } from '../components';
// import { useLocation } from 'react-router-dom';

const UserProfile = () => {
  const auth = useAuth();
  const [user, setUser] = useState({});
  // const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updatingFriend, setUpdatingFriend] = useState(false);

  const { userId } = useParams();

  // const location = useLocation();
  // const user = location.state?.user;
  const navigate = useNavigate();

  useEffect(() => {
    // setLoading(true);
    const fetchUser = async () => {
      const response = await getUser(userId);
      if (response.success) {
        setUser(response.data.user);
      } else {
        toast.error('User is not available');
        return navigate(-1);
      }
      setLoading(false);
    };
    fetchUser();
  }, [userId, navigate]);

  function checkFriendship() {
    const friendIds = auth.user.friends.map((friend) => friend.to_user._id);
    return friendIds.includes(userId);

    // const friend= auth.user.friends.find(friend=>friend.to_user._id);
    // return Boolean(friend);
  }

  const addFriend = async () => {
    setUpdatingFriend(true);
    const response = await auth.updateUserFriends(true, userId);
    if (response.success) {
      toast.success(`${user.name} added as friend`);
    } else {
      toast.error(`Cant add ${user.name} as friend`);
    }
    setUpdatingFriend(false);
  };

  const removeFriend = async () => {
    setUpdatingFriend(true);
    const response = await auth.updateUserFriends(false, userId);
    if (response.success) {
      toast.success(`${user.name} removed from friends`);
    } else {
      toast.error(`Cant remove ${user.name} from friends`);
    }
    setUpdatingFriend(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt=""
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user?.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        <div className={styles.fieldValue}>{user?.name}</div>
      </div>

      <div className={styles.btnGrp}>
        {checkFriendship() ? (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={removeFriend}
            disabled={updatingFriend}
          >
            {updatingFriend ? 'Removing..' : 'Remove Friend'}
          </button>
        ) : (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={addFriend}
            disabled={updatingFriend}
          >
            {updatingFriend ? 'Adding..' : 'Add Friend'}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
