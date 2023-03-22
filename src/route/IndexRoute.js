import { vistaHome } from "../controllers/route.js";
import { Router } from "express";
const router = Router();
router.get('/', vistaHome)

export default router;