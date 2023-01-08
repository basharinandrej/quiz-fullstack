import {Response} from 'express'
import dotenv from 'dotenv';
import { serviceUser } from '#services/service-user'
import { IRequestGetAllUsers, IRequestGetOneUser, IRequestLogin, IRequestRegistration } from './types'

dotenv.config();

class ControllerUser {
    async registration(req: IRequestRegistration, res: Response) {
        try {
            serviceUser.registration(req, res)
        } catch (error) {
            console.log('error', error)
        }
    }

    async login(req: IRequestLogin, res: Response) {
        try {
            serviceUser.login(req, res)
        } catch (error) {
            console.log('error', error)
        }
    }

    async getOne(req: IRequestGetOneUser, res: Response) {
        try {
            serviceUser.getOne(req, res)
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