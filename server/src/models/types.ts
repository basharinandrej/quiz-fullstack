import {Role} from '../common/types/types'
import { Model, Optional } from 'sequelize'

export interface UserTypeRequire {
    id: number;
    name: string;
    surname: string;
    email: string;
    password: string;
    role: Role;
    accessToken: string;
    refreshToken: string
}

type UserTypeOption = Optional<UserTypeRequire, 'id'>

export type UserType = Model<UserTypeRequire, UserTypeOption>





export interface QuizTypesRequire extends Record<string, unknown> {
    id: number
    title: string
    userId: number
    recipientId: number
}

type QuizTypeOption = Optional<QuizTypesRequire, 'id'>

export type QuizType = Model<QuizTypesRequire, QuizTypeOption>





export interface QuestionTypesRequire extends Record<string, unknown> {
    id: number
    text: string
    quizId: number
}



export interface StatisticsTypeRequire {
    id: number,
    userId: number,
    totalRightAnswers: number,
    totalQuestions: number,
    totalQuizzesSolved: number,
    totalQuizzesMade: number
}

type StatisticsTypeOption = Optional<StatisticsTypeRequire, 'id'>

export type StatisticsType = Model<StatisticsTypeRequire, StatisticsTypeOption>