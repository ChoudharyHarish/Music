require('dotenv').config();
const  express = require("express");
const  bodyParser =  require("body-parser");
const  cors =  require("cors");

const connectDB  = require("./db/connect.js");
// console.log(connectDB);
const authRouter = require('./Routes/auth');


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));


app.get("/", (req, res) => res.send("Server Started"));
app.use("/auth", authRouter);


const port = 5000 || process.env.PORT;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, () => console.log(`Server started to listen on port ${port}`));
    }
    catch (error) {
        console.log(error);
    }

}
start();