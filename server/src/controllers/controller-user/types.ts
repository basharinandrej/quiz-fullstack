import {Request} from 'express'
import {Role} from '../../common/types/types'

interface IBodyRegistration {
    name: string
    surname: string
    email: string
    role: Role
    password: string
}

export interface IRequestRegistration extends Request<Record<string, any> | undefined, Record<string, any> | undefined, IBodyRegistration> {}


interface IBodyLogin {
    email: string
    password: string
}

export interface IRequestLogin extends Request<Record<string, any> | undefined, Record<string, any> | undefined, IBodyLogin> {}

interface IQueryGetAllUsers extends Record<string, unknown>{
    limit: number,
    offset: number
}
export interface IRequestGetAllUsers extends Pick<Request<unknown, unknown, unknown, IQueryGetAllUsers>, 'query'> {}



interface IQueryGetOneUser extends Record<string, unknown>{
    id: number,
}

export interface IRequestGetOneUser extends Pick<Request<unknown, unknown, unknown, IQueryGetOneUser>, 'query'> {}