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
        req.flash('error', err);
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