import { Response, NextFunction } from "express";
import { Quiz, User, Question, Answer, Hint } from '#models/index'
import { QuestionModel, QuizModel, AnswerModel } from '#models/types'
import { IRequestQuizAll } from '#controllers/controller-quiz/types'
import { createAnswers } from './utils'
import { isPayloadTokenGuard, isUserGuard, isQuizGuard, isQuestionGuard, isAnswerGuard } from '#guards'
import { IRequestQuizCreate, IRequestQuizDelete } from './types'
import jwt from 'jsonwebtoken';
import { validationResult } from "express-validator";
import { ApiError } from "#middlewares/api-error-middleware";

class ServiceQuiz {
    async getQuizzesAll(req: IRequestQuizAll, res: Response, next: NextFunction) {
        const { recipientId, authorId } = req.query
        const token = req.headers.authorization?.split(' ')[1]

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return next(ApiError.badRequest(errors.array()))
        }

        token && jwt.verify(token, process.env.SECRET_KEY || '', async (err, decode: any) => {
            if(err instanceof Error) {
                return next(ApiError.internal(err?.message))
            }
            if(!isPayloadTokenGuard(decode)) {
                return next(ApiError.badRequest(`Не корректный payload у токена ${JSON.stringify(decode)}`))
            } 
            
            if(recipientId) {
                const quizzes = await Quiz?.findAndCountAll({
                    where: {recipientId},
                    include: [
                        {model: Question, 
                            include: [
                                {model: Answer},
                                {model: Hint}
                            ]
                        },
                    ]
                })
                res.send(quizzes)
            } else if(authorId) {
                const quizzes = await Quiz?.findAndCountAll({
                    where: {userId: authorId},
                    include: [
                        {model: Question, 
                            include: [
                                {model: Answer}, {model: Hint}
                            ]
                        },
                    ]
                })
                res.send(quizzes)
            } 
        })
    }

    async createQuiz(req: IRequestQuizCreate, res: Response, next: NextFunction) {
        const {title, timer = null, recipientId, questions} = req.body

        const token = req.headers.authorization?.split(' ')[1]
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest(errors.array()))
            }

            token && jwt.verify(token, process.env.SECRET_KEY || '', async (err, decode: any) => {
                if(err) {
                    if(err instanceof Error) {
                        return next(ApiError.internal(err.message))
                    }
                }
                if(!isPayloadTokenGuard(decode)) {
                    return next(ApiError.badRequest(`Не корректный payload у токена ${JSON.stringify(decode)}`))
                } 

                const user = await User?.findOne({
                    where: {email: decode?.email}
                })
                const recipientCandidate = await User?.findOne({
                    where: {id: recipientId}
                })
                if(!isUserGuard(user)) {
                    return next(ApiError.badRequest('Нет пользователя с таким email'))
                }
                if(!isUserGuard(recipientCandidate)) {
                    return next(ApiError.badRequest(`Нет recipient с таким id - ${recipientId}`))
                }

                const quiz = await Quiz?.create<QuizModel>({
                    title, 
                    timer, 
                    userId: user.id,
                    recipientId
                })

                if(!isQuizGuard(quiz)) {
                    return next(ApiError.internal('quiz не создался'))
                }

                const createdQuestions: QuestionModel[] = []
                

                const promiseQuestions = new Promise((resolve, reject) => {

                    if(Array.isArray(questions) && questions.length >= 1) {
                        questions.forEach( async (questionsItem) => {
                            const question = await Question?.create<QuestionModel>({
                                text: questionsItem.text,
                                quizId: quiz.id
                            })

                            if(!isQuestionGuard(question)) {
                                reject('qestion не создался')
                            } else {
                                question && createdQuestions.push(question)
                                if(createdQuestions.length === questions.length) {
                                    resolve(createdQuestions)
                                }
                            }
                        })
                    } else {
                        reject('Не корректный массив с вопросами')
                    }
                })


                const answersPromise = new Promise((resolve, reject) => {
                    promiseQuestions.then((response) => {

                        const createdAnswers: AnswerModel[] = []
                        if(Array.isArray(response) && isQuestionGuard(response[0])) {
                            response.forEach( async (q, idx) => {
                                if( q.dataValues.id ) {
                                    try {
                                        await Hint?.create({
                                            text: questions[idx].text,
                                            questionId: q.dataValues.id
                                        })
                                    } catch (error) {
                                        console.log(error)
                                    }
                                }

                                createAnswers(res, questions[idx].answers, q.id, next)
                                    .then((r) => {
                                        if(Array.isArray(r) && isAnswerGuard(r[0])) {
                                            createdAnswers.push(...r)
                                        
                                            if(createdAnswers.length === questions.length * 4) {
                                                resolve(createdAnswers)
                                            }
                                        }
                                    })
                            })  
                        }
                    })
                    .catch((err) => {
                        reject(err)
                    })
                })

                answersPromise.then((response) => {
                    let positionCursor = 0
                    if(Array.isArray(response) && isAnswerGuard(response[0])) {

                        const result = createdQuestions.map((q) => {
                            const newResult = {
                                ...q.dataValues,
                                answers: response.slice(positionCursor, positionCursor + 4)
                            }
                            positionCursor = positionCursor + 4

                            return newResult
                        })
                        res.send(result)
                    }
                }).catch((err) => {
                    next(ApiError.badRequest(err))
                })
            })
    }

    async deleteQuiz(req: IRequestQuizDelete, res: Response, next: NextFunction) {
        const {id} = req.query
        const result = await Quiz?.destroy({
            where: {id}
        })

        result 
            ? res.status(200).json(result)
            : res.status(505).json(result)
    }
}

export const serviceQuiz = new ServiceQuiz()