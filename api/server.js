const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
app.set("view engine", "ejs");
app.set("views", "views");
app.listen(process.env.WEB_PORT, '0.0.0.0',
    function() { console.log("Listening on "+process.env.WEB_PORT); }
);

const carRoutes = require('./routes/car');

// *** MIDDLEWARES ***
// Import middlewares
const bodyParserMiddlewares = require('./middlewares/bodyParser');
const sessionMiddleware = require('./middlewares/session');
const corsMiddleware = require('./middlewares/cors');

// Use middlewares
app.use(...bodyParserMiddlewares);
app.use(sessionMiddleware);
app.use(corsMiddleware);

// configure passport
// const auth = require("./utils/users.auth");
// auth.initializeAuthentications(app);

// *** ROUTES/CONTROLLERS ***

// setup default route
app.get('/', (request, response) => { // 'GET' as a HTTP VERB, not as a 'getter'!
    let clientIp = request.ip;
    response.send(`Hello, dear ${clientIp}. I am a nodejs website...`);
    response.end(); // optional
});

// app.use('/car', carRoutes);

// setup additional routes
// app.use(routeBase, callback);
app.use("/static", express.static(__dirname + '/static'));
//app.use("/carsapi", require("./controllers/carsapi.route"));
// app.use("/auth", require("./controllers/auth.route"));
