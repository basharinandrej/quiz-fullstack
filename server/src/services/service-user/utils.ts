import jwt from 'jsonwebtoken'
import {IPayloadToken} from './types'
const secretString = process.env.SECRET_KEY || ''

export function createToken(payloadToken: IPayloadToken, expiresIn: string) {
    return jwt.sign(
        payloadToken, 
        secretString, 
        { expiresIn}
    )
}