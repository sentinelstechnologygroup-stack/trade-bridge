import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientInstance } from "@/lib/query-client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageNotFound from "./lib/PageNotFound";
import { AuthProvider, useAuth } from "@/lib/AuthContext";

import SiteLayout from "./components/layout/SiteLayout";
import PortalLayout from "./components/portal/PortalLayout";
import AdminDashboard from "./pages/portal/AdminDashboard";
import PricingDashboard from "./pages/portal/PricingDashboard";
import RequestsInbox from "./pages/portal/RequestsInbox";
import RequestDetail from "./pages/portal/RequestDetail";
import FeasibilityReview from "./pages/portal/FeasibilityReview";
import DecisionQueue from "./pages/portal/DecisionQueue";
import SupplierTracker from "./pages/portal/SupplierTracker";
import QuoteBuilder from "./pages/portal/QuoteBuilder";
import ShipmentReadiness from "./pages/portal/ShipmentReadiness";
import PortalSettings from "./pages/portal/PortalSettings";
import SupplierOutreach from "./pages/portal/SupplierOutreach";
import DocumentLibrary from "./pages/portal/DocumentLibrary";
import ShipmentTracking from "./pages/portal/ShipmentTracking";
import TaskManager from "./pages/portal/TaskManager";
import ProductRiskRules from "./pages/portal/ProductRiskRules";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import USProductSourcing from "./pages/USProductSourcing";
import ExportCoordination from "./pages/ExportCoordination";
import SriLankaTradeLane from "./pages/SriLankaTradeLane";
import ProductCategories from "./pages/ProductCategories";
import HowItWorks from "./pages/HowItWorks";
import ForSriLankaBuyers from "./pages/ForSriLankaBuyers";
import ForUSSuppliers from "./pages/ForUSSuppliers";
import ImportWholesale from "./pages/ImportWholesale";
import RequestQuote from "./pages/RequestQuote";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AccessibilityStatement from "./pages/AccessibilityStatement";
import TradeComplianceDisclaimer from "./pages/TradeComplianceDisclaimer";
import RestrictedItemsPolicy from "./pages/RestrictedItemsPolicy";
import CookiePolicy from "./pages/CookiePolicy";
import PortalLogin from "./pages/portal/PortalLogin";
import ForgotPassword from "./pages/portal/ForgotPassword";
import AccessDenied from "./pages/portal/AccessDenied";
import ClientManagement from "./pages/portal/ClientManagement";
import SupplierManagement from "./pages/portal/SupplierManagement";
import ImporterProfiles from "./pages/portal/ImporterProfiles";
import ComplianceReview from "./pages/portal/ComplianceReview";
import AuditLog from "./pages/portal/AuditLog";
import UserManagement from "./pages/portal/UserManagement";
import SanctionsScreening from "./pages/portal/SanctionsScreening";
import ProfitMarginDashboard from "./pages/portal/ProfitMarginDashboard";
import DocumentReminders from "./pages/portal/DocumentReminders";
import AnalyticsDashboard from "./pages/portal/AnalyticsDashboard";

const LoadingScreen = () => (
  <div className="fixed inset-0 flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin" />
  </div>
);

function AuthenticatedApp() {
  const { isLoadingAuth } = useAuth();

  if (isLoadingAuth) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/us-product-sourcing" element={<USProductSourcing />} />
        <Route path="/export-coordination" element={<ExportCoordination />} />
        <Route path="/sri-lanka-trade-lane" element={<SriLankaTradeLane />} />
        <Route path="/product-categories" element={<ProductCategories />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/for-sri-lanka-buyers" element={<ForSriLankaBuyers />} />
        <Route path="/for-us-suppliers" element={<ForUSSuppliers />} />
        <Route path="/import-wholesale" element={<ImportWholesale />} />
        <Route path="/request-quote" element={<RequestQuote />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/accessibility" element={<AccessibilityStatement />} />
        <Route path="/trade-compliance" element={<TradeComplianceDisclaimer />} />
        <Route path="/restricted-items" element={<RestrictedItemsPolicy />} />
        <Route path="/restricted-items-policy" element={<RestrictedItemsPolicy />} />
        <Route path="/cookies" element={<CookiePolicy />} />
      </Route>

      <Route path="/portal/login" element={<PortalLogin />} />
      <Route path="/portal/access-denied" element={<AccessDenied />} />
      <Route path="/portal/unauthorized" element={<AccessDenied />} />
      <Route path="/portal/forgot-password" element={<ForgotPassword />} />

      <Route element={<PortalLayout />}>
        <Route path="/portal" element={<AdminDashboard />} />
        <Route path="/portal/pricing" element={<PricingDashboard />} />
        <Route path="/portal/pricing-feasibility" element={<PricingDashboard />} />
        <Route path="/portal/requests" element={<RequestsInbox />} />
        <Route path="/portal/requests/:id" element={<RequestDetail />} />
        <Route path="/portal/requests/:id/feasibility" element={<FeasibilityReview />} />
        <Route path="/portal/decision-queue" element={<DecisionQueue />} />
        <Route path="/portal/supplier-tracker" element={<SupplierTracker />} />
        <Route path="/portal/quote-builder" element={<QuoteBuilder />} />
        <Route path="/portal/shipment-readiness" element={<ShipmentReadiness />} />
        <Route path="/portal/supplier-outreach" element={<SupplierOutreach />} />
        <Route path="/portal/documents" element={<DocumentLibrary />} />
        <Route path="/portal/document-reminders" element={<DocumentReminders />} />
        <Route path="/portal/shipments" element={<ShipmentTracking />} />
        <Route path="/portal/tasks" element={<TaskManager />} />
        <Route path="/portal/risk-rules" element={<ProductRiskRules />} />
        <Route path="/portal/clients" element={<ClientManagement />} />
        <Route path="/portal/suppliers" element={<SupplierManagement />} />
        <Route path="/portal/suppliers-db" element={<SupplierManagement />} />
        <Route path="/portal/importer-profiles" element={<ImporterProfiles />} />
        <Route path="/portal/compliance-review" element={<ComplianceReview />} />
        <Route path="/portal/audit-log" element={<AuditLog />} />
        <Route path="/portal/users" element={<UserManagement />} />
        <Route path="/portal/user-management" element={<UserManagement />} />
        <Route path="/portal/settings" element={<PortalSettings />} />
        <Route path="/portal/sanctions-screening" element={<SanctionsScreening />} />
        <Route path="/portal/profit-margin" element={<ProfitMarginDashboard />} />
        <Route path="/portal/analytics" element={<AnalyticsDashboard />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}
