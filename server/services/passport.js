const passport = require("passport");
const mongoose = require("mongoose");
const GoogleStatergy = require("passport-google-oauth20").Strategy; // need a seperate statergy for every new organisation
const keys = require("../config/keys");

const User = mongoose.model("users"); // will get a model class related to users collection in mongoDB

// ! why do we need this serializeUser function -> for cookie generation
passport.serializeUser((user, done) => {
    // @arg: passing an error if any error exists
    // @arg: passing the model instance of the users model class
    done(null, user.id);
});

// ! why do we need this deserializeUser function -> for knowing the user from the gotten cookie
passport.deserializeUser((id,done)=>{
    // finding a model instance with the id
    User.findById(id).then((user)=>{
        done(null,user);
    });
});

// setting up passportjs
// telling the general passport library to use specific stratergy
passport.use(
    new GoogleStatergy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: "/auth/google/callback",
        },
        (accessToken, refreshToken, profile, done) => {
            // TODO : need to save the googleId to mongoDB
            // ! all queries to mongoDB cloud are asynchrounous in nature

            // this returns a promise
            User.findOne({
                googleId: profile.id,
            }).then((existingUser) => {
                if (!existingUser) {
                    // no user exists with the googleid , create a new user record
                    // creating a new user record in users collection
                    new User({
                        googleId: profile.id,
                    })
                        .save()
                        .then((user) => {
                            // @arg: passing an error if any error exists
                            // @arg: passing the model instance of the users model class
                            done(null, user);
                        });
                } else {
                    // a user exists , we call done to tell passport to come out of this chain
                    // @arg: passing an error if any error exists
                    // @arg: passing the model instance of the users model class
                    done(null, existingUser);
                }
            });
        }
    )
);

// no need to export anything , we just want this file to be executed in the index.js file
