# Daily Task Tracker - Development Documentation

## Overview
This document serves as a comprehensive guide to building the Daily Task Tracker web application from start to finish. It covers every command used, the architectural decisions made, and simple explanations of the underlying technologies used.

## 1. Environment Setup & Project Initialization
The application uses **React** as its frontend library. We initialized it using **Vite**, which provides a lightning-fast development environment and optimized production builds.

**Commands Executed:**
```bash
# 1. Initialize a new Vite project using the React template
npx -y create-vite@latest ./ --template react

# 2. Install core project dependencies
npm install

# 3. Install TailwindCSS (v4) and its ecosystem plugins for styling
npm install -D @tailwindcss/vite tailwindcss postcss autoprefixer

# 4. Install supporting UI libraries
npm install lucide-react date-fns clsx tailwind-merge
```

### Explaining the Dependencies:
- **lucide-react**: Provides modern, clean SVG icons (like the hamburger menu, checkmarks, etc.).
- **date-fns**: A lightweight Javascript library for parsing, formatting, and calculating dates (crucial for our Calendar and Monthly features).
- **clsx & tailwind-merge**: Utilities to conditionally combine CSS classes cleanly without styling conflicts.

---

## 2. Configuring TailwindCSS
TailwindCSS allows us to style our application directly inside our React components using utility classes, instead of writing separate large CSS files.

**Vite Configuration (`vite.config.js`)**
We updated Vite to process Tailwind styles during building.
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

**Global Stylesheet (`src/index.css`)**
We defined our project's custom theme variables and beautiful background gradients here using the new `@theme` API provided by Tailwind v4.

---

## 3. Data Persistence (Local Storage)
Because the prompt requested "no backend required," we must save user data directly in the browser. We achieve this using the browser's native **LocalStorage API**.

### How LocalStorage Works
LocalStorage is a tiny, persistent key-value database built into every modern web browser. 
- Data saved here survives page refreshes and browser closures.
- It only stores strings, so we must convert our Javascript Objects to strings before saving them (using `JSON.stringify()`), and convert them back to objects when reading them (using `JSON.parse()`).

### The Custom React Hook (`src/hooks/useLocalStorage.js`)
Instead of rewriting LocalStorage logic everywhere, we created a reusable React Hook.
- It intercepts calls to read/write state.
- When the App loads, the hook attempts to read from `localStorage.getItem("key")`.
- Whenever the task data changes in React, the hook automatically fires `localStorage.setItem("key", newData)`.

---

## 4. UI Architecture & Components
React is completely modular, meaning we break the App down into lego-like pieces (components).

### Foundation Components
- **Navbar**: The persistent top bar containing the App Title and the Hamburger menu button.
- **SidebarMenu**: A slide-out panel that controls navigation between the different views.
- **TaskItem**: Represents a single task row. We built custom hover events here so that tasks visually "lift" off the page when hovered.
- **ProgressWheel**: A dynamic SVG graph. 
  - *Technique*: It uses math `(circumference - (percentage / 100) * circumference)` applied to an SVG `stroke-dashoffset` property to visually "fill" a circle based on completion percentage.

---

## 5. Application Views
The App's state tracks which "page" the user is on and renders the corresponding View Component.

### View 1: Home Dashboard (`HomeView.jsx`)
- **Purpose**: Displays the tasks scheduled for the currently selected date.
- **Functionality**: 
  - Clicking a task adds its `id` to the `completedTasks` array for that specific day, triggering a re-render of the ProgressWheel.
  - Contains a specialized **Temporary Task** floating-action-button (FAB). This opens a modal to inject a task specifically for *one* date, appending an `isTemp: true` flag to the data model to differentiate it from Master tasks.

### View 2: Master Task Editor (`EditTasksView.jsx`)
- **Purpose**: Manage the core, repeating master task list.
- **Functionality**: Provides an input form to create new repeating tasks. Modifying this list updates the base template that all dates pull from.

### View 3: Calendar (`CalendarView.jsx`)
- **Purpose**: Provides visual tracking of daily completion.
- **Technique**: Uses `date-fns` to generate an array of every day in the month. It maps over this array to create buttons. The buttons read from LocalStorage to determine if a mini-progress ring should be rendered for that specific date box.

### View 4: Monthly Summary (`MonthlySummaryView.jsx`)
- **Purpose**: Analytics and consistency tracking.
- **Technique**: 
  1. Shows a list of the past 12 months.
  2. When a month is clicked, it loops through every single day of that month.
  3. It cross-references the Master tasks against the `completedTasks` array for each day to calculate a final "Completed vs Skipped" score for every task.

---

## 6. Beautification and UI Polish
To ensure the app felt premium, we applied extensive CSS enhancements:
- **Glassmorphism**: Using `backdrop-blur-md` combined with slightly transparent background colors (`bg-white/80`) to create a frosted glass effect.
- **Rich Gradients**: Replacing flat colors with linear gradients (`bg-gradient-to-r from-primary to-indigo-500`) for buttons, text, and the progress wheel.
- **Micro-interactions**: Adding `.transition-all`, `.duration-300`, and `.hover:-translate-y-1` classes so elements smoothly scale and cast shadows when interacted with.
- **Drop Shadows**: Utilizing layered shadows (`shadow-[0_8px_30px_rgb(...)]`) to give depth to the cards and modal popups.

## 7. Running the Application
**Command Executed (Development):**
```bash
# Starts the local development server with hot-module-reloading
npm run dev
```

**Command Executed (Production Build):**
```bash
# Compiles the React application into static HTML/CSS/JS files for hosting
npm run build
```
