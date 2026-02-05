const { ObjectId } = require("mongodb")

/**
 * CREATE WATCH
 * Any authenticated user (seller)
 */
const createWatch = async (req, res) => {
  const db = req.app.locals.db

  try {
    const watch = {
      brandId: new ObjectId(req.body.brandId),
      model: req.body.model,
      price: Number(req.body.price),
      stock: Number(req.body.stock || 1),
      specs: {
        movement: req.body.specs?.movement,
        caseMaterial: req.body.specs?.caseMaterial,
        waterResistance: req.body.specs?.waterResistance
      },
      createdBy: new ObjectId(req.user.userId),
      createdAt: new Date()
    }

    const result = await db.collection("watches").insertOne(watch)
    res.status(201).json(result)
  } catch (err) {
    res.status(500).json({ message: "Failed to create watch" })
  }
}

/**
 * GET WATCHES
 * Public endpoint
 * Supports search, filtering, sorting, pagination
 */
const getWatches = async (req, res) => {
  const db = req.app.locals.db

  try {
    const {
      q,
      brandId,
      minPrice,
      maxPrice,
      caseMaterial,
      sort = "createdAt",
      order = "desc",
      page = 1,
      limit = 12
    } = req.query

    const filter = {}

    // Search by model
    if (q) {
      filter.model = { $regex: q, $options: "i" }
    }

    // Filter by brand
    if (brandId) {
      filter.brandId = new ObjectId(brandId)
    }

    // Filter by price
    if (minPrice || maxPrice) {
      filter.price = {}
      if (minPrice) filter.price.$gte = Number(minPrice)
      if (maxPrice) filter.price.$lte = Number(maxPrice)
    }

    // Filter by material
    if (caseMaterial) {
      filter["specs.caseMaterial"] = caseMaterial
    }

    const skip = (Number(page) - 1) * Number(limit)
    const sortOrder = order === "asc" ? 1 : -1

    const watches = await db
      .collection("watches")
      .find(filter)
      .sort({ [sort]: sortOrder })
      .skip(skip)
      .limit(Number(limit))
      .toArray()

    res.json(watches)
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch watches" })
  }
}

/**
 * GET WATCH BY ID
 * Public endpoint
 */
const getWatchById = async (req, res) => {
  const db = req.app.locals.db

  try {
    const watch = await db.collection("watches").findOne({
      _id: new ObjectId(req.params.id)
    })

    if (!watch) {
      return res.status(404).json({ message: "Watch not found" })
    }

    res.json(watch)
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch watch" })
  }
}

/**
 * UPDATE WATCH
 * Only owner or admin
 */
const updateWatch = async (req, res) => {
  const db = req.app.locals.db
  const watchId = new ObjectId(req.params.id)

  try {
    const watch = await db.collection("watches").findOne({ _id: watchId })
    if (!watch) {
      return res.status(404).json({ message: "Watch not found" })
    }

    if (
      req.user.role !== "admin" &&
      watch.createdBy.toString() !== req.user.userId
    ) {
      return res.status(403).json({ message: "Forbidden" })
    }

    await db.collection("watches").updateOne(
      { _id: watchId },
      { $set: req.body }
    )

    res.json({ message: "Watch updated" })
  } catch (err) {
    res.status(500).json({ message: "Failed to update watch" })
  }
}

/**
 * DELETE WATCH
 * Only owner or admin
 */
const deleteWatch = async (req, res) => {
  const db = req.app.locals.db
  const watchId = new ObjectId(req.params.id)

  try {
    const watch = await db.collection("watches").findOne({ _id: watchId })
    if (!watch) {
      return res.status(404).json({ message: "Watch not found" })
    }

    if (
      req.user.role !== "admin" &&
      watch.createdBy.toString() !== req.user.userId
    ) {
      return res.status(403).json({ message: "Forbidden" })
    }

    await db.collection("watches").deleteOne({ _id: watchId })
    res.status(204).end()
  } catch (err) {
    res.status(500).json({ message: "Failed to delete watch" })
  }
}

module.exports = {
  createWatch,
  getWatches,
  getWatchById,
  updateWatch,
  deleteWatch
}
