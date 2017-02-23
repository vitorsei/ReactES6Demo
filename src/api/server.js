const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');

const authors = [
    {
        id: 'jean-gray',
        firstName: 'Jean',
        lastName: 'Gray'
    },
    {
        id: 'bobby-drake',
        firstName: 'Bobby',
        lastName: 'Drake'
    },
    {
        id: 'james-howlett',
        firstName: 'James',
        lastName: 'Howlett'
    },
    {
        id: 'erik-magnus',
        firstName: 'Erik',
        lastName: 'Magnus'
    },
    {
        id: 'kurt-wagner',
        firstName: 'Kurt',
        lastName: 'Wagner'
    }
];

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

// load passport strategies
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

const authCheckMiddleware = require('./authCheck');
app.use('/api', authCheckMiddleware);

app.get('/api/authors', (req, res) => {
    res.json(authors);
});

// app.get('/api/jedis/:id', authCheck, (req, res) => {
//     res.json(jedis.filter(jedi => jedi.id === parseInt(req.params.id))[0]);
// });

app.listen(7000);