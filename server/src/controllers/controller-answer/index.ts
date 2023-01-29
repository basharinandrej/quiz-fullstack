import { ApiError } from "#middlewares/api-error-middleware";
import serviceAnswer from '#services/service-answer'
import { NextFunction, Response } from "express";
import {IRequestCreateAnswer, IRequestUpdateAnswer, IRequestGetAnswers} from './types'

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

    async update(req: IRequestUpdateAnswer, res: Response, next: NextFunction) {
        try {
            serviceAnswer.update(req, res)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }

    async getAll(req: IRequestGetAnswers, res: Response, next: NextFunction) {
        try {
            serviceAnswer.get(req, res)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }
}


export default new ControllerAnswer()