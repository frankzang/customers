import React from "react";
import { render, screen, waitForDomChange } from "@testing-library/react";
import Home from "./";
import { buildCustomersByCity } from "../../tests/generate";
import { MemoryRouter } from "react-router-dom";

describe("Home component", () => {
  test("should render a list of cities", async () => {
    const CUSTOMERS_TOTAL = 10;
    const cities = Array(CUSTOMERS_TOTAL)
      .fill(null)
      .map(() => buildCustomersByCity());
    jest.spyOn(global, "fetch").mockReturnValue({
      json: () => Promise.resolve(cities),
      status: 200,
    });
    render(<Home />, { wrapper: MemoryRouter });

    await waitForDomChange();

    expect(screen.getAllByRole("link").length).toBe(CUSTOMERS_TOTAL);
  });
});
