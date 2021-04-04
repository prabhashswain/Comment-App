const comment = require('../models/comments');

const homeController = (req,res) => {
    return res.render('index')
}
const postComment = async (req,res) => {
    const comments = new comment({
        username:req.body.username,
        comment:req.body.comment
    })
    const response = await comments.save()
    return res.send(response)
}
const getComments = async (req,res)=> {
    const result = await comment.find()
    return res.send(result);
}
module.exports = {
    homeController,
    postComment,
    getComments
}