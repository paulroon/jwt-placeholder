import Router from "express"
import { signToken, authenticateJWT } from "../auth.js"

const FAIL_PASSWORD = "not_the_password"

const authRoutes = Router()

authRoutes.get("/jwt/payload", authenticateJWT, (req, res) => {
    res.json(req.jwtPayload)
})

authRoutes.post("/login", (req, res) => {
    // Authenticate User (always do unless password is 'NOT_THE_PASSWORD')
    const password = req.body.password
    if (password && password.toLowerCase() !== FAIL_PASSWORD) {
        const access_token = signToken({
            name: req.body.username,
        })

        res.json({ access_token: access_token })
    } else {
        res.status(403).send("Forbidden")
    }
})

export { authRoutes }