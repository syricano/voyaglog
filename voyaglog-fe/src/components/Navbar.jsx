import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import ThemeToggle from './ThemeToggle'
import DashboardMenu from './DashboardMenu'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  // Check auth state (example using localStorage token)
  const isLoggedIn = Boolean(localStorage.getItem('token'))

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
    setIsOpen(false)
  }

  return (
    <nav className="bg-base-100 shadow-md sticky top-0 z-50 backdrop-blur-md bg-opacity-90 transition-colors duration-300">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:brightness-110 transition-all duration-300"
          >
            Voyaglog
          </Link>
          <ThemeToggle />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link
            to="/"
            className="btn btn-ghost btn-sm md:btn-md px-4 rounded-md hover:text-primary hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 transition md:text-lg"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="btn btn-ghost btn-sm md:btn-md px-4 rounded-md hover:text-primary hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 transition md:text-lg"
          >
            About
          </Link>
          <Link
            to="/blogs"
            className="btn btn-ghost btn-sm md:btn-md px-4 rounded-md hover:text-primary hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 transition md:text-lg"
          >
            All Blogs
          </Link>

          {isLoggedIn && (
            <DashboardMenu setIsOpen={setIsOpen} />
          )}

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="btn btn-error btn-sm md:btn-md px-4 rounded-md text-white shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-error focus:ring-offset-1 transition md:text-lg"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-primary btn-sm md:btn-md px-4 rounded-md text-white shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 transition md:text-lg"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="btn btn-secondary btn-sm md:btn-md px-4 rounded-md text-white shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-1 transition md:text-lg"
              >
                Signup
              </Link>
            </>
          )}
        </div>


        {/* Mobile Burger Button */}
        <button
          className="md:hidden btn btn-ghost btn-square p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 transition"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
      <div className="md:hidden bg-base-200 px-4 py-3 space-y-2 shadow-inner border-t border-base-300">
        <Link
          to="/"
          className="block btn btn-ghost w-full rounded-md hover:text-primary hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 transition"
          onClick={() => setIsOpen(false)}
        >
          Home
        </Link>
        <Link to="/blogs" className='block btn btn-ghost w-full rounded-md  hover:text-primary hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 transition'>
          All Blogs
        </Link>
        <Link
          to="/about"
          className="block btn btn-ghost w-full rounded-md  hover:text-primary hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 transition"
          onClick={() => setIsOpen(false)}
        >
          About
        </Link>

        {isLoggedIn && (
          <DashboardMenu className="text-center md:text-left" setIsOpen={setIsOpen} />
        )}

        {isLoggedIn ? (
          <button
            onClick={() => {
              handleLogout()
              setIsOpen(false)
            }}
            className="btn btn-error w-full rounded-md text-white shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-error focus:ring-offset-1 transition"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="block btn btn-primary w-full rounded-md text-white shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 transition"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="block btn btn-secondary w-full rounded-md text-white shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-1 transition"
              onClick={() => setIsOpen(false)}
            >
              Signup
            </Link>
          </>
        )}
      </div>
      )}
    </nav>

  )
}

export default Navbar
