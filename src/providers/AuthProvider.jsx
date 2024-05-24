import { createContext } from 'react';
import { useProvideAuth } from '../hooks';

const initialState = {
  user: null,
  // posts: [],
  login: () => {},
  logout: () => {},
  loading: true,
  signup: () => {},
  editUser: () => {},
  updateUserFriends: () => {},
  // addPost: () => {},
};

export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
