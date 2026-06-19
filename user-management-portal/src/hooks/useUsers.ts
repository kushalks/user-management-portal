// Custom hook for loading and managing the list of users.

import { useCallback, useEffect, useState } from "react";
import type { User } from "../types/user";
import { deleteUser, getUsers } from "../services/userService";

interface UseUsersResult {
  users: User[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  remove: (id: string) => Promise<void>;
}

export function useUsers(): UseUsersResult {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setUsers(await getUsers());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load users");
    } finally {
      setLoading(false);
    }
  }, []);

  const remove = useCallback(async (id: string) => {
    await deleteUser(id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { users, loading, error, refresh, remove };
}
