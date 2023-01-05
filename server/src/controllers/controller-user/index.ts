import {Request, Response} from 'express'
import dotenv from 'dotenv';
import { serviceUser } from '#services/service-user'

dotenv.config();

class ControllerUser {
    async registration(req: Request, res: Response) {
        try {
            serviceUser.registration(req, res, req.body)
        } catch (error) {
            console.log('error', error)
        }
    }

    async login(req: Request, res: Response) {
        const {email, password} = req.body
        try {
            serviceUser.login(req, res, email, password)
        } catch (error) {
            console.log('error', error)
        }
    }

    async getOne(req: Request<{id: number}>, res: Response) {
        try {
            serviceUser.getOne(req, res)
        } catch (error) {
            console.log('error', error)
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            serviceUser.getAll(req, res)
        } catch (error) {
            console.log('error', error)
        }
    }
}

export const controllerUser = new ControllerUser()