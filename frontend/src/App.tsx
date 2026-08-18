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

// Placeholder feature pages behind the navbar feature bar / dropdowns.
const ChallanPage = lazy(() =>
  import("@/pages/FeaturePages").then((m) => ({ default: m.ChallanPage }))
);
const CarInsurancePage = lazy(() =>
  import("@/pages/FeaturePages").then((m) => ({ default: m.CarInsurancePage }))
);
const BikeInsurancePage = lazy(() =>
  import("@/pages/FeaturePages").then((m) => ({ default: m.BikeInsurancePage }))
);
const ServiceHistoryPage = lazy(() =>
  import("@/pages/FeaturePages").then((m) => ({ default: m.ServiceHistoryPage }))
);

const UsedCarsPage = lazy(() =>
  import("@/pages/FeaturePages").then((m) => ({ default: m.UsedCarsPage }))
);
const FastagPage = lazy(() =>
  import("@/pages/FeaturePages").then((m) => ({ default: m.FastagPage }))
);
const ContactPage = lazy(() =>
  import("@/pages/FeaturePages").then((m) => ({ default: m.ContactPage }))
);
const HelpPage = lazy(() =>
  import("@/pages/FeaturePages").then((m) => ({ default: m.HelpPage }))
);
const ProfilePage = lazy(() =>
  import("@/pages/ProfilePage").then((m) => ({ default: m.ProfilePage }))
);
const NewCarsPage = lazy(() =>
  import("@/pages/NewCarsPage").then((m) => ({ default: m.NewCarsPage }))
);
const CarDetailPage = lazy(() =>
  import("@/pages/CarDetailPage").then((m) => ({ default: m.CarDetailPage }))
);
const CarBrandPage = lazy(() =>
  import("@/pages/CarBrandPage").then((m) => ({ default: m.CarBrandPage }))
);
const SettingsPage = lazy(() =>
  import("@/pages/SettingsPage").then((m) => ({ default: m.SettingsPage }))
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
          path="challan"
          element={
            <Suspense fallback={<PageLoader />}>
              <ChallanPage />
            </Suspense>
          }
        />
        <Route
          path="car-insurance"
          element={
            <Suspense fallback={<PageLoader />}>
              <CarInsurancePage />
            </Suspense>
          }
        />
        <Route
          path="bike-insurance"
          element={
            <Suspense fallback={<PageLoader />}>
              <BikeInsurancePage />
            </Suspense>
          }
        />
        <Route
          path="service-history"
          element={
            <Suspense fallback={<PageLoader />}>
              <ServiceHistoryPage />
            </Suspense>
          }
        />
        <Route
          path="new-cars"
          element={
            <Suspense fallback={<PageLoader />}>
              <NewCarsPage />
            </Suspense>
          }
        />
        <Route
          path="new-cars/brand/:brand"
          element={
            <Suspense fallback={<PageLoader />}>
              <CarBrandPage />
            </Suspense>
          }
        />
        <Route
          path="new-cars/:brand/:model"
          element={
            <Suspense fallback={<PageLoader />}>
              <CarDetailPage />
            </Suspense>
          }
        />
        <Route
          path="used-cars"
          element={
            <Suspense fallback={<PageLoader />}>
              <UsedCarsPage />
            </Suspense>
          }
        />
        <Route
          path="fastag"
          element={
            <Suspense fallback={<PageLoader />}>
              <FastagPage />
            </Suspense>
          }
        />
        <Route
          path="contact"
          element={
            <Suspense fallback={<PageLoader />}>
              <ContactPage />
            </Suspense>
          }
        />
        <Route
          path="help"
          element={
            <Suspense fallback={<PageLoader />}>
              <HelpPage />
            </Suspense>
          }
        />
        <Route
          path="profile"
          element={
            <Suspense fallback={<PageLoader />}>
              <ProfilePage />
            </Suspense>
          }
        />
        <Route
          path="settings"
          element={
            <Suspense fallback={<PageLoader />}>
              <SettingsPage />
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

      {/* Legal documents — rendered WITHOUT the site navbar/footer so they
          read like professional legal pages. */}
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
    </Routes>
  );
}
