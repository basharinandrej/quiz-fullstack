import { Response, NextFunction} from "express";
import {serviceQuiz} from '#services/service-quiz'
import { IRequestQuizAll } from './types'
import { IRequestQuizCreate, IRequestQuizDelete } from '#services/service-quiz/types'
import { ApiError } from "#middlewares/api-error-middleware";

class ControllerQuiz {
    async quizzesAllByUserId(req: IRequestQuizAll, res: Response, next: NextFunction) {
        try {
            serviceQuiz.getQuizzesAllByUserId(req, res, next)
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
    async delete(req: IRequestQuizDelete, res: Response, next: NextFunction) {
        try {
            serviceQuiz.deleteQuiz(req, res, next)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }
}

export default new ControllerQuiz()