import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Dashboard from "./pages/Dashboard";
import CRM from "./pages/CRM";
import Inventory from "./pages/Inventory";
import Accounts from "./pages/Accounts";
import HRMS from "./pages/HRMS";
import Manufacturing from "./pages/Manufacturing";
import Finance from "./pages/Finance";
import GST from "./pages/GST";
import Masters from "./pages/Masters";
import FieldRegistry from "./pages/FieldRegistry";
import SettingsPage from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/crm" element={<CRM />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/hrms" element={<HRMS />} />
            <Route path="/manufacturing" element={<Manufacturing />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/gst" element={<GST />} />
            <Route path="/masters" element={<Masters />} />
            <Route path="/field-registry" element={<FieldRegistry />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
