// Reusable table component for displaying a list of users.

import type { User } from "../types/user";
import { capitalize, formatDate } from "../utils/formatDate";

interface UserTableProps {
  users: User[];
  onDelete?: (id: string) => void;
}

// Deterministic avatar color based on the user's name.
const AVATAR_COLORS = [
  "linear-gradient(135deg, #6366f1, #a855f7)",
  "linear-gradient(135deg, #f59e0b, #ef4444)",
  "linear-gradient(135deg, #10b981, #3b82f6)",
  "linear-gradient(135deg, #ec4899, #8b5cf6)",
  "linear-gradient(135deg, #14b8a6, #06b6d4)",
];

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function avatarColor(name: string): string {
  const sum = [...name].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return AVATAR_COLORS[sum % AVATAR_COLORS.length];
}

export function UserTable({ users, onDelete }: UserTableProps) {
  if (users.length === 0) {
    return <div className="state">No users found.</div>;
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>User</th>
          <th>Role</th>
          <th>Status</th>
          <th>Created</th>
          {onDelete && <th aria-label="Actions" />}
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              <div className="user-cell">
                <div
                  className="user-cell__avatar"
                  style={{ background: avatarColor(user.name) }}
                >
                  {initials(user.name)}
                </div>
                <div>
                  <div className="user-cell__name">{user.name}</div>
                  <div className="user-cell__email">{user.email}</div>
                </div>
              </div>
            </td>
            <td>
              <span className={`badge badge--${user.role}`}>
                {capitalize(user.role)}
              </span>
            </td>
            <td>
              <span className={`badge badge--${user.status}`}>
                <span className="badge__dot" />
                {capitalize(user.status)}
              </span>
            </td>
            <td>{formatDate(user.createdAt)}</td>
            {onDelete && (
              <td style={{ textAlign: "right" }}>
                <button
                  type="button"
                  className="btn btn--ghost-danger"
                  onClick={() => onDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
