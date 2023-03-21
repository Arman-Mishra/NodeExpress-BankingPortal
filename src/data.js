const fs = require("fs");
const path = require("path");

const accountData = fs.readFileSync("./src/json/accounts.json", {
  encoding: "utf8",
});
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync("./src/json/users.json", { encoding: "utf8" });
const users = JSON.parse(userData);

const writeJSON = (accountsJSON = "") => {
  fs.writeFileSync(path.join(__dirname, "json/accounts.json"), accountsJSON, {
    encoding: "utf8",
  });
};

module.exports = { accounts, users, writeJSON };
