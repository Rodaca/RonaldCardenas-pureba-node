import express from "express";
import mysql from "mysql";
import myconn from "express-myconnection";
import routes from "./routes.js"
import cors from 'cors';

const app =express();
const dbOptions ={
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'campus2024',
    database: 'Market'
}
app.use(cors());
app.use(myconn(mysql, dbOptions, 'single'))
app.use(express.json())

app.use('/api', routes)

app.listen(9000,()=>{
    console.log("server arriba en puerto ",9000);
})