require("./config/db");
require('dotenv').config();

const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./router");
const port = process.env.APP_PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

const startServer = () => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

startServer();
