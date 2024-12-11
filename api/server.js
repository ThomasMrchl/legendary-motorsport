const dotenv = require('dotenv');
dotenv.config();
const pool = require('./databases/db');

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

//Test database connection
const testDatabaseConnection = async () => {
    try {
        const [rows] = await pool.query('SELECT 1');
        console.log('Database connection successful! Test query result:', rows);
    } catch (err) {
        console.error('Error testing database connection:', err.message);
    }
};

// Call the function to test connection
testDatabaseConnection()

app.set("view engine", "ejs");
app.set("views", "views");
app.listen(PORT, '0.0.0.0',
    function() { console.log("Listening on "+PORT); }
);

const carRoutes = require('./routes/car');
const userRoutes = require('./routes/user');
const franchiseRoutes = require('./routes/franchise');
const addressRoutes = require('./routes/address');

// *** MIDDLEWARES ***
// Import middlewares
const bodyParserMiddlewares = require('./middlewares/bodyParser');
const sessionMiddleware = require('./middlewares/session');
const corsMiddleware = require('./middlewares/cors');

// Use middlewares
app.use(...bodyParserMiddlewares);
app.use(sessionMiddleware);
app.use(corsMiddleware);

//configure passport
const auth = require("./utils/users.auth"); // PASSPORT
auth.initializeAuthentications(app); // PASSPORT
app.use("/auth", require("./routes/auth")); // PASSPORT

// *** ROUTES/CONTROLLERS ***

// setup default route
app.get('/', (request, response) => { // 'GET' as a HTTP VERB, not as a 'getter'!
    let clientIp = request.ip;
    response.send(`Hello, dear ${clientIp}. I am a nodejs website...`);
    response.end(); // optional
});

app.use('/car', carRoutes);
app.use('/user', userRoutes);
app.use('/franchise', franchiseRoutes);
app.use('/address', addressRoutes);

// setup additional routes
// app.use(routeBase, callback);
app.use("/static", express.static(__dirname + '/static'));
// app.use("/auth", require("./controllers/auth.route"));
