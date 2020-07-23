require('dotenv').config();
const secret = process.env.JWT_TOKEN;
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const WithAuth = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token)
        res.status(401).json({ error: 'Não autorizada pelo token.' });
    else {
        jwt.verify(token, secret, (err, decode) => {
            if (err)
                res.status(401).json({ error: 'Token inválido.' });
            else {
                req.email = decoded.email;
                User.findOne({ email: decoded.email })
                    .then(user => {
                        req.user = user;
                        next();
                    }).catch(err => {
                        res.status(401).json({ error: err });
                    })
            }
        })
    }
}

module.exports = WithAuth;