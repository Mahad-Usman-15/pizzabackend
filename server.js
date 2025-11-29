import express from "express"
import cors from "cors"
import connectdB from "./connectdb.js"
import Categoryroutes from "./routes/categoryroutes.js"
import Productroutes from "./routes/productroutes.js"
import Contactroutes from "./routes/contactroutes.js"
import Orderroutes from "./routes/orderroutes.js"
import Userroutes from "./routes/userroutes.js"
const app = express()

const PORT = "5000"
connectdB()
app.use(cors({
      origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
}))
app.use(express.json())

app.use("/api", Categoryroutes)
app.use("/api", Productroutes)
app.use("/api", Contactroutes)
app.use("/api", Orderroutes)
app.use("/api", Userroutes)

app.listen(PORT, console.log("Server running on port 5000"))