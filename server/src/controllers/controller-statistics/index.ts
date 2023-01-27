import { Response, NextFunction } from "express"
import { IRequestStatisticAll, IRequestStatisticCreate } from './types'
import { serviceStatistics } from '#services/service-statistics'

class ControllerStatistic {
    async getAll(req: IRequestStatisticAll, res: Response, next: NextFunction) {
        serviceStatistics.getAll(req, res, next)
    }
    async create(req: IRequestStatisticCreate, res: Response, next: NextFunction) {
        const {userId} = req.body
        serviceStatistics.create(userId, res, next)
    }
}

export const controllerStatistic = new ControllerStatistic()