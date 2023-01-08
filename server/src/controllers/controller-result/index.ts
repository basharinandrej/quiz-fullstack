import {Request, Response} from 'express'
import { serviceResult } from '#services/service-result'

class ControllerResult {
    async create(req: Request, res: Response) {
        serviceResult.create(req, res)
    }

    async getOne(req: Request, res: Response) {
        serviceResult.getOne(req, res)
    }
}

export const controllerResult = new ControllerResult()