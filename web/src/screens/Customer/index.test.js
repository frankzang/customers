import React from "react";
import { render, screen } from "@testing-library/react";
import Customer from "./";
import { useFetchCustomer } from "./useFetchCustomer";
import { buildCustomer } from "../../tests/generate";
import { MemoryRouter } from "react-router-dom";

jest.mock("./useFetchCustomer");
const mockUseFetchCustomer = useFetchCustomer;

describe("Customer component", () => {
  test("should render customer information", async () => {
    const mockCustomer = buildCustomer();
    mockUseFetchCustomer.mockReturnValue({
      status: "success",
      data: mockCustomer,
    });
    render(<Customer />, { wrapper: MemoryRouter });

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
    const message = "It was not possible to fetch customer data";
    mockUseFetchCustomer.mockReturnValue({
      status: "error",
      error: { message },
    });
    render(<Customer />, { wrapper: MemoryRouter });

    expect(screen.getByText(message)).toBeInTheDocument();
  });
});
