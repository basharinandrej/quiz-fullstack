import { Request, Response } from "express";
import {serviceQuiz} from '#services/service-quiz'
import { IReqQuizAll } from './types'

class ControllerQuiz {
    async quizAll(req: Request<IReqQuizAll>, res: Response) {
        try {
            serviceQuiz.getQuizzesAll(req, res)
        } catch (error) {
            res.send(error)
        }
    }
    async create(req: Request, res: Response) {      
        try {
            serviceQuiz.createQuiz(req, res)
        } catch (error) {
            res.send(error)
        }
    }
}

export default new ControllerQuiz()