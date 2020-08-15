const CustomerService = require("../services/customer");
const _ = require("lodash");

class CustomerController {
  constructor() {
    this.customerService = new CustomerService();
    this.getTotalByCities = this.getTotalByCities.bind(this);
    this.getById = this.getById.bind(this);
    this.getByCity = this.getByCity.bind(this);
  }

  async getTotalByCities(_req, res) {
    try {
      const customersInCities = await this.customerService.getTotalByCities();

      res.status(200).json(customersInCities);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  async getById(req, res) {
    try {
      const customerId = Number(req.params.id);
      const customer = await this.customerService.getById(customerId);

      if (!customer) {
        return res.status(404).send("Not found");
      }

      res.status(200).json(customer);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  async getByCity(req, res) {
    try {
      const city = req.params.city;
      const pageIndex = Number(req.query.page);
      const page = await this.customerService.getByCity(city, pageIndex);

      if (!page.customers.length) {
        return res.status(404).send("Not found");
      }

      res.status(200).json(page);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
}

module.exports = CustomerController;
