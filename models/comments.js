const { Schema,model } = require('mongoose');

const CommentSchema = new Schema({
    username : { type:String,required:true },
    comment : { type:String,required:true }
},{timestamps:true});

module.exports = model('comment',CommentSchema)
