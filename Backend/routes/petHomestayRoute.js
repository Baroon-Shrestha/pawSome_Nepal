import Express from "express";
import { addRequest, yourHomestayRequest, viewAllRequest } from "../controllers/petHomestayController.js"
import { isAuthorized } from "../middlewares/auth.js"

const router = Express.Router()

router.post("/homestay/addrequest", isAuthorized, addRequest)
router.get("/homestay/myrequest", isAuthorized, yourHomestayRequest)
router.get("/homestay/allrequests", isAuthorized, viewAllRequest)

export default router