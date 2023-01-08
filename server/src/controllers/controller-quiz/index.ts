import { Request, Response } from "express";
import {serviceQuiz} from '#services/service-quiz'
import { IRequestQuizAll } from './types'
import { ApiError } from "#middlewares/api-error-middleware";

class ControllerQuiz {
    async quizAll(req: IRequestQuizAll, res: Response, next: (err: ApiError) => void) {
        try {
            serviceQuiz.getQuizzesAll(req, res, next)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }
    async create(req: Request, res: Response, next: (err: ApiError) => void) {      
        try {
            serviceQuiz.createQuiz(req, res, next)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }
}

export default new ControllerQuiz()