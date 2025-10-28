import { Link, useLocation, Outlet } from 'react-router-dom'

const navigation = [
  { name: 'Dashboard', path: '/' },
  { name: 'API Keys', path: '/api-keys' },
  { name: 'Usage', path: '/usage' },
  { name: 'Docs', path: '/docs' },
]

export function Layout() {
  const location = useLocation()

  return (
    <div>
      <nav style={{ padding: '20px', borderBottom: '1px solid #ccc' }}>
        <h1 style={{ display: 'inline-block', marginRight: '40px' }}>API Console</h1>
        {navigation.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                marginRight: '20px',
                textDecoration: 'none',
                color: isActive ? '#000' : '#666',
                fontWeight: isActive ? 'bold' : 'normal'
              }}
            >
              {item.name}
            </Link>
          )
        })}
      </nav>

      <main style={{ padding: '20px' }}>
        <Outlet />
      </main>
    </div>
  )
}
