import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { Layout } from './components/Layout'
import { Dashboard } from './pages/Dashboard'
import { ApiKeys } from './pages/ApiKeys'
import { Usage } from './pages/Usage'
import { Docs } from './pages/Docs'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="api-keys" element={<ApiKeys />} />
          <Route path="usage" element={<Usage />} />
          <Route path="docs" element={<Docs />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
