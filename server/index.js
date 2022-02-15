// ! node is not updated to handle ES2015 modules , it uses commonJS modules
const express = require("express");
const passport = require("passport");
const GoogleStatergy = require("passport-google-oauth20").Strategy; // need a seperate statergy for every new organisation

const app = express();

// telling the general passport library to use specific stratergy
// passport.use(new GoogleStatergy());

app.get("/", (req, res) => {
    // @param req: request object to the "/" route
    // @param res: response object that needs to be sent
    res.send({
        developer: "Jaladi Saai Sishir",
        release: "1.0",
        header: "testing",
    });
});


const PORT = process.env.PORT || 3030;
// listening on 5000 port number
app.listen(PORT);
