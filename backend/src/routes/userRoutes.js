import express from 'express';
import UserController from '../controllers/userController.js';

const router = express.Router();
const userController = new UserController();

// Auth routes
router.post('/register', userController.register.bind(userController));
router.post('/login', userController.login.bind(userController));
router.get('/me', userController.getCurrentUser.bind(userController));

// User management routes
router.get('/', userController.getAllUsers.bind(userController));
router.get('/:id', userController.getUserById.bind(userController));
router.put('/:id', userController.updateProfile.bind(userController));
router.delete('/:id', userController.deleteUser.bind(userController));

export default router; 