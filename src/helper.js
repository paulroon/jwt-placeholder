import path from "path"
import { fileURLToPath } from "url"
import fsPromises from "fs/promises"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const fromNameToPath = (fName) => {
    return path.resolve(__dirname, `../data/${fName}`)
}

export const getJSonFromFile = async (fName) => {
    try {
        const data = await fsPromises.readFile(fromNameToPath(fName))
        return JSON.parse(data)
    } catch (err) {
        console.log(err)
    }
}

export default {}
