import { Request, Response } from "express";
import {serviceQuiz} from '#services/service-quiz'
import { IRequestQuizAll } from './types'

class ControllerQuiz {
    async quizAll(req: IRequestQuizAll, res: Response) {
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