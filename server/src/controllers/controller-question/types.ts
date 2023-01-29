import { Request } from "express";
import {EmptyType} from '#common/types/types'

export interface IBodyCreateQuestion {
    text: string,
    quizId: number,
}
export interface IRequestCreateQuestion extends Request<EmptyType, EmptyType, IBodyCreateQuestion> {}


