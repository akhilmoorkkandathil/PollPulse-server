import { StatusCode } from "../../interfaces/enum";
import { StatusMessage, UserData } from "../../interfaces/interface";
import { UserUseCaseInterface } from "../../interfaces/userUserCaseInterface";
import { extractToken } from "../../utils/tokenExtraction";
import UserRepository from "../repository/userRepository";


const userRepo = new UserRepository()

export default class UsersUseCases implements UserUseCaseInterface{
    
    getUserById = async (userId:string): Promise<StatusMessage > => {
        try {
            const user = await userRepo.findUserById(userId);

            console.log(user);
            
            if (!user) return { status: StatusCode.NotFound as number, message: "User not exists" };
            
            return {status:StatusCode.OK as number , data :user, message:"User data fetched successfully"}
            
        } catch (error) {

            console.error("Error during registration:", error);

            return { status: StatusCode.InternalServerError as number, message: "Internal Server Error" };
        }
    }
}