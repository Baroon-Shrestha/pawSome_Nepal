import Express from "express";
import { addProduct, viewAllProduct, deleteProduct } from "../controllers/productControler.js";

const router = Express.Router()

router.post("/product/addproduct", addProduct)
router.get("/product/viewproduct", viewAllProduct)
router.delete("/product/deleteproduct/:id", deleteProduct)

export default router
