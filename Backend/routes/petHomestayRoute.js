import Express from "express";
import { addRequest, viewRequest } from "../controllers/petHomestayController.js"
import { isAuthorized } from "../middlewares/auth.js"

const router = Express.Router()

router.post("/homestay/addrequest", isAuthorized, addRequest)
router.get("/homestay/viewrequest", viewRequest)

export default router