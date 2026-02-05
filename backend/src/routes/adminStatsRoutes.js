const express = require("express")
const {
  getTotalSales,
  getTopWatches
} = require("../controllers/adminStatsController")

const router = express.Router()

router.get("/total-sales", getTotalSales)
router.get("/top-watches", getTopWatches)

module.exports = router
