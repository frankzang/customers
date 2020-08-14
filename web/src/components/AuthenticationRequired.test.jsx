import React from "react";
import { render, screen } from "@testing-library/react";
import { AuthenticationRequired } from "./AuthenticationRequired";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Routes } from "../configs/routes";

jest.mock("react-router-dom", () => ({
  useHistory: jest.fn(),
}));
const mockUseHistory = useHistory;

jest.mock("@auth0/auth0-react", () => {
  const auth0 = jest.requireActual();
  auth0.useAuth0 = jest.fn();

  return auth0;
});
const mockUseAuth0 = useAuth0;

describe("AuthenticationRequired component", () => {
  test("should redirect to login if there is no logged user", async () => {
    mockUseAuth0.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
    });
    const replace = jest.fn();
    mockUseHistory.mockImplementation(() => ({
      replace,
    }));
    render(<AuthenticationRequired />);

    expect(replace).toHaveBeenCalledWith(Routes.LOGIN);
  });

  test("should enable acces to children if there is a logged user", async () => {
    mockUseAuth0.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
    });
    const PrivateRoute = () => <div>private route</div>;
    render(
      <AuthenticationRequired>
        <PrivateRoute />
      </AuthenticationRequired>
    );

    expect(screen.getByText(/private route/i)).toBeInTheDocument();
  });
});
