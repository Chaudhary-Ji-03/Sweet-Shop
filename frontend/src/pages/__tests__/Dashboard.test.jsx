import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "../Dashboard";
import api from "../../api/axios";

// Mock the axios instance
jest.mock("../../api/axios", () => ({
  get: jest.fn(),
  interceptors: {
    request: { use: jest.fn() },
    response: { use: jest.fn() },
  },
}));

test("renders dashboard heading", async () => {
  api.get.mockResolvedValueOnce({ data: [] });

  render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );

  expect(await screen.findByText(/Sweet Shop Dashboard/i)).toBeInTheDocument();
});
