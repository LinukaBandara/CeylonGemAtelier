import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import PlaceholderPage from "./pages/PlaceholderPage";
import GemstoneDetail from "./pages/GemstoneDetail";

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/inventory/:id" element={<GemstoneDetail />} />
          <Route path="/products" element={<PlaceholderPage title="Products" />} />
          <Route path="/certificates" element={<PlaceholderPage title="Certification Archive" />} />
          <Route path="/media" element={<PlaceholderPage title="Atelier Media" />} />
          <Route path="/reservations" element={<PlaceholderPage title="Reservations" />} />
          <Route path="/sales" element={<PlaceholderPage title="Sales" />} />
          <Route path="/reference-data" element={<PlaceholderPage title="Reference Data" />} />
          <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
          <Route path="*" element={<PlaceholderPage title="Not Found" description="This atelier route does not exist." />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
