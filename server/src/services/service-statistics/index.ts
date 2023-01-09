import {Response} from 'express'
import {Statistics, Quiz} from '#models/index'
import { StatisticsModel, QuizType } from '#models/types'
import { ApiError } from '#middlewares/api-error-middleware';
import { IRequestStatisticAll, IRequestStatisticCreate } from '#controllers/controller-statistics/types'


class ServiceStatistics {
    async create(req: IRequestStatisticCreate, res: Response, next: (err: ApiError) => void) {
        const {
            userId
        } = req.body

        const candadateStatistic = await Statistics?.findOne<StatisticsModel>({
            where: {
                userId
            }
        })

        if(candadateStatistic) {
            next(ApiError.internal(`статистика у пользователя с id ${userId} уже есть`))
        }
        const statistics = await Statistics?.create<StatisticsModel>({
            totalQuizzesSolved: 0,
            totalQuizzesMade: 0,
            totalRightAnswers: 0,
            totalQuestions: 0,
            userId
        })
        res.send(statistics)
    }

    async update(req: IRequestStatisticCreate, res: Response, next: (err: ApiError) => void) {
        const {
            userId,
            totalRightAnswers,
            totalQuestions,
        } = req.body

        const prevStatistics = await Statistics?.findOne<StatisticsModel>({
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

    async getAll(req: IRequestStatisticAll, res: Response, next: (err: ApiError) => void) {
        const {limit = 10, offset = 0} = req.query
        try {
            const statistics = await Statistics?.findAndCountAll<StatisticsModel>({
                limit,
                offset
            })

            res.send(statistics)
        } catch (error) { 
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }
}

export const serviceStatistics = new ServiceStatistics()