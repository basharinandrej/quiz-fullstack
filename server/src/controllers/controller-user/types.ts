import {Role} from '../../common/types/types'

export interface IPayloadToken {
    name: string
    surname: string
    email: string
    role: Role
    password: string
}