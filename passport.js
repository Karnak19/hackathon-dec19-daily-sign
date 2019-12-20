require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const jwt = require("jsonwebtoken");

const secret = process.env.SECRET;
const User = require("./models/user");

const credentials = {
  google: {
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: `${process.env.BACK_HOST}/auth/google/callback`
  }
};

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(credentials.google, async (accesToken, refreshToken, profile, done) => {
    let userData = {
      email: profile.emails[0].value,
      token: accesToken,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      avatar: profile.photos[0]
    };
    let [createdUser, created] = await User.findOrCreate({
      where: {
        email: userData.email
      },
      defaults: {
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        avatar: profile.photos[0].value
      }
    });

    console.log(createdUser.dataValues);

    userData.id = createdUser.uuid;
    userData.jwt = jwt.sign({ email: userData.email }, secret, {
      expiresIn: "1h"
    });

    done(null, userData);
  })
);
