const express= require('express')
const router = express.Router()
const Author = require('../model/authorModel')

router.post('/',(req,res)=>{
    try{
    const {_id,name,age,totalBooks,description}= req.body;
    const author = new Author({_id,name,age,totalBooks,description});
    author.save();
    res.status(201).send({message:`Author ${name} Saved`});
    }catch(err){
        res.status(500).send(err.message)
    }
})

router.get('/',async (req,res)=>{
    try{
        const author = await Author.find();
        res.status(200).send(author);
    }catch(err){
        res.status(500).send(err.message)
    }
})
module.exports=router;

