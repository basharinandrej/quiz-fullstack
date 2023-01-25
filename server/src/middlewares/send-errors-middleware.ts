import { validationResult } from "express-validator";
import { ApiError } from '#middlewares/api-error-middleware'
import {NextFunction, Router} from 'express'

export const sendErrorsMiddleware = (req: any, res: any, next: NextFunction) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return next(ApiError.badRequest(errors.array()))
    } else {
        next()
    }
}