const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const { User } = require('../../modules/user');

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false });
    }
});
// user login 處理
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email }); // 獲取user資料，找不到為 null

    if (!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
    );
    if (!validPassword) {
        return res.status(400).send('Invalid email or password.');
    } else {
        //TODO 私鑰應改至環境變量
        const token = jwt.sign({ _id: user._id }, 'jwt');

        user = {
            name: user.name,
            email: user.email,
        };

        req.session.user = user;

        res.json({ auth: true, token, user });
    }
});

function validate(req) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
    });

    return schema.validate(req);
}

module.exports = router;
