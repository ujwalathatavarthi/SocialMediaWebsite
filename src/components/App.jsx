// import { useEffect, useState } from 'react';
// import { getPosts } from '../api';
import { Home, Login, Signup, Settings, UserProfile } from '../pages';
import { Loader, Navbar } from '.';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useAuth } from '../hooks';

// const About = () => {
//   return <h1>About</h1>;
// };

function PrivateRoute({ children }) {
  const auth = useAuth();
  return auth.user ? children : <Navigate to="/login" replace />;
}

const Page404 = () => {
  return <h1>Page Not Found</h1>;
};

export function App() {
  // const [loading,setLoading]= useState(true);
  // const [posts, setPosts] = useState([]);
  const auth = useAuth();
  // console.log('auth', auth);

  //In useEffect we cant directly call async fn
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const response = await getPosts();
  //     // console.log("response",response);
  //     if (response.success) {
  //       setPosts(response.data.posts);
  //     }
  //     setLoading(false);
  //   };

  //   fetchPosts();
  // }, []);

  if (auth.loading) {
    return <Loader />;
  }
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/Codeial-React-App" element={<Home />} />
          {/* <Route path="/" element={<Home />} /> */}
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
          <Route
            path="/users/:userId"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </div>
  );
}

// export default App;
