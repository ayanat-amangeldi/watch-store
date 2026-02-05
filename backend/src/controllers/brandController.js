const { ObjectId } = require("mongodb")

const createBrand = async (req, res) => {
  const db = req.app.locals.db
  const { name } = req.body

  const result = await db.collection("brands").insertOne({
    name,
    createdAt: new Date()
  })

  res.status(201).json({ _id: result.insertedId, name })
}

const getBrands = async (req, res) => {
  const db = req.app.locals.db
  const brands = await db.collection("brands").find().toArray()
  res.json(brands)
}

module.exports = { createBrand, getBrands }
