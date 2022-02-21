import Router from 'express'
import { authenticateJWT } from "../auth.js"

import { getJSonFromFile } from "../helper.js"

const resourceRoutes = Router()
const resourceNames = ["albums", "comments", "photos", "posts", "todos", "users"]

resourceNames.forEach((r) => {
    resourceRoutes.get(`/${r}`, authenticateJWT, async (req, res) => {
        const data = await getJSonFromFile(`${r}.json`)
        res.json(data)
    })

    resourceRoutes.get(`/${r}/:id`, authenticateJWT, async (req, res) => {
        const data = await getJSonFromFile(`${r}.json`)
        res.json(data.find((resourceItem) => resourceItem.id == req.params.id))
    })
})

export { resourceRoutes }