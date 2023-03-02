require('dotenv');
const express = require('express')
const bodyparser = require('body-parser');
const authRouter = require('./Routes/auth');
const connect = require('./DB/connect');


const app = express();
app.use(bodyparser.urlencoded({extended:true}))
app.use("/auth",authRouter);


app.get("/",(req,res) => {
    res.send("Server is up and running");
}) 



const startDB = async() => {
    try{
        connect('HarishChoudharyy:priya@9426@cluster0.dkxds89.mongodb.net/Music-app');
        console.log("Server started to listen on port 5000");
    }        
    catch(error){
        console.log(error.message);
    }
}


app.listen(5000, () => {
    startDB();
})