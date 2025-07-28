import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, RequireAuth } from "@/hooks/useAuth";
import { AppLayout } from "@/components/Layout/AppLayout";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import NetAssetValue from "./pages/NetAssetValue";
import APFRegistration from "./pages/APFRegistration";
import GetStarted from "./pages/GetStarted";
import Calculator from "./pages/Calculator";
import SystemFields from "./pages/SystemFields";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <RequireAuth>
                <AppLayout>
                  <Dashboard />
                </AppLayout>
              </RequireAuth>
            } />
            <Route path="/profile" element={
              <RequireAuth>
                <AppLayout>
                  <Profile />
                </AppLayout>
              </RequireAuth>
            } />
            <Route path="/net-asset-value" element={
              <RequireAuth>
                <AppLayout>
                  <NetAssetValue />
                </AppLayout>
              </RequireAuth>
            } />
            <Route path="/apf-registration" element={
              <RequireAuth>
                <AppLayout>
                  <APFRegistration />
                </AppLayout>
              </RequireAuth>
            } />
            <Route path="/get-started" element={
              <RequireAuth>
                <AppLayout>
                  <GetStarted />
                </AppLayout>
              </RequireAuth>
            } />
            <Route path="/system-fields" element={
              <RequireAuth>
                <AppLayout>
                  <SystemFields />
                </AppLayout>
              </RequireAuth>
            } />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
