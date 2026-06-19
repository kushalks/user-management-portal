// In-memory mock data used when no backend API is configured.
// Lets the portal run standalone during development.

import type { User } from "../types/user";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Ada Lovelace",
    email: "ada@example.com",
    role: "admin",
    status: "active",
    createdAt: "2026-01-12T09:30:00.000Z",
  },
  {
    id: "2",
    name: "Alan Turing",
    email: "alan@example.com",
    role: "manager",
    status: "active",
    createdAt: "2026-02-03T14:15:00.000Z",
  },
  {
    id: "3",
    name: "Grace Hopper",
    email: "grace@example.com",
    role: "member",
    status: "invited",
    createdAt: "2026-03-21T11:00:00.000Z",
  },
  {
    id: "4",
    name: "Katherine Johnson",
    email: "katherine@example.com",
    role: "viewer",
    status: "inactive",
    createdAt: "2026-04-08T16:45:00.000Z",
  },
];
