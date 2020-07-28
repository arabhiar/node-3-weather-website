const request = require("request");

const geocode = (address, callback) => {
    const url =
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        encodeURIComponent(address) +
        ".json?access_token=pk.eyJ1IjoiZGFkZHktNjkiLCJhIjoiY2tkNHRsaXhnMDFiMjJ6cmF5ODNjNXRiOCJ9.2Lz0U0fJpt13lmib9nW0uA&limit=1";
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to location service.", undefined);
        } else if (response.body.features.length === 0) {
            callback(
                "Unable to find location. Try again with different search query.",
                undefined
            );
        } else {
            callback(undefined, {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                placeName: response.body.features[0].place_name,
            });
        }
    });
};

module.exports = geocode;
