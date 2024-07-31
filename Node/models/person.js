const mongoose = require('mongoose');
const { type } = require('os');
const router = require('../routes/PersonRoutes');


//  this is  Schema   
const personSchema = new mongoose.Schema(
    {
        name :{
            type: String ,
            required: true
        },
        age :{
            type: Number,
           
        
        },
        work:{
            type: String,
            enum:['chef' , 'waiter' , 'manager'],
            required:true 
        },

        mobile:{
            type: String,
            required: true
            
        },
        email:{
            type: String,
            required: true
            
        } ,
        address : {
            type: String,
            
        },
        
        salary: {
            type: String,
            required: true
        }

    }
      
    
)







// this is model  of person 

const person = mongoose.model('person' ,  personSchema);
module.exports= person ;

// collection created by the  ======>  person;
 




