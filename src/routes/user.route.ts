import { Router } from 'express';
import userAuth from '../controllers/auth.controller'

const router = Router();

router.post('/register',userAuth.registerUser );
router.post('/login', userAuth.loginUser);

export default router;
