import {Router} from "express";
const router = Router();
import {weatherController} from "../controller/weatherController.js"

router.get('/:city',weatherController);

export default router; 
