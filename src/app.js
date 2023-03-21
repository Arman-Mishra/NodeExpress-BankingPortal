const fs = require("fs");
const path = require("path");
const express = require("express");
const { accounts, users, writeJSON } = require("./data");
const accountRoutes = require("./routes/accounts");
const servicesRoutes = require("./routes/services");

const PORT = 3000;

const app = express();

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

//To use the contents inside the public directory
app.use(express.static(path.join(__dirname, "/public")));
//To handle POST requests
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { title: "Account Summary", accounts: accounts });
});

app.get("/profile", (req, res) => {
  res.render("profile", { user: users[0] });
});

app.use("/account", accountRoutes);
app.use("/services", servicesRoutes);

app.listen(PORT, () => console.log(`PS Project Running on port ${PORT}!`));
