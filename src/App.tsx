import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import RequireAuth from '@/components/RequireAuth';
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
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <Layout>
                  <Dashboard />
                </Layout>
              </RequireAuth>
            }
          />

          {/* Protected routes - wrapped inside Layout */}
          <Route
            path="/crm"
            element={
              <RequireAuth>
                <Layout>
                  <CRM />
                </Layout>
              </RequireAuth>
            }
          />
          <Route
            path="/inventory"
            element={
              <RequireAuth>
                <Layout>
                  <Inventory />
                </Layout>
              </RequireAuth>
            }
          />
          <Route
            path="/accounts"
            element={
              <RequireAuth>
                <Layout>
                  <Accounts />
                </Layout>
              </RequireAuth>
            }
          />
          <Route
            path="/hrms"
            element={
              <RequireAuth>
                <Layout>
                  <HRMS />
                </Layout>
              </RequireAuth>
            }
          />
          <Route
            path="/manufacturing"
            element={
              <RequireAuth>
                <Layout>
                  <Manufacturing />
                </Layout>
              </RequireAuth>
            }
          />
          <Route
            path="/finance"
            element={
              <RequireAuth>
                <Layout>
                  <Finance />
                </Layout>
              </RequireAuth>
            }
          />
          <Route
            path="/gst"
            element={
              <RequireAuth>
                <Layout>
                  <GST />
                </Layout>
              </RequireAuth>
            }
          />
          <Route
            path="/masters"
            element={
              <RequireAuth roles={["admin"]}>
                <Layout>
                  <Masters />
                </Layout>
              </RequireAuth>
            }
          />
          <Route
            path="/field-registry"
            element={
              <RequireAuth>
                <Layout>
                  <FieldRegistry />
                </Layout>
              </RequireAuth>
            }
          />
          <Route
            path="/settings"
            element={
              <RequireAuth roles={["admin"]}>
                <Layout>
                  <SettingsPage />
                </Layout>
              </RequireAuth>
            }
          />

          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
