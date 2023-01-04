import {Request, Response} from 'express'
import { servicesResult } from '#services/service-result'

class ControllerResult {
    async create(req: Request, res: Response) {
        servicesResult.create(req, res)
    }

    async getAll(req: Request, res: Response) {
        servicesResult.getAll(req, res)
    }
}

export const controllerResult = new ControllerResult()