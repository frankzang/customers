import customers from "./customers.json";
import { groupBy, filter, find } from "lodash";
import { Customer } from '../types/customer';

class CustomersDb {
  async findAllBy(field: keyof Customer, value: any): Promise<Customer[]> {
    const filtered = filter(customers, (customer) => customer[field] === value);

    return (filtered as unknown) as Customer[];
  }

  async groupBy(field: string) {
    const group = groupBy(customers, field);

    return group;
  }

  async findOne(field: keyof Customer, value: any) {
    const customer = find(customers, (customer) => customer[field] === value);

    return customer;
  }
}

export default CustomersDb;
