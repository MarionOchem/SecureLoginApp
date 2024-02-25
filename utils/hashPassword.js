const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashPassword = async (password) => {
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    console.log("Hashed password:", hash);
    return hash;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

module.exports = hashPassword;
