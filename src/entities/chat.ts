import mongoose, { Document, Schema } from "mongoose";
import { IMessage } from "../interfaces/interface";

const chatSchema: Schema<IMessage> = new Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String },
}, { timestamps: true });

const chatModel = mongoose.model<IMessage>("Message", chatSchema);
export default chatModel;