const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../db/models");
const { JWT_SECRET, JWT_EXPIRATION_MS} = require("../config/keys");

exports.signup = async (req, res, next) => {
    const { password } = req.body;
    const saltRounds = 10;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        req.body.password = hashedPassword;
        const newUser = await User.create(req.body);
        const payload = {
            id: newUser.id,
            username: newUser.username,
            exp: Date.now() + JWT_EXPIRATION_MS,
            admin: newUser.admin,
        };
        const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
        res.status(201).json({ token });
    } catch(error) {
        next(error);
    }
};

exports.signin = async (req, res) => {
    const {user} = req;
    const payload = {
        id: user.id,
        username: user.username,
        exp: Date.now() + JWT_EXPIRATION_MS,
        admin: user.admin,
    };
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    res.json({ token });
};