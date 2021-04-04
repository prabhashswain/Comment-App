const express = require('express');
const { homeController, postComment,getComments } = require('../controllers/homeController');

const router = express.Router();

router.get('/',homeController);
router.post('/api/comment',postComment);
router.get('/api/getComment',getComments);

module.exports = router;