import { Request } from "express";
import {EmptyType} from '#common/types/types'

export interface IQueryQuizAllByUserId {
    recipientId?:number, 
    authorId?: number,
    limit?: number,
    offset?: number
}
export interface IRequestQuizAllByUserId extends Request<EmptyType, EmptyType, EmptyType, IQueryQuizAllByUserId> {}



export interface IQueryQuizzesAll {
    limit?: number,
    offset?: number
}
export interface IRequestQuizzesAll extends Request<EmptyType, EmptyType, EmptyType, IQueryQuizzesAll> {}



export interface IBodyUpdateQuiz {
    id: number,
    title?: string,
    timer?: number,
    userId?: number,
    recipientId?: number
}
export interface IRequestUpdateQuiz extends Request<EmptyType, EmptyType, IBodyUpdateQuiz> {}
