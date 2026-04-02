# To-Do Manager

## Description

To-Do Manager is a lightweight task management web application built as a prototype for **Code2Work**, a startup dedicated to helping work-study students organise their daily tasks.

The app lets you create, update, filter, and delete tasks entirely in the browser — no server, no database. All data is persisted in `localStorage` so your tasks survive page refreshes.

## Technologies Used

| Tool | Purpose |
|------|---------|
| [Vue 3](https://vuejs.org/) | UI framework (Composition API + `<script setup>`) |
| [TypeScript](https://www.typescriptlang.org/) | Static typing |
| [Vite](https://vitejs.dev/) | Build tool & dev server |
| [ESLint](https://eslint.org/) | Code linting |
| [Prettier](https://prettier.io/) | Code formatting |
| [Vitest](https://vitest.dev/) | Unit testing |
| localStorage | Client-side data persistence |

## Project Initialization

Make sure you have **Node.js ≥ 20** installed, then run:

```sh
npm install
```

## Running the Project

Start the development server:

```sh
npm run dev
```

The app will be available at `http://localhost:5173` (or the next available port).

Other useful commands:

```sh
npm run build        # Type-check + production build
npm run test:unit    # Run unit tests with Vitest
npm run lint         # Lint and auto-fix with ESLint + oxlint
npm run format       # Format source files with Prettier
```

## Features

- **Create** a task via a validated form (empty titles are rejected with an error message)
- **Delete** a task
- **Change** the status of a task: `to do` → `in progress` → `done`
- **Edit** the title of a task inline
- **Filter** tasks by status (all / to do / in progress / done)
- **Persist** tasks in `localStorage` — data survives page refreshes
- Accessible UI with ARIA attributes

## Author

Antoine Caps
