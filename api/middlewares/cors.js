const cors = require("cors");

const corsMiddleware = cors({
    origin: "http://localhost:8081",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
});

module.exports = corsMiddleware;