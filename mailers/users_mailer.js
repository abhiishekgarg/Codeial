const nodemailer = require('../config/nodemailer');


// this is another way of exporting a method
exports.resetPassword = (user) => 
{
    let htmlString = nodemailer.renderTemplate({user: user}, '/users/password_reset.ejs');
    console.log('Inside resetPassword Mailer');

    nodemailer.transporter.sendMail
    (
        {
            from: 'abhiishekgarg@gmail.com',
            to: user.email,
            subject: "Reset Your Password",
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

exports.signupSuccess = (user) => 
{
    let htmlString = nodemailer.renderTemplate({user: user}, '/users/signup_successful.ejs');
    console.log('Inside signupSuccessful Mailer');

    nodemailer.transporter.sendMail
    (
        {
            from: 'abhiishekgarg@gmail.com',
            to: user.email,
            subject: "Welcome to Codeial!",
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