import express from "express";
import { login, register, userData, getLoggedInUser, logout, deleteUser, updateUser } from "../controllers/userController.js";
import { isAuthorized } from "../middlewares/auth.js"

const router = express.Router();

router.post("/user/register", register)
router.get("/user/allUsers", userData)
router.post("/user/login", login)
router.get("/user/loggedinuser", isAuthorized, getLoggedInUser)
router.get("/user/logout", isAuthorized, logout)
router.get("/user/deleteuser", isAuthorized, deleteUser)
router.put("/user/update/:id", isAuthorized, updateUser)



export default router;