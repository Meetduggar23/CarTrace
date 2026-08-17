import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { LoadingScreen } from "@/components/common/LoadingScreen";
import { Layout } from "@/components/layout/Layout";
import { HomePage } from "@/pages/HomePage";

// Code-split every route for smaller initial bundles.
const VehicleSearchPage = lazy(() =>
  import("@/pages/VehicleSearchPage").then((m) => ({ default: m.VehicleSearchPage }))
);
const VehiclePage = lazy(() =>
  import("@/pages/VehiclePage").then((m) => ({ default: m.VehiclePage }))
);
const VinDecoderPage = lazy(() =>
  import("@/pages/VinDecoderPage").then((m) => ({ default: m.VinDecoderPage }))
);
const RtoPage = lazy(() =>
  import("@/pages/RtoPage").then((m) => ({ default: m.RtoPage }))
);
const RtoCodePage = lazy(() =>
  import("@/pages/RtoCodePage").then((m) => ({ default: m.RtoCodePage }))
);
const RtoFilterPage = lazy(() =>
  import("@/pages/RtoFilterPage").then((m) => ({ default: m.RtoFilterPage }))
);
const ComparePage = lazy(() =>
  import("@/pages/ComparePage").then((m) => ({ default: m.ComparePage }))
);
const SavedVehiclesPage = lazy(() =>
  import("@/pages/SavedVehiclesPage").then((m) => ({ default: m.SavedVehiclesPage }))
);
const HistoryPage = lazy(() =>
  import("@/pages/HistoryPage").then((m) => ({ default: m.HistoryPage }))
);
const LoginPage = lazy(() =>
  import("@/pages/LoginPage").then((m) => ({ default: m.LoginPage }))
);
const SignupPage = lazy(() =>
  import("@/pages/SignupPage").then((m) => ({ default: m.SignupPage }))
);
const ProvidersPage = lazy(() =>
  import("@/pages/ProvidersPage").then((m) => ({ default: m.ProvidersPage }))
);
const AboutPage = lazy(() =>
  import("@/pages/AboutPage").then((m) => ({ default: m.AboutPage }))
);
const PrivacyPage = lazy(() =>
  import("@/pages/PrivacyPage").then((m) => ({ default: m.PrivacyPage }))
);
const TermsPage = lazy(() =>
  import("@/pages/TermsPage").then((m) => ({ default: m.TermsPage }))
);
const NotFoundPage = lazy(() =>
  import("@/pages/NotFoundPage").then((m) => ({ default: m.NotFoundPage }))
);

function PageLoader() {
  return <LoadingScreen />;
}

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route
          path="vehicle"
          element={
            <Suspense fallback={<PageLoader />}>
              <VehicleSearchPage />
            </Suspense>
          }
        />
        <Route
          path="vehicle/vin/:vin"
          element={
            <Suspense fallback={<PageLoader />}>
              <VehiclePage />
            </Suspense>
          }
        />
        <Route
          path="vehicle/:registration"
          element={
            <Suspense fallback={<PageLoader />}>
              <VehiclePage />
            </Suspense>
          }
        />
        <Route
          path="vin-decoder"
          element={
            <Suspense fallback={<PageLoader />}>
              <VinDecoderPage />
            </Suspense>
          }
        />
        <Route
          path="rto"
          element={
            <Suspense fallback={<PageLoader />}>
              <RtoPage />
            </Suspense>
          }
        />
        <Route
          path="rto/state/:value"
          element={
            <Suspense fallback={<PageLoader />}>
              <RtoFilterPage filter="state" />
            </Suspense>
          }
        />
        <Route
          path="rto/city/:value"
          element={
            <Suspense fallback={<PageLoader />}>
              <RtoFilterPage filter="city" />
            </Suspense>
          }
        />
        <Route
          path="rto/:code"
          element={
            <Suspense fallback={<PageLoader />}>
              <RtoCodePage />
            </Suspense>
          }
        />
        <Route
          path="compare"
          element={
            <Suspense fallback={<PageLoader />}>
              <ComparePage />
            </Suspense>
          }
        />
        <Route
          path="saved"
          element={
            <Suspense fallback={<PageLoader />}>
              <SavedVehiclesPage />
            </Suspense>
          }
        />
        <Route
          path="history"
          element={
            <Suspense fallback={<PageLoader />}>
              <HistoryPage />
            </Suspense>
          }
        />
        <Route
          path="providers"
          element={
            <Suspense fallback={<PageLoader />}>
              <ProvidersPage />
            </Suspense>
          }
        />
        <Route
          path="login"
          element={
            <Suspense fallback={<PageLoader />}>
              <LoginPage />
            </Suspense>
          }
        />
        <Route
          path="signup"
          element={
            <Suspense fallback={<PageLoader />}>
              <SignupPage />
            </Suspense>
          }
        />
        <Route
          path="about"
          element={
            <Suspense fallback={<PageLoader />}>
              <AboutPage />
            </Suspense>
          }
        />
        <Route
          path="privacy"
          element={
            <Suspense fallback={<PageLoader />}>
              <PrivacyPage />
            </Suspense>
          }
        />
        <Route
          path="terms"
          element={
            <Suspense fallback={<PageLoader />}>
              <TermsPage />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<PageLoader />}>
              <NotFoundPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
