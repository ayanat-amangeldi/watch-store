const getTotalSales = async (req, res) => {
  try {
    const db = req.app.locals.db

    const result = await db.collection("orders").aggregate([
      { $match: { status: "completed" } },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$totalPrice" },
          ordersCount: { $sum: 1 }
        }
      }
    ]).toArray()

    res.json(result[0] || { totalSales: 0, ordersCount: 0 })
  } catch (err) {
    res.status(500).json({ message: "Failed to get total sales" })
  }
}

const getTopWatches = async (req, res) => {
  try {
    const db = req.app.locals.db

    const result = await db.collection("orders").aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.watchId",
          totalSold: { $sum: "$items.quantity" },
          totalRevenue: {
            $sum: { $multiply: ["$items.price", "$items.quantity"] }
          }
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 }
    ]).toArray()

    res.json(result)
  } catch (err) {
    res.status(500).json({ message: "Failed to get top watches" })
  }
}

module.exports = {
  getTotalSales,
  getTopWatches
}
