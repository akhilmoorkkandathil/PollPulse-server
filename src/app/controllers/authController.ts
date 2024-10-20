import { Response,Request } from 'express';
import { StatusCode } from '../../interfaces/enum';
import { StatusMessage } from '../../interfaces/interface';
import AuthUseCases from '../use-cases/authUseCases';
import { errorWrapper } from '../../utils/errorWrapper';
import { errorResponse, successResponse } from '../../utils/response';

const authUseCases=new AuthUseCases()


export default class AuthControllers{

    public register = errorWrapper( async( req:Request, res:Response ) => {
        const registerResponse : StatusMessage = await authUseCases.register(req.body) as StatusMessage 
        if(registerResponse.status !== StatusCode.OK){
            return await errorResponse(registerResponse.status,registerResponse,res);
        }
        await successResponse(registerResponse?.status, registerResponse, res);
    });

    public verifyOtp = errorWrapper( async( req:Request, res:Response ) => {
        const { email, otp } = req.body
        const verifyOtpResponse:StatusMessage = await authUseCases.verifyOtp(email,otp) as StatusMessage 
        if(verifyOtpResponse.status !== StatusCode.OK){
            return await errorResponse(verifyOtpResponse.status, verifyOtpResponse,res);
        }
        return await successResponse(verifyOtpResponse?.status, verifyOtpResponse, res);
    });

    public login = errorWrapper( async( req:Request, res:Response ) => {
        const { email, password } = req.body;
        const loginResponse: StatusMessage= await authUseCases.login(email,password) as StatusMessage        
        if(loginResponse.status !== StatusCode.OK){
            return await errorResponse(loginResponse.status,loginResponse,res);
        }
        return await successResponse(StatusCode.OK,loginResponse,res)
    })
}