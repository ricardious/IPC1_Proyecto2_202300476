import {Router} from 'express';
import { user } from '../controllers/user.controller.js';


const router = Router();

// Comment routes
router.post('/users', user);


export default router;