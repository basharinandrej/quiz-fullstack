import {Request} from 'express'

interface IBodyResult {
    totalRightAnswers: number
    totalQuestions: number
    rating: number
    quizId: number
    userId: number
}

export interface IRequestResultCreate extends Request<unknown, unknown, IBodyResult> {}


interface IQueryResult {
    userId: number
    quizId: number
}

export interface IRequestResultGetOne extends Request<unknown, unknown, unknown, IQueryResult> {}
