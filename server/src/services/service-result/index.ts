import {Response, NextFunction} from 'express'
import { Result } from '#models/index'
import { IRequestResultCreate, IRequestResultGetOne } from '#controllers/controller-result/types'
import { serviceStatistics } from '#services/service-statistics'
import { ApiError } from '#middlewares/api-error-middleware'
import { ResultModel } from '#models/types'

class ServiceResult {
    async create(req: IRequestResultCreate, res: Response, next: NextFunction) {
        const {
            totalRightAnswers,
            totalQuestions,
            rating,
            quizId,
            userId
        } = req.body

        try {
            const result = await Result?.create<ResultModel>({
                totalRightAnswers,
                totalQuestions,
                rating,
                quizId,
                userId
            })

            const updatedStatistics = serviceStatistics.update(req, res, next);

            updatedStatistics.then((statistic) => {
                res.send({result, statistic})
            })


        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }

    async getOne(req: IRequestResultGetOne, res: Response, next: NextFunction) {
        const {userId, quizId} = req.query
        //@todo token

        try {
            if(userId) {
                const result = await Result?.findAndCountAll({
                    where: {userId}
                })
                res.send(result)
            } else if(quizId) {
                const result = await Result?.findOne<ResultModel>({
                    where: {quizId}
                })
                res.send(result)
            } else {
                const result = await Result?.findAndCountAll({
                    where: {quizId, userId}
                })
                res.send(result)
            }
        } catch (error) {
            if(error instanceof Error) {
                next(ApiError.internal(error.message))
            }
        }
    }
}

export const serviceResult = new ServiceResult()