import { DataTypes } from 'sequelize'
import {instanceSequelize} from '../db/index'
import { UserType } from './types'
import {Role} from '../common/types/types'

const Quiz = instanceSequelize?.define('quiz', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    timer: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
})

const Question = instanceSequelize?.define('question', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

const Answer = instanceSequelize?.define('answer', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isRightAnswer: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})

const Hint = instanceSequelize?.define('hint', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

const Result = instanceSequelize?.define('result', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    totalRightAnswers: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    totalQuestions: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

const User = instanceSequelize?.define<UserType>('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM(Role.USER, Role.ADMIN),
        allowNull: false,
        defaultValue: Role.USER
    },
    accessToken: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

const Statistics = instanceSequelize?.define('statistics', {
    totalQuizzesSolved: {
        type: DataTypes.INTEGER
    },
    totalQuizzesMade: {
        type: DataTypes.INTEGER
    },
    totalRightAnswers: {
        type: DataTypes.INTEGER
    },
    totalQuestions: {
        type: DataTypes.INTEGER
    },
})



if(Question && Quiz && Answer && Hint && Result && User && Statistics) {
    Quiz.hasMany(Question)
    Question.belongsTo(Quiz)

    Question.hasMany(Answer)
    Answer.belongsTo(Question)

    Question.hasOne(Hint)
    Hint.belongsTo(Question)

    Quiz.hasMany(Result)
    Result.belongsTo(Quiz)

    User.hasMany(Result)
    Result.belongsTo(Quiz)

    User.hasMany(Quiz)
    Quiz.belongsTo(User, {
        foreignKey: 'recipientId'
    })

    User.hasOne(Statistics)
    Statistics?.belongsTo(User)
}

export {Question, Quiz, User, Answer}