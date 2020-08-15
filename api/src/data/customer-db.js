const customers = require("./customers.json");
const _ = require("lodash");

class CustomersDb {
  async findAllBy(field, value) {
    const filtered = customers.filter((customer) => customer[field] === value);

    return filtered;
  }

  async groupBy(field) {
    const group = _.groupBy(customers, field);

    return group;
  }

  async findOne(field, value) {
    const customer = customers.find((customer) => customer[field] === value);

    return customer;
  }
}

module.exports = CustomersDb;
