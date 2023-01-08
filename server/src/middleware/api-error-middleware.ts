import {Request, Response} from 'express'


export function errorMiddleware(err: ApiError, req: Request, res: Response, next: () => void) {
    if(req.method === 'OPTIONS') {
        next()
    }

    if(err instanceof ApiError) {
        res.status(err.status).send(err.message)
    }
}


export class ApiError extends Error {
    status: number = 0
    message: string = ''

    constructor(status: number, message: string) {
        super()
        this.status = status,
        this.message = message
    }
    static badRequest(message: string): ApiError {
        return new ApiError(404, message)
    }
}