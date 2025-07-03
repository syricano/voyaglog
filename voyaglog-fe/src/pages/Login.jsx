import { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import voyagStyle from '../style/voyagStyle'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    identifier: '', // username or email
    password: '',
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.identifier || !formData.password) {
      setError('Please fill in all fields')
      return
    }

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: formData.identifier,
          password: formData.password,
        }),
        credentials: 'include',
      })

      let data
      try {
        data = await response.json()
      } catch {
        setError('Unexpected response from server')
        return
      }

      console.log('Login response data:', data)

      if (!response.ok) {
        setError(data.error || data.message || 'Login failed')
        return
      }

      if (!data.token) {
        setError('Login succeeded but no token received')
        return
      }

      // Store token and redirect
      localStorage.setItem('token', data.token)
      navigate('/')
    } catch (err) {
      console.error('Login error:', err)
      setError('Login failed. Please try again later.')
    }
  }

  return (
    <div className={voyagStyle.loginContainer}>
      <div className={voyagStyle.loginCard}>
        <p className={voyagStyle.loginText}>
          Don’t have an account?{' '}
          <Link to="/signup" className={voyagStyle.loginLink}>
            Sign up here
          </Link>
        </p>
        <h2 className={voyagStyle.loginTitle}>Login</h2>
        {error && <p className={voyagStyle.errorText}>{error}</p>}
        <form onSubmit={handleLogin} className={voyagStyle.form}>
          <input
            type="text"
            name="identifier"
            placeholder="Username or email"
            value={formData.identifier}
            onChange={handleChange}
            className={voyagStyle.input}
            autoComplete="username"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={voyagStyle.input}
            autoComplete="current-password"
            required
          />
          <button type="submit" className={voyagStyle.loginButton}>
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
