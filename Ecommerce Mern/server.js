const express = require ("express");
const morgan = require ("morgan");
const  connectDb  = require("./bootsrap/index");
const dotenv = require("dotenv")
const authRoutes = require("./routes/AuthRoutes.js");
dotenv.config()
//rest object
const app = express();
//db config
 connectDb();
const port = process.env.PORT || 5001; 
//middlewares
app.use(express.json());
app.use(morgan())

//routes
app.use("/api/vi/auth", authRoutes)

app.get("/", (req, res) => {
  res.send("<h1>Welcome   to E-commerce app</h1>");
});
app.listen(port,()=>{
  console.log(`Server is running ${port}`)
})