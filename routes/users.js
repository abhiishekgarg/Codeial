const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');
const postsController = require('../controllers/posts_controller');


router.get('/', function(req, res)
{
    return res.end('<h1>Go ahead!</h1>');
});
router.get('/profile', usersController.profile);
router.get('/posts', postsController.posts);


module.exports = router;