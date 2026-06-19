// Root component for the User Management Portal.

import { UsersPage } from "./pages/UsersPage";

export default function App() {
  return (
    <div className="app">
      <header className="app__header">
        <div className="brand">
          <div className="brand__logo">U</div>
          <div>
            <div className="brand__name">User Management Portal</div>
            <div className="brand__sub">Admin dashboard</div>
          </div>
        </div>

        <nav className="app__nav">
          <a className="nav-link nav-link--active" href="#users">
            Users
          </a>
          <a className="nav-link" href="#roles">
            Roles
          </a>
          <a className="nav-link" href="#settings">
            Settings
          </a>
          <div className="avatar" title="Signed in">
            KS
          </div>
        </nav>
      </header>

      <main className="app__main">
        <UsersPage />
      </main>
    </div>
  );
}
