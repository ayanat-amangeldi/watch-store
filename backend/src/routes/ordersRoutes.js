const express = require("express")
const router = express.Router()

const {
  createOrder,
  getMyOrders,
  updateOrderStatus
} = require("../controllers/orderController")

router.post("/", createOrder)
router.get("/my", getMyOrders)
router.patch("/:id/status", updateOrderStatus)

module.exports = router
