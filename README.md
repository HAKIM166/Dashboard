# 🧱 Dashboard – React Admin Panel (Vite + MUI + Router)

A production-grade, modular, and scalable **React Admin Dashboard** built using:

- **React 18**
- **Vite**
- **Material UI (MUI v5)**
- **React Router**
- **Local Storage Persistence**
- **Dynamic Theming + Component Isolation**

Designed as a clean, maintainable front-end architecture suitable for real-world dashboards.

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

- Reusable UI components (Sidebar, TopBar, Header)
- Centralized theming with light/dark mode
- Dynamic routing

---

### 👤 Profile System
- Full user profile panel
- Editable:
  - Name
  - Email
  - Phone
- **Local Avatar Upload** (File → Base64 → Persist in localStorage)
- Real-time "Last Login" calculation
- Preferences stored locally:
  - Email notifications
  - 2FA toggle
  - Autosave toggle

---

## 📊 Analytical Views
Includes:
- Bar Chart
- Line Chart
- Pie Chart
- Geography Heatmap
- KPI Cards
- Modular dashboard rows

---

## 📅 Productivity Pages
- Calendar page  
- Contacts table  
- Team roles page  
- Invoices table  
- FAQ system  

All pages wrapped in a consistent layout shell.

---

## 📁 Project Structure

```
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
```

-------------------------
# 💻 Tech Stack:
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white) ![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7) ![Codeberg](https://img.shields.io/badge/Codeberg-2185D0?style=for-the-badge&logo=Codeberg&logoColor=white) ![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white) ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![Context-API](https://img.shields.io/badge/Context--Api-000000?style=for-the-badge&logo=react) ![Chart.js](https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white) ![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![Adobe](https://img.shields.io/badge/adobe-%23FF0000.svg?style=for-the-badge&logo=adobe&logoColor=white)


