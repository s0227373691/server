const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        res.send('No token received');
    } else {
        jwt.verify(token, 'jwt', (err, decoded) => {
            if (err) {
                res.json({ auth: false, message: 'Fail to authenticate' });
            } else {
                req.userId = decoded.id;
                next();
            }
        });
    }
};

module.exports = verifyJWT;
