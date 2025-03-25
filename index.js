import express from "express";
import cors from 'cors'
import bodyParser from'body-parser';
import multer from "multer";
import path from "path";

import { adminRouter } from "./Routes/AdminRoute.js";

const app = express()
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

app.use(express.json())
app.use(bodyParser.json());
//app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static('Public'));
app.use('/auth', adminRouter)


app.listen(3000,() =>{
    console.log('server is running')
})
