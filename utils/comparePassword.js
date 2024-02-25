const bcrypt = require("bcrypt");

const comparePasswords = async (inputPassword, storedPassword) => {
  const matchResult = await bcrypt.compare(inputPassword, storedPassword);
  console.log("matchResult :", matchResult);
  return matchResult;
};

module.exports = comparePasswords;
