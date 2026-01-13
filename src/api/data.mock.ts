import MockAdapter from "axios-mock-adapter";

/**
 * Mock data representing user objects to be returned 
 * to the DashBoardPage.
 */
const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Administrator",
    status: "Active"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Editor",
    status: "Inactive"
  },
  {
    id: 3,
    name: "Robert Brown",
    email: "robert.b@example.com",
    role: "Viewer",
    status: "Active"
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.d@example.com",
    role: "Contributor",
    status: "Pending"
  }
];

/**
 * Defines the mock rules for the axios instance.
 * Matches the endpoint called in DashBoardPage.tsx.
 */
export const dataMock = (mock: MockAdapter) => {
  // Mocking the GET request for master rules
  mock.onGet("/users/userlist").reply(200, mockUsers);

  // You can add more mock rules here as needed
  // mock.onPost("/users").reply(201, { message: "User created" });
};