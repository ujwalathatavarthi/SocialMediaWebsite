import { API_URLS, LOCALSTORAGE_TOKEN_KEY, getFormBody } from '../utils';

// for some pages we will be getting body like login page, signup/sign page
// for some page we wont be, so body will be null
// for rest of the key:value pair in 2nd argument we get it in ...customConfig
const customFetch = async (url, { body, ...customConfig }) => {
  // getting token stored in localStorage
  const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
  // console.log(token);

  //In header we will be sending & accepting data in form urlencoded
  const headers = {
    'content-type': 'application/x-www-form-urlencoded',
  };

  // putting token into header for server to able to authenticate request
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // assembling all the config in one variable
  // assembling headers also one which we have declared above & one in customConfig
  // passing this config to fetch
  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  // encode body & add it in config
  // we cant send js object to the api, type of data-transfer is json
  if (body) {
    config.body = getFormBody(body);
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    // console.log('Fetched data', data);
    if (data.success) {
      return {
        data: data.data,
        success: true,
      };
    }
    // if data.success is false, throwing error for catch to handle
    throw new Error(data.message);
  } catch (error) {
    console.error(error);
    return {
      message: error.message,
      success: false,
    };
  }
};

export const getPosts = (page = 1, limit = 30) => {
  return customFetch(API_URLS.posts(page, limit), {
    method: 'GET',
  });
};

export const login = (email, password) => {
  return customFetch(API_URLS.login(), {
    method: 'POST',
    body: { email, password },
  });
};

export const signup = (name, email, password, confirm_password) => {
  return customFetch(API_URLS.signup(), {
    method: 'POST',
    body: { email, name, password, confirm_password },
  });
};

export const editUser = (id, name, password, confirm_password) => {
  // console.log(id, name, password, confirm_password);
  return customFetch(API_URLS.editUser(), {
    method: 'POST',
    body: { id, name, password, confirm_password },
  });
};

export const getUser = (id) => {
  return customFetch(API_URLS.userInfo(id), {
    method: 'GET',
  });
};

export const getFriends = () => {
  return customFetch(API_URLS.friends(), {
    method: 'GET',
  });
};

export const createFriendship = (id) => {
  return customFetch(API_URLS.createFriendship(id), {
    method: 'POST',
  });
};

export const removeFriendship = (id) => {
  return customFetch(API_URLS.removeFriend(id), {
    method: 'POST',
  });
};

export const createPost = (post) => {
  return customFetch(API_URLS.createPost(), {
    method: 'POST',
    body: { content: post },
  });
};

export const createComment = (content, post_id) => {
  return customFetch(API_URLS.comment(), {
    method: 'POST',
    body: { content, post_id },
  });
};

export const deleteComment = (commentId) => {
  return customFetch(API_URLS.deleteComment(commentId), {
    method: 'DELETE',
  });
};

export const toggleLike = (itemId, itemType) => {
  return customFetch(API_URLS.toggleLike(itemId, itemType), {
    method: 'POST',
  });
};

export const getusersByName = (name) => {
  return customFetch(API_URLS.searchUsers(name), {
    method: 'GET',
  });
};
