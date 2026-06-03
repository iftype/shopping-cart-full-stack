import "@testing-library/jest-dom";
import { server } from "./mocks/node";

// Start MSW server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

// Reset handlers between tests (restores to default handlers)
afterEach(() => server.resetHandlers());

// Clean up after all tests
afterAll(() => server.close());
