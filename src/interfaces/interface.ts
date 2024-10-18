import mongoose,{ Types ,Document} from 'mongoose';
import { Socket } from 'socket.io';

export interface UserInterface{
    userName: string;
    email: string;
    password: string;
    otp?:string
}
export interface UserData{
    _id:Types.ObjectId
    userName: string;
    email: string;
    password: string;
    profilePhoto?: string;
}
export interface LoginResponse{
    data:Data
}

export interface Data{
    user:UserData
    refreshToken:string
    accessToken:string
}

export interface StatusMessage{
    status: number; 
    message: string ;
    data?:string;
    chatId?:mongoose.Types.ObjectId
}

export interface DecodedToken {
    userId: string;
}

export interface AuthenticatedSocket extends Socket {
    decoded?: DecodedToken;
}