import mongoose from "mongoose";    
import dotenv from 'dotenv'

dotenv.config()

const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASSWORD;

const connectDB = async () => {
    const MONG_URL = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.1sentja.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    mongoose.connect(MONG_URL)

    mongoose.connection.on('connected', ()=>{
        console.log("Connection Established with MongoDB");
    })

    mongoose.connection.on('disconnected', ()=>{
        console.log("Connection Disconnected with MongoDB");
    })

    mongoose.connection.on('error', ()=>{
        console.log("Connection Failed with MongoDB");
    })
}

export default connectDB;