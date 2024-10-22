import { Response, Request, NextFunction } from "express";
import { StatusCode } from "../interfaces/enum";
import { errorResponse } from "./response";

const errorWrapper = (fn: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      console.log(err, "error");
       await errorResponse(StatusCode.InternalServerError,{ status:500, message: 'Internal Server Error' },res)
    }
  };
};

const NullReturnErrorWrapper = (fn: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      console.log(err, "error");
       return null
    }
  };
};

export { errorWrapper, NullReturnErrorWrapper };