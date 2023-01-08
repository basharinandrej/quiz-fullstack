import { Request } from "express"
import {IRequestResultCreate} from '#controllers/controller-result/types'

interface IQueryStatistic {
    limit: number, 
    offset: number
}

export interface IRequestStatisticAll extends Request<unknown, unknown, unknown, IQueryStatistic> {}


export interface IRequestStatisticCreate extends IRequestResultCreate {}
