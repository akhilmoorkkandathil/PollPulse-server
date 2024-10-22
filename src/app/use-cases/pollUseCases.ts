import { StatusCode } from "../../interfaces/enum";
import { PollData } from "../../interfaces/interface";
import { NullReturnErrorWrapper } from "../../utils/errorWrapper";
import { PollRepository } from "../repository/pollRepository";



const pollRepo = new PollRepository();

export class PollUseCase {

  public addPoll = async (pollData: PollData) => {
    try {
      // Save poll to the database using the repository
      const savedPoll = await pollRepo.addPollToDatabase(pollData);

      if (savedPoll) {
        // If poll is successfully saved, return a success response
        return { status: StatusCode.Created, message: "Poll created successfully", data: savedPoll };
      } else {
        // If poll couldn't be saved, return an error response
        return { status: StatusCode.InternalServerError, message: "Failed to save poll" };
      }
    } catch (error) {
      console.error('Error in PollUseCase:', error);
      return { status: StatusCode.InternalServerError, message: 'An error occurred while saving the poll' };
    }
  };
  public fetchPolls = async () => {
    try {
      // Save poll to the database using the repository
      const fetchPollData = await pollRepo.fetchPollData();

      if (fetchPollData) {
        // If poll is successfully saved, return a success response
        return { status: StatusCode.Created, message: "Poll fetched successfully", data: fetchPollData };
      } else {
        // If poll couldn't be saved, return an error response
        return { status: StatusCode.InternalServerError, message: "Failed to fetch polls" };
      }
    } catch (error) {
      console.error('Error in PollUseCase:', error);
      return { status: StatusCode.InternalServerError, message: 'An error occurred while fetching the poll' };
    }
  };

  public updatePollData = async (pollData: PollData) => {
    try {
      const updatedPoll = await pollRepo.updatePollData(pollData);
      
      if (!updatedPoll) {
        throw new Error('Poll not found or failed to update');
      }
  
      return { status: 200, message: 'Poll updated successfully', data: updatedPoll };
    } catch (error) {
      console.error('Error in updating poll data:', error);
      return { status: 500, message: 'Failed to update poll data' };
    }
  }
  

}