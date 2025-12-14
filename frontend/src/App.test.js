import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// Mock api for App (optional if App uses api)
jest.mock("./api/axios", () => ({
  get: jest.fn(),
  post: jest.fn(),
  interceptors: {
    request: { use: jest.fn() },
    response: { use: jest.fn() },
  },
}));

test("renders app without crashing", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
});
