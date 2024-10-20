import { IMessage, RetreiveChatData, StatusMessage } from "./interface";

export interface IChatUseCase{
    getMessages(chatId:string):Promise<StatusMessage | null>
    sendMessage(chatId:string,senderId:string,receiverId:string,content:string):Promise<IMessage | null>
}