import { UserData, UserInterface } from "./interface";

export interface UserRepo {
  findUser(emai:String ): Promise<UserData | null>;
  saveUser(data:UserInterface): Promise<UserData | null> ;

  }