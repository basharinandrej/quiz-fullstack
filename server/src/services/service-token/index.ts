import {Token} from '#models/index'
import {TokenModel} from '#models/types'
import {IPayloadToken} from '#services/service-user/types'
import jwt from 'jsonwebtoken'


export class ServiceToken {
    private secretString = process.env.SECRET_KEY || ''

    private createToken(payloadToken: IPayloadToken, expiresIn: string) {
        return jwt.sign(
            payloadToken, 
            this.secretString, 
            { expiresIn}
        )
    }
    
    public saveToken(token: string, id: number) {
        Token?.create<TokenModel>({
            refreshToken: token, userId: id
        })
    }

    public generateTokens(payloadToken: IPayloadToken) {
        const accessToken = this.createToken(payloadToken, '30m')
        const refreshToken = this.createToken(payloadToken, '30d')
    
        return {accessToken, refreshToken}
    }
}

export const serviceToken = new ServiceToken()