import { useState } from 'react';
import { useAuth } from '../hooks';
import styles from '../styles/settings.module.css';
import toast from 'react-hot-toast';
// import { Navigate } from 'react-router-dom';

const Settings = () => {
  const auth = useAuth();
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(auth.user?.name);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [editing, setEditing] = useState(false);

  //   const navigate = useNavigate();

  function clearForm() {
    setConfirmPassword('');
    setPassword('');
  }

  const submitForm = async () => {
    if (password !== confirmPassword) {
      return toast.error('password & confirm password doesnt match');
    }

    setEditing(true);
    // console.log(auth.user);
    const response = await auth.editUser(
      auth.user._id,
      name,
      password,
      confirmPassword
    );
    // console.log(name, password, confirmPassword);
    if (response.success) {
      toast.success('User profile updated Successfully');
      // navigate('/login');
      clearForm(); //removing password from state
      setEdit(false);
    } else {
      toast.error('Not able to update user profile');
    }
    setEditing(false);
  };

  // if (!auth.user) {
  //   return <Navigate to="/login" replace></Navigate>;
  // }

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
        <div className={styles.fieldValue}>{auth.user?.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        {edit ? (
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <div className={styles.fieldValue}>{auth.user?.name}</div>
        )}
      </div>

      {edit && (
        <>
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Password</div>
            <input
              type="password"
              value={password}
              placeholder="Enter Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Confirm Password</div>
            <input
              type="password"
              value={confirmPassword}
              placeholder="Confirm Password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </>
      )}

      <div className={styles.btnGrp}>
        {!edit ? (
          <button
            className={`button ${styles.editBtn}`}
            onClick={() => setEdit(true)}
          >
            Edit Profile
          </button>
        ) : (
          <>
            <button
              className={`button ${styles.saveBtn}`}
              onClick={submitForm}
              disabled={editing}
            >
              {editing ? 'Saving..' : 'Save'}
            </button>
            <button
              className={`button ${styles.goBackBtn}`}
              onClick={() => setEdit(false)}
            >
              Go Back
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Settings;
