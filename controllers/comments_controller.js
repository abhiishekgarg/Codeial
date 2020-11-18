const Comment = require('../models/comment');
const Post = require('../models/post');
const Like = require('../models/like');
const commentsMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');


module.exports.create = async function(req, res)
{
    try
    {
        let post = await Post.findById(req.body.post);
        if(post)
        {
            let comment = await Comment.create
            (
                {
                    content: req.body.content,
                    post: req.body.post,
                    user: req.user._id
                }
            );
            post.comments.push(comment);
            post.save();

            // Similar for comments to fetch the user's id!
            comment = await comment
            .populate
            ({
                path: 'user',
                model: 'User'
            })
            .populate
            ({
                path: 'post',
                model: 'Post',
                populate:
                {
                    path: 'user',
                    model: 'User'
                }
            }).execPopulate();

            // when not using redis
            // commentsMailer.newComment(comment);

            // job variable stores data in itself
            let job1 = queue.create('commenter-email', comment).save(function(err)
            {
                if(err)
                {
                    console.log('Error in sending to the queue', err);
                    return;
                }
                console.log('Job enqueued', job1.id);
            });

            let job2 = queue.create('post-owner-email', comment).save(function(err)
            {
                if(err)
                {
                    console.log('Error in sending to the queue', err);
                    return;
                }
                console.log('Job enqueued', job2.id);
            });

            if (req.xhr)
            {
                return res.status(200).json
                ({
                    data: 
                    {
                        comment: comment
                    },
                    message: "Comment created"
                });
            }

            req.flash('success', 'Comment Added');
            return res.redirect('back');
        }
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
        let comment = await Comment.findById(req.params.id);
        let post = await Post.findById(comment.post);
        if(comment.user == req.user.id ||  post.user == req.user.id)
        {
            let postId = comment.post;

            comment.remove();

            let post = Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});

            await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});

            // send the comment id which was deleted back to the views
            if (req.xhr)
            {
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Comment deleted"
                });
            }
                
            req.flash('success', 'Comment Removed');
            return res.redirect('back');
        }
        else
        {
            req.flash('error', 'Unauthorized');
            return res.redirect('back');
        }
    }
    catch(err)
    {
        req.flash('error', err);
        return;
    }
}

