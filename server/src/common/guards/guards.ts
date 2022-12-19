import { UserTypeRequire } from '../../models/types'
import { IPayloadToken } from '../../services/service-user/types'

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

export function isPayloadTokenGuard(payload: any): payload is IPayloadToken {
    if(
        payload.name 
        && payload.surname && payload.email 
        && payload.role 
    ) {
        return true
    }
    return false
}