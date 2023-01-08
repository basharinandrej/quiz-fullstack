import {Response} from 'express'
import { serviceResult } from '#services/service-result'
import { IRequestResultGetOne, IRequestResultCreate } from './types'
import { ApiError } from '#middlewaresapi-error-middleware'

class ControllerResult {
    async create(req: IRequestResultCreate, res: Response, next: (err: ApiError) => void) {
        serviceResult.create(req, res, next)
    }

    async getOne(req: IRequestResultGetOne, res: Response, next: (err: ApiError) => void) {
        serviceResult.getOne(req, res, next)
    }
}

export const controllerResult = new ControllerResult()