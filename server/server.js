require('dotenv').config();
const express  = require("express");
const app = express();
const authRouter = require("./router/auth_rout");
const postRouter = require('./router/post-router')
const connectDb =  require('./utils/db');
const errorMiddleware = require('./middlewares/error-middleware');
//middleware for the usae of json

const cors = require("cors")
app.use(express.json());

app.use(cors());



app.use("/auth", authRouter);
app.use("/posts",postRouter)


app.use(errorMiddleware);


const PORT = 5000;

connectDb().then(()=>{
   
    app.listen(PORT, () =>{
        console.log(`server is running at port: ${PORT} `);
    });
});