import express, {Express} from 'express'
import dotenv from 'dotenv';

dotenv.config();


const app: Express = express()
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server started on ${PORT} port...`)
})