import { Request } from "express";
import {EmptyType} from '#common/types/types'

export interface IBodyCreateAnswer {
    text: string,
    questionId: number,
    isRightAnswer: boolean
}


export interface IRequestCreateAnswer extends Request<EmptyType, EmptyType, IBodyCreateAnswer> {}
