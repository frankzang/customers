import faker from "faker";

function buildCustomer() {
  return {
    id: faker.random.number(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    gender: faker.random.word(),
    company: faker.company.companyName(),
    city: faker.address.city(),
    title: faker.name.jobTitle(),
  };
}

function buildCustomersByCity() {
  return {
    city: faker.address.city(),
    customers_total: faker.random.number(),
  };
}

function buildCustomerByCity() {
  return {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    company: faker.company.companyName(),
  };
}

export { buildCustomer, buildCustomersByCity, buildCustomerByCity };
