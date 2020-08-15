const fetch = require("node-fetch");

const apiKey = "AIzaSyCp9QzLbkbT6MUwU807kr_R2gf_Y3-Rssk";

class GeoLocation {
  constructor() {
    this.getCityCoordinates = this.getCityCoordinates.bind(this);
  }

  async getCityCoordinates(city) {
    try {
      const query = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        city
      )}&key=${apiKey}`;
      const res = await fetch(query);
      const json = await res.json();
      const coordinates = json.results[0].geometry;

      return coordinates;
    } catch (error) {
      return null;
    }
  }
}

module.exports = GeoLocation;
