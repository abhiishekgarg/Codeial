const queue = require('../config/kue');

const commentsMailer = require('../mailers/comments_mailer');

queue.process('commenter-email', function(job, done)
{
    console.log('Comment email worker is processing a job (commenter)');
    commentsMailer.newComment(job.data);
    done();
});

queue.process('post-owner-email', function(job, done)
{
    console.log('Comment email worker is processing a job (post owner)');
    commentsMailer.newCommentOnPost(job.data);
    done();
});