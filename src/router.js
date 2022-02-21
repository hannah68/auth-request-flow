const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const mockUser = {
    username: 'authguy',
    password: 'mypassword',
    profile: {
        firstName: 'Chris',
        lastName: 'Wolstenholme',
        age: 43
    }
};


const secretKey = "thisismysecretkey";

//1. The client sends a request containing login credentials to the server.
//2. The server checks the credentials are correct and sends back a token.(The server creates an access token for the user and sends it back to the client);

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if(mockUser.username !== username || mockUser.password !== password){
        return res.status(401).send("Unauthorized");
    };
    const payload = { username, password }
    const token = jwt.sign(payload, secretKey);
    // console.log(token);
    return res.json({ tokenKey: token });
});



router.get('/profile', (req, res) => {
    // console.log(req.headers.authorization);
    const { authorization } = req.headers
    try{
        jwt.verify(authorization, secretKey);
        return res.json({data: mockUser});
    }
    catch(err){
        return res.send(err.message);
    }
});

module.exports = router;
