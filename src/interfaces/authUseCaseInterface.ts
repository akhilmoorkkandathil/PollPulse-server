import { LoginResponse, StatusMessage, UserInterface } from "./interface";

export interface AuthUseCaseInterface {
  register(data:UserInterface ): Promise<StatusMessage | null>;
  verifyOtp(email:string,otp:string): Promise<StatusMessage| null>;
  login(email:string,password:string): Promise< LoginResponse | StatusMessage | null>;
    
  }