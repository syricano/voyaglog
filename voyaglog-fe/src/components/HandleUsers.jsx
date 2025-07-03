import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import voyagStyle from '../style/voyagStyle'

const HandleUsers = ({ blogs, setBlogs, blogsError, setBlogsError, onSuccess }) => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const [user, setUser] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    username: '',
  })
  const [userError, setUserError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }

    const fetchUserData = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/auth/profile', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include', // important if relying on cookies
        });
        const data = await res.json()
        console.log('User profile API response:', data) // DEBUG: Inspect API response

       

        if (!res.ok) throw new Error(data.message || 'Failed to fetch user data')

        // Map backend fields flexibly — adjust according to your API's actual field names
        setUser({
          id: data.id, // ✅ include the ID!
          firstName: data.firstName ?? '',
          lastName: data.lastName ?? '',
          email: data.email ?? '',
          username: data.username ?? '',
        });
      } catch (err) {
        setUserError(err.message)
      }
    }

    const fetchUserBlogs = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/posts/my-posts', {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || 'Failed to fetch blogs')
        setBlogs(data.posts || [])
      } catch (err) {
        setBlogsError(err.message)
      }
    }

    fetchUserData()
    fetchUserBlogs()
  }, [navigate, token, setBlogs, setBlogsError])

  // Handle profile input changes
  const handleUserChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // Submit updated profile
  const handleUserSubmit = async (e) => {
      e.preventDefault();
      setUserError('');
      
      if (!user.firstName || !user.lastName || !user.email || !user.username) {
        setUserError('Please fill out all fields.');
        return;
      }

      try {
        const res = await fetch(`http://localhost:8080/api/users/${user.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(user),
        });

        const data = await res.json(); // ✅ Fix: parse the response

        if (!res.ok) {
          throw new Error(data.message || 'Failed to update user');
        }

        // ✅ Fix: Update the local user state with the new data
        setUser({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          username: user.username,
        });

        setSuccessMsg('Profile updated successfully ✅');
        setTimeout(() => setSuccessMsg(''), 3000);
        if (onSuccess) onSuccess();
      } catch (err) {
        setUserError(err.message);
      }
    };

  return (
    <div className="flex-1 bg-base-200 p-6 rounded shadow-md max-w-md">
      <h2 className={voyagStyle.sectionTitle}>Personal Information</h2>
      {userError && <p className="text-red-600 mb-2">{userError}</p>}
      {successMsg && <p className="text-green-600 mb-2">{successMsg}</p>}
      <form onSubmit={handleUserSubmit} className="space-y-4">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          className={voyagStyle.input}
          value={user.firstName}
          onChange={handleUserChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          className={voyagStyle.input}
          value={user.lastName}
          onChange={handleUserChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className={voyagStyle.input}
          value={user.email}
          onChange={handleUserChange}
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          className={voyagStyle.input}
          value={user.username}
          onChange={handleUserChange}
        />
        <button type="submit" className={voyagStyle.submitButton}>
          Save Profile
        </button>
      </form>
    </div>
  )
}

export default HandleUsers
