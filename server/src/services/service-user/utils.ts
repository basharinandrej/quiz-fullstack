import jwt from 'jsonwebtoken'
import {IPayloadToken} from './types'
import {TokenModel} from '#models/types'
import {Token} from '#models/index'

const secretString = process.env.SECRET_KEY || ''

function createToken(payloadToken: IPayloadToken, expiresIn: string) {
    return jwt.sign(
        payloadToken, 
        secretString, 
        { expiresIn}
    )
}

export function generateTokens(payloadToken: IPayloadToken) {
    const accessToken = createToken(payloadToken, '30m')
    const refreshToken = createToken(payloadToken, '30d')

    return {accessToken, refreshToken}
}

export async function saveToken(token: string, id: number) {
    return Token?.create<TokenModel>({
        refreshToken: token, userId: id
    })
}