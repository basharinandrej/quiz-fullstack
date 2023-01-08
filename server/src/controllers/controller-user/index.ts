import {Response} from 'express'
import dotenv from 'dotenv';
import { serviceUser } from '#services/service-user'
import { IRequestGetAllUsers, IRequestGetOneUser, IRequestLogin, IRequestRegistration } from './types'
import { ApiError } from '#middlewares/api-error-middleware';

dotenv.config();

class ControllerUser {
    async registration(req: IRequestRegistration, res: Response, next: (err: ApiError) => void) {
        try {
            serviceUser.registration(req, res, next)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }

    async login(req: IRequestLogin, res: Response, next: (err: ApiError) => void) {
        try {
            serviceUser.login(req, res, next)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }

    async getOne(req: IRequestGetOneUser, res: Response, next: (err: ApiError) => void) {
        try {
            serviceUser.getOne(req, res, next)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }

    async getAll(req: IRequestGetAllUsers, res: Response, next: (err: ApiError) => void) {
        try {
            serviceUser.getAll(req, res)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }
}

export const controllerUser = new ControllerUser()