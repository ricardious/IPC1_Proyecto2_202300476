import {Router} from 'express';
import { getComments, postComment } from '../controllers/comment.controller.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

router.get('/comments', getComments);
router.post('/comments', authRequired, postComment);

export default router;
