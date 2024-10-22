import { Request, Response } from "express";
import { StatusCode } from "../../interfaces/enum";
import { IMessage, StatusMessage } from "../../interfaces/interface";
import { errorWrapper } from "../../utils/errorWrapper";
import { errorResponse, successResponse } from "../../utils/response";
import ChatUseCases from "../use-cases/chatUseCases";


const chatUseCase = new ChatUseCases()

export default class ChatController{
    
    public chats = errorWrapper( async( req:Request, res:Response ) => {
        const chatResonse: StatusMessage = await chatUseCase.getMessages()
        if(chatResonse.status !== StatusCode.OK){
            return await errorResponse(chatResonse.status,chatResonse,res);
        }
        await successResponse(chatResonse?.status, chatResonse, res);
        
    });

}