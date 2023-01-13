import {Response, NextFunction} from 'express'
import { serviceResult } from '#services/service-result'
import { IRequestResultGetOne, IRequestResultCreate } from './types'

class ControllerResult {
    async create(req: IRequestResultCreate, res: Response, next: NextFunction) {
        serviceResult.create(req, res, next)
    }

    async getOne(req: IRequestResultGetOne, res: Response, next: NextFunction) {
        serviceResult.getOne(req, res, next)
    }
}

export const controllerResult = new ControllerResult()