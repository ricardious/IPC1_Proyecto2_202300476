import {Router} from 'express';
import { getLikes, addLike, deleteLike } from '../controllers/like.controller.js';


const router = Router();

// Comment routes
router.get('/likes', getLikes);
router.post('/likes', addLike);
router.delete('/likes', deleteLike);


export default router;