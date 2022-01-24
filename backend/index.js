import "dotenv/config"
import mongoose from "mongoose"
import express from "express"
import cors from "cors"
import routes from "./src/routes.js"

mongoose
  .connect(process.env.MONGO_DB_URI || "mongodb://127.0.0.1:27017/ecommerce")
  .then((result) => {
    console.log("connected to MongoDB")
  })
  .catch((error) => {
    console.log("error connecting to MongoDB", error.message)
  })

const PORT = process.env.PORT
const app = express()

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Accept", "Content-Type", "Authorization"],
  })
)
app.use(express.json())

app.use("/api", routes)

app.listen(PORT, () => console.log(`Running on port ${PORT} ...`))
