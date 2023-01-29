import { ApiError } from "#middlewares/api-error-middleware";
import serviceAnswer from '#services/service-answer'
import { NextFunction, Response } from "express";
import {IRequestCreateAnswer} from './types'

class ControllerAnswer {
    async create(req: IRequestCreateAnswer, res: Response, next: NextFunction) {
        try {
            serviceAnswer.create(req, res)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }
}


export default new ControllerAnswer()