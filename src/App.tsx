import { Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { HomePage } from "./pages/HomePage";
import { DashboardPage } from "./pages/DashboardPage";

export const App = () => (
  <Routes>
    <Route element={<AppLayout />}>
      <Route index element={<HomePage />} />
      <Route path="dashboard" element={<DashboardPage />} />
    </Route>
  </Routes>
);
