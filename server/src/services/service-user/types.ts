import {Role} from '../../common/types/types'

export interface IPayloadToken {
    name: string
    surname: string
    email: string
    role: Role
}

export interface IBodyRegistration {
    name: string
    surname: string
    email: string
    role: Role
    password: string
}