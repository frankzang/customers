const fetch = require("node-fetch");

const apiKey = "AIzaSyCp9QzLbkbT6MUwU807kr_R2gf_Y3-Rssk";

class GeoLocation {
  constructor() {
    this.getCityCoordinates = this.getCityCoordinates.bind(this);
  }

  async getCityCoordinates(city) {
    const query = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${city}&inputtype=textquery&fields=geometry&key=${apiKey}`;
    const res = await fetch(query);
    const json = await res.json();
    const coordinates = json.candidates[0];

    return coordinates;
  }
}

module.exports = GeoLocation;
