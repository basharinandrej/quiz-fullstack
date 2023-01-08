import { Request } from "express"

interface IQueryStatistic {
    limit: number, 
    offset: number
}

export interface IRequestStatisticAll extends Request<unknown, unknown, unknown, IQueryStatistic> {}