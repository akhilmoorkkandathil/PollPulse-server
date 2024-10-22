import { Types } from "mongoose";
import { PollModel } from "../../entities/poll";
import { PollData } from "../../interfaces/interface";


export class PollRepository {
    public async addPollToDatabase(pollData: PollData): Promise<PollData | null> {
      try {
        console.log("pollData in poll Repository", pollData);
  
        const newPoll = new PollModel(pollData);  // Create a new PollModel object
        const savedPoll = await newPoll.save();   // Save poll to the database
        return savedPoll;                         // Return saved poll data
      } catch (error) {
        console.error('Error saving poll to database:', error);
        return null;                              // Return null if saving fails
      }
    }

    public async fetchPollData(): Promise<PollData[] | null> {
        try {
            const pollData = await PollModel.find()
            return pollData;
        } catch (error) {
          console.error('Error saving poll to database:', error);
          return null;                              // Return null if saving fails
        }
      }

      public async updatePollData(pollData: PollData) {
        try {
          const { _id, options } = pollData;
      
          // Loop through the options to find the one that needs to be updated
          const pollOption = options.find(option => option.votes); // Assuming only one option will have the incremented votes
      
          if (!pollOption) {
            return
            //throw new Error('No poll option to update');
          }
      
          // Update the specific option's vote count and totalVotes
          const updatedPoll = await PollModel.findOneAndUpdate(
            { _id }, // Find the poll by ID
            {
              $inc: { 'options.$[opt].votes': 1, totalVotes: 1 }, // Increment the option votes and totalVotes
            },
            {
              new: true, // Return the updated document
              arrayFilters: [{ 'opt.name': pollOption.name }] // Filter the option to update by name
            }
          );
      
          if (!updatedPoll) {
            return
            // throw new Error('Poll not found');
          }
      
          return pollData;
        } catch (error) {
          console.error('Error updating poll data in repo:', error);
          throw error; // Rethrow to be caught in use case layer
        }
      }
  }
