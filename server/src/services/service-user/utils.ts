import jwt from 'jsonwebtoken'
import {IPayloadToken} from './types'
const secretString = process.env.SECRET_KEY || ''

function createToken(payloadToken: IPayloadToken, expiresIn: string) {
    return jwt.sign(
        payloadToken, 
        secretString, 
        { expiresIn}
    )
}


export function getTokens(payloadToken: IPayloadToken) {
    const accessToken = createToken(payloadToken, '30m')
    const refreshToken = createToken(payloadToken, '30d')

    return {accessToken, refreshToken}
}