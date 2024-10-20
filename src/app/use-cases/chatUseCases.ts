import { StatusCode } from "../../interfaces/enum";
import { IChatUseCase } from "../../interfaces/IchatUseCases";
import { IMessage, StatusMessage } from "../../interfaces/interface";
import messageRespository from "../repository/chatRepository";


const MessageRepo= new messageRespository()
export default class ChatUseCases implements IChatUseCase {
    
    sendMessage= async (senderId: string,content:string): Promise<IMessage | null>  => {
        try {
            let response = await MessageRepo.sendMessage(senderId,content)
            return response
        } catch (err) {
            console.log("Error while creating chats", err);
            return null
        }
    }

    getMessages= async (): Promise<StatusMessage >  => {
        try {
            let response = await MessageRepo.getMessages()
            return {status:StatusCode.OK,message:"Old messages fetched sucessfully",data:response}
        } catch (err) {
            console.error("Error while getting message", err)
            return {status:StatusCode.NotFound,message:"Error while getting message"}
        }
    }
    
} 