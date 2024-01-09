const express = require('express');
const router = express.Router();

const credential = {
    email : 'admin@gmail.com',
    password : 'admin12345'
};

// Login User
router.post('/login',(req, res) => {
    if (req.body.email == credential.email && req.body.password == credential.password) {
        req.session.user = req.body.email;
        res.redirect('/route/dashboard');
    } else {
        if (req.body.email !== credential.email) {
            res.render('base',{alert : 'Invalid Username'});
        } else if (req.body.password !== credential.password) {
            res.render('base',{alert : 'Incorrect Password'});
        };
    };
});

// route for Dashboard
router.get('/dashboard', (req, res) => {
    if (req.session.user) {
        res.render('dashboard', {user : req.session.user})
    } else {
        res.send('Unauthorised User');
    };
});

// route for logout
router.get('/logout',(req, res) => {
    req.session.destroy(function(err) {
        if (err) {
            res.send('Error');
        } else {
            res.render('base',{title : 'Login Page', message : 'Logout Successfully'});
        };
    });
});

module.exports = router;