const nodemailer = require('../config/nodemailer');


// this is another way of exporting a method
exports.newComment = (comment) => 
{
    let htmlString = nodemailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');
    console.log('Inside newComment mailer');

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