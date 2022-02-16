// ! for production purposes

if(process.env.NODE_ENV === 'production'){
    // we are in production environment(heroku)
    module.exports = require("./prod");
}
else{
    // we are in development environment(local)
    module.exports = require("./dev");
}