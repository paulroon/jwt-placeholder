require('dotenv').config()

const path = require("path")
const fsPromises = require("fs/promises")

const express = require('express')
const { json } = require('express/lib/response')
const app = express()

const jwt = require('jsonwebtoken')

const FAIL_PASSWORD = "not_the_password"

app.use(express.json())


const authenticateJWT = (req, res, nxt) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    if (token == null) {
        return res.sendStatus(401)
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if(err) {
            return res.sendStatus(403)
        }

        req.jwtPayload = payload
        nxt()
    })
}

const fromNameToPath = (fName) => path.resolve(__dirname, `./data/${fName}`)
const gelJSonFromFile = async (fName) => {
  try {
      const data = await fsPromises.readFile(fromNameToPath(fName))
      return JSON.parse(data)
  } catch (err) {
      console.log(err)
  }
}

['albums', 'comments', 'photos', 'posts', 'todos', 'users'].forEach(resource => {

    app.get(`/${resource}`, authenticateJWT, async (req, res) => {
        const data = await gelJSonFromFile(`${resource}.json`)
        res.json(data)
    })

    app.get(`/${resource}/:id`, authenticateJWT, async (req, res) => {
        const data = await gelJSonFromFile(`${resource}.json`)
        res.json(data.find((resourceItem) => resourceItem.id == req.params.id))
    })

})



app.get("/jwt/payload", authenticateJWT, (req, res) => {
    res.json(req.jwtPayload)
})

app.post("/login", (req, res) => {
    // Authenticate User (always do unless password is 'NOT_THE_PASSWORD')
    const password = req.body.password
    if (password && password.toLowerCase() !== FAIL_PASSWORD) {
        
        const access_token = jwt.sign(
            { 
                name: req.body.username
            }, 
            process.env.ACCESS_TOKEN_SECRET
        )
        
        res.json({ access_token: access_token })
    } else {
        res.status(403).send("Forbidden")
    }
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server Listening on port [${port}]`))