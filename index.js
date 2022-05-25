const express = require("express")
require("./db/conn")
const app = express()
const dotenv = require("dotenv")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")

dotenv.config()

app.use(express.json())
app.use('/api/user', authRoute)
app.use('/api/posts', postRoute)

app.listen(9000, () => console.log("I am live now"))