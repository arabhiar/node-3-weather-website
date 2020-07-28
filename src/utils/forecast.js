const request = require("request");

const forecast = (long, lat, callback) => {
    const url =
        "http://api.weatherstack.com/current?access_key=122394a07b88930b492edc384cfeab2e&query=" +
        lat +
        "," +
        long;
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to weather service.", undefined);
        } else if (response.body.error) {
            callback("Unble to find the location.", undefined);
        } else {
            const responseData = response.body.current;
            const currentTemp = responseData.temperature;
            const feelsLike = responseData.feelslike;
            const weatherDesc = responseData.weather_descriptions[0];
            const summary =
                weatherDesc +
                ". The current temperature is " +
                currentTemp +
                " but feels like " +
                feelsLike +
                ".";
            callback(undefined, {
                currentTemp,
                feelsLike,
                weatherDesc,
                summary
            });
        }
    });
};

module.exports = forecast;
