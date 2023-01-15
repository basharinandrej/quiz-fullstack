import { Request, Response, NextFunction} from "express";
import {serviceQuiz} from '#services/service-quiz'
import { IRequestQuizAll } from './types'
import { IRequestQuizCreate } from '#services/service-quiz/types'
import { ApiError } from "#middlewares/api-error-middleware";

class ControllerQuiz {
    async quizAll(req: IRequestQuizAll, res: Response, next: NextFunction) {
        try {
            serviceQuiz.getQuizzesAll(req, res, next)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }
    async create(req: IRequestQuizCreate, res: Response, next: NextFunction) {
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