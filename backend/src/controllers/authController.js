const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const register = async (req, res) => {
const db = req.app.locals.db
const { email, password } = req.body

const existing = await db.collection("users").findOne({ email })
if (existing) return res.status(409).json({ message: "User exists" })

const hash = await bcrypt.hash(password, 10)

const result = await db.collection("users").insertOne({
email,
password: hash,
createdAt: new Date()
})

const token = jwt.sign(
{ userId: result.insertedId.toString(), email },
process.env.JWT_SECRET
)

res.status(201).json({ token })
}

const login = async (req, res) => {
const db = req.app.locals.db
const { email, password } = req.body

const user = await db.collection("users").findOne({ email })
if (!user) return res.status(401).json({ message: "Invalid credentials" })

const ok = await bcrypt.compare(password, user.password)
if (!ok) return res.status(401).json({ message: "Invalid credentials" })

const token = jwt.sign(
{ userId: user._id.toString(), email: user.email },
process.env.JWT_SECRET
)

res.json({ token })
}

const me = async (req, res) => {
res.json(req.user)
}

module.exports = {
register,
login,
me
}
