import axios from './axios.js';


export const registerRequest = user => axios.post(`/register`, user);

export const loginRequest = user => axios.post(`/login`, user);

export const verifyTokenRequest = () => axios.get(`/verify`);

export const updateProfileRequest = user => axios.put(`/profile`, user);

export const getUsersRequest = () => axios.get(`/users`);

export const deleteUserRequest = carnet => axios.delete(`/delete/${carnet}`);

export const getPostsRequest = () => axios.get(`/posts`);

export const getTrendingRequest = () => axios.get(`/posts/trending`);

export const createPostRequest = post => axios.post(`/posts`, post);

export const deletePostRequest = id => axios.delete(`/posts/${id}`);

export const getCommentsRequest = postId =>
    axios.get(`/comments`, { params: { postId } });

export const createCommentRequest = comment => axios.post(`/comments`, comment);

export const getLikesRequest = postId =>
    axios.get(`/likes`, { params: { postId } });

export const toggleLikeRequest = postId => axios.post(`/likes`, { postId });

export const exportUsersRequest = () =>
    axios.get(`/export/users`, { responseType: 'blob' });

export const exportPostsRequest = () =>
    axios.get(`/export/posts`, { responseType: 'blob' });
