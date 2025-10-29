import { Link, useLocation, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Button } from './ui/button'

const navigation = [
  { name: 'Dashboard', path: '/' },
  { name: 'API Keys', path: '/api-keys' },
  { name: 'Usage', path: '/usage' },
  { name: 'Docs', path: '/docs' },
]

export function Layout() {
  const location = useLocation()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <div>
      <nav
        style={{
          padding: '20px',
          borderBottom: '1px solid #ccc',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h1 style={{ display: 'inline-block', marginRight: '40px' }}>
            ZAMA API Console
          </h1>
          {navigation.map(item => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  marginRight: '20px',
                  textDecoration: 'none',
                  color: isActive ? '#000' : '#666',
                  fontWeight: isActive ? 'bold' : 'normal',
                }}
              >
                {item.name}
              </Link>
            )
          })}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '14px', color: '#666' }}>
            Welcome, {user?.name}
          </span>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>
      </nav>

      <main style={{ padding: '20px' }}>
        <Outlet />
      </main>
    </div>
  )
}
