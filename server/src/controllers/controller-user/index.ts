import {Response, NextFunction} from 'express'
import dotenv from 'dotenv';
import { serviceUser } from '#services/service-user'
import {
    IRequestGetAllUsers,
    IRequestGetOneUser,
    IRequestLogin,
    IRequestRegistration,
    IRequestDeleteUser,
    IRequestUpdateUser,
    IRequestLogoutUser
} from './types'
import { ApiError } from '#middlewares/api-error-middleware';

dotenv.config();

class ControllerUser {
    async registration(req: IRequestRegistration, res: Response, next: NextFunction) {
        try {
            serviceUser.registration(req, res, next)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }

    async login(req: IRequestLogin, res: Response, next: NextFunction) {
        try {
            serviceUser.login(req, res, next)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }

    async getOne(req: IRequestGetOneUser, res: Response, next: NextFunction) {
        try {
            serviceUser.getOne(req, res, next)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }

    async getAll(req: IRequestGetAllUsers, res: Response, next: NextFunction) {
        try {
            serviceUser.getAll(req, res)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }

    async delete(req: IRequestDeleteUser, res: Response, next: NextFunction) {
        try {
            serviceUser.delete(req, res)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }

    async update(req: IRequestUpdateUser, res: Response, next: NextFunction) {
        try {
            serviceUser.update(req, res)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }

    async logout(req: IRequestLogoutUser, res: Response, next: NextFunction) {
        try {
            serviceUser.logout(req, res, next)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }
}

export const controllerUser = new ControllerUser()