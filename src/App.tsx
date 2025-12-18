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
import { RegularLesson } from './pages/daily/RegularLesson'
import { MiniQuiz } from './pages/daily/MiniQuiz'
import { QuizResult } from './pages/daily/QuizResult'
import { PracticeSession } from './pages/daily/PracticeSession'
import { DayComplete } from './pages/daily/DayComplete'
import {
  SubjectSelection,
  VariantSelection,
  ExamBriefing,
  ExamSession,
  PreliminaryResults,
  FinalResults,
  ErrorReview,
} from './pages/mock-exam'
import { ParentDashboard, ParentDetails } from './pages/parent'
import { OnboardingProvider } from './context/OnboardingContext'
import { LessonProvider } from './context/LessonContext'
import { DailyProgressProvider } from './context/DailyProgressContext'

function App() {
  return (
    <BrowserRouter>
      <OnboardingProvider>
        <LessonProvider>
          <DailyProgressProvider>
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

              {/* Daily learning flow - с MainLayout */}
              <Route
                path="/daily/lesson"
                element={
                  <MainLayout>
                    <RegularLesson />
                  </MainLayout>
                }
              />
              <Route
                path="/daily/quiz"
                element={
                  <MainLayout>
                    <MiniQuiz />
                  </MainLayout>
                }
              />
              <Route
                path="/daily/quiz-result"
                element={
                  <MainLayout>
                    <QuizResult />
                  </MainLayout>
                }
              />
              <Route
                path="/daily/practice"
                element={
                  <MainLayout>
                    <PracticeSession />
                  </MainLayout>
                }
              />
              <Route
                path="/daily/day-complete"
                element={
                  <MainLayout>
                    <DayComplete />
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

              {/* Mock exam flow - с MainLayout */}
              <Route
                path="/mock-exam/subjects"
                element={
                  <MainLayout>
                    <SubjectSelection />
                  </MainLayout>
                }
              />
              <Route
                path="/mock-exam/:subjectId/variants"
                element={
                  <MainLayout>
                    <VariantSelection />
                  </MainLayout>
                }
              />
              <Route
                path="/mock-exam/:subjectId/:variantId/briefing"
                element={
                  <MainLayout>
                    <ExamBriefing />
                  </MainLayout>
                }
              />
              <Route
                path="/mock-exam/:subjectId/:variantId/exam"
                element={
                  <MainLayout>
                    <ExamSession />
                  </MainLayout>
                }
              />
              <Route
                path="/mock-exam/:examId/preliminary"
                element={
                  <MainLayout>
                    <PreliminaryResults />
                  </MainLayout>
                }
              />
              <Route
                path="/mock-exam/:examId/results"
                element={
                  <MainLayout>
                    <FinalResults />
                  </MainLayout>
                }
              />
              <Route
                path="/mock-exam/:examId/review"
                element={
                  <MainLayout>
                    <ErrorReview />
                  </MainLayout>
                }
              />

              {/* Parent control flow - с MainLayout */}
              <Route
                path="/parent/dashboard"
                element={
                  <MainLayout>
                    <ParentDashboard />
                  </MainLayout>
                }
              />
              <Route
                path="/parent/details"
                element={
                  <MainLayout>
                    <ParentDetails />
                  </MainLayout>
                }
              />

              {/* Redirect root to landing */}
              <Route path="/" element={<Navigate to="/landing" replace />} />
              <Route path="*" element={<Navigate to="/landing" replace />} />
            </Routes>
          </DailyProgressProvider>
        </LessonProvider>
      </OnboardingProvider>
    </BrowserRouter>
  )
}

export default App
