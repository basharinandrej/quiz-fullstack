import { Request } from "express";
import {AnswerModel, QuestionModel} from '#models/types'

export interface IReqCreateQuiz extends IReqQuestions {
    title: string
    timer?: number
    recipientId: number
}
interface IReqQuestions {
    questions: Array<IReqQuestion>
}
interface IReqQuestion extends IAnswers, IHint, QuestionModel {}

export interface IAnswers {
    answers: Array<AnswerModel>
}


interface IHint {
    textHint?: string
    questionId: number
}

export interface IRequestQuizCreate extends Request<Record<string, any> | undefined, Record<string, any> | undefined, IReqCreateQuiz> {}
