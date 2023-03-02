import express from 'express';
const router = express.Router();
import { signUp,logIn } from '../Controllers/auth';

router.post('/signUp',signUp);
router.post('/logIn',logIn);


export default router;