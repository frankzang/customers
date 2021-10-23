//@ts-ignore
import customers from "../data/customers.json";
//@ts-ignore
import _ from "lodash";
//@ts-ignore
import CustomersDb from "../data/customer-db";
//@ts-ignore
import GeoLocation from "../data/location";
import { Customer } from "../types/customer";

class CustomerService {
  customerDb: CustomersDb;
  geoLocation: GeoLocation;

  constructor() {
    this.customerDb = new CustomersDb();
    this.geoLocation = new GeoLocation();
  }

  async getTotalByCities() {
    const group = await this.customerDb.groupBy("city");
    const cities = Object.entries(group).map(([city, customers]) => ({
      city,
      customers_total: (customers as any).length,
    }));

    return cities;
  }

  async getById(id: Customer['id']) {
    let customer = await this.customerDb.findOne("id", id);
    const customerAdderess = await this.geoLocation.getCityCoordinates(
      customer?.city ?? ''
    );
    const response = {
      ...customer,
      lat: customerAdderess ? customerAdderess.location.lat : null,
      long: customerAdderess ? customerAdderess.location.lng : null,
    };

    return response;
  }

  async getByCity(city: string, pageIndex = 0) {
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

export default CustomerService;
