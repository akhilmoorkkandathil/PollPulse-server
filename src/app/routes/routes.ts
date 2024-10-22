import express, { Router, Request, Response } from 'express';
import AuthControllers from '../controllers/authController';
import ChatController from '../controllers/chatController';
import { PollController } from '../controllers/pollController';
import JwtControllers from '../../services/jwt';



const authController = new AuthControllers();
const chatController = new ChatController();
const pollController = new PollController();
const jwtController = new JwtControllers();

// Initialize the router instead of an application
const route: Router = express.Router();


// Define your routes using the router
route.post('/register', authController.register);
route.post('/verifyOtp', authController.verifyOtp );
route.post('/login', authController.login);

route.get('/oldChats',jwtController.isAuthenticated, chatController.chats);

route.post('/addPoll',jwtController.isAuthenticated,pollController.addPoll);
route.get('/fetchPolls',jwtController.isAuthenticated, pollController.fetchPoll);


export default route;