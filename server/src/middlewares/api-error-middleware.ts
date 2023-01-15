import {Request, Response} from 'express'
import { ValidationError } from 'express-validator';


export function errorMiddleware(err: ApiError, req: Request, res: Response, next: () => void) {
    if(req.method === 'OPTIONS') {
        next()
    }

    if(err instanceof ApiError) {
        res.status(err.status).json({message: err.message})
    }
}


export class ApiError {
    status: number = 0
    message: string | ValidationError[] = ''

    constructor(status: number, message: string | ValidationError[]) {
        this.status = status,
        this.message = message
    }
    static badRequest(message: string | ValidationError[]) {
        return new ApiError(404, message)
    }
    static forbidden(message: string) {
        return new ApiError(403, message)
    }
    static internal(message: string) {
        return new ApiError(500, message)
    }
}