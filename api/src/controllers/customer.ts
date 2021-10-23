import { Request, Response } from "express";

import CustomerService from "../services/customer";
import _ from "lodash";

class CustomerController {
  customerService: CustomerService;

  constructor() {
    this.customerService = new CustomerService();
    this.getTotalByCities = this.getTotalByCities.bind(this);
    this.getById = this.getById.bind(this);
    this.getByCity = this.getByCity.bind(this);
  }

  async getTotalByCities(_req: Request, res: Response) {
    try {
      const customersInCities = await this.customerService.getTotalByCities();

      res.status(200).json(customersInCities);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const customerId = req.params["id"] ?? '';
      const customer = await this.customerService.getById(customerId);

      if (!customer) {
        return res.status(404).send("Not found");
      }

      return res.status(200).json(customer);
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  async getByCity(req: Request, res: Response) {
    try {
      const city = req.params["city"] ?? '';
      const pageIndex = Number(req.query["page"]);
      const page = await this.customerService.getByCity(city, pageIndex);

      if (!page.customers.length) {
        return res.status(404).send("Not found");
      }

      return res.status(200).json(page);
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
}

export default CustomerController;
