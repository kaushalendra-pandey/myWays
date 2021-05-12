require('dotenv').config()
const mongoose = require("mongoose")
const express = require("express")
const app  = express()
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")


//routes:
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const blogRoutes = require("./routes/blogs")

const PORT = process.env.PORT || 8000   


//DB Conection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology:true

}).then(()=>{
    console.log("DATABASE is connected..");
})
.catch((e)=>{
    console.log(e);
})


//middlewares
app.use(cors())
app.use(express.json())
app.use(cookieParser())

// routes
app.use('/api',authRoutes)
app.use('/api',userRoutes)
app.use("/api",blogRoutes)

if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"))
    const path = require("path")
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"client","build","index.html"))
    })
}



app.listen(PORT,(req,res)=>{
    console.log(`app is running at ${PORT}`);
})