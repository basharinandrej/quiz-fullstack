import {Request, Response} from 'express'
import { ValidationError } from 'express-validator';


export function errorMiddleware(err: ApiError, req: Request, res: Response, next: () => void) {
    if(req.method === 'OPTIONS') {
        next()
    }

    if(err instanceof ApiError) {
        if(Array.isArray(err.errors)) {
            res.status(err.status).json(err.errors)
        } else if(typeof err.message === 'string') {
            res.status(err.status).json({message: err.message})
        }
    }
}


export class ApiError extends Error {
    status: number = 0
    message: string = ''
    errors?: ValidationError[] = []

    constructor(status: number, message: string, errors?: | ValidationError[]) {
        super()
        this.status = status,
        this.message = message
        this.errors = errors
    }
    static badRequest(error?: ValidationError[] | string) {
        if(Array.isArray(error)) {
            return new ApiError(404, '', error)
        } else if(typeof error === 'string') {
            return new ApiError(404, error)
        }
    }
    static forbidden(error?: ValidationError[] | string) {
        if(Array.isArray(error)) {
            return new ApiError(403, '', error)
        } else if(typeof error === 'string') {
            return new ApiError(403, error)
        }
    }
    static internal(error?: ValidationError[] | string) {
        if(Array.isArray(error)) {
            return new ApiError(500, '', error)
        } else if(typeof error === 'string') {
            return new ApiError(500, error)
        }
    }
}