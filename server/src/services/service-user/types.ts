import {Role} from '../../common/types/types'
import {UserTypeRequire} from '#models/types'

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

export interface IUserForClient extends Omit<UserTypeRequire, 
    'password' | 'accessToken' | 'refreshToken'> {}