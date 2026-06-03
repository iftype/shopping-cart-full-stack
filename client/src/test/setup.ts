import "@testing-library/jest-dom";
import { server } from "./mocks/node";

// Start MSW server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

// Reset handlers and mock DB between tests
afterEach(() => {
  server.resetHandlers();
});

// Clean up after all tests
afterAll(() => server.close());
