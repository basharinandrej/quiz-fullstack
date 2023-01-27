import {Token} from '#models/index'
import {TokenModel} from '#models/types'
import {IPayloadToken} from '#services/service-user/types'
import jwt from 'jsonwebtoken'
import { NextFunction } from 'express';
import { ApiError } from '#middlewares/api-error-middleware'


export class ServiceToken {
    private secretString = process.env.SECRET_KEY || ''

    private createToken(payloadToken: IPayloadToken, expiresIn: string) {
        return jwt.sign(
            payloadToken, 
            this.secretString, 
            { expiresIn}
        )
    }

    public generateTokens(payloadToken: IPayloadToken) {
        const accessToken = this.createToken(payloadToken, '30m')
        const refreshToken = this.createToken(payloadToken, '30d')
    
        return {accessToken, refreshToken}
    }

    public validationToken(token: string, next: NextFunction) {

        try {
            return jwt.verify(token, process.env.SECRET_KEY || '')
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.unauthorized(error?.message))
            }
        }

    }
    
    public async saveToken(token: string, id: number) {
        return await Token?.create<TokenModel>({
            refreshToken: token, userId: id
        })
    }

    public async dropToken(refreshToken: string) {
        return await Token?.destroy(
            {where: {refreshToken}
        })
    }
}

export const serviceToken = new ServiceToken()