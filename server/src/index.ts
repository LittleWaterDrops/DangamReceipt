import express, { json, urlencoded } from "express"
import morgan from "morgan"
import cors from "cors"
import HomerRouter from "./routes/Home"

const app: express.Application = express()
const port: number = 3001

// 환경설정
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan("dev"))

app.listen(port, () => {
  console.log(`App is listening on port ${port}! \n`)
})

// 라우터 설정
app.use("/home/", HomerRouter)
