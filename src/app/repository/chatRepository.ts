import ChatModel from "../../entities/chat";
import { IMessage, OldChatFormatted } from "../../interfaces/interface";
import { IMessageRepo } from "../../interfaces/chatRepo";


export default class messageRespository implements IMessageRepo {
    
    getMessages = async (): Promise<OldChatFormatted[] | null> => {
        const chats = await ChatModel.find().populate('sender').exec();
    
        if (!chats.length) {
            return null;
        }
    
        const formattedChats: OldChatFormatted[] = chats.map(chat => ({
            userName: chat?.sender?.userName || 'Unknown',  // Ensure userName is always a string
            content: chat.message || '',                    // Ensure content is always a string
            sentByUser: false  // You can add logic here to determine if the message was sent by the user
        }));
    
        return formattedChats;
    }
    sendMessage =async (
        sender: string,
        message: string
    ): Promise<IMessage | null> => {
        try {
            await ChatModel.findByIdAndUpdate(sender, { updatedAt: new Date() })
            let response = new ChatModel({
                sender,
                message: message,
            });
            await response.save();
            return response;
        } catch (err) {
            console.error("Error while sending message", err);
            return null;
        }
    }
    
}