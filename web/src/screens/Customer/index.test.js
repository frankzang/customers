import React from "react";
import { render, screen, waitForDomChange } from "@testing-library/react";
import Customer from "./";
import { buildCustomer } from "../../tests/generate";
import { MemoryRouter } from "react-router-dom";

describe("Customer component", () => {
  test("should render customer information", async () => {
    const mockCustomer = buildCustomer();
    jest.spyOn(global, "fetch").mockReturnValue({
      json: () => Promise.resolve(mockCustomer),
      status: 200,
    });
    render(<Customer />, { wrapper: MemoryRouter });

    await waitForDomChange();

    expect(
      screen.getByText(`${mockCustomer.first_name} ${mockCustomer.last_name}`)
    ).toBeInTheDocument();
    expect(screen.getByText(mockCustomer.email)).toBeInTheDocument();
    expect(screen.getByText(mockCustomer.title)).toBeInTheDocument();
    expect(screen.getByText(mockCustomer.gender)).toBeInTheDocument();
    expect(screen.getByText(mockCustomer.company)).toBeInTheDocument();
    expect(screen.getByText(mockCustomer.city)).toBeInTheDocument();
  });

  test("should render an error message if a customer is not found", async () => {
    jest.spyOn(global, "fetch").mockReturnValue({
      json: () => Promise.resolve(null),
      status: 404,
    });
    const message = "It was not possible to fetch customer data";
    render(<Customer />, { wrapper: MemoryRouter });

    await waitForDomChange();

    expect(screen.getByText(message)).toBeInTheDocument();
  });
});
