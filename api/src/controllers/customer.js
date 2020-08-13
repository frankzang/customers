const CustomerService = require("../services/customer");
const _ = require("lodash");

class CustomerController {
  constructor() {
    this.customerService = new CustomerService();
  }

  async getAll(_req, res) {
    try {
      const customers = await this.customerService.findAll();

      res.status(200).json(customers);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
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
      const pageIndex = req.params.page;
      const page = this.customerService.getByCity(city, pageIndex);

      if (!page.length) {
        return res.status(404).send("Not found");
      }

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
}

module.exports = CustomerController;
