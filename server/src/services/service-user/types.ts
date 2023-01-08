import {Role} from '../../common/types/types'
import {UserTypeRequire} from '#models/types'

export interface IPayloadToken {
    name: string
    surname: string
    email: string
    role: Role
}

export interface IUserForClient extends Omit<UserTypeRequire, 
    'password' | 'accessToken' | 'refreshToken'> {}