const fs = require("fs");
const path = require("path");
const express = require("express");
const PORT = 3000;

const app = express();

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

//To use the contents inside the public directory
app.use(express.static(path.join(__dirname, "/public")));
//To handle POST requests
app.use(express.urlencoded({ extended: true }));

const accountData = fs.readFileSync("./src/json/accounts.json", {
  encoding: "utf8",
});
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync("./src/json/users.json", { encoding: "utf8" });
const users = JSON.parse(userData);

app.get("/", (req, res) => {
  res.render("index", { title: "Account Summary", accounts: accounts });
});

app.get("/savings", (req, res) => {
  res.render("account", { account: accounts.savings });
});

app.get("/checking", (req, res) => {
  res.render("account", { account: accounts.checking });
});

app.get("/credit", (req, res) => {
  res.render("account", { account: accounts.credit });
});

app.get("/profile", (req, res) => {
  res.render("profile", { user: users[0] });
});

app.get("/transfer", (req, res) => {
  res.render("transfer");
});

app.post("/transfer", (req, res) => {
  accounts[req.body.from].balance =
    accounts[req.body.from].balance - req.body.amount;
  accounts[req.body.to].balance =
    accounts[req.body.to].balance + parseInt(req.body.amount);
  const accountsJSON = JSON.stringify(accounts);
  fs.writeFileSync(path.join(__dirname, "json/accounts.json"), accountsJSON, {
    encoding: "utf8",
  });
  res.render("transfer", { message: "Transfer Completed" });
});

app.get("/payment", (req, res) => {
  res.render("payment", { account: accounts.credit });
});

app.post("/payment", (req, res) => {
  accounts.credit.balance = accounts.credit.balance - parseInt(req.body.amount);
  accounts.credit.available =
    accounts.credit.available + parseInt(req.body.amount);
  const accountsJSON = JSON.stringify(accounts);
  fs.writeFileSync(path.join(__dirname, "json/accounts.json"), accountsJSON, {
    encoding: "utf8",
  });
  res.render("payment", {
    message: "Payment Successful",
    account: accounts.credit,
  });
});

app.listen(PORT, () => console.log(`PS Project Running on port ${PORT}!`));
