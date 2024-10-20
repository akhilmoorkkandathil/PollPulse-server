import { LoginResponse, StatusMessage, UserData, UserInterface } from "./interface";

export interface UserUseCaseInterface {
    getUserById(id:string): Promise<StatusMessage | null>;   
  }