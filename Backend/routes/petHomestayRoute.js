import Express from "express";
import { addRequest, yourHomestayRequest, viewAllRequest, deleteRequest, updateStatus } from "../controllers/petHomestayController.js"
import { isAuthorized } from "../middlewares/auth.js"

const router = Express.Router()

router.post("/homestay/addrequest", isAuthorized, addRequest)
router.get("/homestay/myrequest", isAuthorized, yourHomestayRequest)
router.get("/homestay/allrequests", isAuthorized, viewAllRequest)
router.delete("/homestay/delete/:id", isAuthorized, deleteRequest)
router.put("/homestay/update/:id", isAuthorized, updateStatus)

export default router