// dotenv config
require('dotenv').config({ path: './.env' })
// console.log(process.env.PORT)

// express config
const express = require('express')
const app = express()

const path = require("path");

// db connection
require('./models/db').connectDB();

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(express.json());

const userRoutes = require("./routes/user.routes")
// app.use("/", userRoutes);
app.use("/user", userRoutes);

// server
app.listen(process.env.PORT, () => {
    console.log("Server is runnig on PORT: ")
    // console.log("Server is runnig on PORT: ", process.env.PORT)
})

console.log("Social Media - APP");