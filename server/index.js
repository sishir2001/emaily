// TODO : need to deploy this development app in heroku
// ! node is not updated to handle ES2015 modules , it uses commonJS modules
const express = require("express");
const passport = require("passport");
const GoogleStatergy = require("passport-google-oauth20").Strategy; // need a seperate statergy for every new organisation
const keys = require("./config/keys");

const app = express();

// telling the general passport library to use specific stratergy
passport.use(
    new GoogleStatergy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: "/auth/google/callback",
        },
        (accessToken,refreshToken,profile,done) => {

            // ? this is the function that passports calls after requesting google for info
            console.log(`accessToken : ${accessToken}`);
            console.log(`refreshToken : ${refreshToken}`);
            console.log(`profile :`);
            console.log(profile);
            console.log(`done : `);
            console.log(done);
        }
    )
);

app.get(
    "/auth/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);

app.get("/auth/google/callback",passport.authenticate("google"));

const PORT = process.env.PORT || 3030;
// listening on 5000 port number
app.listen(PORT);
