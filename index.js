const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

app.use(sassMiddleware
    ({
        // Options
        src: './assets/scss/', // where to look for scss
        dest: './assets/css', // where to deliver the css which is made using scss
        debug: false, // this will print errors if any
        outputStyle: 'extended', // similar to word-wrap thing
        prefix: '/css' // unclear concept
    })
);
app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

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
    secret: 'blahsomething',
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