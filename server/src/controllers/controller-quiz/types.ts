import { Request } from "express";

export interface IQueryQuizAll {
    recipientId?:number, 
    authorId?: boolean, 
}

export interface IRequestQuizAll extends Request<unknown, unknown, unknown, IQueryQuizAll> {}
