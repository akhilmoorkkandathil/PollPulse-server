import express, { Router, Request, Response } from 'express';
import AuthControllers from '../controllers/authController';



const authController = new AuthControllers();


// Initialize the router instead of an application
const route: Router = express.Router();


// Define your routes using the router
route.post('/register', authController.register);
route.post('/verifyOtp', authController.verifyOtp );
route.post('/login', authController.login);



export default route;