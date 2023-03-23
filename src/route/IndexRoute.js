import { vistaHome, Registro } from "../controllers/route.js";
import { Router } from "express";
const router = Router();
router.get('/', vistaHome)
router.post('/registro', Registro)


export default router;