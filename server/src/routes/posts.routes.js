import {Router} from 'express';
import { addPost, getPosts, getTrending, deletePost } from '../controllers/post.controller.js';
import { authRequired } from '../middlewares/validateToken.js';
import { adminRequired } from '../middlewares/adminRequired.js';

const router = Router();

router.get('/posts', getPosts);
router.get('/posts/trending', getTrending);
router.post('/posts', authRequired, addPost);
router.delete('/posts/:id', adminRequired, deletePost);

export default router;
