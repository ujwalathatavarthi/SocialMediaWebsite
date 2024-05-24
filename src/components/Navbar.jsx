import { useCallback, useState, useRef, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks';
import { getusersByName as fetchUsers } from '../api';
import styles from '../styles/navbar.module.css';
import debounce from 'lodash.debounce';

export const Navbar = () => {
  const [searchText, setSearchText] = useState('');

  const [results, setResults] = useState([]);
  const [showResults,setShowResults] = useState(true);
  const navigate = useNavigate();

  // const getusersByName = async (e) => {
  //   if (e.key === 'Enter') {
  //     const response = await fetchUsers(searchText);
  //     if (response.success) {
  //       // setSearchText('');
  //       setResults(response.data.users);
  //     }
  //   }
  // };

  const searchResultBox = useRef(null);
  const dropDownBox = useRef(null);

  useOutsideHandler(searchResultBox); //for search results
  useOutsideHandler(dropDownBox); // for drop down box

  function useOutsideHandler(ref) {
    useEffect(() => {
      function handleOutsideClick(e) {
        if (ref.current && !ref.current.contains(e.target)) setShowResults(false);
      }

      document.addEventListener('mousedown', handleOutsideClick);

      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }, [ref]);
  }

  const handleSearch = (value) =>{
    setShowResults(true);
    setSearchText(value);
    getUserByName(value);
  }

  const getUserByName = useCallback(debounce(async (value) => {
    if (value.length > 2) {
      const response = await fetchUsers(value);
      if (response.success) {
        setResults(response.data.users);
      }
    } else {
      setResults([]);
    }
  }, 500),[])

  // useEffect(() => {
  //   const getusersByName = debounce(async () => {
  //     if (searchText.length > 2) {
  //       const response = await fetchUsers(searchText);
  //       if (response.success) {
  //         setResults(response.data.users);
  //       }
  //     } else {
  //       setResults([]);
  //     }
  //   }, 500);

  //   getusersByName();
  // }, [searchText]);

  const showUserProfile = (link) =>{
    navigate(link);
    setShowResults(false);
  }

  const auth = useAuth();
  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <Link to="/Codeial-React-App">
          <img
            alt=""
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
          />
        </Link>
      </div>

    {auth.user &&  <div className={styles.searchContainer}>
        <img
          className={styles.searchIcon}
          src="https://cdn-icons-png.flaticon.com/512/54/54481.png"
          alt=""
        />
        <input
          type="text"
          placeholder="Search User"
          value={searchText}
          onClick={()=>setShowResults(true)}
          onChange={(e) => handleSearch(e.target.value)}
          // onKeyDown={getusersByName}
        />

        {(showResults && results.length > 0) && (
          <div className={styles.searchResults} ref={searchResultBox}>
            <ul>
              {results.map((user) => (
                <li
                  className={styles.searchResultsRow}
                  key={`user-${user._id}`}
                  onClick={()=>showUserProfile(`/users/${user._id}`)}
                >
                  {/* <Link to={`/users/${user._id}`}> */}
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      alt=""
                    />
                    <span>{user.name}</span>
                  {/* </Link> */}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>}

      <div className={styles.rightNav}>
        {auth.user && (
          <div className={styles.user}>
            <Link to="/Settings">
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt=""
                className={styles.userDp}
              />
            </Link>
            <span className={styles.userName}>{auth.user.name}</span>
          </div>
        )}

        <div className={styles.navLinks}>
          <ul>
            {auth.user ? (
              <li>
                <button className={styles.logoutBtn} onClick={auth.logout}>Log Out</button>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/login">Log In</Link>
                </li>
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
