const mongoose = require('mongoose')

const AuthorSchema = mongoose.Schema(
    {
        _id:{
            type: String,
            required: true,
        },
        name:{
            type: String,
            required: true,
        },age:{
            type: String,
            required: true,
        },totalBooks:{
            type: Number,
            required: true,
        },description:{
            type: String,
            required: true,
        }     
 }
)
module.exports = mongoose.model('Author',AuthorSchema);