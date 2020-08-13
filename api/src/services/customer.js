const customers = require("../data/customers.json");
const _ = require("lodash");
const CustomersDb = require("../data/customer-db");

class CustomerService {
  constructor() {
    this.customerDb = new CustomersDb();
  }

  async findAll() {
    return customers;
  }

  async findAllBy(field, value) {
    const filtered = customers.filter((customer) => customer[field] === value);

    return filtered;
  }

  async groupBy(field) {
    const group = _.groupBy(customers, field);

    return group;
  }

  async find(field, value) {
    const customer = customers.find((customer) => customer[field] === value);

    return customer;
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
    const customer = await this.customerDb.findOne("id", id);

    return customer;
  }

  async getByCity(city, pageIndex = 0) {
    const customers = await this.customerDb.findAllBy("city", city);
    const MAX_RESULTS_PER_PAGE = 10;
    const pages = _.chunk(customers, MAX_RESULTS_PER_PAGE);
    const page = pages[pageIndex] || [];

    const response = page.map(({ first_name, last_name, email, company }) => ({
      first_name,
      last_name,
      email,
      company,
    }));

    return response;
  }
}

module.exports = CustomerService;
