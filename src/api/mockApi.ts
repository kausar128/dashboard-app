import MockAdapter from "axios-mock-adapter";
import apiClient from "./apiClient";

export const setupMockApi = () => {
  const mock = new MockAdapter(apiClient, { delayResponse: 3000 });

  mock.onGet("/users").reply(200, [
    { id: 1, name: "Alice", email: "alice@test.com" },
    { id: 2, name: "Bob", email: "bob@test.com" },
    { id: 3, name: "Charlie", email: "charlie@test.com" }
  ]);
};
