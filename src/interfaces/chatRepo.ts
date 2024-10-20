import {   IMessage, OldChatFormatted } from "./interface";

export interface IMessageRepo {
    getMessages(): Promise<OldChatFormatted[] | null>;
    sendMessage(chatId: string, senderId: string, receiverId: string | null, message: string): Promise<IMessage | null>;
}