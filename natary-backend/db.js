const mysql = require("mysql2");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "ari010704",
    database: "limpia_fast"
});

module.exports = db;