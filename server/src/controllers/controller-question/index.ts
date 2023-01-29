import { ApiError } from "#middlewares/api-error-middleware";
import { Response, NextFunction } from "express";
import {IRequestCreateQuestion} from './types'
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

}

export default new ControllerQuestion()