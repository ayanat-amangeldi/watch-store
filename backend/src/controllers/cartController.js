const { ObjectId } = require("mongodb")

// GET /api/v1/cart
const getCart = async (req, res) => {
  const db = req.app.locals.db
  const userId = new ObjectId(req.user.userId)

  const cart = await db.collection("carts").findOne({ userId })

  if (!cart) {
    return res.json({ items: [] })
  }

  res.json(cart)
}

// POST /api/v1/cart/items
const addToCart = async (req, res) => {
  const db = req.app.locals.db
  const userId = new ObjectId(req.user.userId)

  const { watchId, quantity = 1 } = req.body

  await db.collection("carts").updateOne(
    { userId },
    {
      $push: {
        items: {
          watchId: new ObjectId(watchId),
          quantity: Number(quantity)
        }
      }
    },
    { upsert: true }
  )

  res.status(201).json({ message: "Added to cart" })
}

// PATCH /api/v1/cart/items/:watchId
const updateCartItem = async (req, res) => {
  const db = req.app.locals.db
  const userId = new ObjectId(req.user.userId)
  const watchId = new ObjectId(req.params.watchId)

  const { quantity } = req.body

  await db.collection("carts").updateOne(
    { userId, "items.watchId": watchId },
    {
      $set: {
        "items.$.quantity": Number(quantity)
      }
    }
  )

  res.json({ message: "Cart updated" })
}

// DELETE /api/v1/cart/items/:watchId
const removeCartItem = async (req, res) => {
  const db = req.app.locals.db
  const userId = new ObjectId(req.user.userId)
  const watchId = new ObjectId(req.params.watchId)

  await db.collection("carts").updateOne(
    { userId },
    {
      $pull: {
        items: { watchId }
      }
    }
  )

  res.json({ message: "Item removed" })
}

// DELETE /api/v1/cart/clear
const clearCart = async (req, res) => {
  const db = req.app.locals.db
  const userId = new ObjectId(req.user.userId)

  await db.collection("carts").deleteOne({ userId })

  res.json({ message: "Cart cleared" })
}

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart
}
