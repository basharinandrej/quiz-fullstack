import {Role} from '../common/types/types'
import { Model, Optional } from 'sequelize'

export interface UserTypeRequire extends Record<string, unknown> {
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

export interface QuestionTypesRequire extends Record<string, unknown> {
    id: number
    text: string
    quizId: number
}