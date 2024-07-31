const express = require('express');
const app = express();
// const port = 3000;

const db = require('./db');
require('dotenv').config();

// const menuItems = require("./models/meneItems");

// connection of database
// const mongoose = require('mongoose');
// async function main() {
//     await mongoose.connect("mongodb://127.0.0.1:27017/chat")
// }
// main()
// .then(() => console.log("Connected to MongoDB"))
// .catch(err => console.log(err));




// Use of Bodyparser
const  Bodyparser  = require("body-parser");
app.use(Bodyparser.json()); // req.body

const PORT = process.env.PORT || 3000; 


app.get("/", (req, res) => {
    res.send(" Wellcome to our Hotal ");
});
  
  

// Import the route files of  menueRouters 

const personRoutes = require ('./routes/PersonRoutes');
const menueRouters = require('./routes/menuItemRoutes')


// use the router
app.use('/person' , personRoutes);
app.use('/menu' , menueRouters)




app.listen(PORT, () => {
    console.log(`server start at port ${PORT}`);
} )


