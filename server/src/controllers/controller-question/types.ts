import { Request } from "express";
import {EmptyType} from '#common/types/types'

export interface IBodyCreateQuestion {
    text: string,
    quizId: number,
}
export interface IRequestCreateQuestion extends Request<EmptyType, EmptyType, IBodyCreateQuestion> {}



export interface IBodyUpdateQuestion {
    id: number,
    text?: string,
    quizId?: number,
}
export interface IRequestUpdateQuestion extends Request<EmptyType, EmptyType, IBodyUpdateQuestion> {}



export interface IQueryGetQuestion {
    limit?: number,
    offset?: number,
    quizId?: number
}
export interface IRequestGetQuestions extends Request<EmptyType, EmptyType, EmptyType, IQueryGetQuestion> {}