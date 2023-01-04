import {Request, Response} from 'express'
import { servicesResult } from '#services/service-result'

class ControllerResult {
    async create(req: Request, res: Response) {
        servicesResult.create(req, res)
    }

    async getOne(req: Request, res: Response) {
        servicesResult.getOne(req, res)
    }
}

export const controllerResult = new ControllerResult()