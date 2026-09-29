import {Router} from 'express';
import { postComment } from '../controllers/comment.controller.js';


const router = Router();

// Comment routes
router.post('/comment', postComment);


export default router;