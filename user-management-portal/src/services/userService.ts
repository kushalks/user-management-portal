// API calls and data fetching for users.
//
// When VITE_API_URL is set, these functions call a real REST backend.
// Otherwise they fall back to in-memory mock data so the portal runs
// standalone during development.

import type { NewUser, User, UserUpdate } from "../types/user";
import { mockUsers } from "./mockUsers";

const API_URL = import.meta.env.VITE_API_URL;
const USE_MOCK = !API_URL;

// Mutable copy so create/update/delete behave during mock development.
let mockData: User[] = [...mockUsers];

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export async function getUsers(): Promise<User[]> {
  if (USE_MOCK) return [...mockData];
  const res = await fetch(`${API_URL}/users`);
  return handle<User[]>(res);
}

export async function getUser(id: string): Promise<User> {
  if (USE_MOCK) {
    const found = mockData.find((u) => u.id === id);
    if (!found) throw new Error(`User ${id} not found`);
    return found;
  }
  const res = await fetch(`${API_URL}/users/${id}`);
  return handle<User>(res);
}

export async function createUser(user: NewUser): Promise<User> {
  if (USE_MOCK) {
    const created: User = {
      ...user,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    mockData = [...mockData, created];
    return created;
  }
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return handle<User>(res);
}

export async function updateUser(id: string, update: UserUpdate): Promise<User> {
  if (USE_MOCK) {
    const index = mockData.findIndex((u) => u.id === id);
    if (index === -1) throw new Error(`User ${id} not found`);
    const updated = { ...mockData[index], ...update };
    mockData = mockData.map((u) => (u.id === id ? updated : u));
    return updated;
  }
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(update),
  });
  return handle<User>(res);
}

export async function deleteUser(id: string): Promise<void> {
  if (USE_MOCK) {
    mockData = mockData.filter((u) => u.id !== id);
    return;
  }
  const res = await fetch(`${API_URL}/users/${id}`, { method: "DELETE" });
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }
}
