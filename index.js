const express = require('express');
const env = require('./config/environment');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const path = require('path');


const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');


app.use(sassMiddleware
    ({
        // Options
        src: path.join(__dirname, env.asset_path, 'scss'), // where to look for scss
        dest: path.join(__dirname, env.asset_path, 'css'), // where to deliver the css which is made using scss
        debug: false, // this will print errors if any
        outputStyle: 'extended', // similar to word-wrap thing
        prefix: '/css' // unclear concept
    })
);
app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static(env.asset_path));
// make the uploads path avaiable to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(expressLayouts);
// extract style and scripts from subpages into the layout 
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in db
app.use(session
({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: 
    {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore
    (
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function(err)
        {
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

//use express router
app.use('/', require('./routes'));

app.listen(port, function(err)
{
    if(err)
    {
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});