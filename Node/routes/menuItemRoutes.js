const express = require ('express');
const router = express.Router();

const menuItems = require("./../models/menuItem");

// post and get  route to add a  menu
router.post('/' , async (req , res) => {
    try {
        const data = req.body;
        let newItem  = new menuItems(data)
        const response = await newItem.save();
        console.log("data saved");
        res.status(200).json(response);

    }catch (err) {
        console.log(err) ;
        res.status(500).json({error : 'internal servar Error'});
    }
})


//  get methods to get the menu data 
router.get('/' , async(req , res) => {
    try {
        const data = await menuItems.find();
        console.log("data fatched") ;
        res.status(200).json(data);

    }catch(err) {
        console.log(err);
        res.status(500).json({error:' innternal error'})

    }

})

// parameterised api call
router.get ('/:taste' , async (req ,res) =>{
    try {
         const tastType = req.params.taste; // Extract the work type from the URL  parameter 
        //  console.log(tastType);
         if (tastType == 'sweet' || tastType== 'spicy' ||  tastType == 'sour'){ // this is a v type of validation 
            const  response = await menuItems.find({test: tastType});  // work is define in the Schema 
            console.log(" response fatched");
            res.status(200).json(response);
         }else {
            res.status(404).json({error : 'invalid tastType'})

        }
         
        }catch(err){
        console.log(err);
        res.status(500).json({error: 'internal servar error'});
    }
})

// update data by the  id 
router.put('/:id' ,async(req, res) => {
    try {
        const menuId= req.params.id;
        const updateMenuData = req.body;

        const response = await menuItems.findByIdAndUpdate(menuId , updateMenuData , {
            new : true,
            runValidators : true
        })

        if(!response) {
            res.status(404).json({error : 'not a valid name '})
        }

        console.log('data updated');
        res.status(200).json(response);

    }catch(err) {
        console.log(err);
        res.status(500).json({error: 'internal servar error'})
    }
})

// delete dat aby the id 
router.delete('/:id' , async(req , res) => {
    try {

        const itemId = req.params.id ;
        const response = await menuItems.findByIdAndDelete(itemId);
        if(! response ) {
            res.status(404).json({error : 'menu not found'});

        }
        console.log(" menu deleted ");
        res.status(200).json({massage: 'menu deleted succsessfully'})


    }catch(err) {
        console.log(err) ;
        res.status(500).json({error : 'internal servar error '});

    }
})




module.exports = router;


