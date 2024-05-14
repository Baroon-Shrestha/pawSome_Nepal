import Express from "express";
import { addProduct, viewAllProduct, buyProduct, deleteProduct, addToCart, viewCart, removeFromCart, updateFromCart, updateStock, viewOneProduct } from "../controllers/productControler.js";
import { isAuthorized } from "../middlewares/auth.js"

const router = Express.Router()

router.post("/product/addproduct", isAuthorized, addProduct)
router.get("/product/buy", isAuthorized, buyProduct)
router.get("/product/viewproduct", viewAllProduct)
router.get("/product/view/:id", viewOneProduct)
router.delete("/product/deleteproduct/:id", deleteProduct)
router.post("/product/addtocart/:id", isAuthorized, addToCart)
router.get("/product/viewcart", isAuthorized, viewCart)
router.delete("/product/remove/:id", isAuthorized, removeFromCart)
router.put("/product/updatequantity/:id", isAuthorized, updateFromCart)
router.put("/product/updatestock/:id", isAuthorized, updateStock)

export default router
