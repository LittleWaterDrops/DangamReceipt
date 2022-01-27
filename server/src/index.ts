import express, { Request, Response, json, urlencoded } from "express"
import morgan from "morgan"
import cors from "cors"

const app: express.Application = express()
const port: number = 3001

app.use(cors())

app.use(json())
app.use(urlencoded({ extended: true }))

app.use(morgan("dev"))

app.get("/", (request: Request, response: Response) => {
  response.send("Hello World")
})

app.listen(port, () => {
  console.log(`App is listening on port ${port}! \n`)
})
