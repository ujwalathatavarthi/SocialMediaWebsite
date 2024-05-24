import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../providers';
import {
  LOCALSTORAGE_TOKEN_KEY,
  getItemFromLocalStorage,
  setItemInLocalStorage,
  removeItemFromLocalStorage,
} from '../utils';
import {
  login as userLogin,
  signup as userSignup,
  editUser as editUserProfile,
  getFriends,
  createFriendship,
  removeFriendship,
} from '../api';
import jwtDecode from 'jwt-decode';

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  // const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const token = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
      if (token) {
        const user = jwtDecode(token);
        const response = await getFriends();
        let friends = [];
        if (response.success) {
          friends = response.data.friends;
        }
        setUser({
          ...user,
          friends: friends,
        });
      }
      setLoading(false);
      // console.log(user);
    };
    getUser();
  }, []);

  const settingUserFriends = async () => {
    const response = await getFriends();
    let friends = [];
    if (response.success) {
      friends = response.data.friends;
    }
    return friends;
  };

  const login = async (email, password) => {
    // setLoading(true);
    const response = await userLogin(email, password);
    if (response.success) {
      setItemInLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );
      // const settingUserFriends = async () => {
      //   const response = await getFriends();
      //   // let friends=[];
      //   if (response.success) {
      //     let friends = response.data.friends;
      //     setUser({
      //       ...user,
      //       friends: friends,
      //     });
      //   }
      //   // setLoading(false);
      // };
      // setLoading(false);
      let friends = await settingUserFriends();

      setUser({
        ...response.data.user,
        friends: friends,
      });
      return { success: true };
    } else
      return {
        success: false,
        messaage: response.message,
      };
  };

  const logout = () => {
    setUser(null);
    removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
  };

  const signup = async (name, email, password, confirmPassword) => {
    const response = await userSignup(name, email, password, confirmPassword);
    if (response.success) {
      return { success: true };
    } else {
      return { success: false, message: response.message  };
    }
  };

  const editUser = async (id, name, password, confirmPassword) => {
    const response = await editUserProfile(id, name, password, confirmPassword);

    if (response.success) {
      const user = response.data.user;
      setItemInLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );
      // const settingUserFriends = async () => {
      //   const response = await getFriends();
      //   // let friends=[];
      //   if (response.success) {
      //     let friends = response.data.friends;
      //     setUser({
      //       ...user,
      //       friends: friends,
      //     });
      //   }
      //   // setLoading(false);
      // };
      // setLoading(false);
      let friends = await settingUserFriends();
      setUser({
        ...user,
        friends: friends,
      });
      return { success: true };
    } else
      return {
        success: false,
        message: response.message,
      };

    // if (response.success) {
    //   setUser(response.data.user);
    //   // console.log(response.data.token);
    //   setItemInLocalStorage(
    //     LOCALSTORAGE_TOKEN_KEY,
    //     response.data.token ? response.data.token : null
    //   );
    //   return { success: true };
    // } else {
    //   return { success: false, message: response.message };
    // }
  };

  const updateUserFriends = async (addFriend, userId) => {
    if (addFriend) {
      const response = await createFriendship(userId);
      if (response.success) {
        setUser({
          ...user,
          friends: [...user.friends, response.data.friendship],
        });
        return { success: true };
      } else {
        return {
          success: false,
          message: response.message,
        };
      }
    } else {
      const response = await removeFriendship(userId);
      if (response.success) {
        let friends = user.friends.filter(
          (friend) => friend.to_user._id !== userId
        );
        setUser({
          ...user,
          friends: friends,
        });
        return {
          success: true,
        };
      } else {
        return {
          success: false,
          message: response.message,
        };
      }
    }
  };

  // const addPost = async (post) => {
  //   const response = await createPost(post);
  //   if (response.success) {
  //     setPosts([...posts, response.data.post]);
  //     return { success: true };
  //   } else return { success: false };
  // };

  return {
    user,
    // posts,
    login,
    logout,
    loading,
    signup,
    editUser,
    updateUserFriends,
    // addPost,
  };
};
