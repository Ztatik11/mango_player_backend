import {createPool} from 'mysql2/promise'
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client'
dotenv.config({path: './.env'})

const db = new PrismaClient();


connectToDb();