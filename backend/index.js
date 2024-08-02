import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import connectDB from './database/db.js'

dotenv.config()
const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));


const start = async () =>{
    try{
        connectDB()
        app.listen(port,()=>{
            console.log(`Server is running on port ${port}`)
        })
    }
    catch(error){
        console.log(error)
    }
}

start()
