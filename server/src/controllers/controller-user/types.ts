import {Request} from 'express'

export interface IQueryGetAllUsers extends Record<string, unknown>{
    limit: number,
    offset: number
}
export interface IRequestGetAllUsers extends Pick<Request<unknown, unknown, unknown, IQueryGetAllUsers>, 'query'> {}