const db = require("../models/db");

const insertDB = (email, password) => {
  const query = {
    text: "INSERT INTO users(email, password) VALUES($1, $2)",
    values: [`${email}`, `${password}`],
  };
  db(query);
};

module.exports = insertDB;
