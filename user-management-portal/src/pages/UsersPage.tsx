// Page-level component for the users listing screen.

import { useMemo, useState } from "react";
import { UserTable } from "../components/UserTable";
import { useUsers } from "../hooks/useUsers";

export function UsersPage() {
  const { users, loading, error, remove } = useUsers();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q),
    );
  }, [users, query]);

  const activeCount = users.filter((u) => u.status === "active").length;
  const adminCount = users.filter((u) => u.role === "admin").length;
  const invitedCount = users.filter((u) => u.status === "invited").length;

  return (
    <section id="users">
      <div className="page-head">
        <h1>Users</h1>
        <p>Manage user accounts, roles, and permissions.</p>
      </div>

      <div className="stats">
        <div className="stat-card">
          <div className="stat-card__label">Total users</div>
          <div className="stat-card__value">{users.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__label">Active</div>
          <div className="stat-card__value stat-card__value--accent">
            {activeCount}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card__label">Admins</div>
          <div className="stat-card__value">{adminCount}</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__label">Pending invites</div>
          <div className="stat-card__value">{invitedCount}</div>
        </div>
      </div>

      <div className="toolbar">
        <div className="search">
          <span className="search__icon" aria-hidden="true">
            ⌕
          </span>
          <input
            type="search"
            placeholder="Search by name, email, or role…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn--primary">
          + Add user
        </button>
      </div>

      <div className="card">
        {loading && (
          <div className="state">
            <div className="spinner" />
            Loading users…
          </div>
        )}
        {error && <div className="state state--error">{error}</div>}
        {!loading && !error && (
          <UserTable users={filtered} onDelete={(id) => void remove(id)} />
        )}
      </div>
    </section>
  );
}
