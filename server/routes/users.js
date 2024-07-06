//routes->users.js
//routes->users.js
const express = require('express')
const router = express.Router();
const User = require('../model/userSchema');
//REST API POST METHOD TO HANDLE POST REQUEST
router.post('/',(req, res) => {
 try {
 const { name, email, password } = req.body;
 const userQuery= new User({ name, email, password });
 //after our query is created
 userQuery.save();
 res.status(201).send({message:"user added",userQuery});
 } catch (err) {
 res.status(500).send({message:err});
 }

});
//get the data 
router.get('/',async (req,res)=>{
    try{
        const data = await User.find();
        res.status(201).send(data);
    }catch(err){
        res.status(500).send({message:err})
    }
})
//put the data(update the data)
router.put('/:id',async (req,res)=>{
    try{
        const {password}=req.body;
        const userId = req.params.id;
        const updatedUser= await User.findByIdAndUpdate(userId,{password: password},{new:true});
        if(!updatedUser)
        {
           return res.status(404).send({message:"User  not found"});
        }
        res.status(201).send({message:"Password updated sucessfully",updatedUser});
    }
    catch(err)
    {
        res.status(500).send({message:err})
    }
})
module.exports=router;