import {Role} from '../common/types/types'
import { Model, CreationOptional, Optional, InferAttributes, InferCreationAttributes } from 'sequelize'

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



export interface QuestionModel extends Model<InferAttributes<QuestionModel>, InferCreationAttributes<QuestionModel>> {
    id: CreationOptional<number>
    quizId: CreationOptional<number>
    text: string
}



export interface StatisticsModel extends Model<InferAttributes<StatisticsModel>, InferCreationAttributes<StatisticsModel>> {
    id: CreationOptional<number>;
    userId: CreationOptional<number>;
    totalRightAnswers: number;
    totalQuestions: number;
    totalQuizzesSolved: number;
    totalQuizzesMade: number;
}