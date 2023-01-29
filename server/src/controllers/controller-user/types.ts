import {Request} from 'express'
import * as core from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import {Role} from '#common/types/types'
import {EmptyType} from '#common/types/types'

export interface IBodyRegistration {
    name: string
    surname: string
    email: string
    role: Role
    password: string
}
export interface IRequestRegistration extends Request<EmptyType, EmptyType, IBodyRegistration> {}



interface IBodyLogin {
    email: string
    password: string
}
export interface IRequestLogin extends Request<EmptyType, EmptyType, IBodyLogin> {}



interface IQueryGetAllUsers extends Record<string, unknown>{
    limit: number,
    offset: number
}
export interface IRequestGetAllUsers extends Pick<Request<EmptyType, EmptyType, EmptyType, IQueryGetAllUsers>, 'query'> {}



interface IQueryGetOneUser extends Record<string, unknown>{
    id: number,
}
export interface IRequestGetOneUser extends Pick<Request<EmptyType, EmptyType, EmptyType, IQueryGetOneUser>, 'query'> {}



interface IQueryDeleteUser extends Record<string, unknown>{
    id: number,
}
export interface IRequestDeleteUser extends Pick<Request<EmptyType, EmptyType, EmptyType, IQueryDeleteUser>, 'query' | 'headers'> {}



export interface IRequestUpdateUser extends Request<
    core.ParamsDictionary, any, any, ParsedQs, Record<string, any>> {}



interface IQueryLogoutUser extends Record<string, unknown>{
    authorization: string,
}
export interface IRequestLogoutUser extends Pick<Request<EmptyType, EmptyType, EmptyType, IQueryLogoutUser>, 'headers'> {}