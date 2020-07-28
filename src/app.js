const path = require("path");
const hbs = require("hbs");
const express = require("express");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPaths = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPaths);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Abhishek Ranjan",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        helpText:
            "Dolor ex in ex ad est officia. Proident enim magna quis est proident. Nulla nulla aliqua quis adipisicing\
            labore dolor id eu quis consectetur cupidatat. Magna adipisicing dolor ut culpa.\
            Exercitation exercitation ex nulla ullamco sint voluptate qui dolore aliqua magna.",
        title: "Help",
        name: "Abhishek Ranjan",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Abhishek Ranjan",
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide address field.",
        });
    }
    const address = req.query.address;
    geocode(address, (error, data) => {
        if (error) {
            return res.send({
                error: error,
            });
        }
        forecast(data.longitude, data.latitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error,
                });
            }
            res.send({
                forecast: forecastData.summary,
                location: data.placeName,
                address: address,
            });
        });
    });
});

app.get("/about/*", (req, res) => {
    res.render("404", {
        title: "Error 404",
        errorMsg: "Help article not found",
        name: "Abhishek Ranjan",
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "Error 404",
        errorMsg: "Help article not found",
        name: "Abhishek Ranjan",
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "Error 404",
        errorMsg: "Page not found",
        name: "Abhishek Ranjan",
    });
});

app.listen(3000, () => {
    console.log("Server is up on port 3000.");
});
