import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import store from './store';
import { Provider } from 'react-redux';
import { AuthProvider, PostsProvider } from './providers';
import './styles/index.css';
import { App } from './components';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <React.StrictMode>
    <AuthProvider>
      <PostsProvider>
        <App />
      </PostsProvider>
    </AuthProvider>
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        // style: {
        //   background: '#363636',
        //   color: '#fff',
        // }
        success: {
          style: {
            background: 'green',
          },
        },
        error: {
          style: {
            background: 'lightred',
          },
        },
      }}
    />
  </React.StrictMode>
  </Provider>
);
