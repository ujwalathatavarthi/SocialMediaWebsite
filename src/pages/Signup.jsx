import { useState } from 'react';
import styles from '../styles/login.module.css';
import toast from 'react-hot-toast';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signing, setSigning] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  //   console.log(navigate);

  async function handleSubmit(e) {
    e.preventDefault();
    setSigning(true);
    if (password !== confirmPassword) {
      toast.error('Password & confirmPassword must be same');
      return setSigning(false);
    }
    const response = await auth.signup(name, email, password, confirmPassword);
    if (response.success) {
      navigate('/login');
      toast.success('signed up successfully');
    } else {
      toast.error(`${response.message}`);
    }
    setSigning(false);
  }

  if (auth.user) {
    return <Navigate to="/Codeial-React-App" replace></Navigate>;
  }

  return (
    <div>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <span className={styles.loginSignupHeader}>SignUp</span>
        <div className={styles.field}>
          <input
            type="text"
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <input
            type="password"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <button disabled={signing}>
            {signing ? 'Signing...' : 'Sign Up'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
