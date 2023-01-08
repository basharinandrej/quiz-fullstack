import {Request, Response} from 'express'
import { serviceResult } from '#services/service-result'
import { IRequestResultGetOne, IRequestResultCreate } from './types'

class ControllerResult {
    async create(req: IRequestResultCreate, res: Response) {
        serviceResult.create(req, res)
    }

    async getOne(req: IRequestResultGetOne, res: Response) {
        serviceResult.getOne(req, res)
    }
}

export const controllerResult = new ControllerResult()