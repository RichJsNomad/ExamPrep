import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { StudentDashboard } from './pages/StudentDashboard'
import { AIRoadmap } from './pages/AIRoadmap'
import { LandingPage } from './pages/LandingPage'
import { Registration } from './pages/Registration'
import { OnboardingStep1 } from './pages/onboarding/OnboardingStep1'
import { OnboardingStep2 } from './pages/onboarding/OnboardingStep2'
import { OnboardingComplete } from './pages/onboarding/OnboardingComplete'
import { OnboardingProvider } from './context/OnboardingContext'

function App() {
  return (
    <BrowserRouter>
      <OnboardingProvider>
        <Routes>
          {/* Onboarding flow - без MainLayout */}
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/onboarding/step1" element={<OnboardingStep1 />} />
          <Route path="/onboarding/step2" element={<OnboardingStep2 />} />
          <Route path="/onboarding/complete" element={<OnboardingComplete />} />

          {/* Main app - с MainLayout */}
          <Route
            path="/dashboard"
            element={
              <MainLayout>
                <StudentDashboard />
              </MainLayout>
            }
          />
          <Route
            path="/roadmap"
            element={
              <MainLayout>
                <AIRoadmap />
              </MainLayout>
            }
          />

          {/* Redirect root to landing */}
          <Route path="/" element={<Navigate to="/landing" replace />} />
          <Route path="*" element={<Navigate to="/landing" replace />} />
        </Routes>
      </OnboardingProvider>
    </BrowserRouter>
  )
}

export default App
