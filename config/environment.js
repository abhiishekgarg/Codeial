// const fs = require('fs');
// const rfs = require('rotating-file-stream');
// const path = require('path');


// const logDirectory = path.join(__dirname, '../production_logs');
// fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// const accessLogStream = rfs.createStream('access.log', {
//     interval: '1hour',
//     // path: 'logDirectory'
//     path: 'production_logs'
// });


const development =
{
    name: 'development',
    asset_path: './public/assets',
    session_cookie_key: 'blahsomething',
    db: 'codeial_development',
    smtp: 
    {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth:
        {
            user: 'codeial69',
            pass: 'codeial@123'
        }
    },
    google_client_id: "390712674525-ag0mvt50ocfgsq3acc02a2cvkagamepj.apps.googleusercontent.com",
    google_client_secret: "1a9D-l4x5Qrnmg9qhqwxKH8Q",
    google_callback_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeial',
    // morgan:
    // {
    //     mode: 'dev',
    //     options: {stream: fs.accessLogStream}
    // }
}

const production = 
{
    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp: 
    {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth:
        {
            user: process.env.CODEIAL_GMAIL_USERNAME,
            pass: process.env.CODEIAL_GMAIL_PASSWORD
        }
    },
    google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_callback_url: process.env.CODEIAL_GOOGLE_CALLBACK_URL,
    jwt_secret: process.env.CODEIAL_JWT_SECRET,
    // morgan:
    // {
    //     mode: 'combined',
    //     options: {stream: fs.accessLogStream}
    // }
}

// module.exports = development;
module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);