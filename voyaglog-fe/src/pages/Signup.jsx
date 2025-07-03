import { useState } from 'react'
import { useNavigate } from 'react-router'
import voyagStyle from '../style/voyagStyle'

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName:'',
    username: '',
    email: '',
    phone:'',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.username || !formData.password) {
      setError('Please fill in all fields')
      return
    }

    // TODO: Call your signup API here

    try {
      const response = await fetch('http://localhost:8080/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        username: formData.username.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password,
        }),
      });

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Signup failed')
      } else {
        alert('Signup successful! Please login.')
        navigate('/login')
      }
    } catch (err) {
      console.error('Signup error:', err)
      setError('Signup failed. Please try again later.')
    }
  }
  

  return (
    <div className={voyagStyle.signupWrapper}>
      <h2 className={voyagStyle.signupTitle}>Sign Up</h2>
      {error && <p className={voyagStyle.errorText}>{error}</p>}
      <form onSubmit={handleSubmit} className={voyagStyle.form}>
        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className={voyagStyle.input} required/>
        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className={voyagStyle.input} required/>
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} className={voyagStyle.input} required/>
        <input type="phone" name="phone" placeholder="phone" value={formData.phone} onChange={handleChange} className={voyagStyle.input} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className={voyagStyle.input} required/>
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className={voyagStyle.input} required/>
        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className={voyagStyle.input} required/>
        <button type="submit" className={voyagStyle.submitButton}>
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default Signup
