import {Request} from 'express'
import {EmptyType} from '#common/types/types'

interface IBodyResult {
    totalRightAnswers: number
    totalQuestions: number
    rating: number
    quizId: number
    userId: number
}
export interface IRequestResultCreate extends Request<EmptyType, EmptyType, IBodyResult> {}


interface IQueryResult {
    userId: number
    quizId: number
}
export interface IRequestResultGetOne extends Request<EmptyType, EmptyType, EmptyType, IQueryResult> {}


interface IQueryDeleteResult {
    id: number
}
export interface IRequestResultDelete extends Request<EmptyType, EmptyType, EmptyType, IQueryDeleteResult> {}
