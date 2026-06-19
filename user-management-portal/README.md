# User Management Portal

A web application for managing users — built with **React** and **TypeScript**.

## Overview

The User Management Portal provides an interface to create, view, update, and
delete users, along with role and permission management. It's designed to be a
clean, type-safe foundation for admin-style dashboards.

## Features

- 👤 **User CRUD** — create, read, update, and delete user accounts
- 🔍 **Search & filter** — quickly find users by name, email, or role
- 🛡️ **Role management** — assign and manage user roles and permissions
- 📋 **User listing** — paginated, sortable table of users
- 📱 **Responsive UI** — works across desktop and mobile

## Tech Stack

- **React** — UI library
- **TypeScript** — static typing
- **Vite** — build tool and dev server (recommended)
- **CSS / styling** — TBD

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd user-management-portal

# Install dependencies
npm install
```

### Running the App

```bash
# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173` (default Vite port).

### Building for Production

```bash
npm run build
```

## Project Structure

```
user-management-portal/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page-level components
│   ├── hooks/          # Custom React hooks
│   ├── types/          # TypeScript type definitions
│   ├── services/       # API calls and data fetching
│   ├── utils/          # Helper functions
│   ├── App.tsx         # Root component
│   └── main.tsx        # Entry point
└── package.json
```

## Available Scripts

| Script            | Description                       |
| ----------------- | --------------------------------- |
| `npm run dev`     | Start the development server      |
| `npm run build`   | Build the app for production      |
| `npm run preview` | Preview the production build      |
| `npm run lint`    | Run the linter                    |