const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

/**
 * REGISTER
 * POST /api/v1/auth/register
 */
const register = async (req, res) => {
  try {
    const db = req.app.locals.db
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" })
    }

    const existing = await db.collection("users").findOne({ email })
    if (existing) {
      return res.status(409).json({ message: "User already exists" })
    }

    const hash = await bcrypt.hash(password, 10)

    const result = await db.collection("users").insertOne({
      email,
      password: hash,
      role: "user",                 // 👈 важно для ролей
      mustChangePassword: false,    // 👈 пригодится для reset-flow
      tempPasswordExpiresAt: null,  // 👈 пригодится для reset-flow
      createdAt: new Date()
    })

    const token = jwt.sign(
      {
        userId: result.insertedId.toString(),
        email,
        role: "user"
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    res.status(201).json({ token })
  } catch (err) {
    res.status(500).json({ message: "Registration failed" })
  }
}

/**
 * LOGIN
 * POST /api/v1/auth/login
 */
const login = async (req, res) => {
  try {
    const db = req.app.locals.db
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" })
    }

    const user = await db.collection("users").findOne({ email })
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    // ⏱ проверка истечения временного пароля (на будущее)
    if (
      user.tempPasswordExpiresAt &&
      new Date(user.tempPasswordExpiresAt) < new Date()
    ) {
      return res.status(401).json({ message: "Temporary password expired" })
    }

    const ok = await bcrypt.compare(password, user.password)
    if (!ok) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign(
      {
        userId: user._id.toString(),
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    res.json({
      token,
      mustChangePassword: user.mustChangePassword || false
    })
  } catch (err) {
    res.status(500).json({ message: "Login failed" })
  }
}

/**
 * ME
 * GET /api/v1/auth/me
 */
const me = async (req, res) => {
  res.json(req.user)
}

module.exports = {
  register,
  login,
  me
}
