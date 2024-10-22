import { Request, Response } from "express";
import { StatusCode } from "../../interfaces/enum";
import { PollData, StatusMessage } from "../../interfaces/interface";
import { errorWrapper } from "../../utils/errorWrapper";
import { errorResponse, successResponse } from "../../utils/response";
import { PollUseCase } from "../use-cases/pollUseCases";


const pollUsecase = new PollUseCase();

export class PollController {

    public addPoll = errorWrapper(async (req: Request, res: Response) => {

        const addPollResponse = await pollUsecase.addPoll(req.body);

        // If the poll couldn't be saved, return an error response
        if (addPollResponse.status !== StatusCode.Created) {
            return await errorResponse(addPollResponse.status, addPollResponse, res);
        }

        // Return success response if poll is saved
        await successResponse(addPollResponse.status, addPollResponse, res);
    });

    public fetchPoll = errorWrapper(async (req: Request, res: Response) => {

        const  fetchPollResponse = await pollUsecase.fetchPolls();

        // If the poll couldn't be saved, return an error response
        if (fetchPollResponse.status !== StatusCode.Created) {
            return await errorResponse(fetchPollResponse.status, fetchPollResponse, res);
        }

        // Return success response if poll is saved
        await successResponse(fetchPollResponse.status, fetchPollResponse, res);
    });
}