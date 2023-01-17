require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

const { PORT = 3000, DATABASE_URL } = process.env;

const app = express();

mongoose.connect(DATABASE_URL, {
    useUnifiedTopology: true, 
    useNewUrlParser: true
});

mongoose.connection
    .on("open", () => console.log('You are connnectd to mongoose'))
    .on("close", () => console.log('You are disconnected from mongoose'))
    .on("error", (error) => console.log(error))


const CheeseSchema = new mongoose.Schema({
    name: String, 
    image: String, 
    title: String,
});

const Cheeese = mongoose.model("Cheese", CheeseSchema);

//middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());


//routes
app.get("/", (req, res) => {
    res.send("hello world")
})

app.get("/cheese", async (req, res) => {
    try{  
        const startcheese =
        [
            {
                name: "Cheddar",
                image: "https://tinyurl.com/2xk7c5yv",
                title:"Cheese"
            },
            {
                name: "Mozzarella",
                image: "https://tinyurl.com/2muajyr5",
                title:"Cheese"
                },
        ]
    Cheeese.create(startcheese, (err, data) => {//res.json(data);
});
res.json(await Cheeese.find({}));
    }catch(error){
        res.status(400).json(error)
    }
});


app.post("/cheese", async (req, res) => {
    try{
        res.json(await Cheeese.create(req.body))
    }catch(error){
        res.status(400).json(error)
    }
})

app.put("/cheese/:id", async (req, res) => {
    try{
        res.json(
            await Cheeese.findByIdAndUpdate(req.params.id, req.body, {new: true})
        )
    }catch(error){
        res.status(400).json(error)
    }
});


app.delete("/cheese/:id", async (req, res) => {
    try{
        res.json(await Cheeese.findByIdAndRemove(req.params.id)) 
    }catch(error){
        res.status(400).json(error)
    }
});


app.get("/cheese/:id", async (req, res) => {
    try{
        res.json(await Cheeese.findById(req.params.id))
    }catch(error){
        res.status(400).json(error)
    }
})


app.listen(PORT, () => console.log(`listening on PORT ${PORT}`))