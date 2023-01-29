import { Request } from "express";
import {AnswerModel, QuestionModel} from '#models/types'
import * as core from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import {EmptyType} from '#common/types/types'

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
    EmptyType,
    IReqCreateQuiz,
    ParsedQs
> {}

export interface IRequestQuizDelete extends Request<
    core.ParamsDictionary, 
    EmptyType,
    EmptyType,
    {id: string}
> {}



