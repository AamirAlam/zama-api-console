import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './contexts/AuthContext'
import { FeatureFlagsProvider } from './contexts/FeatureFlagsContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Layout } from './components/Layout'
import { DevPanel } from './components/DevPanel'
import { Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard'
import { ApiKeys } from './pages/ApiKeys'
import { Usage } from './pages/Usage'
import { Docs } from './pages/Docs'

function App() {
  return (
    <FeatureFlagsProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="api-keys" element={<ApiKeys />} />
              <Route path="usage" element={<Usage />} />
              <Route path="docs" element={<Docs />} />
            </Route>
          </Routes>
          {import.meta.env.VITE_NODE_ENV === 'development' && <DevPanel />}
        </Router>
      </AuthProvider>
    </FeatureFlagsProvider>
  )
}

export default App
