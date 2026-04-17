#  Task Management Dashboard

[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-181717?logo=github)](https://github.com/Punyashreekm/task-management-app--frontend)

A sleek, premium web application built with React, Vite, and Tailwind CSS. This dashboard allows users to seamlessly manage their tasks, featuring complete CRUD functionality, complex filtering, and robust state management utilizing RTK Query.

## ✨ Features

- **Modern & Premium UI:** Designed with a stunning, high-contrast light mode, utilizing Tailwind CSS and Framer Motion for beautiful micro-animations and transitions.
- **Complete CRUD Operations:** Create, Read, Update, and Delete tasks instantly.
- **Advanced State Management:** State is perfectly synchronized using **Redux Toolkit Query (RTK Query)**, simulating backend delays and managing loading/error states cleanly out of the box with tag invalidation.
- **Smart Filtering & Searching:** 
  - Search any task by title instantly.
  - Filter tasks by Status (Complete, Pending).
  - Filter tasks by Priority (High, Medium, Low).
- **Pagination:** Automatically chunks your tasks into clean, manageable pages preventing UI clutter.
- **Persistent Storage:** Tasks are safely preserved in the browser's LocalStorage, mimicking a real database backend.
- **Notifications:** Integrated `react-hot-toast` displays gorgeous toast notifications upon any task mutations (editing, deleting, or status flipping).

## 🛠 Tech Stack

- **Framework:** [React 19](https://react.dev/)
- **Bundler:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management:** [Redux Toolkit (RTK Query)](https://redux-toolkit.js.org/rtk-query/overview)
- **Icons:** [react-icons (Feather)](https://react-icons.github.io/react-icons/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Date Utilities:** [date-fns](https://date-fns.org/)
- **Language:** TypeScript

## 🚀 Getting Started

Follow these steps to set up and run the frontend application locally.

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository** (or navigate to the workspace directory):
   ```bash
   cd task-management-dashboard
   ```

2. **Install all dependencies:**
   Using npm:
   ```bash
   npm install
   ```
   Or using yarn/pnpm:
   ```bash
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate into the local network URL provided in your console (usually `http://localhost:5173/`).

## 📁 Source Code Structure

```
├── public/                 # Static assets (Favicons, etc.)
├── src/                    
│   ├── components/         # All React Component modules
│   │   ├── TaskDashboard   # Main Application Layout
│   │   ├── TaskFilters     # Search & Sidebar Logic
│   │   ├── TaskForm        # Creation Form UI
│   │   ├── TaskItem        # Individual List Item Card
│   │   └── TaskList        # Rendering Engine for Pagination/List Map
│   ├── store/              # Redux State & Store Hooks
│   │   ├── apiSlice.ts     # RTK Query Setup (Mock Backend & LocalStorage logic)
│   │   ├── hooks.ts        # Typed Selectors/Dispatchers
│   │   └── store.ts        # Store Initialization & Middleware Configuration
│   ├── types/              # Global TypeScript Interfaces
│   ├── App.tsx             # Root Application Component
│   ├── main.tsx            # React DOM Entry Point & Providers
│   └── index.css           # Tailwind Configuration Import
├── eslint.config.js        # Linter Settings
├── vite.config.ts          # Vite Settings
├── tsconfig.json           # TS Configurations
└── package.json            # Scripts & Dependency Manifest
```

## 🤝 Contributing
Contributions, issues, and feature requests are always welcome! Feel free to fork the repository to implement larger architectural additions.
