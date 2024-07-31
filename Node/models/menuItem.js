const mongoose = require('mongoose');
const { type } = require('os');




const menuShema= new mongoose.Schema( 
    {
        name:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        test : {
            type:String,
            enum:['sweet' , 'spicy', 'sour'],
            required : true
        },
        is_drink: {
            type:Boolean,
            default:false
        },
        ingredients : {
            type :[String],
            default : []
        },
        num_seles: {
            type : Number,
            default : 0
        }

    }
);

const menuItems= mongoose.model('menuItems' , menuShema );
module.exports = menuItems;


// collection created by the  ======>  menueItems ;





