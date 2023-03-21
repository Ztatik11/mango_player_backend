import {indexRoutes} from './route/IndexRoute.js';
import express from "express";
import {PrismaClient} from '@Prisma/Client'

const Prisma = new PrismaClient()

const app = express()

app.use(indexRoutes);

const port= process.env.PORT||3000;
app.listen(port);
console.log('El servidor furula en el puerto:',port);