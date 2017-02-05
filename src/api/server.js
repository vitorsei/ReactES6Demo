const express = require('express');
const app = express();
const jwt = require('express-jwt');
const cors = require('cors');

app.use(cors());
app.use(express.static('public'));


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

// Authentication middleware provided by express-jwt.
// This middleware will check incoming requests for a valid
// JWT on any routes that it is applied to.

const authCheck = jwt({
    secret: 'bpnPTOrj4rRzS3O8VCWU42mFq2-ollKSqas8ZOtGfbD1flp__r6OOkU9Ill9HS4j',
    // If your Auth0 client was created before Dec 6, 2016,
    // uncomment the line below and remove the line above
    // secret: new Buffer('AUTH0_SECRET', 'base64'),
    audience: 'btqOmSQCe4cV3qU8peDSHaVbK14s7Y2B'
});

app.get('/api/authors', (req, res) => {
    res.json(authors);
});

// app.get('/api/jedis/:id', authCheck, (req, res) => {
//     res.json(jedis.filter(jedi => jedi.id === parseInt(req.params.id))[0]);
// });

app.listen(7000);