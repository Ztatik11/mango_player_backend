import router from './route/IndexRoute.js';
import express from "express";


const app = express()

app.use(express.json());
app.use(router);

const port= process.env.PORT||3000;
app.listen(port);
console.log('El servidor furula en el puerto:',port);