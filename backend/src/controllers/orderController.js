const { ObjectId } = require("mongodb")

const createOrder = async (req, res) => {
  const db = req.app.locals.db
  const session = db.client.startSession()

  try {
    session.startTransaction()

    const cart = await db.collection("carts").findOne(
      { userId: new ObjectId(req.user.userId) },
      { session }
    )

    if (!cart || cart.items.length === 0) {
      throw new Error("Cart is empty")
    }

    let totalPrice = 0
    const orderItems = []

    for (const item of cart.items) {
      const watch = await db.collection("watches").findOne(
        { _id: item.watchId },
        { session }
      )

      if (!watch || watch.stock < item.quantity) {
        throw new Error("Not enough stock")
      }

      totalPrice += watch.price * item.quantity

      orderItems.push({
        watchId: watch._id,
        model: watch.model,
        price: watch.price,
        quantity: item.quantity
      })

      await db.collection("watches").updateOne(
        { _id: watch._id },
        { $inc: { stock: -item.quantity } },
        { session }
      )
    }

    await db.collection("orders").insertOne(
      {
        userId: new ObjectId(req.user.userId),
        items: orderItems,
        totalPrice,
        status: "pending",
        createdAt: new Date()
      },
      { session }
    )

    await db.collection("carts").updateOne(
      { userId: new ObjectId(req.user.userId) },
      { $set: { items: [] } },
      { session }
    )

    await session.commitTransaction()
    res.status(201).json({ message: "Order created successfully" })
  } catch (err) {
    await session.abortTransaction()
    res.status(400).json({ message: err.message })
  } finally {
    await session.endSession()
  }
}

const getMyOrders = async (req, res) => {
  const db = req.app.locals.db

  const orders = await db
    .collection("orders")
    .find({ userId: new ObjectId(req.user.userId) })
    .sort({ createdAt: -1 })
    .toArray()

  res.json(orders)
}

const updateOrderStatus = async (req, res) => {
  const db = req.app.locals.db
  const { status } = req.body

  await db.collection("orders").updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: { status } }
  )

  res.json({ message: "Order status updated" })
}

module.exports = {
  createOrder,
  getMyOrders,
  updateOrderStatus
}
