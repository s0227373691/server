const mongoose = require('mongoose');
const Joi = require('joi');

const User = mongoose.model(
    'User',
    new mongoose.Schema({
        type: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 20,
        },
        email: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 255,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 1024,
        },
    })
);

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(20).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
    });

    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
