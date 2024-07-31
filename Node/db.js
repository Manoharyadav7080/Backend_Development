const mongoose = require('mongoose')
require('dotenv').config();

// const mongoURL ='mongodb://127.0.0.1:27017/Hotal';  // ---------> Locally
//const mongoURL = mongodb+srv://manohar:<password>@hotal.pameaca.mongodb.net/
//const mongoURL ='mongodb+srv://manohar:Hima2003@hotal.pameaca.mongodb.net/';

// const mongoURL = process.env.MONGODB_URL;       // on the server 
const mongoURL = process.env.MONGODB_Local_URL;    // on the locally 


mongoose.connect(mongoURL 
    // {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
// }
);


const db = mongoose.connection;

db.on('connected' , () => {
    console.log('connected to mangoDB server')
})
db.on('disconnected' , () => {
    console.log('disconnected from mangodb')
})

db.on('error' , (error) => {
    console.log(error);

})

module.exports= db ;