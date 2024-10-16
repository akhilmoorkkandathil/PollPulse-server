import { Request, Response } from 'express';



const userContoller = {
    // Logic for fetching user data
    getUser: (req: Request, res: Response) => {
        const userId = req.params.id;
        // Fetch user from DB or service
        res.status(200).json({ message: `User with ID: ${userId}` });
    },

    // Logic for creating a new user
    createUser: (req: Request, res: Response) => {
        const userData = req.body;
        // Logic to save user to DB
        res.status(201).json({ message: 'User created successfully', data: userData });
    },

}

export default userContoller;