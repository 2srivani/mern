const express = require('express');
const router = express.Router();
const Books = require('../model/bookModel');
const Author = require('../model/authorModel');

// POST a new book
router.post('/', async (req, res) => {
    try {
        const { _id, name, publisher, description, authorId } = req.body;
        const book = new Books({ _id, name, publisher, description, authorId });

        // Save book data in the database
        await book.save();
        const authfetch = await Author.findById(authorId);
        if (!authfetch) {
            return res.status(404).send({ message: "Author not found" });
        }
        authfetch.totalBooks += 1;
        await authfetch.save();

        res.status(201).send({ message: `Book ${name} Saved` });
    } catch (err) {
        res.status(500).send(err.message);
    }
});
router.get('/',async (req,res)=>{
    try{
        const books = await Books.find();
        res.status(200).send(books);
    }catch(err){
        res.status(500).send(err.message)
    }
})

module.exports = router;