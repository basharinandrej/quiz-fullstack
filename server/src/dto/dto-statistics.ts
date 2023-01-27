import { StatisticsModel } from '#models/types'

export class StatisticsDto {
    public id: number;
    public totalQuizzesSolved: number;
    public totalQuizzesMade: number;
    public totalRightAnswers: number;
    public totalQuestions: number;
    public userId: number;

    constructor(statistics: StatisticsModel) {
        this.id = statistics.dataValues.id
        this.totalQuizzesSolved = statistics.dataValues.totalQuizzesSolved
        this.totalRightAnswers = statistics.dataValues.totalRightAnswers
        this.totalQuizzesMade = statistics.dataValues.totalQuizzesMade
        this.userId = statistics.dataValues.userId
        this.totalQuestions = statistics.dataValues.totalQuestions
    }
}