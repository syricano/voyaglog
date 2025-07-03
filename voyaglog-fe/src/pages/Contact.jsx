import { useState } from 'react'
import voyagStyle from '../style/voyagStyle'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [status, setStatus] = useState(null) // null | 'success' | 'error'

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus(null)

    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error')
      return
    }

    setStatus('success')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <div className={voyagStyle.formContainer}>
      <h1 className={voyagStyle.heroTitle}>Contact Us</h1>

      {status === 'success' && (
        <p className="mb-4 text-green-600">
          Thanks for your message! We will get back to you soon.
        </p>
      )}
      {status === 'error' && (
        <p className="mb-4 text-red-600">
          Please fill out all fields.
        </p>
      )}

      <form onSubmit={handleSubmit} className={voyagStyle.form}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className={voyagStyle.input}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className={voyagStyle.input}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          className={voyagStyle.textarea}
          rows={5}
          required
        />
        <button type="submit" className={voyagStyle.submitButton}>
          Send Message
        </button>
      </form>
    </div>
  )
}

export default Contact
