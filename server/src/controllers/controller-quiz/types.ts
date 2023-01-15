import { Request } from "express";

export interface IQueryQuizAll {
    recipientId?:number, 
    authorId?: number, 
}

export interface IRequestQuizAll extends Request<Record<string, any> | undefined, Record<string, any> | undefined, Record<string, any> | undefined, IQueryQuizAll> {}
