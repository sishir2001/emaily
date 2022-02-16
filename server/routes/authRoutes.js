const passport = require("passport");
// should be executed in the index.js file , we are exporting a fuction with an argument
module.exports = (app) => {
    app.get(
        "/auth/google",
        passport.authenticate("google", {
            scope: ["profile", "email"],
        })
    );

    app.get("/auth/google/callback", passport.authenticate("google"));

    app.get("/api/logout", (req, res) => {
        // passport adds functions to req
        req.logout();
        res.send(req.user);
    });

    // ! development route
    app.get("/api/currentUser", (req, res) => {
        res.send(req.user);
    });
};
