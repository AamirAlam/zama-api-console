import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './contexts/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Layout } from './components/Layout'
import { Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard'
import { ApiKeys } from './pages/ApiKeys'
import { Usage } from './pages/Usage'
import { Docs } from './pages/Docs'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="api-keys" element={<ApiKeys />} />
            <Route path="usage" element={<Usage />} />
            <Route path="docs" element={<Docs />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
