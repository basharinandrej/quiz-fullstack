import { Request } from "express";

export interface IQueryQuizAllByUserId {
    recipientId?:number, 
    authorId?: number,
    limit?: number,
    offset?: number
}

export interface IRequestQuizAllByUserId extends Request<Record<string, any> | undefined, Record<string, any> | undefined, Record<string, any> | undefined, IQueryQuizAllByUserId> {}

export interface IQueryQuizzesAll {
    limit?: number,
    offset?: number
}

export interface IRequestQuizzesAll extends Request<Record<string, any> | undefined, Record<string, any> | undefined, Record<string, any> | undefined, IQueryQuizzesAll> {}
