import express from 'express';
import { isAuthorized } from "../middlewares/auth.js"
import { adoptPet, viewAdoptReq, deleteReq } from '../controllers/adoptionController.js';

const router = express.Router();

router.post("/adopt/adoptpet/:id", isAuthorized, adoptPet)
router.get("/adopt/viewadoptionrequest", viewAdoptReq)
router.delete("/adopt/deleteadoptionrequest/:id", isAuthorized, deleteReq)


export default router;