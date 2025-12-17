import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { StudentDashboard } from './pages/StudentDashboard'
import { AIRoadmap } from './pages/AIRoadmap'

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<StudentDashboard />} />
          <Route path="/roadmap" element={<AIRoadmap />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App
