import express, {Express, Router} from 'express'
import dotenv from 'dotenv';
import {instanceSequelize} from './db/index'
import {Quiz, Question} from './models/index'

dotenv.config();
const router = Router()

const app: Express = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.post('/api/quiz', async (req, res) => {
    const { title, timer = null } = req.body

    try {
        console.log('req.body', req.body)
        if(!Quiz) return
        const quiz = await Quiz.create({
            title,
            timer
        })
        res.send(quiz)
    } catch (error) {
        console.log('error', error)
    }
})

app.get('/api/quiz', async (req, res) => {
    try {
        if(!Quiz) return
        const quizzes = await Quiz.findAndCountAll({
            include: [
                {model: Question}
            ]
        })
        res.send(quizzes)
    } catch (error) {
        console.log('error', error)
    }
})

app.post('/api/question', async (req, res) => {
    const { text, quizId } = req.body

    try {
        if(!Question) return
        const question = await Question.create({
            text,
            quizId
        })
        res.send(question)
    } catch (error) {
        console.log('error', error)
    }
})

app.get('/api/question', async (req, res) => {
    try {
        if(!Question) return
        const questions = await Question.findAndCountAll({
            include: [
                {model: Quiz}
            ]
        })
        res.send(questions)
    } catch (error) {
        console.log('error', error)
    }
})
app.listen(PORT, async () => {
    try {
        await instanceSequelize?.sync()
        console.log(`Server started on ${PORT} port...`)

    } catch (error) {
        console.error('Error', error)
    }
})