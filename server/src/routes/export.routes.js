import {Router} from 'express';
import { exportUsers, exportPosts } from '../controllers/export.controller.js';
import { adminRequired } from '../middlewares/adminRequired.js';

const router = Router();

router.get('/export/users', adminRequired, exportUsers);
router.get('/export/posts', adminRequired, exportPosts);

export default router;
