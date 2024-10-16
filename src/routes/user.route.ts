import { Router } from 'express';
import userContoller from '../controllers/user.controller';

const router = Router();

router.get('/:id', userContoller.getUser);
router.post('/', userContoller.createUser);

export default router;
