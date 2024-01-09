const express = require('express');
const path = require('path');
const cookieparser = require('cookie-parser');
const app = express();
const session = require('express-session');
const { v4:uuidv4} = require('uuid');

const router = require('./router');

const port = 3000;

//parsing the incoming data 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Using Sessions
app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true
}));

// declaring View engine
app.set('view engine', 'ejs');

//Load static assets
app.use('/static',express.static(path.join(__dirname, 'public')));
app.use('/assets',express.static(path.join(__dirname, 'public/assets')));

app.use('/route', router)

// Home Route
app.get('/', (req, res) => {
    if (req.session.user) {
        res.redirect('/route/dashboard');
    } else {
        res.render("base", {title : "Login Page"});
    }
});

app.listen(port, () => {
    console.log('Listening the Server on http://localhost:3000');
});
