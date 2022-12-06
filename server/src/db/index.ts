import { Sequelize } from 'sequelize'
import dotenv from 'dotenv';

dotenv.config()

const {DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST} = process.env

 function connectDataBase() {
    if(DB_NAME && DB_USERNAME && DB_PASSWORD) {
        return new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
            host: DB_HOST,
            dialect: 'postgres'
        });
    }
}



export const instanceSequelize = connectDataBase()