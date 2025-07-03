import { Navigate, Outlet } from 'react-router'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const isAuthenticated = () => {
  return localStorage.getItem('token')
}

const ProtectedLayout = () => {
  if (!isAuthenticated()) return <Navigate to="/login" />

  return (
    <div className="min-h-screen flex flex-col">
      <header><Navbar /></header>
      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default ProtectedLayout
