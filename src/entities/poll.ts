import { Schema, Types } from "mongoose";
import { PollOption } from "../interfaces/interface";
import { model } from "mongoose";

export interface PollData extends Document {
    question: string;
    options: PollOption[];
    totalVotes: number;
    createdBy:string,
    submittedBy: Types.ObjectId[];
  }
  
  // Mongoose Schema for Poll Options
  const PollOptionSchema = new Schema<PollOption>({
    name: { type: String, required: true },
    votes: { type: Number, required: true, default: 0 }
  });
  
  // Mongoose Schema for PollData
  const PollSchema = new Schema<PollData>({
    question: { type: String, required: true },
    options: { type: [PollOptionSchema], required: true },
    totalVotes: { type: Number, default: 0 },
    createdBy: { type: String ,required:true},
    submittedBy: { type: [Schema.Types.ObjectId], ref: 'User', default: [] }
  });
  
  // Mongoose Model
  export const PollModel = model<PollData>('Poll', PollSchema);