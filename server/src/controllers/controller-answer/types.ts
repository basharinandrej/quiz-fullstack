import { Request } from "express";
import {EmptyType} from '#common/types/types'

export interface IBodyCreateAnswer {
    text: string,
    questionId: number,
    isRightAnswer: boolean
}
export interface IRequestCreateAnswer extends Request<EmptyType, EmptyType, IBodyCreateAnswer> {}



export interface IBodyUpdateAnswer {
    id: number,
    text?: string,
    questionId?: number,
    isRightAnswer?: boolean
}
export interface IRequestUpdateAnswer extends Request<EmptyType, EmptyType, IBodyUpdateAnswer> {}



export interface IQueryGetAnswers {
    limit?: number,
    offset?: number,
    questionId?: number
}
export interface IRequestGetAnswers extends Request<EmptyType, EmptyType, EmptyType, IQueryGetAnswers> {}