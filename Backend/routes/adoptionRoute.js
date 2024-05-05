import express from 'express';
import { isAuthorized } from "../middlewares/auth.js"
import { adoptPet, viewAdoptReq, deleteReq, viewYourAdoptionRequest } from '../controllers/adoptionController.js';

const router = express.Router();

router.post("/adopt/adoptpet/:id", isAuthorized, adoptPet)
router.get("/adopt/viewadoptionrequest", isAuthorized, viewAdoptReq)
router.delete("/adopt/deleteadoptionrequest/:id", isAuthorized, deleteReq)
router.get("/adopt/viewyourrequest", isAuthorized, viewYourAdoptionRequest)


export default router;