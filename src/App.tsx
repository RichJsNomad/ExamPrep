import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { StudentDashboard } from './pages/StudentDashboard'
import { AIRoadmap } from './pages/AIRoadmap'
import { LandingPage } from './pages/LandingPage'
import { Registration } from './pages/Registration'
import { OnboardingStep1 } from './pages/onboarding/OnboardingStep1'
import { OnboardingStep2 } from './pages/onboarding/OnboardingStep2'
import { OnboardingComplete } from './pages/onboarding/OnboardingComplete'
import { LessonVideo } from './pages/lesson/LessonVideo'
import { LessonPractice } from './pages/lesson/LessonPractice'
import { LessonComplete } from './pages/lesson/LessonComplete'
import { OnboardingProvider } from './context/OnboardingContext'
import { LessonProvider } from './context/LessonContext'

function App() {
  return (
    <BrowserRouter>
      <OnboardingProvider>
        <LessonProvider>
          <Routes>
            {/* Onboarding flow - без MainLayout */}
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/onboarding/step1" element={<OnboardingStep1 />} />
            <Route path="/onboarding/step2" element={<OnboardingStep2 />} />
            <Route path="/onboarding/complete" element={<OnboardingComplete />} />

            {/* Lesson flow - с MainLayout */}
            <Route
              path="/lesson/first"
              element={
                <MainLayout>
                  <LessonVideo />
                </MainLayout>
              }
            />
            <Route
              path="/lesson/first/practice"
              element={
                <MainLayout>
                  <LessonPractice />
                </MainLayout>
              }
            />
            <Route
              path="/lesson/first/complete"
              element={
                <MainLayout>
                  <LessonComplete />
                </MainLayout>
              }
            />

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
        </LessonProvider>
      </OnboardingProvider>
    </BrowserRouter>
  )
}

export default App
