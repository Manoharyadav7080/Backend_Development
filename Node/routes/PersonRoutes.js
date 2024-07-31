const express = require('express')  // this is basic critariya 
const router =express.Router();


const person = require('./../models/person')

// post and get  route to add a person
router.post("/", async (req, res) => {
    try {
      const  data = req.body; // Assumming the request body contains the person data
       let newperson = new person(data); // create a new person using the mongoose models
       const response = await newperson.save(); // save the person to the database
      console.log("data saved");
      // console.log(data);
      res.status(200).json(response);
      // res.send(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "internal server Error " });
    }
  });


// -----------------------------------------------------------------------------------------------
//  get methods to get the person  data 
router.get('/' ,  async(req , res)=> {
    try {
        const data =  await person.find();
        console.log("data fetched ");
        // console.log(data);
        res.status(200).json(data );

    }catch(err) {
        console.log(err);
        res.status(500).json({ error: "internal server Error " });
    }
})


// -------------------------------------------------------------------------------------------------------------
// parameterised api call
router.get ('/:worktype' , async (req ,res) =>{
    try {
         const workType = req.params.worktype; // Extract the work type from the URL  parameter 
        //  console.log(workType);
         if (workType == 'chef' || workType == 'manager' ||  workType == 'waiter'){ // this is a v type of validation 
            const  response = await person.find({ work: workType});  // work is define in the Schema 
            console.log(" response fatched");
            res.status(200).json(response);
         }else {
            res.status(404).json({error : 'invalid worktype'})
        }
         
        }catch(err){
        console.log(err);
        res.status(500).json({error  : 'internal servar error'});
    }
})

// Update date by the ID 
router.put('/:id'  , async(req , res) => {
    try {
        const personId = req.params.id; // Extract the id from the URL parameter  
        const  updatedPersonData = req.body; // updated  data for the person  ( jo data user ke dwaar  diya jayega  update karne ke liye )
  
        const response = await person.findByIdAndUpdate(personId , updatedPersonData , {
          new: true, // new true karna hai ki updated data return kare
          runValidators: true  // Run mangoose Validation 

        })

        if(!perresponse) {
            res.status(404).json({error : 'not a valid name '})
        }

        console.log('data updated');
        res.status(200).json(response);

    } catch(err){
        console.log(err);
        res.status(500).json({error : 'internal Error'})
    }
  
})

// delete data by the ID  
router.delete('/:id' , async (req , res) => {
    try {
        const personId = req.params.id; // Extract the id from the URL parameter
        const response = await person.findByIdAndDelete(personId); // delete the person with the given id
        if (!response) {
            return res.status(404) .json({error: 'person not found'})
        }
        console.log("data deleted");
        res.status(200).json({massage: 'person deleted Successfully '})
    }catch (err) {
        console.log(err) ;
        res.status(500). json({error : 'internal servar error'})

    }
})
  
module.exports = router;
