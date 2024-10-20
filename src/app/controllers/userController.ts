import { Request, Response } from "express";
import { StatusCode } from "../../interfaces/enum";
import { StatusMessage } from "../../interfaces/interface";
import { errorWrapper } from "../../utils/errorWrapper";
import { errorResponse, successResponse } from "../../utils/response";
import { extractToken } from "../../utils/tokenExtraction";
import UsersUseCases from "../use-cases/userUseCase";


const userUseCase = new UsersUseCases()

export default class UserController{
    
    // public userData = errorWrapper( async( req:Request, res:Response ) => {
    //     const { email } = req.body;
    //     const userResponse: StatusMessage= await userUseCase.findUser(email) as StatusMessage
    //     console.log("Usr REsponse", userResponse);
          
    //     if(userResponse.status !== StatusCode.OK){
    //         return await errorResponse(userResponse.status,userResponse,res);
    //     }
    //     return await successResponse(StatusCode.OK,userResponse,res)
    // });

}