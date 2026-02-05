const { MongoClient } = require("mongodb")

let client
let db

async function connectDB(uri, dbName) {
  if (db) return db

  client = new MongoClient(uri)
  await client.connect()
  db = client.db(dbName)

  console.log("MongoDB connected to database:", dbName)
  return db
}

module.exports = { connectDB }
