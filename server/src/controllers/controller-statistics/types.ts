import { Request } from "express"
import {IRequestResultCreate} from '#controllers/controller-result/types'
import {EmptyType} from '#common/types/types'

interface IQueryStatistic {
    limit: number, 
    offset: number
}

export interface IRequestStatisticAll extends Request<EmptyType, EmptyType, EmptyType, IQueryStatistic> {}


export interface IRequestStatisticCreate extends IRequestResultCreate {}

interface IQueryStatisticDelete {
    id: number
}
export interface IRequestStatisticsDelete extends Request<EmptyType, EmptyType, EmptyType,IQueryStatisticDelete > {}