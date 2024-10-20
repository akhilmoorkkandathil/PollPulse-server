import UserModel from "../../entities/user";
import { UserData, UserInterface } from "../../interfaces/interface";
import { UserRepo } from "../../interfaces/userRepo";
import { hashPassword } from "../../utils/passwordHashing";
import jwt from 'jsonwebtoken'




export default class UserRepository implements UserRepo{
    findUser = async (email: string): Promise<UserData | null> => {
        try {
            const user = await UserModel.findOne({ email }).exec();
            console.log(user)
            return user as UserData | null;
        } catch (error) {
            console.error("Error finding user:", error);
            return null;
        }
    }
    findUserById = async(userId:string): Promise<UserData | null> => {
        try {
            const user = await UserModel.findById(userId).exec();
            console.log(user)
            return user as UserData | null;
        } catch (error) {
            console.error("Error finding user:", error);
            return null;
        }
    }
    saveUser = async (data: UserInterface): Promise<UserData | null> => {
        try {
            const { otp, ...userWithoutOtp } = data;
            userWithoutOtp.password = await hashPassword(data.password);
            console.log(userWithoutOtp,"ithu pass");
            const user = new UserModel(userWithoutOtp);
            const savedUser = await user.save() as UserData
            return savedUser;
        } catch (error) {
            console.error("Error finding user:", error);
            return null;
        }
    }
    
}