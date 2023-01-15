import {Role} from '../common/types/types'
import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken';
import { isPayloadTokenGuard} from '#guards'
import { ApiError } from '#middlewares/api-error-middleware';


export function isAdminMiddleware(role: Role) {
    return function(req: any, res: any, next: NextFunction) {
        const token = req.headers.authorization?.split(' ')[1]

        if(!token) {
            return next(ApiError.badRequest('no token'))
        }


        jwt.verify(token, process.env.SECRET_KEY || '', async (err: jwt.VerifyErrors | null, decode: any) => {
            err?.message && next(ApiError.badRequest(err?.message))

            if(isPayloadTokenGuard(decode)) {
                if(decode.role === role) {
                    next()
                }else(
                    next(ApiError.badRequest('У пользвотеля должна быть роль ADMIN'))
                )
            }
        })
    }
}