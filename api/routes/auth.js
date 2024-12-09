const express = require('express');
const router = express.Router();
const auth = require("../utils/users.auth");
const userRepo = require("../utils/users.repository");

// http://localhost:9000/auth
// USE AUTHORIZATION HERE (the method does not know if authorization is present)
// MAC/DAC/RBAC, Claims-based authorization, Policy-based authorization, Resource-based authorization
router.get("/user", auth.authorizeRequest("USER"), userdataAction); // expose function only for USER roles
router.get("/admin", auth.authorizeRequest("ADMIN"), userdataAction); // expose function only for ADMIN roles
router.get("/protected", protectedGetAction); // execute authorization in action method: needed for resource-based auth
router.post("/login", loginPostAction);
router.post("/register", signupPostAction);
router.get("/logout", logoutAction);
router.get("/session-status", checkStatus);

function checkStatus(req, res) {
    if (req.isAuthenticated()) {
        return res.json({ loggedIn: true, user: req.user, role: req.role });
    } else {
        return res.json({ loggedIn: false });
    }
}

// use same endpoints for both roles
async function userdataAction(request, response) {
    let userJson = JSON.stringify(request.user);
    response.send(userJson);
}

async function protectedGetAction(request, response) {
    // TODO: authorize using all factors (resource / context / environment) ...
    let userRole = "GUEST CONTENT";
    if (request.isAuthenticated()) {
        if (request.user.user_role === "ADMIN") {
            userRole = "ADMIN CONTENT";
        } else {
            userRole = "USER CONTENT";
        }
    }
    response.send(userRole);
}

async function loginPostAction(request, response) {
    //passport.authenticate('local', { successRedirect: '/' }));
    let areValid = await userRepo.areValidCredentials(request.body.username, request.body.password);
    console.log('credentialsAreValid: ' + areValid);

    if (areValid) {
        user = await userRepo.getOneUser(request.body.username);
        request.login(user, function (err) {
            if (err) {
                console.log("LOGINERROR");
                console.log(err);
                areValid = false;
                // return next(err);
            }
            let resultObject = { "loginResult": areValid, "timestamp": new Date().toLocaleString() };
            response.send(JSON.stringify(resultObject));
        });
    } else {
        let resultObject = { "loginResult": areValid, "timestamp": new Date().toLocaleString() };
        response.send(JSON.stringify(resultObject));
    }
}

async function signupPostAction(req, res) {
    try {
        console.log('Sign Up process started ...');
        const {username, email, password} = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({error: "All fields are required."});
        }

        const existingUser = await userRepo.getOneUser(username);
        if (existingUser) {
            return res.status(409).json({error: "Username already exists."});
        }

        const result = await userRepo.createUser(username, email, password);

        if (result) {

            let areValid = await userRepo.areValidCredentials(username, password);
            console.log('credentialsAreValid: ' + areValid);

            if (areValid) {
                user = await userRepo.getOneUser(username);
                req.login(user, function (err) {
                    if (err) {
                        console.log("LOGINERROR");
                        console.log(err);
                        areValid = false;
                    }
                    let resultObject = { "loginResult": areValid, "timestamp": new Date().toLocaleString() };
                    res.send(JSON.stringify(resultObject));
                });
            } else {
                let resultObject = { "loginResult": areValid, "timestamp": new Date().toLocaleString() };
                res.send(JSON.stringify(resultObject));
            }

        } else {
            res.status(500).json({error: "Failed to register user."});
        }
    } catch (err) {
        console.error("Error during user registration:", err);
        res.status(500).json({error: "Internal server error."});
    }
}

function logoutAction(request, response) {
    request.logout(function(err){
        let resultObject = { "logoutResult": true, "timestamp": new Date().toLocaleString() };
        if (err) {
            console.log("LOGINERROR");
            console.log(err);
            areValid = false;
            // return next(err);
        }
        response.send(JSON.stringify(resultObject));
    });
}



module.exports = router;