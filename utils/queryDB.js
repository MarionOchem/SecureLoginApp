const db = require("../models/db");

const queryDB = async (email) => {
  const query = {
    text: "SELECT email, password FROM users WHERE email = $1",
    values: [email],
  };
  try {
    const queryResult = await db(query);
    return queryResult[0];
  } catch (error) {
    console.error("Error while querying data from db");
    throw error;
  }
};

module.exports = queryDB;
