const express = require("express")
const authMiddleware = require("../middleware/auth")
const {
  createWatch,
  getWatches,
  getWatchById,
  updateWatch,
  deleteWatch
} = require("../controllers/watchController")

const router = express.Router()

// public
router.get("/", getWatches)
router.get("/:id", getWatchById)

// protected
router.post("/", authMiddleware, createWatch)
router.put("/:id", authMiddleware, updateWatch)
router.delete("/:id", authMiddleware, deleteWatch)

module.exports = router
