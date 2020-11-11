const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req, res)
{
    try
    {
        let post = await Post.create
        (
            {
                content: req.body.content,
                user: req.user._id
            }
        );

        if(req.xhr)
        {
            // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it! (To display the user's name with the post added dynamically)
            post = await post.populate('user', 'name').execPopulate();

            return res.status(200).json
            ({
                data:
                {
                    post: post
                },
                message: 'Post created!'
            });
        }

        req.flash('success', 'Post published!');
        return res.redirect('back');
    }
    catch(err)
    {
        req.flash('Error', err);
        // added this to view the error on console as well
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.destroy = async function(req, res)
{
    try
    {
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id)
        {
            post.remove();

            await Comment.deleteMany({post: req.params.id});

            if(req.xhr)
            {
                return res.status(200).json
                ({
                    data:
                    {
                        post_id: req.params.id
                    },
                    message: 'Post deleted'
                });
            }

            req.flash('success', 'Post deleted!');
            return res.redirect('back');
        }
        else
        {
            return res.redirect('back');
        }
    }
    catch(err)
    {
        req.flash('error', err);
        return res.redirect('back');
    }
}