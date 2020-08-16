import React from "react";
import {
  render,
  screen,
  waitForDomChange,
  fireEvent,
  act,
} from "@testing-library/react";
import City from "./";
import { buildCustomerByCity } from "../../tests/generate";
import { MemoryRouter } from "react-router-dom";

describe("City component", () => {
  function createCustomersResults(length) {
    return Array(length)
      .fill(null)
      .map(() => buildCustomerByCity());
  }

  test("should fetch a new set of results", async () => {
    const page1 = createCustomersResults(10);
    const page2 = createCustomersResults(5);
    const fetchSpy = jest.spyOn(global, "fetch").mockReturnValue({
      json: () => Promise.resolve({ customers: page1, hasMore: true }),
      status: 200,
    });
    render(<City />, { wrapper: MemoryRouter });

    await waitForDomChange();

    expect(screen.getAllByRole("link").length).toBe(page1.length);
    expect(
      screen.getByRole("button", {
        name: /previous page/i,
      })
    ).toBeDisabled();

    fetchSpy.mockReturnValue({
      json: () => Promise.resolve({ customers: page2, hasMore: false }),
      status: 200,
    });

    await act(async () => {
      fireEvent.click(
        screen.getByRole("button", {
          name: /next page/i,
        })
      );
    });

    expect(screen.getAllByRole("link").length).toBe(page2.length);
    expect(
      screen.getByRole("button", {
        name: /next page/i,
      })
    ).toBeDisabled();
  });
});
