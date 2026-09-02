import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import PlaceholderPage from "./pages/PlaceholderPage";
import GemstoneDetail from "./pages/GemstoneDetail";
import Products from "./pages/Products";
import Certificates from "./pages/Certificates";
import Media from "./pages/Media";
import Reservations from "./pages/Reservations";
import Sales from "./pages/Sales";
import ReferenceData from "./pages/ReferenceData";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/inventory/:id" element={<GemstoneDetail />} />
            <Route path="/products" element={<Products />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/media" element={<Media />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/reference-data" element={<ReferenceData />} />
            <Route path="/settings" element={<Settings />} />
            <Route
              path="*"
              element={
                <PlaceholderPage
                  title="Not Found"
                  description="This atelier route does not exist."
                />
              }
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
