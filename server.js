// Node package
const express = require("express");
const app = express();
const path = require("path");
// Routers
const userRouter = require("./routes/user");
const registrationRouter = require("./routes/register");
// Utils functions
const hashPassword = require("./utils/hashPassword");
const comparePasswords = require("./utils/comparePassword");
const queryDB = require("./utils/queryDB");
const insertDB = require("./utils/insertDB");

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use("/register", registrationRouter);
app.use("/user", userRouter);

// Render the main page when user connect to the app
app.get("/", (req, res) => {
  console.log("This is my home page");
  res.render("auth", {
    noEmail: "",
    wrongPsw: "",
  });
});

// Listen for client post request on route /register
app.post("/register", async (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
  };
  console.log("newUser :", newUser);
  try {
    const registeredPassword = await hashPassword(newUser.password);
    insertDB(newUser.email, registeredPassword);
  } catch (err) {
    console.error(err.message);
  }
  res.redirect("/");
});

// Listen for client post request on main page
app.post("/", async (req, res) => {
  // Retrieve data from authentification input
  const thisUser = {
    email: req.body.email,
    password: req.body.password,
  };
  console.log("thisUser :", thisUser);
  try {
    const dbResult = await queryDB(thisUser.email);
    console.log(dbResult);
    // handle inexistent user
    if (dbResult === undefined) {
      console.error("No user with such email exists");
      res.render("auth", {
        noEmail: "No user with such email exists",
        wrongPsw: "",
      });
    }
    const result = await comparePasswords(thisUser.password, dbResult.password);
    console.log("result of comparaison :", result);
    // handle wrong password
    if (result === false) {
      console.error("Incorrect password");
      res.render("auth", {
        noEmail: "",
        wrongPsw: "Wrong password",
      });
      // Render user page if authentification is successful
    } else {
      console.log("User authenticated successfully");
      res.redirect(`/user?email=${req.body.email}`);
    }
  } catch (err) {
    console.error("error while verifying user authentification :", err);
  }
});

app.listen(3000, () => {
  console.log("Server is listening at http://localhost:3000");
});
