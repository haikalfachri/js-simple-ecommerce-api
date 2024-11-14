require('dotenv').config();

const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./router");
const port = process.env.APP_PORT || 5000;
const { createDatabase, migrate } = require("./config/migrate");
const { seeder } = require("../prisma/seed");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

const startServer = () => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

const startApp = async () => {
    try {
        // await createDatabase();
        // await migrate();
        startServer();
        seeder();
    } catch (error) {
        console.error("Failed to start the application:", error);
    }
};

startApp();