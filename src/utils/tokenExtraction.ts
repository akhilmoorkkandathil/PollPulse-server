import { StatusCode } from "../interfaces/enum";
import { errorResponse } from "./response";

export const extractToken =(req:Request,res:Response):string => {
    const authHeader :string | null  = req.headers.get('authorization');
        
        // If the header is missing or the format is incorrect, return an error
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            //return errorResponse(StatusCode.Unauthorized, {status:StatusCode.Unauthorized, message: 'Token is missing or invalid' }, res);
            return ''
        }

        // Extract the token after "Bearer "
        const token = authHeader.split(' ')[1];

        return token
}