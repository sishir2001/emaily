// TODO : need to deploy this development app in heroku
// ! node is not updated to handle ES2015 modules , it uses commonJS modules
const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");

require("./models/User"); // running the file for Model Class in mongoose
require("./services/passport"); // ? just calling require will execute the /services/passport.js file

// * connecting to the mongoDB Atlas using the address link
mongoose.connect(keys.mongoURI);

const app = express();

// @ app.use -> wiring up the middleware to express
// @ middlewares -> are small functions that modify requests before they are sent off to the routes

// ! express has no idea how manage cookies , we use cookie-management library to handle cookies
app.use(
    cookieSession({
        //this is a configuration object
        maxAge: 30 * 24 * 60 * 60 * 1000, // passing in milliseconds
        keys: [keys.cookieKeys], // for encryption
    })
);

// ! Telling passport to manage authentication using cookies
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app); // ? executing the function returned by authRoutes file

const PORT = process.env.PORT || 3030;
// listening on 5000 port number
app.listen(PORT);
