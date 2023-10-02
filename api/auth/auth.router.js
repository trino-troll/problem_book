import Router from 'express';
const router = Router();

import { signupGet, signupPost, loginGet, loginPost } from './auth.controller.js';

router.get('/signup', signupGet);
router.post('/signup', signupPost);
router.get('/login', loginGet);
router.post('/login', loginPost);

export default router;