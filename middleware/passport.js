const bcrypt = require("bcrypt");
const { User } = require("../db/models");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const { JWT_SECRET } = require("../config/keys");
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;

exports.localStrategy = new LocalStrategy (
    async (username, password, done) => {
        try {
            const user = await User.findOne({ where: {username} });

            let passwordsMatch = user
            ? await bcrypt.compare(password, user.password)
            : false;

            return done(null, passwordsMatch ? user : false);
        } catch(error) {
            return done(error);
        }
    }
);

exports.jwtStrategy = new JWTStrategy({
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
    }, 
    async (jwtPayload, done) => {
        if (jwtPayload.exp < Date.now()) {
            return done(null, false);
        } else {
            try {
                const user = await User.findByPk(jwtPayload.id);
                return done(null, user);
            } catch(error) {
                return done(error);
            }
        };
    }
);