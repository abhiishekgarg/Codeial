const queue = require('../config/kue');

const resetPasswordMailer = require('../mailers/reset_password_mailer');

queue.process('user-emails', function(job, done)
{
    console.log('User email worker is processing a job ', job.data);
    resetPasswordMailer.resetPassword(job.data);
    done();
});