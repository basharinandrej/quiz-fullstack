import {Response, NextFunction} from 'express'
import {Statistics, Quiz} from '#models/index'
import { StatisticsModel, QuizModel } from '#models/types'
import { ApiError } from '#middlewares/api-error-middleware';
import { 
    IRequestStatisticAll, 
    IRequestStatisticCreate,
    IRequestStatisticsDelete
 } from '#controllers/controller-statistics/types'


class ServiceStatistics {
    async create(userId: number, res: Response, next: NextFunction) {
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
        return statistics
    }

    async update(req: IRequestStatisticCreate, res: Response, next: NextFunction) {
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

        const quizzes = await Quiz?.findAndCountAll<QuizModel>({
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

    async getAll(req: IRequestStatisticAll, res: Response, next:NextFunction) {
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

    async delete(req: IRequestStatisticsDelete, res: Response, next: NextFunction) {
        const {id} = req.query

        try {
            const result = await Statistics?.destroy({
                where: {id}
            })

            result 
                ? res.sendStatus(200).send(result)
                : res.sendStatus(500).send(result)
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }
}

export const serviceStatistics = new ServiceStatistics()