// TypeScript type definitions for the User Management Portal

export type UserRole = "admin" | "manager" | "member" | "viewer";

export type UserStatus = "active" | "inactive" | "invited";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string; // ISO 8601 timestamp
}

// Shape used when creating a new user (server assigns id/createdAt).
export type NewUser = Omit<User, "id" | "createdAt">;

// Shape used when updating an existing user.
export type UserUpdate = Partial<NewUser>;
