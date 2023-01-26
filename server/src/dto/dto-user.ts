import {UserModel} from '#models/types'
import { IPayloadToken } from '#services/service-user/types'
import { Role } from '../common/types/types'

export class UserDto implements IPayloadToken {
    public id: number;
    public name: string;
    public surname: string;
    public email: string;
    public role: Role;

    constructor(user:UserModel) {
        this.id = user.id
        this.name = user.name
        this.surname = user.surname
        this.email = user.email
        this.role = user.role
    }   
}