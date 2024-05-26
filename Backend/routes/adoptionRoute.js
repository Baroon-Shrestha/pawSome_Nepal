import express from 'express';
import { isAuthorized } from "../middlewares/auth.js"
import { adoptPet, viewAdoptReq, deleteReq, viewYourAdoptionRequest, updateStatus } from '../controllers/adoptionController.js';

const router = express.Router();

router.post("/adopt/adoptpet/:id", isAuthorized, adoptPet)
router.get("/adopt/viewadoptionrequest", viewAdoptReq)
router.delete("/adopt/deleteadoptionrequest/:id", isAuthorized, deleteReq)
router.get("/adopt/viewyourrequest", isAuthorized, viewYourAdoptionRequest)
router.put("/adopt/update/:id", isAuthorized, updateStatus)


export default router;