require("dotenv").config()
const express = require("express")
const cors = require("cors")

const { connectDB } = require("./src/config/db")

const authRoutes = require("./src/routes/authRoutes")
const watchRoutes = require("./src/routes/watchRoutes")
const cartRoutes = require("./src/routes/cartRoutes")
const orderRoutes = require("./src/routes/ordersRoutes")
const adminStatsRoutes = require("./src/routes/adminStatsRoutes")


const app = express()

app.use(cors())
app.use(express.json())

async function start() {
  const db = await connectDB(process.env.MONGO_URI, process.env.DB_NAME)
  app.locals.db = db

  app.use("/api/v1/auth", authRoutes)
  app.use("/api/v1/watches", watchRoutes)
  app.use("/api/v1/cart", cartRoutes)
  app.use("/api/v1/orders", orderRoutes)
  app.use("/api/v1/admin/stats", adminStatsRoutes)
  app.use("/api/v1/admin/orders", orderRoutes)


  app.get("/", (req, res) => {
    res.json({ message: "Watch Store API is running" })
  })

  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
