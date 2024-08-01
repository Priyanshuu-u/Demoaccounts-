const express = require("express");
const app = express();
const path = require("path");

const port = 8080;
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.listen(port, () => {
    console.log("Listening to requests");
});

app.get("/", (req, res) => {
    res.render("instagram.ejs");
});

app.get("/ig/search", (req, res) => {
    const { username } = req.query;
    res.redirect(`/ig/${username}`);
});

app.get("/ig/:username", (req, res) => {
    let { username } = req.params;
    const userData = require("./data.json");
    const data = userData[username];
    if (data) {
        res.render("instagram.ejs", { data });
    } else {
        res.send("This User does not exist");
    }
});
