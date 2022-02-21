import jwt from "jsonwebtoken"

export const signToken = payload => jwt.sign(
    payload,
    process.env.ACCESS_TOKEN_SECRET
)

export const authenticateJWT = (req, res, nxt) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    if (token == null) {
        return res.sendStatus(401)
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) {
            return res.sendStatus(403)
        }

        req.jwtPayload = payload
        nxt()
    })
}

export default {}
