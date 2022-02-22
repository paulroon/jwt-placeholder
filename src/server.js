import dotenv from 'dotenv'
import express from 'express'
import { resourceRoutes } from "./routes/resource.routes.js"
import { authRoutes } from "./routes/auth.routes.js"
import { uiRoutes } from "./routes/ui.routes.js"

// Setup
dotenv.config()
const app = express()

// Middleware
app.use(express.json())
app.use("/", uiRoutes)
app.use("/api", resourceRoutes)
app.use("/api", authRoutes)

const port = process.env.PORT || 3000
app.listen(port, () =>
    console.log(`Server Listening on port [${port}]`)
)
