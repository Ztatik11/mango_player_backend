import { vistaHome, Registro, Login } from "../controllers/route.js";
import { Router } from "express";
const router = Router();
router.get('/', vistaHome)
router.post('/registro', Registro)
router.get('/login', Login)


export default router;