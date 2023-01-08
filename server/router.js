import { Router } from 'express';
import UserController from './controllers/UserController.js';

const router = new Router();

router.get('/users', UserController.getAll);
router.post('/users/login', UserController.login);

export default router;
