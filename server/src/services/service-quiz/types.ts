import { Request } from "express";
import {AnswerModel, QuestionModel} from '#models/types'
import * as core from 'express-serve-static-core';
import { ParsedQs } from 'qs';
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

export interface IRequestQuizCreate extends Request<
    core.ParamsDictionary, 
    Record<string, any> | undefined,
    IReqCreateQuiz,
    ParsedQs
> {}

export interface IRequestQuizDelete extends Request<
    core.ParamsDictionary, 
    Record<string, any> | undefined,
    Record<string, any> | undefined,
    {id: string}
> {}



