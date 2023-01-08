import { Response } from "express"
import { ApiError } from '#middlewares/api-error-middleware';
import { IRequestStatisticAll } from './types'
import { serviceStatistics } from '#services/service-statistics'

class ControllerStatistic {
    async getAll(req: IRequestStatisticAll, res: Response, next: (err: ApiError) => void) {
        serviceStatistics.getAll(req, res, next)
    }
}

export const controllerStatistic = new ControllerStatistic()