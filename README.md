# 🧱 Dashboard – React Admin Panel (Vite + MUI + Router)

A production-grade, modular, and scalable **React Admin Dashboard** built with:

- **React 18**
- **Vite**
- **Material UI (MUI v5)**
- **React Router v7**
- **Nivo Charts**
- **FullCalendar**
- **React Hook Form**
- **date-fns**

Designed as a clean, maintainable front-end architecture suitable for real-world dashboards and portfolio-ready production demos.

---

## 🔗 Live Demo & Repository

- **Live Demo:** 👉 https://hakim166.github.io/Dashboard/
- **Source Code:** 📦 https://github.com/HAKIM166/Dashboard

---

## ⚙️ Core Features

### 🔧 Front-End Architecture
- Modular directory structure with clear separation between:
  - Components  
  - Pages  
  - Layout  
  - Charts  
  - Forms  
  - Tables  
  - Utilities

- Reusable UI components (**Sidebar, TopBar, Header**).
- Centralized theming with **light/dark mode**.
- Hash-based routing configured for GitHub Pages.

---

### 👤 Profile System

- Full **user profile panel** with editable:
  - Name
  - Email
  - Phone
- **Local Avatar Upload** (File → Base64 → persisted in localStorage).
- Real-time “Last Login” calculation.
- User preferences stored locally:
  - Email notifications
  - 2FA toggle
  - Autosave toggle

---

### 📊 Analytical Views

Includes:
- KPI cards and modular dashboard rows.
- Interactive analytical charts:
  - **Bar Chart**
  - **Line Chart**
  - **Pie Chart**
  - **Geography Heatmap**

---

### 📅 Productivity Pages

- **Calendar page** with FullCalendar:
  - Day / Week / Month views
  - Interactive events

- **Contacts table** (DataGrid)  
- **Team management** with roles and permissions  
- **Invoices table** with balances  
- **FAQ system** with expandable items  

All pages share a **consistent layout shell** (TopBar + SideBar + Main Content).

---

## 🧭 Pages Overview

- `/` – **Dashboard**  
- `/profile` – Profile details, avatar upload, and preferences  
- `/form` – Form powered by React Hook Form  
- `/team` – Team roles & access levels  
- `/contacts` – Contacts list  
- `/invoices` – Invoices balances  
- `/calendar` – Calendar & events  
- `/faq` – FAQ page  
- `/bar`, `/pie`, `/line`, `/geography` – Analytical charts  
- `*` – NotFound fallback page  

---

## 📁 Project Structure

---
src/
│── App.jsx
│── main.jsx
│── theme.jsx
│── index.css
│
├── components/
│ ├── Header.jsx
│ ├── SideBar.jsx
│ └── TopBar.jsx
│
├── pages/
│ ├── dashboard/
│ │ ├── Dashboard.jsx
│ │ ├── Card.jsx
│ │ ├── Row1.jsx
│ │ ├── Row2.jsx
│ │ ├── Row3.jsx
│ │ └── data.js
│ │
│ ├── profile/
│ │ └── Profile.jsx
│ │
│ ├── team/
│ │ ├── Team.jsx
│ │ └── data.js
│ │
│ ├── contacts/
│ │ ├── Contacts.jsx
│ │ └── data.js
│ │
│ ├── invoices/
│ │ ├── Invoices.jsx
│ │ └── data.js
│ │
│ ├── barChart/
│ │ ├── Bar.jsx
│ │ └── BarChart.jsx
│ │
│ ├── lineChart/
│ │ ├── Line.jsx
│ │ └── LineChart.jsx
│ │
│ ├── pieChart/
│ │ ├── Pie.jsx
│ │ └── PieChart.jsx
│ │
│ ├── geography/
│ │ ├── Geo.jsx
│ │ ├── Geography.jsx
│ │ ├── data.js
│ │ └── world_countries.jsx
│ │
│ ├── calendar/
│ │ ├── Calendar.jsx
│ │ ├── calendar.css
│ │ └── EventUtils.js
│ │
│ ├── FAQ/
│ │ └── FAQ.jsx
│ │
│ └── form/
│ └── Form.jsx
│
└── notFound/
└── NotFound.jsx

---

## 💻 Tech Stack (Used in This Project)

**Core:**
- React 18  
- Vite  
- React Router v7  

**UI & Layout:**
- Material UI (MUI v5)  
- MUI Icons  
- MUI Data Grid  
- Custom theming with light/dark mode  

**Charts & Maps:**
- @nivo/bar  
- @nivo/line  
- @nivo/pie  
- @nivo/geo  

**Calendar & Dates:**
- FullCalendar (core, daygrid, timegrid, interaction)  
- date-fns  

**Forms & State:**
- React Hook Form  
- Local Storage persistence  

**Tooling:**
- ESLint  
- eslint-plugin-react-hooks  
- Vite React plugin  

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/HAKIM166/Dashboard.git
cd Dashboard
