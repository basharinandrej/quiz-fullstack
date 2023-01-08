import {Response} from 'express'
import {Statistics, Quiz} from '#models/index'
import { StatisticsType, QuizType } from '#models/types'
import { ApiError } from '#middlewares/api-error-middleware';
import {IRequestResultCreate} from '#controllers/controller-result/types'

interface IRequest extends IRequestResultCreate {}

class ServiceStatistics {
    async create(req: IRequest, res: Response, next: (err: ApiError) => void) {
        const {
            userId
        } = req.body

        const candadateStatistic = await Statistics?.findOne<StatisticsType>({
            where: {
                userId
            }
        })

        if(candadateStatistic) {
            return
        }
        const statistics = await Statistics?.create({
            totalQuizzesSolved: 0,
            totalQuizzesMade: 0,
            totalRightanswers: 0,
            totalQuestions: 0,
            userId
        })
        res.send(statistics)
    }

    async update(req: IRequest, res: Response, next: (err: ApiError) => void) {
        const {
            userId,
            totalRightAnswers,
            totalQuestions,
        } = req.body

        const prevStatistics = await Statistics?.findOne<StatisticsType>({
            where: {
                userId
            }
        })
        if(!prevStatistics?.dataValues.id) {
            return next(ApiError.internal(`предыдущей статистики у пользователя с id ${userId} нет`))
        }

        const quizzes = await Quiz?.findAndCountAll<QuizType>({
            where: {
                userId
            }
        })
        const updatedStatistics = await Statistics?.update({
            totalRightAnswers: prevStatistics?.dataValues.totalRightAnswers + totalRightAnswers,
            totalQuestions: prevStatistics?.dataValues.totalQuestions + totalQuestions,
            totalQuizzesSolved: prevStatistics?.dataValues.totalQuizzesSolved + 1,
            totalQuizzesMade: quizzes?.count
        }, {
            where: {
                userId
            }
        })

        return updatedStatistics
    }
}

export const serviceStatistics = new ServiceStatistics()