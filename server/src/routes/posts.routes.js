import {Router} from 'express';
import { addPost, getPosts } from '../controllers/post.controller.js';


const router = Router();

// Comment routes
router.get('/posts', getPosts);
router.post('/addPost', addPost);

export default router;