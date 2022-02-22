import Router from "express"

const uiRoutes = Router()

uiRoutes.get("/", (req, res) => {
    res.send('JWT Placeholder')
})



export { uiRoutes }
