import {Request} from 'express'

interface IQueryGetAllUsers extends Record<string, unknown>{
    limit: number,
    offset: number
}
export interface IRequestGetAllUsers extends Pick<Request<unknown, unknown, unknown, IQueryGetAllUsers>, 'query'> {}



interface IQueryGetOneUser extends Record<string, unknown>{
    id: number,
}

export interface IRequestGetOneUser extends Pick<Request<unknown, unknown, unknown, IQueryGetOneUser>, 'query'> {}