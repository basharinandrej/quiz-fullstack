import { ApiError } from "#middlewares/api-error-middleware";
import { Response, NextFunction } from "express";
import {IRequestCreateQuestion, IRequestGetQuestions, IRequestUpdateQuestion} from './types'
import serviceQuestion from '#services/service-question'

class ControllerQuestion {

    async create(req: IRequestCreateQuestion, res: Response, next: NextFunction) {
        try {
            serviceQuestion.create(req, res)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }

    async update(req: IRequestUpdateQuestion, res: Response, next: NextFunction) {
        try {
            serviceQuestion.update(req, res)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }

    async getAll(req: IRequestGetQuestions, res: Response, next: NextFunction) {
        try {
            serviceQuestion.getAll(req, res)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }

}

export default new ControllerQuestion()