/**
 * Application Entry Point
 * -----------------------
 * Bootstraps the React application, configures the hash-based router,
 * and wires top-level routes into the main App layout.
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import {
  createHashRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Dashboard from "./pages/dashboard/Dashboard";
import Team from "./pages/team/Team";
import Contacts from "./pages/contacts/Contacts";
import Invoices from "./pages/invoices/Invoices";
import Calendar from "./pages/calendar/Calendar";
import FAQ from "./pages/FAQ/FAQ";
import Bar from "./pages/barChart/BarChart";
import Pie from "./pages/pieChart/PieChart";
import Line from "./pages/lineChart/LineChart";
import Geography from "./pages/geography/Geography";
import Form from "./pages/form/Form";
import Profile from "./pages/profile/Profile";
import NotFound from "./notFound/NotFound";

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Dashboard />} />
      <Route path="profile" element={<Profile />} />
      <Route path="form" element={<Form />} />
      <Route path="team" element={<Team />} />
      <Route path="contacts" element={<Contacts />} />
      <Route path="invoices" element={<Invoices />} />
      <Route path="calendar" element={<Calendar />} />
      <Route path="faq" element={<FAQ />} />
      <Route path="bar" element={<Bar />} />
      <Route path="pie" element={<Pie />} />
      <Route path="line" element={<Line />} />
      <Route path="geography" element={<Geography />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
