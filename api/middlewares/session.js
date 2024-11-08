const session = require("express-session");

module.exports = session({
    secret: "SecretRandomStringDskghadslkghdlkghdghaksdghdksh",
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day in milliseconds
    resave: false
});
