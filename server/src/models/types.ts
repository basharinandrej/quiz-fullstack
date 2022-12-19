import {Role} from '../common/types/types'
import { Model, Optional } from 'sequelize'

export type UserTypeRequire = {
    id: number;
    name: string;
    surname: string;
    email: string;
    password: string;
    role: Role;
    accessToken: string;
    refreshToken: string
}

type UserTypeOption = Optional<UserTypeRequire, 'id'>

export type UserType = Model<UserTypeRequire, UserTypeOption>

export function isUserGuard(user: any): user is UserTypeRequire {
    if(
        user.id && user.name 
        && user.surname && user.email 
        && user.password && user.role 
        && user.accessToken && user.refreshToken
    ) {
        return true
    }
    return false
}