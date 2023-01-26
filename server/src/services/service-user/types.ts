import {Role} from '../../common/types/types'
import {UserModel} from '#models/types'

export interface IPayloadToken {
    name: string
    surname: string
    email: string
    role: Role
    id: number
}
