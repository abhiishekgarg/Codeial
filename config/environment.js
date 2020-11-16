

const development =
{
    name: 'development',
    asset_path: '/assets',
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
    jwt_secret: 'codeial'
}

const production = 
{
    name: 'production'
}

module.exports = development;