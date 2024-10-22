import express, { Router, Request, Response } from 'express';
import AuthControllers from '../controllers/authController';
import ChatController from '../controllers/chatController';
import JwtControllers from '../../services/jwt';
import { PollController } from '../controllers/pollController';



const authController = new AuthControllers();
const chatController = new ChatController()
const jwtController=new JwtControllers()
const pollController = new PollController()

// Initialize the router instead of an application
const route: Router = express.Router();


// Define your routes using the router
route.post('/register', authController.register);
route.post('/verifyOtp', authController.verifyOtp );
route.post('/login', authController.login);

route.get('/oldChats', chatController.chats);

route.post('/addPoll',pollController.addPoll);
route.get('/fetchPolls',pollController.fetchPoll)




export default route;