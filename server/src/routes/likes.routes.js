import {Router} from 'express';
import { getLikes, toggleLike } from '../controllers/like.controller.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

router.get('/likes', getLikes);
router.post('/likes', authRequired, toggleLike);

export default router;
