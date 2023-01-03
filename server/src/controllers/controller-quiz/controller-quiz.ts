import { Request, Response } from "express";
import { IReqQuizAll } from './types'
import {serviceUser} from '../../services/service-quiz'

class ControllerQuiz {
    async quizAll(req: Request<IReqQuizAll>, res: Response) {
        try {
            serviceUser.getQuizzesAll(req, res)
        } catch (error) {
            res.send(error)
        }
    }
    async create(req: Request, res: Response) {        
        try {
            serviceUser.createQuiz(req, res)
        } catch (error) {
            res.send(error)
        }
    }
}

export default new ControllerQuiz()