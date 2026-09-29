import axios from './axios.js';


export const registerRequest = user => axios.post(`/register`, user);

export const loginRequest = user => axios.post(`/login`, user);

export const verifyTokenRequest = () => axios.get(`/verify`);

export const getUsersRequest = () => axios.get(`/users`);

export const deleteUserRequest = carnet => axios.delete(`/delete/${carnet}`);

export const likeGetRequest = postId => axios.get(`/likes?postId`, { postId });

export const getPostsRequest = () => axios.get(`/posts`);

export const createPostRequest = post => axios.post(`/posts`, newPost);