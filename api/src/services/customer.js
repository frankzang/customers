const customers = require("../data/customers.json");
const _ = require("lodash");
const CustomersDb = require("../data/customer-db");
const GeoLocation = require("../data/location");

class CustomerService {
  constructor() {
    this.customerDb = new CustomersDb();
    this.geoLocation = new GeoLocation();
  }

  async getTotalByCities() {
    const group = await this.customerDb.groupBy("city");
    const cities = Object.entries(group).map(([city, customers]) => ({
      city,
      customers_total: customers.length,
    }));

    return cities;
  }

  async getById(id) {
    let customer = await this.customerDb.findOne("id", id);
    const customerAdderess = await this.geoLocation.getCityCoordinates(
      customer.city
    );
    const response = {
      ...customer,
      lat: customerAdderess ? customerAdderess.location.lat : null,
      long: customerAdderess ? customerAdderess.location.lng : null,
    };

    return response;
  }

  async getByCity(city, pageIndex = 0) {
    const customers = await this.customerDb.findAllBy("city", city);
    const MAX_RESULTS_PER_PAGE = 10;
    const pages = _.chunk(customers, MAX_RESULTS_PER_PAGE);
    const page = pages[pageIndex] || [];
    const hasMore = !!pages[pageIndex + 1];

    const citiyCustomers = page.map(
      ({ id, first_name, last_name, email, company }) => ({
        id,
        first_name,
        last_name,
        email,
        company,
      })
    );

    const response = {
      customers: citiyCustomers,
      page: pageIndex,
      hasMore,
    };

    return response;
  }
}

module.exports = CustomerService;
