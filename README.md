# Expense Tracker

A responsive frontend expense tracking dashboard built with React, Vite, and Tailwind CSS utilities.

The app focuses on:

- quick financial summaries (balance, income, expenses)
- transaction entry and listing
- role-based UI simulation (Admin vs Viewer)
- lightweight insights derived from transaction data

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS 4 (via `@tailwindcss/vite`)
- Font Awesome React icons

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

4. Preview production build:

```bash
npm run preview
```

## Project Structure

```text
src/
	App.jsx                         # Main layout + global app state
	components/
		Expense.jsx                   # Summary card (Balance/Income/Expense)
		transaction/
			Transactions.jsx            # Add/filter/list transactions + role switch
		insights/
			Saved.jsx                   # Savings progress insight
			Spend.jsx                   # Highest spending category insight
			Expenditure.jsx             # Expense vs income percentage insight
			Empty.jsx                   # Spacer/placeholder insight card
```

## Code Walkthrough

### 1. App Layout and Global State

`App.jsx` is the orchestration layer:

- keeps top-level state for:
  - `transactions`
  - `expenses`
  - `income`
  - `balance`
  - `role`
- renders three main areas:
  - summary cards
  - insights carousel
  - transactions section

### 2. Transactions Logic

`Transactions.jsx` handles most interaction logic:

- add transaction form (Admin only)
- derives signed amount from selected type:
  - income -> positive amount
  - expense -> negative amount
- updates income, expenses, and balance immediately after adding a transaction
- filters list by:
  - `ALL`
  - `INCOME`
  - `EXPENSE`
- provides role switch dropdown (`Admin` / `Viewer`)
- handles no-data state with: `No transactions found.`

### 3. Insights Logic

- `Saved.jsx`: renders savings goal progress (`balance / income` percentage)
- `Spend.jsx`: computes top spending category from negative transactions and shows progress bar
- `Expenditure.jsx`: shows expense-to-income percentage insight

## Requirement Coverage

Below is a transparent mapping between your requirements and the current implementation.

### 1) Dashboard Overview

- Summary cards (Total Balance, Income, Expenses): **Implemented**
- Time-based visualization (e.g., trend over time): **Partially implemented**
  - dates are captured and displayed in transactions
  - there is no dedicated time-series chart (line/area trend) yet
- Categorical visualization (e.g., spending breakdown): **Implemented (basic)**
  - top spending category is derived and visualized with a progress bar

### 2) Transactions Section

- List with Date, Amount, Category: **Implemented**
- Type (income/expense): **Implemented in data model and styling**
  - sign and color indicate type
  - no separate visible `Type` column yet
- Simple filtering: **Implemented** (`All`, `Income`, `Expense`)
- Sorting or search: **Not implemented yet**

### 3) Basic Role-Based UI

- Frontend-only role simulation: **Implemented**
- `Viewer` can only see data: **Implemented** (add form hidden)
- `Admin` can add transactions: **Implemented**
- Role switch via dropdown: **Implemented**

### 4) Insights Section

- Highest spending category: **Implemented**
- Monthly comparison: **Partially implemented**
  - spending ratio insights exist
  - explicit month-vs-month comparison view is not implemented yet
- Useful observations from data: **Implemented**

### 5) State Management

- Transactions data: **Implemented with React state**
- Filters: **Implemented with local component state**
- Selected role: **Implemented with app-level state**
- Approach used: **React `useState` + prop passing**

### 6) UI / UX Expectations

- Clean and readable layout: **Implemented**
- Responsive behavior: **Implemented (Tailwind responsive classes)**
- Empty/no-data handling: **Implemented**

## Current Gaps to Fully Match All Requirements

To reach full compliance with the requirement list, the next improvements should be:

1. Add a time-based trend chart (balance/income/expense over time).
2. Add sorting or search in transactions.
3. Add explicit transaction `Type` column.
4. Add month-over-month comparison card/chart.

## Notes

- This project currently uses frontend-only state; there is no backend persistence.
- Refreshing the page resets transactions unless persistence (e.g., localStorage/API) is added.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
