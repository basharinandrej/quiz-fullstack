import { Request, Response } from "express";
import { Quiz, User, Question, Answer, Hint } from '#models/index'
import { QuestionTypesRequire } from '#models/types'
import { IRequestQuizAll } from '#controllers/controller-quiz/types'
import { createAnswers } from './utils'
import { isPayloadTokenGuard, isUserGuard, isQuizGuard, isQuestionGuard, isAnswerGuard } from '../../common/guards/guards'
import { IRequestQuizCreate, IAnswer } from './types'
import jwt from 'jsonwebtoken';

class ServiceQuiz {
    async getQuizzesAll(req: IRequestQuizAll, res: Response) {
        const { recipientId, authorId } = req.query
        const token = req.headers.authorization?.split(' ')[1]
        if(!token) {
            return res.status(404).send('Heт токена доступа')
        }
        if(!recipientId && !authorId) {
            return res.status(404).send(`Одно из полей обязательно: recipient, author`)
        }
        jwt.verify(token, process.env.SECRET_KEY || '', async (err, decode: any) => {
            if(err) {
                return res.status(404).send(`${err}`)
            }
            if(!isPayloadTokenGuard(decode)) return 

            
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

    async createQuiz(req: IRequestQuizCreate, res: Response) {
        const {title, timer = null, recipientId, questions} = req.body

        const token = req.headers.authorization?.split(' ')[1]
            if(!token) {
                return res.status(404).send('Heт токена доступа')
            }

            jwt.verify(token, process.env.SECRET_KEY || '', async (err, decode: any) => {
                if(err) {
                    return res.status(404).send(`${err}`)
                }
                if(!isPayloadTokenGuard(decode)) return 

                const user = await User?.findOne({
                    where: {email: decode?.email}
                })
                if(!isUserGuard(user)) {
                    return res.status(404).send(`Нет пользователя с таким email`)
                }

                const quiz = await Quiz?.create({
                    title, 
                    timer, 
                    userId: user.id,
                    recipientId
                })

                if(!isQuizGuard(quiz)) {
                    return res.status(500).send('quiz не создался')
                }

                const createdQuestions: QuestionTypesRequire[] = []
                

                const promiseQuestions = new Promise((resolve, reject) => {

                    if(Array.isArray(questions) && questions.length >= 1) {
                        questions.forEach( async (questionsItem) => {
                            const question = await Question?.create({
                                text: questionsItem.textQuestion,
                                quizId: quiz.id
                            })

                            if(!isQuestionGuard(question)) {
                                reject('qestion не создался')
                            } else {
                                createdQuestions.push(question)
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

                        const createdAnswers: IAnswer[] = []
                        if(Array.isArray(response) && isQuestionGuard(response[0])) {
                            response.forEach( async (q, idx) => {
                                if( q.dataValues.id ) {
                                    try {
                                        await Hint?.create({
                                            text: questions[idx].textHint,
                                            questionId: q.dataValues.id
                                        })
                                    } catch (error) {
                                        console.log(error)
                                    }
                                }

                                createAnswers(res, questions[idx].answers, q.id)
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
                                //@ts-ignore
                                ...q.dataValues,
                                answers: response.slice(positionCursor, positionCursor + 4)
                            }
                            positionCursor = positionCursor + 4

                            return newResult
                        })
                        res.send(result)
                    }
                }).catch((err) => {
                    res.status(404).send(err)
                })
            })
    }
}

export const serviceQuiz = new ServiceQuiz()