import {Response} from 'express'
import dotenv from 'dotenv';
import { serviceUser } from '#services/service-user'
import { IRequestGetAllUsers, IRequestGetOneUser, IRequestLogin, IRequestRegistration } from './types'
import { ApiError } from '#middlewaresapi-error-middleware';

dotenv.config();

class ControllerUser {
    async registration(req: IRequestRegistration, res: Response, next: () => void) {
        try {
            serviceUser.registration(req, res, next)
        } catch (error) {
            console.log('error', error)
        }
    }

    async login(req: IRequestLogin, res: Response, next: (err: ApiError) => void) {
        try {
            serviceUser.login(req, res, next)
        } catch (error) {
            console.log('error', error)
        }
    }

    async getOne(req: IRequestGetOneUser, res: Response, next: (err: ApiError) => void) {
        try {
            serviceUser.getOne(req, res, next)
        } catch (error) {
            console.log('error', error)
        }
    }

    async getAll(req: IRequestGetAllUsers, res: Response) {
        try {
            serviceUser.getAll(req, res)
        } catch (error) {
            console.log('error', error)
        }
    }
}

export const controllerUser = new ControllerUser()