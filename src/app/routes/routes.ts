import express, { Router, Request, Response } from 'express';
import AuthControllers from '../controllers/authController';
import UserController from '../controllers/userController';
import ChatController from '../controllers/chatController';



const authController = new AuthControllers();
const chatController = new ChatController()

// Initialize the router instead of an application
const route: Router = express.Router();


// Define your routes using the router
route.post('/register', authController.register);
route.post('/verifyOtp', authController.verifyOtp );
route.post('/login', authController.login);

route.get('/oldChats', chatController.chats)




export default route;