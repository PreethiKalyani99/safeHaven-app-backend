import express, { Express } from "express"
import cors from "cors";
import { AppDataSource } from "./data-source"
import routes from "./routes/index"
import passport from "passport";

const app: Express = express()
const port: number = 5432
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use(passport.initialize())
app.use(routes)

AppDataSource.initialize().then(async () => {
    app.listen(port, () => {
        console.log(`Server is running at http://dpg-cv4qcvofnakc73brq16g-a:${port}`)
    })
    
}).catch(error => console.log(error))   