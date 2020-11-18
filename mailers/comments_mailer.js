const nodemailer = require('../config/nodemailer');


// this is another way of exporting a method
exports.newComment = (comment) => 
{
    let htmlString = nodemailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');
    console.log('Inside newComment Mailer');

    nodemailer.transporter.sendMail
    (
        {
            from: 'abhiishekgarg@gmail.com',
            to: comment.user.email,
            subject: "New Comment Published!",
            html: htmlString
        },
        (err, info) =>
        {
            if(err)
            {
                console.log('Error in sending mail', err);
                return;
            }
            //console.log('Message sent', info);
            return;
        }
    );
}

exports.newCommentOnPost = (comment) => 
{
    let htmlString = nodemailer.renderTemplate({comment: comment}, '/comments/new_comment_on_post.ejs');
    console.log('Inside newCommentOnPost Mailer');

    nodemailer.transporter.sendMail
    (
        {
            from: 'abhiishekgarg@gmail.com',
            to: comment.post.user.email,
            subject: "New Comment on your Post!",
            html: htmlString
        },
        (err, info) =>
        {
            if(err)
            {
                console.log('Error in sending mail', err);
                return;
            }
            //console.log('Message sent', info);
            return;
        }
    );
}