const express = require("express")
const {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart
} = require("../controllers/cartController")

const authMiddleware = require("../middleware/auth")

const router = express.Router()

router.use(authMiddleware)

router.get("/", getCart)
router.post("/items", addToCart)
router.patch("/items/:watchId", updateCartItem)
router.delete("/items/:watchId", removeCartItem)
router.delete("/clear", clearCart)

module.exports = router
